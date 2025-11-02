-- Tabla de perfiles de usuario
-- Extiende la tabla auth.users de Supabase con información adicional

CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    email TEXT,
    avatar_url TEXT,
    allergens TEXT[] DEFAULT '{}',
    diet_type TEXT DEFAULT 'standard',
    favorite_foods TEXT[] DEFAULT '{}',
    avoid_foods TEXT[] DEFAULT '{}',
    onboarding_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_profiles_username ON public.profiles(username);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);

-- Trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Habilitar RLS (Row Level Security)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

COMMENT ON TABLE public.profiles IS 'Perfiles de usuario con preferencias alimentarias';
COMMENT ON COLUMN public.profiles.allergens IS 'Array de alergenos: gluten, lacteos, huevo, frutos_secos, pescado, soja';
COMMENT ON COLUMN public.profiles.diet_type IS 'Tipo de dieta: standard, vegetarian, vegan, keto, high_protein, mediterranean, low_fat';

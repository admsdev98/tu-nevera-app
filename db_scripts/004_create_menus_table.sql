-- Tabla de menús generados
-- Almacena los menús completos (rápidos, diarios o semanales)

CREATE TABLE IF NOT EXISTS public.menus (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    type TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    recipes JSONB NOT NULL,
    input_method TEXT NOT NULL,
    input_data JSONB,
    days INTEGER DEFAULT 1,
    meals_per_day INTEGER DEFAULT 3,
    status TEXT DEFAULT 'completed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_menus_user_id ON public.menus(user_id);
CREATE INDEX IF NOT EXISTS idx_menus_type ON public.menus(type);
CREATE INDEX IF NOT EXISTS idx_menus_status ON public.menus(status);
CREATE INDEX IF NOT EXISTS idx_menus_created_at ON public.menus(created_at DESC);

-- Trigger para updated_at
CREATE TRIGGER update_menus_updated_at
    BEFORE UPDATE ON public.menus
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Habilitar RLS
ALTER TABLE public.menus ENABLE ROW LEVEL SECURITY;

COMMENT ON TABLE public.menus IS 'Menús completos generados para usuarios';
COMMENT ON COLUMN public.menus.type IS 'Tipo: quick, daily, weekly';
COMMENT ON COLUMN public.menus.recipes IS 'Array JSON con referencias a recetas y estructura del menú';
COMMENT ON COLUMN public.menus.input_method IS 'Método de entrada: text, image, audio';
COMMENT ON COLUMN public.menus.input_data IS 'Datos originales de entrada del usuario';
COMMENT ON COLUMN public.menus.status IS 'Estado: pending, processing, completed, failed';

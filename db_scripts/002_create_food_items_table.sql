-- Tabla de alimentos disponibles del usuario
-- Almacena los ingredientes que el usuario tiene en su nevera/despensa

CREATE TABLE IF NOT EXISTS public.food_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    quantity TEXT,
    unit TEXT,
    category TEXT,
    expiration_date DATE,
    source TEXT DEFAULT 'manual',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_food_items_user_id ON public.food_items(user_id);
CREATE INDEX IF NOT EXISTS idx_food_items_name ON public.food_items(name);
CREATE INDEX IF NOT EXISTS idx_food_items_category ON public.food_items(category);
CREATE INDEX IF NOT EXISTS idx_food_items_expiration ON public.food_items(expiration_date);

-- Trigger para updated_at
CREATE TRIGGER update_food_items_updated_at
    BEFORE UPDATE ON public.food_items
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Habilitar RLS
ALTER TABLE public.food_items ENABLE ROW LEVEL SECURITY;

COMMENT ON TABLE public.food_items IS 'Alimentos disponibles de cada usuario';
COMMENT ON COLUMN public.food_items.source IS 'Origen del dato: manual, image, audio';
COMMENT ON COLUMN public.food_items.category IS 'Categoría: vegetales, frutas, proteinas, lacteos, granos, otros';

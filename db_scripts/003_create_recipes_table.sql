-- Tabla de recetas generadas
-- Almacena las recetas individuales creadas por los agentes de IA

CREATE TABLE IF NOT EXISTS public.recipes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    ingredients JSONB NOT NULL,
    instructions JSONB NOT NULL,
    prep_time INTEGER,
    cook_time INTEGER,
    servings INTEGER DEFAULT 1,
    difficulty TEXT DEFAULT 'medium',
    nutrition_info JSONB,
    image_url TEXT,
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_recipes_user_id ON public.recipes(user_id);
CREATE INDEX IF NOT EXISTS idx_recipes_name ON public.recipes(name);
CREATE INDEX IF NOT EXISTS idx_recipes_difficulty ON public.recipes(difficulty);
CREATE INDEX IF NOT EXISTS idx_recipes_tags ON public.recipes USING GIN(tags);

-- Trigger para updated_at
CREATE TRIGGER update_recipes_updated_at
    BEFORE UPDATE ON public.recipes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Habilitar RLS
ALTER TABLE public.recipes ENABLE ROW LEVEL SECURITY;

COMMENT ON TABLE public.recipes IS 'Recetas generadas por IA para los usuarios';
COMMENT ON COLUMN public.recipes.ingredients IS 'Array JSON de ingredientes con cantidades';
COMMENT ON COLUMN public.recipes.instructions IS 'Array JSON de pasos de preparación';
COMMENT ON COLUMN public.recipes.prep_time IS 'Tiempo de preparación en minutos';
COMMENT ON COLUMN public.recipes.cook_time IS 'Tiempo de cocción en minutos';
COMMENT ON COLUMN public.recipes.difficulty IS 'Dificultad: easy, medium, hard';
COMMENT ON COLUMN public.recipes.nutrition_info IS 'Información nutricional: calories, protein, carbs, fat';

-- Políticas de Row Level Security (RLS)
-- Aseguran que cada usuario solo pueda acceder a sus propios datos

-- Políticas para profiles
CREATE POLICY "Users can view own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
    ON public.profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

-- Políticas para food_items
CREATE POLICY "Users can view own food items"
    ON public.food_items FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own food items"
    ON public.food_items FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own food items"
    ON public.food_items FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own food items"
    ON public.food_items FOR DELETE
    USING (auth.uid() = user_id);

-- Políticas para recipes
CREATE POLICY "Users can view own recipes"
    ON public.recipes FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own recipes"
    ON public.recipes FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own recipes"
    ON public.recipes FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own recipes"
    ON public.recipes FOR DELETE
    USING (auth.uid() = user_id);

-- Políticas para menus
CREATE POLICY "Users can view own menus"
    ON public.menus FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own menus"
    ON public.menus FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own menus"
    ON public.menus FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own menus"
    ON public.menus FOR DELETE
    USING (auth.uid() = user_id);

-- Políticas para agent_logs
CREATE POLICY "Users can view own agent logs"
    ON public.agent_logs FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Service role can insert agent logs"
    ON public.agent_logs FOR INSERT
    WITH CHECK (true);

-- Función para crear perfil automáticamente al registrarse
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, username)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1))
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para crear perfil automáticamente
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

COMMENT ON POLICY "Users can view own profile" ON public.profiles IS 'Los usuarios solo pueden ver su propio perfil';
COMMENT ON FUNCTION public.handle_new_user() IS 'Crea automáticamente un perfil cuando se registra un nuevo usuario';

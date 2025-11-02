# Scripts de Base de Datos - Tu Nevera App

Scripts SQL para configurar la base de datos en Supabase.

## Orden de Ejecución

Ejecutar en el SQL Editor de Supabase en este orden:

1. `001_create_profiles_table.sql` - Tabla de perfiles de usuario
2. `002_create_food_items_table.sql` - Tabla de alimentos
3. `003_create_recipes_table.sql` - Tabla de recetas
4. `004_create_menus_table.sql` - Tabla de menús
5. `005_create_agent_logs_table.sql` - Logs de agentes
6. `006_setup_rls_policies.sql` - Políticas de seguridad RLS

## Instrucciones

1. Accede a tu proyecto de Supabase
2. Ve a SQL Editor
3. Crea una nueva query
4. Copia y pega cada script en orden
5. Ejecuta cada uno

## Notas

- Los scripts usan `IF NOT EXISTS` para evitar errores si ya existen
- Las políticas RLS protegen los datos por usuario
- Los triggers actualizan automáticamente `updated_at`

-- Tabla de logs de agentes
-- Registra todas las llamadas a los agentes de IA para análisis y debugging

CREATE TABLE IF NOT EXISTS public.agent_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    agent_name TEXT NOT NULL,
    input_data JSONB,
    output_data JSONB,
    tokens_used INTEGER,
    execution_time_ms INTEGER,
    status TEXT DEFAULT 'success',
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_agent_logs_user_id ON public.agent_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_agent_logs_agent_name ON public.agent_logs(agent_name);
CREATE INDEX IF NOT EXISTS idx_agent_logs_status ON public.agent_logs(status);
CREATE INDEX IF NOT EXISTS idx_agent_logs_created_at ON public.agent_logs(created_at DESC);

-- Habilitar RLS
ALTER TABLE public.agent_logs ENABLE ROW LEVEL SECURITY;

COMMENT ON TABLE public.agent_logs IS 'Logs de ejecución de agentes de IA';
COMMENT ON COLUMN public.agent_logs.agent_name IS 'Nombre del agente: recipe, vision, audio, image_gen, instructions, nutrition';
COMMENT ON COLUMN public.agent_logs.tokens_used IS 'Tokens de OpenAI consumidos en esta llamada';
COMMENT ON COLUMN public.agent_logs.execution_time_ms IS 'Tiempo de ejecución en milisegundos';
COMMENT ON COLUMN public.agent_logs.status IS 'Estado: success, error, timeout';

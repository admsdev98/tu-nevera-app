# Tu Nevera App - Backend

Backend API construido con FastAPI y sistema multi-agente para generación de menús con IA.

## Requisitos

- Python 3.11+
- Supabase account
- OpenAI API key

## Instalación

```bash
# Crear entorno virtual
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales
```

## Ejecutar

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

La API estará disponible en: http://localhost:8000

Documentación interactiva: http://localhost:8000/docs

## Estructura

```
app/
├── api/routes/      # Endpoints de la API
├── schemas/         # Schemas Pydantic
├── services/        # Servicios externos
├── orchestrator/    # Orquestador principal
├── agents/          # Agentes especializados de IA
└── utils/           # Utilidades y helpers
```

## Arquitectura Multi-Agente

El sistema utiliza un orquestador que coordina múltiples agentes especializados:

- Recipe Agent: Generación de recetas
- Vision Agent: Análisis de imágenes
- Audio Agent: Transcripción de audio
- Image Generator Agent: Generación de imágenes
- Instructions Agent: Instrucciones detalladas
- Nutrition Agent: Análisis nutricional

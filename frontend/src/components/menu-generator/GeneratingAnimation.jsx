import { Loader2, Sparkles } from 'lucide-react';

export const GeneratingAnimation = () => {
  const steps = [
    'Analizando ingredientes disponibles...',
    'Consultando recetas compatibles...',
    'Verificando restricciones dietéticas...',
    'Calculando información nutricional...',
    'Optimizando combinaciones...',
    'Generando tu menú personalizado...'
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="relative mb-8">
        {/* Círculo animado */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-400 to-secondary-400 animate-pulse opacity-20 blur-xl"></div>
        
        {/* Icono central */}
        <div className="relative bg-white rounded-full p-8 shadow-lg">
          <div className="relative">
            <Loader2 className="w-16 h-16 text-primary-600 animate-spin" />
            <Sparkles className="w-6 h-6 text-secondary-600 absolute -top-2 -right-2 animate-bounce" />
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
        Creando tu menú perfecto
      </h2>

      <div className="w-full max-w-md space-y-3">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex items-center gap-3 text-gray-600 animate-fade-in"
            style={{
              animationDelay: `${index * 0.5}s`,
              opacity: 0,
              animation: `fadeIn 0.5s ease-in ${index * 0.5}s forwards`
            }}
          >
            <div className="w-2 h-2 rounded-full bg-primary-600 animate-pulse"></div>
            <p className="text-sm">{step}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          Esto puede tardar unos segundos...
        </p>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

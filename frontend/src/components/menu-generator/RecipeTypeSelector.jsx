import { Zap, Calendar, Lock } from 'lucide-react';
import { Card } from '../shared/Card';

export const RecipeTypeSelector = ({ onSelect }) => {
  const options = [
    {
      id: 'quick-recipe',
      icon: Zap,
      title: 'Receta rápida',
      description: 'Crea una receta individual al instante',
      color: 'text-primary-600',
      bgColor: 'bg-primary-50',
      enabled: true
    },
    {
      id: 'weekly-menu',
      icon: Calendar,
      title: 'Menú semanal',
      description: 'Planifica toda tu semana de comidas',
      color: 'text-gray-400',
      bgColor: 'bg-gray-50',
      enabled: false,
      badge: 'Próximamente'
    }
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
          ¿Qué quieres crear?
        </h2>
        <p className="text-sm md:text-base text-gray-600">
          Elige el tipo de receta que necesitas
        </p>
      </div>

      <div className="space-y-3 md:space-y-4">
        {options.map((option) => {
          const Icon = option.icon;
          return (
            <Card
              key={option.id}
              className={`p-5 md:p-6 transition-all ${
                option.enabled
                  ? 'cursor-pointer hover:shadow-lg hover:-translate-y-1 active:scale-95'
                  : 'cursor-not-allowed opacity-75'
              }`}
              onClick={() => option.enabled && onSelect(option.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className={`${option.bgColor} p-3 rounded-xl flex-shrink-0 relative`}>
                    <Icon className={`w-6 h-6 md:w-7 md:h-7 ${option.color}`} />
                    {!option.enabled && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 rounded-xl">
                        <Lock className="w-4 h-4 text-gray-500" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 text-base md:text-lg">
                        {option.title}
                      </h3>
                      {option.badge && (
                        <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded flex-shrink-0">
                          {option.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs md:text-sm text-gray-500">
                      {option.description}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

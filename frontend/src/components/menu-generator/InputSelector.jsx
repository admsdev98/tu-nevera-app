import { Camera, Mic, FileText, ChevronRight } from 'lucide-react';
import { Card } from '../shared/Card';

export const InputSelector = ({ onSelect }) => {
  const options = [
    {
      id: 'text',
      icon: FileText,
      title: 'Texto',
      description: 'Escribe los ingredientes que tienes',
      color: 'text-primary-600'
    },
    {
      id: 'photo',
      icon: Camera,
      title: 'Foto',
      description: 'Saca una foto de tu nevera',
      color: 'text-secondary-600'
    },
    {
      id: 'audio',
      icon: Mic,
      title: 'Audio',
      description: 'Dicta tus ingredientes por voz',
      color: 'text-accent-600'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          ¿Cómo quieres ingresar tus ingredientes?
        </h2>
        <p className="text-gray-600">
          Elige la forma más cómoda para ti
        </p>
      </div>

      <div className="space-y-3">
        {options.map((option) => {
          const Icon = option.icon;
          return (
            <Card
              key={option.id}
              className="p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onSelect(option.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`${option.color} bg-gray-50 p-3 rounded-lg`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{option.title}</h3>
                    <p className="text-sm text-gray-500">{option.description}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

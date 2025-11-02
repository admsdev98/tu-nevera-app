import { useState } from 'react';
import { Coffee, Sun, Moon, UtensilsCrossed } from 'lucide-react';
import { Button } from '../shared/Button';
import { Card } from '../shared/Card';

export const MenuTypeSelector = ({ onNext, onBack }) => {
  const [selectedTypes, setSelectedTypes] = useState([]);

  const menuTypes = [
    {
      id: 'breakfast',
      icon: Coffee,
      title: 'Desayuno',
      description: 'Ideas para empezar el día',
      color: 'text-yellow-600 bg-yellow-50'
    },
    {
      id: 'lunch',
      icon: Sun,
      title: 'Comida',
      description: 'Platos principales',
      color: 'text-orange-600 bg-orange-50'
    },
    {
      id: 'dinner',
      icon: Moon,
      title: 'Cena',
      description: 'Para terminar el día',
      color: 'text-indigo-600 bg-indigo-50'
    },
    {
      id: 'snack',
      icon: UtensilsCrossed,
      title: 'Merienda/Snack',
      description: 'Algo entre horas',
      color: 'text-pink-600 bg-pink-50'
    }
  ];

  const toggleType = (typeId) => {
    if (selectedTypes.includes(typeId)) {
      setSelectedTypes(selectedTypes.filter(id => id !== typeId));
    } else {
      setSelectedTypes([...selectedTypes, typeId]);
    }
  };

  const handleNext = () => {
    if (selectedTypes.length === 0) {
      return;
    }
    onNext({ menuTypes: selectedTypes });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          ¿Qué tipo de menú quieres?
        </h2>
        <p className="text-gray-600">
          Puedes seleccionar uno o varios
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {menuTypes.map((type) => {
          const Icon = type.icon;
          const isSelected = selectedTypes.includes(type.id);
          
          return (
            <Card
              key={type.id}
              className={`p-4 cursor-pointer transition-all ${
                isSelected 
                  ? 'ring-2 ring-primary-600 shadow-md' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => toggleType(type.id)}
            >
              <div className="flex flex-col items-center text-center gap-3">
                <div className={`${type.color} p-4 rounded-full`}>
                  <Icon className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{type.title}</h3>
                  <p className="text-sm text-gray-500">{type.description}</p>
                </div>
                {isSelected && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      <div className="flex gap-3 pt-4">
        <Button onClick={onBack} variant="outline" fullWidth>
          Atrás
        </Button>
        <Button onClick={handleNext} fullWidth disabled={selectedTypes.length === 0}>
          Siguiente
        </Button>
      </div>
    </div>
  );
};

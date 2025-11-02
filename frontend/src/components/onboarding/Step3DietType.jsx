import { useState } from 'react';
import { Button } from '../shared/Button';
import { Card } from '../shared/Card';
import { Input } from '../shared/Input';

export const Step3DietType = ({ onNext, onBack, initialValue = 'standard' }) => {
  const [selected, setSelected] = useState(initialValue.startsWith('other:') ? 'other' : initialValue);
  const [otherValue, setOtherValue] = useState(initialValue.startsWith('other:') ? initialValue.replace('other:', '') : '');
  const [showOtherInput, setShowOtherInput] = useState(initialValue.startsWith('other:'));

  const diets = [
    { id: 'standard', label: 'Estándar', description: 'Sin restricciones' },
    { id: 'vegetarian', label: 'Vegetariana', description: 'Sin carne ni pescado' },
    { id: 'vegan', label: 'Vegana', description: 'Sin productos animales' },
    { id: 'keto', label: 'Keto', description: 'Baja en carbohidratos' },
    { id: 'high_protein', label: 'Alta en proteínas', description: 'Para deportistas' },
    { id: 'mediterranean', label: 'Mediterránea', description: 'Saludable y equilibrada' },
    { id: 'low_fat', label: 'Baja en grasas', description: 'Reducción de grasas' },
    { id: 'other', label: 'Otra', description: 'Especifica tu tipo de dieta' },
  ];

  const handleSelect = (id) => {
    setSelected(id);
    if (id === 'other') {
      setShowOtherInput(true);
    } else {
      setShowOtherInput(false);
      setOtherValue('');
    }
  };

  const handleNext = () => {
    let dietType = selected;
    if (selected === 'other' && otherValue.trim()) {
      dietType = `other:${otherValue.trim()}`;
    }
    onNext({ diet_type: dietType });
  };

  const handleSkip = () => {
    onNext({ diet_type: 'standard' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Paso 3: Tipo de dieta
        </h2>
        <p className="text-gray-600">
          Selecciona el tipo de dieta que sigues
        </p>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {diets.map((diet) => (
          <Card
            key={diet.id}
            padding={false}
            className={`
              cursor-pointer transition-all border-2
              ${selected === diet.id
                ? 'border-primary bg-primary-light'
                : 'border-gray-200 hover:border-gray-300'
              }
            `}
            onClick={() => handleSelect(diet.id)}
          >
            <div className="p-4 flex items-start gap-3">
              <div className={`
                w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5
                flex items-center justify-center
                ${selected === diet.id
                  ? 'border-primary bg-primary'
                  : 'border-gray-300'
                }
              `}>
                {selected === diet.id && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{diet.label}</h3>
                <p className="text-sm text-gray-600">{diet.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {showOtherInput && (
        <Input
          type="text"
          placeholder="Especifica tu tipo de dieta..."
          value={otherValue}
          onChange={(e) => setOtherValue(e.target.value)}
        />
      )}

      <div className="flex gap-3">
        <Button onClick={onBack} variant="secondary" fullWidth>
          Atrás
        </Button>
        <Button onClick={handleSkip} variant="outline" fullWidth>
          Omitir
        </Button>
        <Button onClick={handleNext} fullWidth disabled={selected === 'other' && !otherValue.trim()}>
          Siguiente
        </Button>
      </div>
    </div>
  );
};

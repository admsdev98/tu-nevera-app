import { useState } from 'react';
import { Button } from '../shared/Button';
import { Input } from '../shared/Input';

export const Step2Allergens = ({ onNext, onBack, initialValue = [] }) => {
  const [selected, setSelected] = useState(initialValue.filter(item => !item.startsWith('other:')));
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherValue, setOtherValue] = useState('');
  const [customAllergens, setCustomAllergens] = useState(
    initialValue.filter(item => item.startsWith('other:')).map(item => item.replace('other:', ''))
  );

  const allergens = [
    { id: 'gluten', label: 'Gluten' },
    { id: 'lacteos', label: 'Lácteos' },
    { id: 'huevo', label: 'Huevo' },
    { id: 'frutos_secos', label: 'Frutos secos' },
    { id: 'pescado', label: 'Pescado/Mariscos' },
    { id: 'soja', label: 'Soja' },
  ];

  const toggleAllergen = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const addCustomAllergen = () => {
    const value = otherValue.trim();
    if (value && !customAllergens.includes(value)) {
      setCustomAllergens([...customAllergens, value]);
      setOtherValue('');
      setShowOtherInput(false);
    }
  };

  const removeCustomAllergen = (allergen) => {
    setCustomAllergens(customAllergens.filter(item => item !== allergen));
  };

  const handleNext = () => {
    const allAllergens = [
      ...selected,
      ...customAllergens.map(item => `other:${item}`)
    ];
    onNext({ allergens: allAllergens });
  };

  const handleSkip = () => {
    onNext({ allergens: [] });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Paso 2: Alergenos
        </h2>
        <p className="text-gray-600">
          Selecciona los alimentos a los que eres alérgico (opcional)
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {allergens.map((allergen) => (
          <button
            key={allergen.id}
            onClick={() => toggleAllergen(allergen.id)}
            className={`
              p-4 rounded-lg border-2 transition-all font-medium
              ${selected.includes(allergen.id)
                ? 'border-primary bg-primary-light text-primary'
                : 'border-gray-200 hover:border-gray-300 text-gray-700'
              }
            `}
          >
            {allergen.label}
          </button>
        ))}
      </div>

      {customAllergens.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {customAllergens.map((allergen) => (
            <div
              key={allergen}
              className="flex items-center gap-2 bg-primary-light text-primary px-3 py-2 rounded-lg"
            >
              <span className="text-sm font-medium">{allergen}</span>
              <button
                onClick={() => removeCustomAllergen(allergen)}
                className="hover:text-primary-dark"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      {!showOtherInput ? (
        <Button 
          onClick={() => setShowOtherInput(true)} 
          variant="secondary" 
          fullWidth
        >
          Agregar otro alergeno
        </Button>
      ) : (
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Especifica el alergeno..."
            value={otherValue}
            onChange={(e) => setOtherValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomAllergen())}
          />
          <Button onClick={addCustomAllergen} variant="secondary">
            Añadir
          </Button>
        </div>
      )}

      <div className="flex gap-3">
        <Button onClick={onBack} variant="secondary" fullWidth>
          Atrás
        </Button>
        <Button onClick={handleSkip} variant="outline" fullWidth>
          Omitir
        </Button>
        <Button onClick={handleNext} fullWidth>
          Siguiente
        </Button>
      </div>
    </div>
  );
};

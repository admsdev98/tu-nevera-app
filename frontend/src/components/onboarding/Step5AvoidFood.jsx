import { useState } from 'react';
import { Input } from '../shared/Input';
import { Button } from '../shared/Button';

export const Step5AvoidFood = ({ onNext, onBack, initialValue = [] }) => {
  const [foods, setFoods] = useState(initialValue);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const addFood = () => {
    const food = inputValue.trim();
    if (!food) return;

    if (foods.includes(food.toLowerCase())) {
      setError('Este alimento ya está en la lista');
      return;
    }

    if (foods.length >= 10) {
      setError('Máximo 10 alimentos');
      return;
    }

    setFoods([...foods, food.toLowerCase()]);
    setInputValue('');
    setError('');
  };

  const removeFood = (food) => {
    setFoods(foods.filter((f) => f !== food));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addFood();
    }
  };

  const handleNext = () => {
    onNext({ avoid_foods: foods });
  };

  const handleSkip = () => {
    onNext({ avoid_foods: [] });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Paso 5: Alimentos a evitar
        </h2>
        <p className="text-gray-600">
          Opcional: Añade alimentos que no te gustan o prefieres no consumir
        </p>
      </div>

      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Ej: cebolla, cilantro, picante..."
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setError('');
          }}
          onKeyPress={handleKeyPress}
          error={error}
        />
        <Button onClick={addFood} variant="secondary">
          Añadir
        </Button>
      </div>

      {foods.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {foods.map((food) => (
            <div
              key={food}
              className="flex items-center gap-2 bg-red-50 text-red-600 px-3 py-2 rounded-lg"
            >
              <span className="text-sm font-medium">{food}</span>
              <button
                onClick={() => removeFood(food)}
                className="hover:text-red-700"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="text-sm text-gray-600">
        {foods.length}/10 alimentos añadidos
      </div>

      <div className="flex gap-3">
        <Button onClick={onBack} variant="secondary" fullWidth>
          Atrás
        </Button>
        {foods.length === 0 ? (
          <Button onClick={handleSkip} fullWidth>
            Omitir
          </Button>
        ) : (
          <Button onClick={handleNext} fullWidth>
            Finalizar
          </Button>
        )}
      </div>
    </div>
  );
};

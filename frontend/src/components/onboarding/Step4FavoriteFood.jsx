import { useState } from 'react';
import { Input } from '../shared/Input';
import { Button } from '../shared/Button';

export const Step4FavoriteFood = ({ onNext, onBack, initialValue = [] }) => {
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

    if (foods.length >= 15) {
      setError('Máximo 15 alimentos');
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
    if (foods.length < 3) {
      setError('Añade al menos 3 alimentos');
      return;
    }
    onNext({ favorite_foods: foods });
  };

  const handleSkip = () => {
    onNext({ favorite_foods: [] });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Paso 4: Alimentos preferidos
        </h2>
        <p className="text-gray-600">
          Añade al menos 3 alimentos que te gusten (opcional, mínimo 3, máximo 15)
        </p>
      </div>

      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Ej: pollo, arroz, brócoli..."
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
              className="flex items-center gap-2 bg-primary-light text-primary px-3 py-2 rounded-lg"
            >
              <span className="text-sm font-medium">{food}</span>
              <button
                onClick={() => removeFood(food)}
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

      <div className="text-sm text-gray-600">
        {foods.length}/15 alimentos añadidos
      </div>

      <div className="flex gap-3">
        <Button onClick={onBack} variant="secondary" fullWidth>
          Atrás
        </Button>
        <Button onClick={handleSkip} variant="outline" fullWidth>
          Omitir
        </Button>
        <Button onClick={handleNext} fullWidth disabled={foods.length > 0 && foods.length < 3}>
          Siguiente
        </Button>
      </div>
    </div>
  );
};

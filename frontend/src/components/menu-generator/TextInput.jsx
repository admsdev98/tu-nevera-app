import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Input } from '../shared/Input';
import { Button } from '../shared/Button';

export const TextInput = ({ onNext, onBack }) => {
  const [currentInput, setCurrentInput] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState('');

  const handleAddIngredient = () => {
    const trimmed = currentInput.trim();
    if (!trimmed) {
      setError('Escribe un ingrediente');
      return;
    }
    if (ingredients.includes(trimmed.toLowerCase())) {
      setError('Este ingrediente ya está en la lista');
      return;
    }
    setIngredients([...ingredients, trimmed]);
    setCurrentInput('');
    setError('');
  };

  const handleRemoveIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddIngredient();
    }
  };

  const handleNext = () => {
    if (ingredients.length === 0) {
      setError('Añade al menos un ingrediente');
      return;
    }
    onNext({ ingredients, inputType: 'text' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Escribe tus ingredientes
        </h2>
        <p className="text-gray-600">
          Añade los ingredientes que tienes disponibles
        </p>
      </div>

      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Ej: tomate, pasta, pollo..."
          value={currentInput}
          onChange={(e) => {
            setCurrentInput(e.target.value);
            setError('');
          }}
          onKeyPress={handleKeyPress}
          error={error}
        />
        <Button
          onClick={handleAddIngredient}
          variant="outline"
          className="flex-shrink-0"
        >
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      {ingredients.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm font-medium text-gray-700 mb-3">
            Ingredientes ({ingredients.length})
          </p>
          <div className="flex flex-wrap gap-2">
            {ingredients.map((ingredient, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 bg-white px-3 py-1.5 rounded-full text-sm border border-gray-200"
              >
                {ingredient}
                <button
                  onClick={() => handleRemoveIngredient(index)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-3 pt-4">
        <Button onClick={onBack} variant="outline" fullWidth>
          Atrás
        </Button>
        <Button onClick={handleNext} fullWidth disabled={ingredients.length === 0}>
          Siguiente
        </Button>
      </div>
    </div>
  );
};

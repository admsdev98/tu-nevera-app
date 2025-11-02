import { useState } from 'react';
import { Users, Clock, ChefHat, Sparkles } from 'lucide-react';
import { Input } from '../shared/Input';
import { Button } from '../shared/Button';
import { Card } from '../shared/Card';

export const MenuOptions = ({ onNext, onBack }) => {
  const [servings, setServings] = useState(2);
  const [cookingTime, setCookingTime] = useState('medium');
  const [difficulty, setDifficulty] = useState('medium');
  const [additionalNotes, setAdditionalNotes] = useState('');

  const timeOptions = [
    { id: 'quick', label: 'Rápido', value: '< 30 min' },
    { id: 'medium', label: 'Medio', value: '30-60 min' },
    { id: 'long', label: 'Elaborado', value: '> 60 min' }
  ];

  const difficultyOptions = [
    { id: 'easy', label: 'Fácil', icon: '👶' },
    { id: 'medium', label: 'Medio', icon: '👨‍🍳' },
    { id: 'hard', label: 'Difícil', icon: '⭐' }
  ];

  const handleNext = () => {
    onNext({
      servings: parseInt(servings),
      cookingTime,
      difficulty,
      additionalNotes: additionalNotes.trim()
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Opciones adicionales
        </h2>
        <p className="text-gray-600">
          Personaliza tu menú según tus necesidades
        </p>
      </div>

      {/* Número de comensales */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <Users className="w-4 h-4" />
          Número de comensales
        </label>
        <div className="flex items-center gap-4">
          <Button
            onClick={() => setServings(Math.max(1, servings - 1))}
            variant="outline"
            className="w-10 h-10"
          >
            -
          </Button>
          <Input
            type="number"
            min="1"
            max="20"
            value={servings}
            onChange={(e) => setServings(Math.max(1, parseInt(e.target.value) || 1))}
            className="text-center"
          />
          <Button
            onClick={() => setServings(Math.min(20, servings + 1))}
            variant="outline"
            className="w-10 h-10"
          >
            +
          </Button>
        </div>
      </div>

      {/* Tiempo de cocción */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
          <Clock className="w-4 h-4" />
          Tiempo disponible
        </label>
        <div className="grid grid-cols-3 gap-2">
          {timeOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setCookingTime(option.id)}
              className={`p-3 rounded-lg border-2 transition-all text-center ${
                cookingTime === option.id
                  ? 'border-primary-600 bg-primary-50 text-primary-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-medium text-sm">{option.label}</div>
              <div className="text-xs text-gray-500 mt-1">{option.value}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Dificultad */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
          <ChefHat className="w-4 h-4" />
          Nivel de dificultad
        </label>
        <div className="grid grid-cols-3 gap-2">
          {difficultyOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setDifficulty(option.id)}
              className={`p-3 rounded-lg border-2 transition-all ${
                difficulty === option.id
                  ? 'border-primary-600 bg-primary-50 text-primary-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-2xl mb-1">{option.icon}</div>
              <div className="font-medium text-sm">{option.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Notas adicionales */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <Sparkles className="w-4 h-4" />
          Notas adicionales (opcional)
        </label>
        <textarea
          value={additionalNotes}
          onChange={(e) => setAdditionalNotes(e.target.value)}
          placeholder="Ej: Quiero algo picante, sin lácteos, estilo mediterráneo..."
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
        />
      </div>

      <div className="flex gap-3 pt-4">
        <Button onClick={onBack} variant="outline" fullWidth>
          Atrás
        </Button>
        <Button onClick={handleNext} fullWidth>
          Generar Menú
        </Button>
      </div>
    </div>
  );
};

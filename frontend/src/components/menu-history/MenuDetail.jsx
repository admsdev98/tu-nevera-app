import { X, Clock, Users, ChefHat, Heart, Share2, Copy, Sparkles, Check } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../shared/Button';
import { Card } from '../shared/Card';
import { Modal } from '../shared/Modal';

export const MenuDetail = ({ menu, isOpen, onClose, onToggleFavorite, onRegenerate }) => {
  const [copied, setCopied] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      weekday: 'long',
      day: 'numeric', 
      month: 'long',
      year: 'numeric'
    });
  };

  const handleCopy = async () => {
    const text = formatMenuForCopy(menu);
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: menu.title,
        text: formatMenuForCopy(menu),
      });
    }
  };

  const formatMenuForCopy = (menu) => {
    let text = `${menu.title}\n`;
    text += `Generado el ${formatDate(menu.created_at)}\n\n`;
    menu.recipes?.forEach((recipe, index) => {
      text += `${index + 1}. ${recipe.name}\n`;
      text += `   Tiempo: ${recipe.cookingTime} min | Dificultad: ${recipe.difficulty}\n\n`;
    });
    return text;
  };

  if (!menu) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="large">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-2xl font-bold text-gray-900">
                {menu.title || 'Menú sin título'}
              </h2>
              <button
                onClick={() => onToggleFavorite(menu.id)}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Heart 
                  className={`w-6 h-6 ${
                    menu.is_favorite 
                      ? 'fill-red-500 text-red-500' 
                      : 'text-gray-400'
                  }`} 
                />
              </button>
            </div>
            <p className="text-gray-600">
              Creado el {formatDate(menu.created_at)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Botones de acción */}
        <div className="flex gap-2">
          <Button onClick={handleCopy} variant="outline" className="flex items-center gap-2">
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copiado' : 'Copiar'}
          </Button>
          <Button onClick={handleShare} variant="outline" className="flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            Compartir
          </Button>
          {onRegenerate && (
            <Button onClick={() => onRegenerate(menu)} className="flex items-center gap-2 ml-auto">
              <Sparkles className="w-4 h-4" />
              Regenerar similar
            </Button>
          )}
        </div>

        {/* Información general */}
        <Card className="p-4 bg-gradient-to-br from-primary-50 to-secondary-50">
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-gray-600" />
              <span className="font-medium">{menu.servings || 2} personas</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-gray-600" />
              <span className="font-medium">{menu.total_time || 45} min</span>
            </div>
            <div className="flex items-center gap-2">
              <ChefHat className="w-5 h-5 text-gray-600" />
              <span className="font-medium capitalize">{menu.difficulty || 'Medio'}</span>
            </div>
          </div>

          {menu.menu_types && menu.menu_types.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {menu.menu_types.map((type, index) => (
                <span
                  key={index}
                  className="text-xs bg-white text-gray-700 px-3 py-1 rounded-full"
                >
                  {type}
                </span>
              ))}
            </div>
          )}
        </Card>

        {/* Recetas */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg text-gray-900">
            Recetas ({menu.recipes?.length || 0})
          </h3>
          
          {menu.recipes?.map((recipe, index) => (
            <Card key={index} className="p-4">
              <div className="flex gap-4 mb-4">
                {recipe.image && (
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                )}
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">{recipe.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{recipe.description}</p>
                  <div className="flex gap-3 text-xs text-gray-500">
                    <span>⏱ {recipe.cookingTime} min</span>
                    <span>👨‍🍳 {recipe.difficulty}</span>
                    <span>🔥 {recipe.calories} kcal</span>
                  </div>
                </div>
              </div>

              {/* Ingredientes */}
              {recipe.ingredients && recipe.ingredients.length > 0 && (
                <div className="mb-4">
                  <p className="font-medium text-gray-900 mb-2">Ingredientes:</p>
                  <ul className="space-y-1">
                    {recipe.ingredients.map((ingredient, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-primary-600 mt-1">•</span>
                        <span>{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Pasos */}
              {recipe.steps && recipe.steps.length > 0 && (
                <div>
                  <p className="font-medium text-gray-900 mb-2">Preparación:</p>
                  <ol className="space-y-2">
                    {recipe.steps.map((step, i) => (
                      <li key={i} className="text-sm text-gray-600 flex gap-3">
                        <span className="font-semibold text-primary-600 flex-shrink-0">
                          {i + 1}.
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Información nutricional */}
        {menu.nutrition && (
          <Card className="p-4 bg-gradient-to-br from-green-50 to-blue-50">
            <h4 className="font-semibold text-gray-900 mb-3">
              Información Nutricional (por porción)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div className="bg-white rounded-lg p-3">
                <p className="text-gray-600 mb-1">Calorías</p>
                <p className="font-bold text-lg text-gray-900">{menu.nutrition.calories}</p>
                <p className="text-xs text-gray-500">kcal</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-gray-600 mb-1">Proteínas</p>
                <p className="font-bold text-lg text-gray-900">{menu.nutrition.protein}</p>
                <p className="text-xs text-gray-500">gramos</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-gray-600 mb-1">Carbohidratos</p>
                <p className="font-bold text-lg text-gray-900">{menu.nutrition.carbs}</p>
                <p className="text-xs text-gray-500">gramos</p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <p className="text-gray-600 mb-1">Grasas</p>
                <p className="font-bold text-lg text-gray-900">{menu.nutrition.fats}</p>
                <p className="text-xs text-gray-500">gramos</p>
              </div>
            </div>
          </Card>
        )}

        {/* Notas adicionales */}
        {menu.additional_notes && (
          <Card className="p-4 bg-blue-50">
            <p className="font-medium text-gray-900 mb-2">Notas adicionales:</p>
            <p className="text-sm text-gray-600">{menu.additional_notes}</p>
          </Card>
        )}
      </div>
    </Modal>
  );
};

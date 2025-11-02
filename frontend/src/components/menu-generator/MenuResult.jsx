import { useState } from 'react';
import { Check, Copy, Share2, Download, Heart, Clock, Users, ChefHat, Sparkles } from 'lucide-react';
import { Button } from '../shared/Button';
import { Card } from '../shared/Card';

export const MenuResult = ({ menu, onSave, onNewMenu }) => {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleCopy = async () => {
    const text = formatMenuForCopy(menu);
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = async () => {
    await onSave(menu);
    setSaved(true);
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
    let text = `${menu.title}\n\n`;
    menu.recipes.forEach((recipe, index) => {
      text += `${index + 1}. ${recipe.name}\n`;
      text += `   Tiempo: ${recipe.cookingTime} min | Dificultad: ${recipe.difficulty}\n\n`;
    });
    return text;
  };

  return (
    <div className="space-y-6">
      {/* Header con acciones */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full mb-4">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          ¡Tu menú está listo!
        </h2>
        <p className="text-gray-600">
          Hemos creado un menú personalizado con tus ingredientes
        </p>
      </div>

      {/* Botones de acción */}
      <div className="flex gap-2 justify-center">
        <Button
          onClick={handleSave}
          variant={saved ? "outline" : "primary"}
          className="flex items-center gap-2"
        >
          {saved ? (
            <>
              <Check className="w-4 h-4" />
              Guardado
            </>
          ) : (
            <>
              <Heart className="w-4 h-4" />
              Guardar
            </>
          )}
        </Button>
        <Button onClick={handleCopy} variant="outline" className="flex items-center gap-2">
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copiado' : 'Copiar'}
        </Button>
        <Button onClick={handleShare} variant="outline" className="flex items-center gap-2">
          <Share2 className="w-4 h-4" />
          Compartir
        </Button>
      </div>

      {/* Información del menú */}
      <Card className="p-4">
        <h3 className="font-bold text-lg text-gray-900 mb-3">
          {menu.title || 'Tu Menú Personalizado'}
        </h3>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {menu.servings || 2} personas
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {menu.totalTime || 45} min total
          </div>
          <div className="flex items-center gap-1">
            <ChefHat className="w-4 h-4" />
            {menu.difficulty || 'Medio'}
          </div>
        </div>
        {menu.description && (
          <p className="text-gray-600 text-sm">{menu.description}</p>
        )}
      </Card>

      {/* Lista de recetas */}
      <div className="space-y-3">
        <h4 className="font-semibold text-gray-900">Recetas incluidas:</h4>
        {menu.recipes?.map((recipe, index) => (
          <Card key={index} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex gap-4">
              {recipe.image && (
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
              )}
              <div className="flex-1">
                <h5 className="font-semibold text-gray-900 mb-1">{recipe.name}</h5>
                <p className="text-sm text-gray-600 mb-2">{recipe.description}</p>
                <div className="flex gap-3 text-xs text-gray-500">
                  <span>⏱ {recipe.cookingTime} min</span>
                  <span>👨‍🍳 {recipe.difficulty}</span>
                  <span>🔥 {recipe.calories} kcal</span>
                </div>
              </div>
            </div>

            {/* Ingredientes */}
            {recipe.ingredients && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-sm font-medium text-gray-700 mb-2">Ingredientes:</p>
                <div className="flex flex-wrap gap-1">
                  {recipe.ingredients.map((ingredient, i) => (
                    <span
                      key={i}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Pasos (ocultos por defecto, expandible) */}
            {recipe.steps && (
              <details className="mt-3 pt-3 border-t border-gray-100">
                <summary className="text-sm font-medium text-gray-700 cursor-pointer hover:text-primary-600">
                  Ver pasos de preparación
                </summary>
                <ol className="mt-2 space-y-2 text-sm text-gray-600 list-decimal list-inside">
                  {recipe.steps.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </details>
            )}
          </Card>
        ))}
      </div>

      {/* Información nutricional */}
      {menu.nutrition && (
        <Card className="p-4 bg-gradient-to-br from-green-50 to-blue-50">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary-600" />
            Información Nutricional (por porción)
          </h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Calorías</p>
              <p className="font-semibold text-gray-900">{menu.nutrition.calories} kcal</p>
            </div>
            <div>
              <p className="text-gray-600">Proteínas</p>
              <p className="font-semibold text-gray-900">{menu.nutrition.protein}g</p>
            </div>
            <div>
              <p className="text-gray-600">Carbohidratos</p>
              <p className="font-semibold text-gray-900">{menu.nutrition.carbs}g</p>
            </div>
            <div>
              <p className="text-gray-600">Grasas</p>
              <p className="font-semibold text-gray-900">{menu.nutrition.fats}g</p>
            </div>
          </div>
        </Card>
      )}

      {/* Botón para generar nuevo menú */}
      <Button onClick={onNewMenu} fullWidth variant="outline">
        Generar otro menú
      </Button>
    </div>
  );
};

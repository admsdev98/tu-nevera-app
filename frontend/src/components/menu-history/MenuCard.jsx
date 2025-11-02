import { Clock, Users, ChefHat, Heart, Trash2, MoreVertical } from 'lucide-react';
import { useState } from 'react';
import { Card } from '../shared/Card';

export const MenuCard = ({ menu, onClick, onDelete, onToggleFavorite }) => {
  const [showActions, setShowActions] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Hoy';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Ayer';
    } else {
      return date.toLocaleDateString('es-ES', { 
        day: 'numeric', 
        month: 'short',
        year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
      });
    }
  };

  const getMenuTypeLabel = (type) => {
    const labels = {
      breakfast: 'Desayuno',
      lunch: 'Comida',
      dinner: 'Cena',
      snack: 'Merienda'
    };
    return labels[type] || type;
  };

  return (
    <Card 
      className="p-4 cursor-pointer hover:shadow-md transition-shadow relative"
      onClick={onClick}
    >
      {/* Menú de acciones */}
      <div className="absolute top-2 right-2 z-10">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowActions(!showActions);
          }}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <MoreVertical className="w-5 h-5 text-gray-500" />
        </button>
        
        {showActions && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(menu.id);
                setShowActions(false);
              }}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
            >
              <Heart className={`w-4 h-4 ${menu.is_favorite ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} />
              {menu.is_favorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(menu.id);
                setShowActions(false);
              }}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-red-600"
            >
              <Trash2 className="w-4 h-4" />
              Eliminar
            </button>
          </div>
        )}
      </div>

      {/* Badge de favorito */}
      {menu.is_favorite && (
        <div className="absolute top-2 left-2">
          <Heart className="w-5 h-5 fill-red-500 text-red-500" />
        </div>
      )}

      {/* Contenido principal */}
      <div className={menu.is_favorite ? 'mt-6' : 'mt-0'}>
        <div className="mb-3">
          <h3 className="font-semibold text-gray-900 mb-1 pr-8">
            {menu.title || 'Menú sin título'}
          </h3>
          <p className="text-sm text-gray-500">
            {formatDate(menu.created_at)}
          </p>
        </div>

        {/* Tipos de menú */}
        {menu.menu_types && menu.menu_types.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {menu.menu_types.map((type, index) => (
              <span
                key={index}
                className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded"
              >
                {getMenuTypeLabel(type)}
              </span>
            ))}
          </div>
        )}

        {/* Información del menú */}
        <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {menu.servings || 2}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {menu.total_time || 45} min
          </div>
          <div className="flex items-center gap-1">
            <ChefHat className="w-4 h-4" />
            {menu.difficulty || 'Medio'}
          </div>
        </div>

        {/* Preview de recetas */}
        {menu.recipes && menu.recipes.length > 0 && (
          <div className="text-sm text-gray-600">
            <p className="font-medium mb-1">{menu.recipes.length} receta{menu.recipes.length !== 1 ? 's' : ''}:</p>
            <p className="line-clamp-2">
              {menu.recipes.map(r => r.name).join(', ')}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

import { AlertCircle, Pizza, Heart, Ban, Edit } from 'lucide-react';
import { Card } from '../shared/Card';
import { Button } from '../shared/Button';

export const PreferencesEdit = ({ profile, onEdit }) => {
  const getDietTypeLabel = (type) => {
    const labels = {
      'omnivore': 'Omnívoro',
      'vegetarian': 'Vegetariano',
      'vegan': 'Vegano',
      'pescetarian': 'Pescetariano',
      'keto': 'Keto',
      'paleo': 'Paleo'
    };
    return labels[type] || type;
  };

  const getAllergenLabel = (allergen) => {
    const labels = {
      'gluten': 'Gluten',
      'lactose': 'Lactosa',
      'nuts': 'Frutos secos',
      'shellfish': 'Mariscos',
      'eggs': 'Huevos',
      'soy': 'Soja',
      'fish': 'Pescado'
    };
    
    // Si empieza con "other:", extraer el valor personalizado
    if (allergen.startsWith('other:')) {
      return allergen.substring(6);
    }
    
    return labels[allergen] || allergen;
  };

  return (
    <div className="space-y-3 md:space-y-4">
      {/* Alergias e intolerancias */}
      <Card className="p-4 md:p-6">
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-red-600 flex-shrink-0" />
            <h3 className="font-semibold text-gray-900 text-sm md:text-base">Alergias e intolerancias</h3>
          </div>
          <Button onClick={() => onEdit('allergens')} variant="outline" size="small" className="flex-shrink-0">
            <Edit className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </Button>
        </div>
        {profile?.allergens && profile.allergens.length > 0 ? (
          <div className="flex flex-wrap gap-1.5 md:gap-2">
            {profile.allergens.map((allergen, index) => (
              <span
                key={index}
                className="bg-red-50 text-red-700 px-2.5 md:px-3 py-1 rounded-full text-xs md:text-sm"
              >
                {getAllergenLabel(allergen)}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-xs md:text-sm">No has registrado alergias</p>
        )}
      </Card>

      {/* Tipo de dieta */}
      <Card className="p-4 md:p-6">
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <div className="flex items-center gap-2">
            <Pizza className="w-4 h-4 md:w-5 md:h-5 text-primary-600 flex-shrink-0" />
            <h3 className="font-semibold text-gray-900 text-sm md:text-base">Tipo de dieta</h3>
          </div>
          <Button onClick={() => onEdit('diet')} variant="outline" size="small" className="flex-shrink-0">
            <Edit className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </Button>
        </div>
        {profile?.diet_type ? (
          <div className="inline-flex items-center bg-primary-50 text-primary-700 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm">
            {getDietTypeLabel(profile.diet_type)}
          </div>
        ) : (
          <p className="text-gray-500 text-xs md:text-sm">No has seleccionado un tipo de dieta</p>
        )}
      </Card>

      {/* Comidas favoritas */}
      <Card className="p-4 md:p-6">
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 md:w-5 md:h-5 text-pink-600 flex-shrink-0" />
            <h3 className="font-semibold text-gray-900 text-sm md:text-base">Comidas favoritas</h3>
          </div>
          <Button onClick={() => onEdit('favorites')} variant="outline" size="small" className="flex-shrink-0">
            <Edit className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </Button>
        </div>
        {profile?.favorite_foods && profile.favorite_foods.length > 0 ? (
          <div className="flex flex-wrap gap-1.5 md:gap-2">
            {profile.favorite_foods.map((food, index) => (
              <span
                key={index}
                className="bg-pink-50 text-pink-700 px-2.5 md:px-3 py-1 rounded-full text-xs md:text-sm"
              >
                {food}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-xs md:text-sm">No has registrado comidas favoritas</p>
        )}
      </Card>

      {/* Comidas a evitar */}
      <Card className="p-4 md:p-6">
        <div className="flex items-center justify-between mb-3 md:mb-4">
          <div className="flex items-center gap-2">
            <Ban className="w-4 h-4 md:w-5 md:h-5 text-orange-600 flex-shrink-0" />
            <h3 className="font-semibold text-gray-900 text-sm md:text-base">Comidas a evitar</h3>
          </div>
          <Button onClick={() => onEdit('avoid')} variant="outline" size="small" className="flex-shrink-0">
            <Edit className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </Button>
        </div>
        {profile?.avoid_foods && profile.avoid_foods.length > 0 ? (
          <div className="flex flex-wrap gap-1.5 md:gap-2">
            {profile.avoid_foods.map((food, index) => (
              <span
                key={index}
                className="bg-orange-50 text-orange-700 px-2.5 md:px-3 py-1 rounded-full text-xs md:text-sm"
              >
                {food}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-xs md:text-sm">No has registrado comidas a evitar</p>
        )}
      </Card>
    </div>
  );
};

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Input } from '../components/shared/Input';
import { Button } from '../components/shared/Button';
import { Card } from '../components/shared/Card';
import { User, AlertCircle, Pizza, Heart, Ban } from 'lucide-react';

export const OnboardingPage = () => {
  const { user, completeOnboarding } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    username: '',
    allergens: [],
    diet_type: '',
    favorite_foods: [],
    avoid_foods: []
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Opciones predefinidas
  const allergenOptions = ['Gluten', 'Lactosa', 'Frutos secos', 'Mariscos', 'Huevos', 'Soja', 'Pescado'];
  const dietOptions = ['Omnívoro', 'Vegetariano', 'Vegano', 'Pescetariano', 'Keto', 'Paleo'];

  const handleAllergenToggle = (allergen) => {
    const newAllergens = formData.allergens.includes(allergen)
      ? formData.allergens.filter(a => a !== allergen)
      : [...formData.allergens, allergen];
    setFormData({ ...formData, allergens: newAllergens });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar username (obligatorio)
    if (!formData.username || formData.username.length < 3) {
      setErrors({ username: 'El nombre de usuario debe tener al menos 3 caracteres' });
      return;
    }
    
    if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      setErrors({ username: 'Solo letras, números y guiones bajos' });
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      await completeOnboarding(formData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error completing onboarding:', error);
      setErrors({ general: 'Error al guardar la configuración' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Configura tu perfil
            </h1>
            <p className="text-gray-600">
              Solo necesitamos un nombre de usuario. El resto es opcional y puedes cambiarlo después.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username - OBLIGATORIO */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4" />
                Nombre de usuario <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                value={formData.username}
                onChange={(e) => {
                  setFormData({ ...formData, username: e.target.value });
                  setErrors({});
                }}
                placeholder="usuario123"
                error={errors.username}
                required
              />
            </div>

            {/* Alergias - OPCIONAL */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                <AlertCircle className="w-4 h-4" />
                Alergias e intolerancias (opcional)
              </label>
              <div className="flex flex-wrap gap-2">
                {allergenOptions.map((allergen) => (
                  <button
                    key={allergen}
                    type="button"
                    onClick={() => handleAllergenToggle(allergen)}
                    className={`px-3 py-2 rounded-lg text-sm transition-all ${
                      formData.allergens.includes(allergen)
                        ? 'bg-red-100 text-red-700 border-2 border-red-300'
                        : 'bg-gray-100 text-gray-700 border-2 border-transparent hover:border-gray-300'
                    }`}
                  >
                    {allergen}
                  </button>
                ))}
              </div>
            </div>

            {/* Tipo de dieta - OPCIONAL */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                <Pizza className="w-4 h-4" />
                Tipo de dieta (opcional)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {dietOptions.map((diet) => (
                  <button
                    key={diet}
                    type="button"
                    onClick={() => setFormData({ ...formData, diet_type: diet })}
                    className={`px-3 py-2 rounded-lg text-sm transition-all ${
                      formData.diet_type === diet
                        ? 'bg-primary-100 text-primary-700 border-2 border-primary-300'
                        : 'bg-gray-100 text-gray-700 border-2 border-transparent hover:border-gray-300'
                    }`}
                  >
                    {diet}
                  </button>
                ))}
              </div>
            </div>

            {/* Info adicional */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>💡 Consejo:</strong> Puedes configurar tus comidas favoritas y alimentos a evitar más tarde en Configuración.
              </p>
            </div>

            {/* Error general */}
            {errors.general && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-800">{errors.general}</p>
              </div>
            )}

            {/* Botón de envío */}
            <Button
              type="submit"
              size="large"
              fullWidth
              loading={loading}
              className="mt-6"
            >
              Empezar a cocinar
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { BottomNav } from '../components/layout/BottomNav';
import { RecipeTypeSelector } from '../components/menu-generator/RecipeTypeSelector';
import { QuickRecipeForm } from '../components/menu-generator/QuickRecipeForm';
import { GeneratingAnimation } from '../components/menu-generator/GeneratingAnimation';
import { MenuResult } from '../components/menu-generator/MenuResult';

export const GenerateMenuPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState('recipe-type');
  const [recipeData, setRecipeData] = useState({});

  const handleRecipeTypeSelect = (type) => {
    if (type === 'quick-recipe') {
      setCurrentStep('quick-recipe-form');
    } else {
      // Menú semanal está deshabilitado
      alert('Esta funcionalidad estará disponible próximamente');
    }
  };

  const handleQuickRecipeSubmit = async (data) => {
    setRecipeData({ ...recipeData, ...data });
    setCurrentStep('generating');

    // Simular generación (aquí iría la llamada al backend)
    setTimeout(() => {
      // Mock de resultado
      const mockRecipe = {
        title: getMealTypeTitle(data.mealType),
        mealType: data.mealType,
        servings: 2,
        total_time: 30,
        difficulty: 'Fácil',
        description: 'Una deliciosa receta creada con tus ingredientes',
        ingredients: data.ingredients.split(',').map(i => i.trim()),
        steps: [
          'Prepara todos los ingredientes',
          'Cocina siguiendo las indicaciones',
          'Sirve y disfruta'
        ],
        nutrition: {
          calories: 350,
          protein: 25,
          carbs: 40,
          fat: 12
        },
        recipes: [{
          name: mockRecipe.title,
          description: mockRecipe.description,
          cookingTime: mockRecipe.total_time,
          difficulty: mockRecipe.difficulty,
          calories: mockRecipe.nutrition.calories
        }]
      };

      setRecipeData({ ...recipeData, ...data, generatedMenu: mockRecipe });
      setCurrentStep('result');
    }, 3000);
  };

  const getMealTypeTitle = (mealType) => {
    const titles = {
      breakfast: 'Tu Desayuno Perfecto',
      lunch: 'Tu Comida del Día',
      snack: 'Tu Merienda Ideal',
      dinner: 'Tu Cena Especial'
    };
    return titles[mealType] || 'Tu Receta';
  };

  const handleSaveMenu = async () => {
    // Aquí se guardará en el backend
    alert('Receta guardada');
    navigate('/history');
  };

  const handleNewMenu = () => {
    setCurrentStep('recipe-type');
    setRecipeData({});
  };

  const handleBack = () => {
    setCurrentStep('recipe-type');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar solo en desktop */}
      <div className="hidden md:block">
        <Navbar />
      </div>
      
      {/* Header mobile - Simple */}
      <div className="md:hidden bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container-main py-4">
          <h1 className="text-xl font-bold text-gray-900">Crear receta</h1>
        </div>
      </div>

      <main className="container-main py-4 md:py-8 pb-24 md:pb-8">
        <div className="max-w-3xl mx-auto">
          {currentStep === 'recipe-type' && (
            <RecipeTypeSelector onSelect={handleRecipeTypeSelect} />
          )}

          {currentStep === 'quick-recipe-form' && (
            <QuickRecipeForm onNext={handleQuickRecipeSubmit} onBack={handleBack} />
          )}

          {currentStep === 'generating' && <GeneratingAnimation />}

          {currentStep === 'result' && (
            <MenuResult
              menu={recipeData.generatedMenu}
              onSave={handleSaveMenu}
              onNewMenu={handleNewMenu}
            />
          )}
        </div>
      </main>
      <BottomNav />
    </div>
  );
};


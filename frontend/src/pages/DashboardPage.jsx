import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Calendar, History, Lock, Sparkles, LogOut } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { BottomNav } from '../components/layout/BottomNav';
import { Card } from '../components/shared/Card';
import { QuickRecipeForm } from '../components/menu-generator/QuickRecipeForm';
import { GeneratingAnimation } from '../components/menu-generator/GeneratingAnimation';
import { MenuResult } from '../components/menu-generator/MenuResult';
import { useAuth } from '../hooks/useAuth';
import logo from '../assets/main_logo_without_background.png';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const { profile, signOut } = useAuth();
  const [currentView, setCurrentView] = useState('home');
  const [recipeData, setRecipeData] = useState({});

  const handleQuickRecipeClick = () => {
    setCurrentView('quick-recipe-form');
  };

  const handleQuickRecipeSubmit = async (data) => {
    setRecipeData({ ...recipeData, ...data });
    setCurrentView('generating');

    // Simular generación (aquí iría la llamada al backend)
    setTimeout(() => {
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
          name: getMealTypeTitle(data.mealType),
          description: 'Una deliciosa receta creada con tus ingredientes',
          cookingTime: 30,
          difficulty: 'Fácil',
          calories: 350
        }]
      };

      setRecipeData({ ...recipeData, ...data, generatedMenu: mockRecipe });
      setCurrentView('result');
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
    alert('Receta guardada');
    navigate('/history');
  };

  const handleNewMenu = () => {
    setCurrentView('home');
    setRecipeData({});
  };

  const handleBack = () => {
    setCurrentView('home');
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navbar solo en desktop */}
      <div className="hidden md:block">
        <Navbar />
      </div>
      
      <main className="container-main py-6 md:py-12 pb-24 md:pb-8">
        {currentView === 'home' && (
          <>
            {/* Header con logo y botón cerrar sesión */}
            <div className="flex justify-between items-start mb-8 md:mb-10 px-4">
              <div className="flex-1 flex justify-start md:justify-center">
                <img 
                  src={logo} 
                  alt="Tu Nevera" 
                  className="h-16 md:h-20 w-auto"
                />
              </div>
              {/* Botón cerrar sesión solo en mobile */}
              <button
                onClick={handleSignOut}
                className="md:hidden flex items-center gap-1.5 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Salir</span>
              </button>
            </div>

            {/* Saludo personalizado */}
            <div className="max-w-2xl mx-auto mb-8 md:mb-10 px-4">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-3">
                ¡Hola{profile?.username ? `, ${profile.username}` : ''}!
              </h1>
              <p className="text-lg md:text-xl text-gray-600 text-center">
                Descubre tu próxima receta favorita
              </p>
            </div>

            {/* Call to Action principal */}
            <div className="max-w-2xl mx-auto mb-10 md:mb-12">
              <Card className="p-8 md:p-10 bg-gradient-to-br from-primary-50 via-white to-secondary-50 border-primary-100 shadow-xl">
                <div className="text-center space-y-6">
                  <div className="space-y-3">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                      ¿Poco tiempo para cocinar?
                    </h2>
                    <p className="text-sm md:text-base text-gray-600 max-w-lg mx-auto leading-relaxed">
                      Crea tu receta perfecta en segundos. Solo dime qué tienes con una foto, escríbelo o graba un audio
                    </p>
                  </div>
                  
                  <button
                    onClick={handleQuickRecipeClick}
                    className="btn-primary w-full md:w-auto px-10 py-4 text-base md:text-lg font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 inline-flex items-center justify-center gap-2"
                  >
                    <Zap className="w-5 h-5" />
                    Crear receta rápida
                  </button>
                </div>
              </Card>
            </div>

            {/* Otras opciones */}
            <div className="max-w-2xl mx-auto space-y-3 md:space-y-4">
              {/* Menú Semanal - Bloqueado */}
              <Card className="p-5 md:p-6 cursor-not-allowed opacity-75">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md relative">
                    <Calendar className="w-6 h-6 md:w-7 md:h-7 text-gray-400" />
                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 rounded-xl">
                      <Lock className="w-5 h-5 text-gray-500" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-lg md:text-xl text-gray-900">
                        Crear menú semanal
                      </h3>
                      <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded flex-shrink-0">
                        Próximamente
                      </span>
                    </div>
                    <p className="text-sm md:text-base text-gray-600">
                      Planifica toda tu semana de comidas
                    </p>
                  </div>
                </div>
              </Card>

              {/* Mis Comidas */}
              <Card
                className="p-5 md:p-6 cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:scale-95"
                onClick={() => navigate('/history')}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <History className="w-6 h-6 md:w-7 md:h-7 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg md:text-xl text-gray-900 mb-1">
                      Ver mis comidas
                    </h3>
                    <p className="text-sm md:text-base text-gray-600">
                      Todas tus recetas y menús guardados
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </>
        )}

        {currentView === 'quick-recipe-form' && (
          <div className="max-w-3xl mx-auto">
            <QuickRecipeForm onNext={handleQuickRecipeSubmit} onBack={handleBack} />
          </div>
        )}

        {currentView === 'generating' && (
          <div className="max-w-3xl mx-auto">
            <GeneratingAnimation />
          </div>
        )}

        {currentView === 'result' && (
          <div className="max-w-3xl mx-auto">
            <MenuResult
              menu={recipeData.generatedMenu}
              onSave={handleSaveMenu}
              onNewMenu={handleNewMenu}
            />
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  );
};

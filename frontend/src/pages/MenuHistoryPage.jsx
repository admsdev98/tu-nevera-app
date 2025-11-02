import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { BottomNav } from '../components/layout/BottomNav';
import { MenuList } from '../components/menu-history/MenuList';
import { MenuDetail } from '../components/menu-history/MenuDetail';

export const MenuHistoryPage = () => {
  const navigate = useNavigate();
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  useEffect(() => {
    loadMenus();
  }, []);

  const loadMenus = async () => {
    setLoading(true);
    // Aquí se cargarán los menús desde el backend
    // Por ahora usamos un mock
    setTimeout(() => {
      setMenus([]);
      setLoading(false);
    }, 500);
  };

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
    setIsDetailOpen(true);
  };

  const handleDeleteMenu = async (menuId) => {
    // Confirmar eliminación
    if (!confirm('¿Estás seguro de que quieres eliminar este menú?')) {
      return;
    }

    // Aquí se eliminará del backend
    setMenus(menus.filter(m => m.id !== menuId));
  };

  const handleToggleFavorite = async (menuId) => {
    // Aquí se actualizará en el backend
    setMenus(menus.map(m => 
      m.id === menuId ? { ...m, is_favorite: !m.is_favorite } : m
    ));
    
    if (selectedMenu?.id === menuId) {
      setSelectedMenu({ ...selectedMenu, is_favorite: !selectedMenu.is_favorite });
    }
  };

  const handleRegenerate = (menu) => {
    // Navegar al generador con los datos del menú
    navigate('/generate', { state: { regenerateFrom: menu } });
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
          <h1 className="text-xl font-bold text-gray-900">Mis comidas</h1>
        </div>
      </div>

      <main className="container-main py-4 md:py-8 pb-24 md:pb-8">
        {/* Header - Solo desktop */}
        <div className="mb-6 md:mb-8 hidden md:block">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mis comidas</h1>
          <p className="text-gray-600">
            Todas tus recetas y menús guardados
          </p>
        </div>

        <MenuList
          menus={menus}
          loading={loading}
          onMenuClick={handleMenuClick}
          onDeleteMenu={handleDeleteMenu}
          onToggleFavorite={handleToggleFavorite}
        />

        <MenuDetail
          menu={selectedMenu}
          isOpen={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          onToggleFavorite={handleToggleFavorite}
          onRegenerate={handleRegenerate}
        />
      </main>
      <BottomNav />
    </div>
  );
};

import { useState } from 'react';
import { MenuCard } from './MenuCard';
import { FilterBar } from './FilterBar';
import { Spinner } from '../shared/Spinner';
import { ChefHat } from 'lucide-react';

export const MenuList = ({ 
  menus, 
  loading, 
  onMenuClick, 
  onDeleteMenu, 
  onToggleFavorite 
}) => {
  const [filteredMenus, setFilteredMenus] = useState(menus);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
    filterMenus(term, null);
  };

  const handleFilterChange = (filters) => {
    filterMenus(searchTerm, filters);
  };

  const filterMenus = (search, filters) => {
    let result = [...menus];

    // Filtro de búsqueda
    if (search) {
      result = result.filter(menu => 
        menu.title?.toLowerCase().includes(search.toLowerCase()) ||
        menu.recipes?.some(r => r.name.toLowerCase().includes(search.toLowerCase()))
      );
    }

    // Filtros adicionales
    if (filters) {
      // Filtro por fecha
      if (filters.dateRange !== 'all') {
        const now = new Date();
        result = result.filter(menu => {
          const menuDate = new Date(menu.created_at);
          switch (filters.dateRange) {
            case 'today':
              return menuDate.toDateString() === now.toDateString();
            case 'week':
              const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
              return menuDate >= weekAgo;
            case 'month':
              return menuDate.getMonth() === now.getMonth() && 
                     menuDate.getFullYear() === now.getFullYear();
            case 'year':
              return menuDate.getFullYear() === now.getFullYear();
            default:
              return true;
          }
        });
      }

      // Filtro por tipo de menú
      if (filters.menuType !== 'all') {
        result = result.filter(menu => 
          menu.menu_types?.includes(filters.menuType)
        );
      }

      // Filtro por dificultad
      if (filters.difficulty !== 'all') {
        result = result.filter(menu => 
          menu.difficulty === filters.difficulty
        );
      }
    }

    setFilteredMenus(result);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Spinner size="large" />
      </div>
    );
  }

  if (!menus || menus.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
          <ChefHat className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No hay menús guardados
        </h3>
        <p className="text-gray-600 mb-6">
          Empieza generando tu primer menú personalizado
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <FilterBar 
        onFilterChange={handleFilterChange}
        onSearch={handleSearch}
      />

      {filteredMenus.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">
            No se encontraron menús con los filtros aplicados
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMenus.map((menu) => (
            <MenuCard
              key={menu.id}
              menu={menu}
              onClick={() => onMenuClick(menu)}
              onDelete={onDeleteMenu}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      )}

      {/* Contador de resultados */}
      {searchTerm || filteredMenus.length !== menus.length ? (
        <p className="text-sm text-gray-500 text-center">
          Mostrando {filteredMenus.length} de {menus.length} menú{menus.length !== 1 ? 's' : ''}
        </p>
      ) : null}
    </div>
  );
};

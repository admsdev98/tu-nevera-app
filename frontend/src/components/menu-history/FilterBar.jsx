import { Search, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';
import { Input } from '../shared/Input';
import { Button } from '../shared/Button';

export const FilterBar = ({ onFilterChange, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    dateRange: 'all',
    menuType: 'all',
    difficulty: 'all'
  });

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="space-y-4">
      {/* Barra de búsqueda */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar en mis menús..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-10"
          />
        </div>
        <Button
          onClick={() => setShowFilters(!showFilters)}
          variant="outline"
          className="flex items-center gap-2"
        >
          <SlidersHorizontal className="w-5 h-5" />
          <span className="hidden sm:inline">Filtros</span>
        </Button>
      </div>

      {/* Panel de filtros */}
      {showFilters && (
        <div className="bg-gray-50 rounded-lg p-4 space-y-4 animate-fade-in">
          {/* Rango de fechas */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha
            </label>
            <select
              value={filters.dateRange}
              onChange={(e) => handleFilterChange('dateRange', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">Todas</option>
              <option value="today">Hoy</option>
              <option value="week">Esta semana</option>
              <option value="month">Este mes</option>
              <option value="year">Este año</option>
            </select>
          </div>

          {/* Tipo de menú */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de menú
            </label>
            <select
              value={filters.menuType}
              onChange={(e) => handleFilterChange('menuType', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">Todos</option>
              <option value="breakfast">Desayuno</option>
              <option value="lunch">Comida</option>
              <option value="dinner">Cena</option>
              <option value="snack">Merienda/Snack</option>
            </select>
          </div>

          {/* Dificultad */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dificultad
            </label>
            <select
              value={filters.difficulty}
              onChange={(e) => handleFilterChange('difficulty', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">Todas</option>
              <option value="easy">Fácil</option>
              <option value="medium">Medio</option>
              <option value="hard">Difícil</option>
            </select>
          </div>

          {/* Botones de acción */}
          <div className="flex gap-2 pt-2">
            <Button
              onClick={() => {
                setFilters({
                  dateRange: 'all',
                  menuType: 'all',
                  difficulty: 'all'
                });
                onFilterChange({
                  dateRange: 'all',
                  menuType: 'all',
                  difficulty: 'all'
                });
              }}
              variant="outline"
              fullWidth
            >
              Limpiar
            </Button>
            <Button onClick={() => setShowFilters(false)} fullWidth>
              Aplicar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

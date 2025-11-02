import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { menuAPI } from '../../services/api';
import { Card } from '../shared/Card';
import { Spinner } from '../shared/Spinner';

export const RecentMenus = () => {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecentMenus();
  }, []);

  const loadRecentMenus = async () => {
    try {
      const data = await menuAPI.getHistory();
      setMenus(data.slice(0, 3));
    } catch (error) {
      console.error('Error loading menus:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (menus.length === 0) {
    return (
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Menús recientes</h2>
        <Card className="text-center py-8 text-gray-500">
          Aún no has generado ningún menú
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Menús recientes</h2>
        <Link to="/history" className="text-primary hover:text-primary-dark text-sm font-medium">
          Ver todos
        </Link>
      </div>
      <div className="space-y-3">
        {menus.map((menu) => (
          <Link key={menu.id} to={`/history/${menu.id}`}>
            <Card hover className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">{menu.name}</h3>
                <p className="text-sm text-gray-600">{menu.type}</p>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

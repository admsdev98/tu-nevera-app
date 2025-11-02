import { Link } from 'react-router-dom';
import { Card } from '../shared/Card';

export const QuickActions = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Acciones rápidas</h2>
      <Link to="/generate">
        <Card hover className="text-center py-8">
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Generar nuevo menú</h3>
              <p className="text-sm text-gray-600">Crea un menú personalizado ahora</p>
            </div>
          </div>
        </Card>
      </Link>
    </div>
  );
};

import { LogOut, Key, Shield } from 'lucide-react';
import { Card } from '../shared/Card';
import { Button } from '../shared/Button';

export const AccountActions = ({ onLogout, onChangePassword }) => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Acciones de cuenta</h2>
      
      <div className="space-y-3">
        {/* Cambiar contraseña */}
        <button
          onClick={onChangePassword}
          className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 p-2 rounded-lg">
              <Key className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-900">Cambiar contraseña</p>
              <p className="text-sm text-gray-500">Actualiza tu contraseña de acceso</p>
            </div>
          </div>
        </button>

        {/* Privacidad */}
        <button
          className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          disabled
        >
          <div className="flex items-center gap-3">
            <div className="bg-purple-50 p-2 rounded-lg">
              <Shield className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-900">Privacidad y datos</p>
              <p className="text-sm text-gray-500">Gestiona tu información personal</p>
            </div>
          </div>
          <span className="text-xs text-gray-400">Próximamente</span>
        </button>

        {/* Cerrar sesión */}
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-between p-4 border-2 border-red-200 rounded-lg hover:bg-red-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="bg-red-50 p-2 rounded-lg">
              <LogOut className="w-5 h-5 text-red-600" />
            </div>
            <div className="text-left">
              <p className="font-medium text-red-900">Cerrar sesión</p>
              <p className="text-sm text-red-600">Salir de tu cuenta</p>
            </div>
          </div>
        </button>
      </div>
    </Card>
  );
};

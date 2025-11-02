import { Key, Shield, Smartphone, Lock } from 'lucide-react';
import { Card } from '../shared/Card';
import { Button } from '../shared/Button';

export const SecuritySection = ({ onChangePassword, onLogout }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Seguridad y privacidad</h2>
        <p className="text-gray-600">
          Gestiona la seguridad de tu cuenta
        </p>
      </div>

      {/* Cambiar contraseña */}
      <Card className="p-6">
        <div className="flex items-start gap-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <Key className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-2">Contraseña</h3>
            <p className="text-sm text-gray-600 mb-4">
              Actualiza tu contraseña regularmente para mantener tu cuenta segura
            </p>
            <Button onClick={onChangePassword} variant="outline">
              Cambiar contraseña
            </Button>
          </div>
        </div>
      </Card>

      {/* Autenticación de dos factores */}
      <Card className="p-6">
        <div className="flex items-start gap-4">
          <div className="bg-green-50 p-3 rounded-lg">
            <Smartphone className="w-6 h-6 text-green-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-2">
              Autenticación de dos factores
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Añade una capa extra de seguridad a tu cuenta
            </p>
            <Button variant="outline" disabled>
              Configurar 2FA
            </Button>
            <p className="text-xs text-gray-500 mt-2">Disponible próximamente</p>
          </div>
        </div>
      </Card>

      {/* Privacidad de datos */}
      <Card className="p-6">
        <div className="flex items-start gap-4">
          <div className="bg-purple-50 p-3 rounded-lg">
            <Shield className="w-6 h-6 text-purple-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-2">Privacidad de datos</h3>
            <p className="text-sm text-gray-600 mb-4">
              Gestiona cómo usamos y almacenamos tu información
            </p>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" className="rounded" defaultChecked />
                Permitir análisis anónimos para mejorar la app
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" className="rounded" defaultChecked />
                Compartir preferencias para recomendaciones personalizadas
              </label>
            </div>
          </div>
        </div>
      </Card>

      {/* Sesiones activas */}
      <Card className="p-6">
        <div className="flex items-start gap-4">
          <div className="bg-orange-50 p-3 rounded-lg">
            <Lock className="w-6 h-6 text-orange-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-2">Sesiones activas</h3>
            <p className="text-sm text-gray-600 mb-4">
              Administra los dispositivos donde has iniciado sesión
            </p>
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Este dispositivo</p>
                  <p className="text-xs text-gray-500">Última actividad: Ahora</p>
                </div>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                  Activo
                </span>
              </div>
            </div>
            <Button onClick={onLogout} variant="outline" className="text-red-600 hover:bg-red-50">
              Cerrar todas las sesiones
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

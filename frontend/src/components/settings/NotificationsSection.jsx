import { Bell, Volume2, Mail, MessageSquare } from 'lucide-react';
import { Card } from '../shared/Card';

export const NotificationsSection = () => {
  const notificationSettings = [
    {
      id: 'email_recipes',
      icon: Mail,
      title: 'Nuevas recetas',
      description: 'Recibe sugerencias semanales de recetas',
      enabled: true
    },
    {
      id: 'push_reminders',
      icon: Bell,
      title: 'Recordatorios',
      description: 'Alertas para cocinar y comprar ingredientes',
      enabled: false
    },
    {
      id: 'sound',
      icon: Volume2,
      title: 'Sonidos',
      description: 'Efectos de sonido en la aplicación',
      enabled: true
    },
    {
      id: 'community',
      icon: MessageSquare,
      title: 'Comunidad',
      description: 'Actualizaciones sobre nuevas funciones',
      enabled: false
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Notificaciones</h2>
        <p className="text-gray-600">
          Gestiona cómo y cuándo quieres recibir notificaciones
        </p>
      </div>

      <Card className="divide-y divide-gray-200">
        {notificationSettings.map((setting) => {
          const Icon = setting.icon;
          return (
            <div key={setting.id} className="p-4 flex items-center justify-between">
              <div className="flex items-start gap-3">
                <div className="bg-gray-100 p-2 rounded-lg">
                  <Icon className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{setting.title}</p>
                  <p className="text-sm text-gray-500">{setting.description}</p>
                </div>
              </div>
              <button
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  setting.enabled ? 'bg-primary-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    setting.enabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          );
        })}
      </Card>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Nota:</strong> Las funcionalidades de notificaciones estarán disponibles en futuras actualizaciones.
        </p>
      </div>
    </div>
  );
};

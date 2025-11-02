import { User, Mail, Key, Trash2, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { Card } from '../shared/Card';
import { Input } from '../shared/Input';
import { Button } from '../shared/Button';
import { Modal } from '../shared/Modal';

export const ProfileSection = ({ profile, onUpdate, onChangePassword, onDeleteAccount }) => {
  const [editing, setEditing] = useState(false);
  const [username, setUsername] = useState(profile?.username || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const [deletingAccount, setDeletingAccount] = useState(false);

  const handleSave = async () => {
    if (username.length < 3) {
      setError('El nombre de usuario debe tener al menos 3 caracteres');
      return;
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setError('Solo letras, números y guiones bajos');
      return;
    }

    setLoading(true);
    setError('');
    
    const success = await onUpdate({ username });
    
    setLoading(false);
    if (success) {
      setEditing(false);
    }
  };

  const handleCancel = () => {
    setUsername(profile?.username || '');
    setError('');
    setEditing(false);
  };

  const handleDeleteConfirm = async () => {
    if (confirmText !== 'ELIMINAR') {
      return;
    }

    setDeletingAccount(true);
    await onDeleteAccount();
    setDeletingAccount(false);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1 md:mb-2">Mi cuenta</h2>
        <p className="text-sm md:text-base text-gray-600">
          Gestiona tu información personal
        </p>
      </div>

      {/* Información del perfil */}
      <Card className="p-4 md:p-6">
        <div className="space-y-4">
          {/* Username */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4" />
              Nombre de usuario
            </label>
            {editing ? (
              <Input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError('');
                }}
                error={error}
                placeholder="usuario123"
              />
            ) : (
              <div className="flex items-center justify-between gap-3">
                <p className="text-gray-900 font-medium truncate">{profile?.username || 'Sin nombre'}</p>
                <Button onClick={() => setEditing(true)} variant="outline" size="small" className="flex-shrink-0">
                  Editar
                </Button>
              </div>
            )}
          </div>

          {/* Botones de acción (solo en modo edición) */}
          {editing && (
            <div className="flex gap-3 pt-2">
              <Button onClick={handleCancel} variant="outline" fullWidth>
                Cancelar
              </Button>
              <Button onClick={handleSave} fullWidth loading={loading}>
                Guardar
              </Button>
            </div>
          )}

          {/* Email (no editable) */}
          <div className="pt-4 border-t border-gray-200">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Mail className="w-4 h-4" />
              Correo electrónico
            </label>
            <p className="text-gray-900 text-sm md:text-base truncate">{profile?.email || 'No disponible'}</p>
            <p className="text-xs text-gray-500 mt-1">
              El email no se puede cambiar
            </p>
          </div>
        </div>
      </Card>

      {/* Cambiar contraseña */}
      <Card className="p-4 md:p-6">
        <div className="flex items-start gap-3 md:gap-4">
          <div className="bg-blue-50 p-2 md:p-3 rounded-lg flex-shrink-0">
            <Key className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 mb-1 md:mb-2">Contraseña</h3>
            <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4">
              Actualiza tu contraseña para mantener tu cuenta segura
            </p>
            <Button onClick={onChangePassword} variant="outline" size="small" className="w-full md:w-auto">
              Cambiar contraseña
            </Button>
          </div>
        </div>
      </Card>

      {/* Eliminar cuenta */}
      <Card className="p-4 md:p-6 border-2 border-red-200 bg-red-50">
        <div className="flex items-start gap-3 md:gap-4">
          <div className="bg-red-100 p-2 md:p-3 rounded-lg flex-shrink-0">
            <Trash2 className="w-5 h-5 md:w-6 md:h-6 text-red-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-red-900 mb-1 md:mb-2">Eliminar cuenta</h3>
            <p className="text-xs md:text-sm text-red-700 mb-3 md:mb-4">
              Esta acción es permanente y eliminará todos tus datos
            </p>
            <Button
              onClick={() => setShowDeleteModal(true)}
              className="bg-red-600 hover:bg-red-700 w-full md:w-auto"
              size="small"
            >
              Eliminar mi cuenta
            </Button>
          </div>
        </div>
      </Card>

      {/* Modal de confirmación de eliminación */}
      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <div className="space-y-4 md:space-y-6 p-2">
          <div className="flex items-center gap-3">
            <div className="bg-red-100 p-2 md:p-3 rounded-full flex-shrink-0">
              <AlertTriangle className="w-6 h-6 md:w-8 md:h-8 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900">¿Eliminar cuenta?</h3>
              <p className="text-sm md:text-base text-gray-600">Esta acción no se puede deshacer</p>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-3 md:p-4">
            <p className="text-xs md:text-sm text-red-800 mb-2 md:mb-3 font-medium">
              Al eliminar tu cuenta:
            </p>
            <ul className="text-xs md:text-sm text-red-700 space-y-1 list-disc list-inside">
              <li>Perderás acceso permanentemente</li>
              <li>Todos tus menús serán eliminados</li>
              <li>Tu perfil y preferencias se borrarán</li>
              <li>No podrás recuperar ninguna información</li>
            </ul>
          </div>

          <div>
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
              Para confirmar, escribe <span className="font-bold text-red-600">ELIMINAR</span>
            </label>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="Escribe ELIMINAR"
              className="w-full px-3 py-2.5 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="flex gap-3">
            <Button
              onClick={() => {
                setShowDeleteModal(false);
                setConfirmText('');
              }}
              variant="outline"
              fullWidth
              size="small"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
              fullWidth
              size="small"
              disabled={confirmText !== 'ELIMINAR'}
              loading={deletingAccount}
            >
              Eliminar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

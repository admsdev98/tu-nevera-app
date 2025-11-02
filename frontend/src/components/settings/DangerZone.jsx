import { Trash2, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { Card } from '../shared/Card';
import { Button } from '../shared/Button';
import { Modal } from '../shared/Modal';

export const DangerZone = ({ onDeleteAccount }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (confirmText !== 'ELIMINAR') {
      return;
    }

    setLoading(true);
    await onDeleteAccount();
    setLoading(false);
  };

  return (
    <>
      <Card className="p-6 border-2 border-red-200 bg-red-50">
        <div className="flex items-start gap-3 mb-4">
          <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-xl font-bold text-red-900 mb-2">Zona de peligro</h2>
            <p className="text-sm text-red-700 mb-4">
              Las siguientes acciones son permanentes y no se pueden deshacer.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {/* Eliminar todos los menús */}
          <button
            className="w-full flex items-center justify-between p-4 bg-white border-2 border-red-200 rounded-lg hover:bg-red-50 transition-colors"
            disabled
          >
            <div className="text-left">
              <p className="font-medium text-gray-900">Eliminar todos mis menús</p>
              <p className="text-sm text-gray-500">Borra permanentemente todo tu historial</p>
            </div>
            <span className="text-xs text-gray-400">Próximamente</span>
          </button>

          {/* Eliminar cuenta */}
          <button
            onClick={() => setShowConfirm(true)}
            className="w-full flex items-center justify-between p-4 bg-white border-2 border-red-300 rounded-lg hover:bg-red-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Trash2 className="w-5 h-5 text-red-600" />
              <div className="text-left">
                <p className="font-medium text-red-900">Eliminar mi cuenta</p>
                <p className="text-sm text-red-600">Borra tu cuenta y todos tus datos</p>
              </div>
            </div>
          </button>
        </div>
      </Card>

      {/* Modal de confirmación */}
      <Modal isOpen={showConfirm} onClose={() => setShowConfirm(false)}>
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="bg-red-100 p-3 rounded-full">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">¿Eliminar cuenta?</h3>
              <p className="text-gray-600">Esta acción no se puede deshacer</p>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-800 mb-3">
              Al eliminar tu cuenta:
            </p>
            <ul className="text-sm text-red-700 space-y-1 list-disc list-inside">
              <li>Perderás acceso a tu cuenta permanentemente</li>
              <li>Todos tus menús guardados serán eliminados</li>
              <li>Tu perfil y preferencias se borrarán</li>
              <li>No podrás recuperar ninguna información</li>
            </ul>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Para confirmar, escribe <span className="font-bold text-red-600">ELIMINAR</span>
            </label>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="Escribe ELIMINAR"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="flex gap-3">
            <Button
              onClick={() => {
                setShowConfirm(false);
                setConfirmText('');
              }}
              variant="outline"
              fullWidth
            >
              Cancelar
            </Button>
            <Button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
              fullWidth
              disabled={confirmText !== 'ELIMINAR'}
              loading={loading}
            >
              Eliminar cuenta
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

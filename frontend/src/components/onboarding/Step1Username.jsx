import { useState } from 'react';
import { Input } from '../shared/Input';
import { Button } from '../shared/Button';

export const Step1Username = ({ onNext, initialValue = '' }) => {
  const [username, setUsername] = useState(initialValue);
  const [error, setError] = useState('');

  const handleNext = () => {
    if (username.length < 3) {
      setError('El nombre de usuario debe tener al menos 3 caracteres');
      return;
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setError('Solo letras, números y guiones bajos');
      return;
    }
    onNext({ username });
  };

  const handleSkip = () => {
    // Generar un username temporal basado en timestamp
    const tempUsername = `user_${Date.now()}`;
    onNext({ username: tempUsername });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Paso 1: Elige tu nombre de usuario
        </h2>
        <p className="text-gray-600">
          Este será tu identificador único en la aplicación. Puedes configurarlo después en ajustes.
        </p>
      </div>

      <Input
        type="text"
        label="Nombre de usuario"
        placeholder="usuario123"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
          setError('');
        }}
        error={error}
      />

      <div className="flex gap-3">
        <Button onClick={handleSkip} variant="outline" fullWidth>
          Omitir
        </Button>
        <Button onClick={handleNext} fullWidth>
          Siguiente
        </Button>
      </div>
    </div>
  );
};

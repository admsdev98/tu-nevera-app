import { useNavigate } from 'react-router-dom';
import { Button } from '../shared/Button';

export const CompletionScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center space-y-6 py-8">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Todo listo
        </h2>
        <p className="text-lg text-gray-600">
          Tu perfil está completo. Ya puedes empezar a generar menús personalizados.
        </p>
      </div>

      <Button onClick={() => navigate('/dashboard')} size="large">
        Ir al inicio
      </Button>
    </div>
  );
};

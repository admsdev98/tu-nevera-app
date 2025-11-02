import { Link } from 'react-router-dom';
import { LoginForm } from '../components/auth/LoginForm';
import { SocialAuth } from '../components/auth/SocialAuth';
import { Card } from '../components/shared/Card';

export const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Iniciar sesión</h1>
          <p className="text-gray-600">Bienvenido de vuelta a Tu Nevera</p>
        </div>

        <Card>
          <LoginForm />
          <SocialAuth />
          
          <div className="mt-6 text-center text-sm text-gray-600">
            ¿No tienes cuenta?{' '}
            <Link to="/register" className="text-primary hover:text-primary-dark font-medium">
              Regístrate aquí
            </Link>
          </div>
        </Card>

        <div className="mt-4 text-center">
          <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

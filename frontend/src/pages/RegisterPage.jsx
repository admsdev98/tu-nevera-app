import { Link } from 'react-router-dom';
import { RegisterForm } from '../components/auth/RegisterForm';
import { SocialAuth } from '../components/auth/SocialAuth';
import { Card } from '../components/shared/Card';

export const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Crear cuenta</h1>
          <p className="text-gray-600">Comienza a generar menús personalizados</p>
        </div>

        <Card>
          <RegisterForm />
          <SocialAuth />
          
          <div className="mt-6 text-center text-sm text-gray-600">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-primary hover:text-primary-dark font-medium">
              Inicia sesión aquí
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

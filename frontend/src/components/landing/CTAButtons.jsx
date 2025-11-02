import { Link } from 'react-router-dom';
import { Button } from '../shared/Button';

export const CTAButtons = () => {
  return (
    <section className="py-20 bg-primary">
      <div className="container-main">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Comienza a crear tus menús hoy
          </h2>
          <p className="text-lg text-primary-light mb-8">
            Regístrate gratis y empieza a aprovechar al máximo tus ingredientes
          </p>
          <Link to="/register">
            <Button 
              size="large" 
              className="bg-white text-primary hover:bg-gray-100"
            >
              Crear cuenta gratis
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

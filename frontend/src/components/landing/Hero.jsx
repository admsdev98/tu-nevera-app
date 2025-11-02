import { Link } from 'react-router-dom';
import { Button } from '../shared/Button';

export const Hero = () => {
  return (
    <section className="py-20 md:py-32">
      <div className="container-main">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in">
            Transforma tus ingredientes en menús deliciosos
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 animate-slide-up">
            Sube una foto de tu nevera, graba un audio o escribe lo que tienes. 
            Nuestra IA creará menús personalizados adaptados a tus preferencias.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Link to="/register">
              <Button size="large" fullWidth>
                Empezar gratis
              </Button>
            </Link>
            <a href="#features">
              <Button variant="secondary" size="large" fullWidth>
                Ver cómo funciona
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

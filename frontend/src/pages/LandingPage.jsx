import { Navbar } from '../components/layout/Navbar';
import { Hero } from '../components/landing/Hero';
import { Features } from '../components/landing/Features';
import { FAQ } from '../components/landing/FAQ';
import { CTAButtons } from '../components/landing/CTAButtons';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <Features />
      <FAQ />
      <CTAButtons />
      <footer className="bg-gray-900 text-white py-8 mt-20">
        <div className="container-main text-center">
          <p className="text-gray-400">© 2025 Tu Nevera App. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

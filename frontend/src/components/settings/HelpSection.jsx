import { Mail, MessageCircle, Book } from 'lucide-react';
import { Card } from '../shared/Card';

export const HelpSection = () => {
  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1 md:mb-2">Ayuda y soporte</h2>
        <p className="text-sm md:text-base text-gray-600">
          ¿Necesitas ayuda? Estamos aquí para ti
        </p>
      </div>

      {/* Contacto */}
      <Card className="p-4 md:p-6">
        <div className="flex items-start gap-3 md:gap-4">
          <div className="bg-primary-50 p-2 md:p-3 rounded-lg flex-shrink-0">
            <Mail className="w-5 h-5 md:w-6 md:h-6 text-primary-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 mb-1 md:mb-2">Contacto por email</h3>
            <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-3">
              Envíanos tus dudas, sugerencias o reporta un problema
            </p>
            <a
              href="mailto:soporte@tunevera.app"
              className="text-primary-600 hover:text-primary-700 font-medium text-xs md:text-sm break-all"
            >
              soporte@tunevera.app
            </a>
          </div>
        </div>
      </Card>

      {/* Documentación */}
      <Card className="p-4 md:p-6">
        <div className="flex items-start gap-3 md:gap-4">
          <div className="bg-blue-50 p-2 md:p-3 rounded-lg flex-shrink-0">
            <Book className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 mb-1 md:mb-2">Guía de uso</h3>
            <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-3">
              Aprende a sacar el máximo provecho de Tu Nevera
            </p>
            <button className="text-blue-600 hover:text-blue-700 font-medium text-xs md:text-sm">
              Ver guía →
            </button>
          </div>
        </div>
      </Card>

      {/* Chat (próximamente) */}
      <Card className="p-4 md:p-6 bg-gray-50">
        <div className="flex items-start gap-3 md:gap-4">
          <div className="bg-gray-200 p-2 md:p-3 rounded-lg flex-shrink-0">
            <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-gray-400" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 md:mb-2">
              <h3 className="font-semibold text-gray-900">Chat de soporte</h3>
              <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded flex-shrink-0">
                Próximamente
              </span>
            </div>
            <p className="text-xs md:text-sm text-gray-600">
              Chatea en tiempo real con nuestro equipo
            </p>
          </div>
        </div>
      </Card>

      {/* FAQ Rápido */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3 md:mb-4">Preguntas frecuentes</h3>
        <div className="space-y-2 md:space-y-3">
          <details className="group bg-white border border-gray-200 rounded-lg">
            <summary className="px-3 md:px-4 py-2.5 md:py-3 cursor-pointer hover:bg-gray-50 font-medium text-gray-900 text-sm md:text-base">
              ¿Cómo funciona la generación de recetas?
            </summary>
            <div className="px-3 md:px-4 pb-2.5 md:pb-3 text-xs md:text-sm text-gray-600">
              Usa inteligencia artificial para analizar tus ingredientes y crear recetas personalizadas según tus preferencias y restricciones alimentarias.
            </div>
          </details>

          <details className="group bg-white border border-gray-200 rounded-lg">
            <summary className="px-3 md:px-4 py-2.5 md:py-3 cursor-pointer hover:bg-gray-50 font-medium text-gray-900 text-sm md:text-base">
              ¿Puedo modificar mis preferencias?
            </summary>
            <div className="px-3 md:px-4 pb-2.5 md:pb-3 text-xs md:text-sm text-gray-600">
              Sí, ve a la sección "Alimentación" para actualizar tus alergias, tipo de dieta y gustos culinarios.
            </div>
          </details>

          <details className="group bg-white border border-gray-200 rounded-lg">
            <summary className="px-3 md:px-4 py-2.5 md:py-3 cursor-pointer hover:bg-gray-50 font-medium text-gray-900 text-sm md:text-base">
              ¿Cómo guardo una receta?
            </summary>
            <div className="px-3 md:px-4 pb-2.5 md:pb-3 text-xs md:text-sm text-gray-600">
              Al generar una receta, haz clic en el botón "Guardar". Encontrarás todas tus recetas en "Mis comidas".
            </div>
          </details>
        </div>
      </div>

      {/* Versión */}
      <Card className="p-3 md:p-4 bg-gray-50">
        <div className="text-center text-xs md:text-sm text-gray-600">
          <p>Tu Nevera App</p>
          <p className="font-medium text-gray-900 mt-1">Versión 1.0.0 (Beta)</p>
          <p className="text-xs mt-1">© 2025 Todos los derechos reservados</p>
        </div>
      </Card>
    </div>
  );
};

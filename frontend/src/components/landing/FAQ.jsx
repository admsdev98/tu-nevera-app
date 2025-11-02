import { useState } from 'react';

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: '¿Es gratis?',
      answer: 'Sí, Tu Nevera es completamente gratuito. Puedes generar todos los menús que necesites sin costo alguno.',
    },
    {
      question: '¿Qué tipo de dietas soporta?',
      answer: 'Soportamos múltiples tipos de dieta: estándar, vegetariana, vegana, keto, alta en proteínas, mediterránea y baja en grasas. También puedes indicar alergias y alimentos a evitar.',
    },
    {
      question: '¿Cómo funciona la IA?',
      answer: 'Utilizamos modelos de OpenAI para analizar tus ingredientes y generar recetas personalizadas. La IA considera tus preferencias, restricciones dietéticas y los alimentos disponibles.',
    },
    {
      question: '¿Puedo guardar mis menús?',
      answer: 'Sí, todos los menús generados se guardan en tu historial para que puedas consultarlos cuando quieras.',
    },
    {
      question: '¿Necesito una cuenta?',
      answer: 'Sí, necesitas crear una cuenta gratuita para usar la aplicación. Puedes registrarte con email o con Google, GitHub o LinkedIn.',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container-main">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Preguntas frecuentes
            </h2>
            <p className="text-lg text-gray-600">
              Resolvemos tus dudas
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4 text-gray-600 animate-slide-down">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

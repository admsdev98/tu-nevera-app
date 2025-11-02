import { User, UtensilsCrossed, HelpCircle } from 'lucide-react';

export const SettingsSidebar = ({ activeSection, onSectionChange }) => {
  const sections = [
    {
      id: 'profile',
      label: 'Mi cuenta',
      icon: User,
      description: 'Información personal'
    },
    {
      id: 'preferences',
      label: 'Alimentación',
      icon: UtensilsCrossed,
      description: 'Alergias, dieta y gustos'
    },
    {
      id: 'help',
      label: 'Ayuda',
      icon: HelpCircle,
      description: 'Soporte y contacto'
    }
  ];

  return (
    <>
      {/* Mobile: Tabs horizontales */}
      <div className="lg:hidden">
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            
            return (
              <button
                key={section.id}
                onClick={() => onSectionChange(section.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg whitespace-nowrap transition-all flex-shrink-0 ${
                  isActive
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium text-sm">{section.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Desktop: Sidebar vertical */}
      <aside className="hidden lg:block w-64 bg-white rounded-lg border border-gray-200 p-4">
        <nav className="space-y-1">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            
            return (
              <button
                key={section.id}
                onClick={() => onSectionChange(section.id)}
                className={`w-full flex items-start gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-primary-50 text-primary-700 border-l-4 border-primary-600'
                    : 'text-gray-700 hover:bg-gray-50 border-l-4 border-transparent'
                }`}
              >
                <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                  isActive ? 'text-primary-600' : 'text-gray-400'
                }`} />
                <div className="text-left">
                  <p className={`font-medium ${isActive ? 'text-primary-700' : 'text-gray-900'}`}>
                    {section.label}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {section.description}
                  </p>
                </div>
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

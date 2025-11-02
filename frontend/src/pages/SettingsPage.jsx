import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Navbar } from '../components/layout/Navbar';
import { BottomNav } from '../components/layout/BottomNav';
import { SettingsSidebar } from '../components/settings/SettingsSidebar';
import { ProfileSection } from '../components/settings/ProfileSection';
import { PreferencesEdit } from '../components/settings/PreferencesEdit';
import { HelpSection } from '../components/settings/HelpSection';
import { Modal } from '../components/shared/Modal';
import { Step2Allergens } from '../components/onboarding/Step2Allergens';
import { Step3DietType } from '../components/onboarding/Step3DietType';
import { Step4FavoriteFood } from '../components/onboarding/Step4FavoriteFood';
import { Step5AvoidFood } from '../components/onboarding/Step5AvoidFood';

export const SettingsPage = () => {
  const { profile, updateProfile, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('profile');
  const [editingPreference, setEditingPreference] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpdateProfile = async (updates) => {
    const success = await updateProfile(updates);
    return success;
  };

  const handleEditPreference = (type) => {
    setEditingPreference(type);
    setIsModalOpen(true);
  };

  const handleSavePreference = async (data) => {
    await updateProfile(data);
    setIsModalOpen(false);
    setEditingPreference(null);
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const handleChangePassword = () => {
    alert('La funcionalidad de cambio de contraseña estará disponible próximamente');
  };

  const handleDeleteAccount = async () => {
    alert('Cuenta eliminada');
    await signOut();
    navigate('/');
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <ProfileSection
            profile={profile}
            onUpdate={handleUpdateProfile}
            onChangePassword={handleChangePassword}
            onDeleteAccount={handleDeleteAccount}
          />
        );
      
      case 'preferences':
        return (
          <div className="space-y-4 md:space-y-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1 md:mb-2">
                Preferencias alimentarias
              </h2>
              <p className="text-sm md:text-base text-gray-600">
                Configura tus restricciones y gustos culinarios
              </p>
            </div>
            <PreferencesEdit profile={profile} onEdit={handleEditPreference} />
          </div>
        );
      
      case 'help':
        return <HelpSection />;
      
      default:
        return (
          <ProfileSection
            profile={profile}
            onUpdate={handleUpdateProfile}
            onChangePassword={handleChangePassword}
            onDeleteAccount={handleDeleteAccount}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar solo en desktop */}
      <div className="hidden md:block">
        <Navbar />
      </div>
      
      {/* Header mobile - Simple con título */}
      <div className="md:hidden bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container-main py-4">
          <h1 className="text-xl font-bold text-gray-900">Configuración</h1>
        </div>
      </div>

      <main className="container-main py-4 md:py-8 pb-24 md:pb-8">
        {/* Header - Solo desktop */}
        <div className="mb-4 md:mb-6 hidden md:block">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Configuración</h1>
          <p className="text-gray-600">
            Gestiona tu cuenta y preferencias
          </p>
        </div>

        {/* Layout con sidebar */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar/Tabs de navegación */}
          <SettingsSidebar
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />

          {/* Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
              {renderSection()}
            </div>
          </div>
        </div>
      </main>
      <BottomNav />

      {/* Modal para editar preferencias */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-4">
          {editingPreference === 'allergens' && (
            <Step2Allergens
              onNext={handleSavePreference}
              initialValue={profile?.allergens || []}
            />
          )}
          {editingPreference === 'diet' && (
            <Step3DietType
              onNext={handleSavePreference}
              initialValue={profile?.diet_type}
            />
          )}
          {editingPreference === 'favorites' && (
            <Step4FavoriteFood
              onNext={handleSavePreference}
              initialValue={profile?.favorite_foods || []}
            />
          )}
          {editingPreference === 'avoid' && (
            <Step5AvoidFood
              onNext={handleSavePreference}
              initialValue={profile?.avoid_foods || []}
            />
          )}
        </div>
      </Modal>
    </div>
  );
};

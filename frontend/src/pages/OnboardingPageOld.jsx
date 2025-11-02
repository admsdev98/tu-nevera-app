import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { OnboardingSteps } from '../components/onboarding/OnboardingSteps';
import { Step1Username } from '../components/onboarding/Step1Username';
import { Step2Allergens } from '../components/onboarding/Step2Allergens';
import { Step3DietType } from '../components/onboarding/Step3DietType';
import { Step4FavoriteFood } from '../components/onboarding/Step4FavoriteFood';
import { Step5AvoidFood } from '../components/onboarding/Step5AvoidFood';
import { CompletionScreen } from '../components/onboarding/CompletionScreen';

export const OnboardingPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const { completeOnboarding } = useAuth();
  const navigate = useNavigate();

  const totalSteps = 5;

  const handleNext = (data) => {
    setFormData({ ...formData, ...data });
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete({ ...formData, ...data });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = async (data) => {
    setLoading(true);
    try {
      await completeOnboarding(data);
      setCurrentStep(totalSteps + 1);
    } catch (error) {
      console.error('Error completing onboarding:', error);
      alert('Error al completar el onboarding');
    } finally {
      setLoading(false);
    }
  };

  if (currentStep === totalSteps + 1) {
    return <CompletionScreen />;
  }

  return (
    <OnboardingSteps currentStep={currentStep} totalSteps={totalSteps}>
      {currentStep === 1 && (
        <Step1Username
          onNext={handleNext}
          initialValue={formData.username}
        />
      )}
      {currentStep === 2 && (
        <Step2Allergens
          onNext={handleNext}
          onBack={handleBack}
          initialValue={formData.allergens}
        />
      )}
      {currentStep === 3 && (
        <Step3DietType
          onNext={handleNext}
          onBack={handleBack}
          initialValue={formData.diet_type}
        />
      )}
      {currentStep === 4 && (
        <Step4FavoriteFood
          onNext={handleNext}
          onBack={handleBack}
          initialValue={formData.favorite_foods}
        />
      )}
      {currentStep === 5 && (
        <Step5AvoidFood
          onNext={handleNext}
          onBack={handleBack}
          initialValue={formData.avoid_foods}
        />
      )}
    </OnboardingSteps>
  );
};

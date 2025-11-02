import { ProgressBar } from '../shared/ProgressBar';

export const OnboardingSteps = ({ currentStep, totalSteps, children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="mb-8">
          <ProgressBar current={currentStep} total={totalSteps} />
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 animate-fade-in">
          {children}
        </div>
      </div>
    </div>
  );
};

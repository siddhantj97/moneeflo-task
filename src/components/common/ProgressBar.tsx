import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const stepsArray = Array.from({ length: totalSteps }, (_, i) => i + 1);
  const progressPercent = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="mb-8">
      <div className="flex items-center mb-3">
        {stepsArray.map((step, index) => (
          <div key={step} className="flex items-center">
            <div
              className={`rounded-full h-8 w-8 flex items-center justify-center border-2 transition-all
                ${
                  step <= currentStep
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'bg-gray-100 border-gray-300 text-gray-500'
                }
              `}
            >
              {step}
            </div>
            {index < totalSteps - 1 && (
              <div
                className={`h-1 w-6 md:w-16 transition-all 
                  ${step < currentStep ? 'bg-blue-600' : 'bg-gray-300'}
                `}
              />
            )}
          </div>
        ))}
      </div>
      <div className="w-full bg-gray-200 h-2 rounded">
        <div
          className="bg-blue-600 h-2 rounded transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
      <p className="text-sm text-gray-600 mt-2">
        Step {currentStep} of {totalSteps} ({progressPercent}%)
      </p>
    </div>
  );
};

export default ProgressBar;

import React, { useState } from 'react';
import BasicDetailsStep from './BasicDetailsStep';
import AddressStep from './AddressStep';
import FileUploadStep from './FileUploadStep';
import MultiFileUploadStep from './MultiFileUploadStep';
import StatusStep from './StatusStep';
import ProgressBar from '../common/ProgressBar';

interface FormData {
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  file: File | null;
  multipleFiles: File[];
  location: { lat: number; lng: number } | null;
}

const defaultData: FormData = {
  name: '',
  email: '',
  phone: '',
  countryCode: '+91',
  address1: '',
  address2: '',
  city: '',
  state: '',
  pincode: '',
  country: '',
  file: null,
  multipleFiles: [],
  location: null,
};

const MultiStepForm: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>(defaultData);

  // total steps = 5
  const totalSteps = 5;

  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  // After successful submission, we want to reset
  const resetForm = () => {
    setFormData(defaultData);
    setStep(1);
  };

  return (
    <>
      {/* Progress Indicator */}
      <ProgressBar currentStep={step} totalSteps={totalSteps} />

      {/* Render step by step */}
      {step === 1 && (
        <BasicDetailsStep
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
        />
      )}
      {step === 2 && (
        <AddressStep
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 3 && (
        <FileUploadStep
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 4 && (
        <MultiFileUploadStep
          formData={formData}
          setFormData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      )}
      {step === 5 && (
        <StatusStep
          formData={formData}
          prevStep={prevStep}
          resetForm={resetForm}
        />
      )}
    </>
  );
};

export default MultiStepForm;

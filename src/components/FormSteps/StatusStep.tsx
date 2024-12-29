import React, { useState } from 'react';
import { submitFormData } from '../../api/xanoClient';

interface FormData {
  name: string;
  email: string;
  address: string;
  file: File | null;
  multipleFiles: File[];
  location: { lat: number; lng: number } | null;
}

interface Props {
  formData: FormData;
  prevStep: () => void;
  resetForm: () => void;
}

const StatusStep: React.FC<Props> = ({ formData, prevStep, resetForm }) => {
  const [submitStatus, setSubmitStatus] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false); // ← NEW: loading state
  console.log(formData)

  const handleSubmit = async () => {
    try {
      setLoading(true);             // Start loader
      setSubmitStatus('');         // Reset status message

      const result = await submitFormData(formData);
      console.log('Submit result:', result);

      setSubmitStatus('Form submitted successfully!');
      // Optionally reset form after a short delay
      setTimeout(() => {
        resetForm();
      }, 1500);
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('Form submission failed.');
    } finally {
      setLoading(false);           // End loader
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Status</h2>

      {!submitStatus && !loading && (
        <>
          <p className="mb-4 text-gray-600">Review your data and click Submit.</p>
          
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-3">Form Data Review:</h3>
            <div className="space-y-2">
              <p><span className="font-medium">Name:</span> {formData.name}</p>
              <p><span className="font-medium">Email:</span> {formData.email}</p>
              
              {/* Address Fields */}
              <p><span className="font-medium">Address Line 1:</span> {formData.address1}</p>
              {formData.address2 && (
                <p><span className="font-medium">Address Line 2:</span> {formData.address2}</p>
              )}
              <p><span className="font-medium">City:</span> {formData.city}</p>
              <p><span className="font-medium">Country:</span> {formData.country}</p>
              <p><span className="font-medium">Pincode:</span> {formData.pincode}</p>
              
              {formData.file && (
                <p><span className="font-medium">File:</span> {formData.file.name}</p>
              )}
              {formData.multipleFiles.length > 0 && (
                <p><span className="font-medium">Additional Files:</span> {formData.multipleFiles.length} files selected</p>
              )}
              {formData.location && (
                <p><span className="font-medium">Location:</span> {`${formData.location.lat}, ${formData.location.lng}`}</p>
              )}
            </div>
          </div>
        </>
      )}

      {submitStatus && (
        <div
          className={`mb-4 p-3 rounded ${
            submitStatus.includes('success')
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {submitStatus}
        </div>
      )}

      {/* Loader Section */}
      {loading && (
        <div className="mb-4 flex items-center space-x-2">
          <div className="inline-block w-5 h-5 border-2 border-t-transparent border-blue-600 rounded-full animate-spin"></div>
          <span className="text-blue-600 font-medium">Submitting...</span>
        </div>
      )}

      {/* Submit Button */}
      {!submitStatus && (
        <button
          onClick={handleSubmit}
          className={`bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={loading} // disable while loading
        >
          Submit
        </button>
      )}

      <div className="flex justify-between mt-6">
        <button
          onClick={prevStep}
          className="bg-gray-300 text-black px-4 py-2 rounded"
        >
          Back
        </button>
        {submitStatus && (
          <button
            onClick={resetForm}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Start Over
          </button>
        )}
      </div>
    </div>
  );
};

export default StatusStep;

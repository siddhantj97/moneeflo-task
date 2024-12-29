import React, { Dispatch, SetStateAction } from 'react';

interface FormData {
  file: File | null;
}

interface Props {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
  nextStep: () => void;
  prevStep: () => void;
}

const FileUploadStep: React.FC<Props> = ({ formData, setFormData, nextStep, prevStep }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const uploadedFile = e.target.files[0];
      if (!['image/png', 'application/pdf'].includes(uploadedFile.type)) {
        alert('Please upload only PNG or PDF files');
        return;
      }
      setFormData((prev) => ({ ...prev, file: uploadedFile }));
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">File Upload</h2>
      <input type="file" onChange={handleFileChange} />

      {formData.file && <p className="mt-2">File: {formData.file.name}</p>}

      <div className="flex justify-between mt-4">
        <button
          onClick={prevStep}
          className="bg-gray-300 text-black px-4 py-2 rounded"
        >
          Back
        </button>
        <button
          onClick={nextStep}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FileUploadStep;

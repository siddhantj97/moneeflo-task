import React, { Dispatch, SetStateAction, useEffect } from 'react';

interface FormData {
  multipleFiles: File[];
  location: { lat: number; lng: number } | null;
}

interface Props {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
  nextStep: () => void;
  prevStep: () => void;
}

const MultiFileUploadStep: React.FC<Props> = ({
  formData,
  setFormData,
  nextStep,
  prevStep,
}) => {
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        // Success callback
        (position) => {
          setFormData((prev) => ({
            ...prev,
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          }));
        },
        // Error callback
        (error) => {
          console.error('Geolocation error:', error);
          alert(
            'Could not retrieve location. Ensure you have granted permission or are on HTTPS.'
          );
        },
        // Options (optional)
        {
          enableHighAccuracy: true,
          timeout: 10000, // 10 seconds
          maximumAge: 0,
        }
      );
    } else {
      console.warn('Geolocation not supported by this browser.');
    }
  }, [setFormData]);

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const validFiles = filesArray.filter((file) =>
        ['image/png', 'application/pdf'].includes(file.type)
      );
      if (validFiles.length !== filesArray.length) {
        alert('Some files were not PNG or PDF and were not added.');
      }
      if (formData.multipleFiles.length + validFiles.length > 5) {
        alert('Maximum 5 files allowed');
        return;
      }
      setFormData((prev) => ({
        ...prev,
        multipleFiles: [...prev.multipleFiles, ...validFiles],
      }));
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Multi File Upload</h2>
      <input type="file" multiple onChange={handleFilesChange} />
      <div className="mt-2">
        {formData.multipleFiles.map((file, index) => (
          <p key={index}>{file.name}</p>
        ))}
      </div>

      <div className="mt-4">
        <h3 className="font-semibold">GeoLocation:</h3>
        {formData.location ? (
          <p>
            Latitude: {formData.location.lat}, Longitude: {formData.location.lng}
          </p>
        ) : (
          <p>Fetching location...</p>
        )}
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={prevStep}
          className="bg-gray-300 text-black px-4 py-2 rounded"
        >
          Back
        </button>
        <button onClick={nextStep} className="bg-blue-600 text-white px-4 py-2 rounded">
          Next
        </button>
      </div>
    </div>
  );
};

export default MultiFileUploadStep;

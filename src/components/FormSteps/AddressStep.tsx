import React, { Dispatch, SetStateAction } from 'react';

interface FormData {
  address1: string;
  address2: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

interface Props {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
  nextStep: () => void;
  prevStep: () => void;
}

const AddressStep: React.FC<Props> = ({ formData, setFormData, nextStep, prevStep }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Validation for pincode - only allow numbers and limit to 6 digits
    if (name === 'pincode') {
      if (!/^\d*$/.test(value)) {
        return;
      }
      if (value.length > 6) {
        return;
      }
    }

    // For city, state, and country - only allow letters and spaces
    if (['city', 'state', 'country'].includes(name)) {
      if (!/^[A-Za-z\s]*$/.test(value)) {
        return;
      }
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateAndNext = () => {
    // Address validation
    if (formData.address1.trim().length < 5) {
      alert('Please enter a valid address');
      return;
    }

    // City validation
    if (formData.city.trim().length < 2) {
      alert('Please enter a valid city name');
      return;
    }

    // State validation
    if (formData.state.trim().length < 2) {
      alert('Please enter a valid state name');
      return;
    }

    // Pincode validation
    if (formData.pincode.length !== 6) {
      alert('Pincode must be 6 digits');
      return;
    }

    // Country validation
    if (formData.country.trim().length < 2) {
      alert('Please enter a valid country name');
      return;
    }

    nextStep();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Address</h2>
      <div className="mb-4">
        <label className="block">Address Line 1</label>
        <input
          type="text"
          name="address1"
          value={formData.address1}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full rounded"
          required
          minLength={5}
        />
      </div>
      <div className="mb-4">
        <label className="block">Address Line 2</label>
        <input
          type="text"
          name="address2"
          value={formData.address2}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block">City</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full rounded"
          required
          pattern="[A-Za-z\s]+"
        />
      </div>
      <div className="mb-4">
        <label className="block">State</label>
        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full rounded"
          required
          pattern="[A-Za-z\s]+"
        />
      </div>
      <div className="mb-4">
        <label className="block">Pincode</label>
        <input
          type="text"
          name="pincode"
          value={formData.pincode}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full rounded"
          required
          maxLength={6}
          placeholder="6 digit pincode"
        />
      </div>
      <div className="mb-4">
        <label className="block">Country</label>
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full rounded"
          required
          pattern="[A-Za-z\s]+"
        />
      </div>

      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="bg-gray-300 text-black px-4 py-2 rounded"
        >
          Back
        </button>
        <button
          onClick={validateAndNext}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AddressStep;

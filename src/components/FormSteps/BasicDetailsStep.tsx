import React, { Dispatch, SetStateAction } from 'react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  countryCode: string;
}

interface Props {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
  nextStep: () => void;
}

const BasicDetailsStep: React.FC<Props> = ({ formData, setFormData, nextStep }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Validation for phone number - only allow numbers
    if (name === 'phone') {
      if (!/^\d*$/.test(value)) {
        return;
      }
      if (value.length > 10) {
        return;
      }
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateAndNext = () => {
    // Email validation
    if (!formData.email.includes('@')) {
      alert('Please enter a valid email');
      return;
    }

    // Phone validation
    if (formData.phone.length !== 10) {
      alert('Phone number must be 10 digits');
      return;
    }

    // Name validation
    if (formData.name.trim().length < 2) {
      alert('Please enter a valid name');
      return;
    }

    nextStep();
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Basic Details</h2>
      <div className="mb-4">
        <label className="block">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full rounded"
          required
          minLength={2}
        />
      </div>

      <div className="mb-4">
        <label className="block">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block">Phone</label>
        <div className="flex">
          <select
            name="countryCode"
            value={formData.countryCode}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, countryCode: e.target.value }))
            }
            className="border border-gray-300 p-2 rounded"
          >
            <option value="+91">🇮🇳 +91</option>
            <option value="+1">🇺🇸 +1</option>
            <option value="+44">🇬🇧 +44</option>
          </select>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded ml-2"
            placeholder="10 digit number"
            maxLength={10}
            required
          />
        </div>
      </div>

      <button
        onClick={validateAndNext}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Next
      </button>
    </div>
  );
};

export default BasicDetailsStep;

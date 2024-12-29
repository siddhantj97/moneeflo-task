import axios from 'axios';

const xanoClient = axios.create({
  baseURL: 'https://x8ki-letl-twmt.n7.xano.io/api:8VwkOSi-', 
});

export const loginUser = async (email: string, password: string) => {
    try {
      const response = await xanoClient.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

export const submitFormData = async (data: {
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
}) => {
  const formData = new FormData();

  const jsonFields = {
    name: data.name,
    email: data.email,
    phone: data.phone,
    countryCode: data.countryCode,
    address1: data.address1,
    address2: data.address2,
    city: data.city,
    state: data.state,
    pincode: data.pincode,
    country: data.country,
    location: data.location,
  };

  formData.append('form_data', JSON.stringify(jsonFields));

  if (data.file) {
    formData.append('file', data.file);
  }

  data.multipleFiles.forEach((file, index) => {
    formData.append('files[]', file);
  });

  const response = await xanoClient.post('/form/submit', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response;
};

export default xanoClient;

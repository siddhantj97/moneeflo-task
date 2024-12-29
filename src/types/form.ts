export interface FormData {
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
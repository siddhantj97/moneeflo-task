import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Navigate } from 'react-router-dom';
import MultiStepForm from '../components/FormSteps/MultiStepForm';
import Header from '../components/Header';

const FormPage: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
    <Header />
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-white p-4 md:p-8">
      <div className="max-w-3xl mx-auto bg-white p-6 md:p-10 shadow-md rounded">
        <MultiStepForm />
      </div>
    </div>
    </>
  );
};

export default FormPage;

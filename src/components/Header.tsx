import React from 'react';
import { useAppDispatch } from '../redux/hook';
import { logout } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="flex items-center justify-between p-4 bg-indigo-600 text-white">
      <h1 className="text-lg font-bold">Admin Dashboard</h1>
      <button
        onClick={handleLogout}
        className="bg-white text-indigo-600 px-4 py-2 rounded font-medium"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;

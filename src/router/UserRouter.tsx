import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const UserRouter = () => {
  const email = localStorage.getItem('id');
  const navigate = useNavigate();
  useEffect(() => {
    if (!email) {
      alert('잘못된 접근입니다.');
      navigate('/');
    }
  }, [email, navigate]);
  return <Outlet />;
};

export default UserRouter;

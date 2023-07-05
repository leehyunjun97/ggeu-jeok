import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const UserRouter = () => {
  const id = localStorage.getItem('id');
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      alert('잘못된 접근입니다.');
      navigate('/');
    }
  }, [id, navigate]);
  return <Outlet />;
};

export default UserRouter;

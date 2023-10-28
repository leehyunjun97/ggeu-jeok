import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const NonUserRouter = () => {
  const id = localStorage.getItem('id');
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      navigate('/main');
    }
  }, [id, navigate]);

  return <Outlet />;
};
export default NonUserRouter;

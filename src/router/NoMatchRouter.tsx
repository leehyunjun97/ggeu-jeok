import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const NoMatchRouter = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname.split('/')[1];
    if (path === 'schedule') {
      navigate('/main');
    }
  }, [location.pathname, navigate]);

  return <div>잘못된 경로로 접근하셨습니다.</div>;
};

export default NoMatchRouter;

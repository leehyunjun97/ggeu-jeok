import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userInfo } from '../recoil/user/user';

const NonUserRouter = () => {
  const info = useRecoilValue(userInfo);
  const navigate = useNavigate();
  useEffect(() => {
    if (info.id) {
      navigate('/main');
    } else {
    }
  }, [info, navigate]);

  return <Outlet />;
};
export default NonUserRouter;

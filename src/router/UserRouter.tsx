import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userInfo, userRender } from '../recoil/user/user';
import { getMyInfoApi } from '../services/user/user';

const UserRouter = () => {
  const setInfo = useSetRecoilState(userInfo);
  const navigate = useNavigate();
  const email = localStorage.getItem('id');
  const userRenderRecoil = useRecoilValue(userRender);

  useEffect(() => {
    const getMyInfoHandler = async () => {
      try {
        if (email) {
          const getComplet = await getMyInfoApi(email);

          if (getComplet.data.length === 0) {
            alert('잘못된 접근입니다.');
            localStorage.removeItem('id');
            navigate('/');
          } else {
            setInfo(getComplet.data[0]);
          }
        }
      } catch (error) {}
    };

    getMyInfoHandler();
  }, [email, setInfo, navigate, userRenderRecoil]);

  return <Outlet />;
};

export default UserRouter;

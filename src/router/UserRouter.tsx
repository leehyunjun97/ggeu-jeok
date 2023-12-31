import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userInfo, userRender } from '../recoil/user/user';
import { getMyInfoApi } from '../services/user/user';
import { IUserInfo } from '../types/user';

const UserRouter = () => {
  const setUser = useSetRecoilState(userInfo);
  const navigate = useNavigate();
  const id = localStorage.getItem('id');
  const userRenderRecoil = useRecoilValue(userRender);

  useEffect(() => {
    const getMyInfoHandler = async () => {
      try {
        if (!id) {
          alert('잘못된 접근입니다.');
          navigate('/');
          return;
        }

        const getComplet: IUserInfo = await getMyInfoApi(id);

        if (!getComplet) {
          alert('잘못된 접근입니다.');
          localStorage.removeItem('id');
          navigate('/');
        }

        getComplet.uuid = id;

        if (!getComplet.friend) {
          getComplet.friend = [];
        }
        if (!getComplet.alarm) {
          getComplet.alarm = [];
        }

        setUser(getComplet);
      } catch (error) {}
    };

    getMyInfoHandler();
  }, [id, setUser, navigate, userRenderRecoil]);

  return <Outlet />;
};

export default UserRouter;

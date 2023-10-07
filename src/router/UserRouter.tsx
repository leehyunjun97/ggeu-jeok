import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userInfo, userRender } from '../recoil/user/user';
import { getMyInfoApi } from '../services/user/user';

const UserRouter = () => {
  const setInfo = useSetRecoilState(userInfo);
  const navigate = useNavigate();
  const id = localStorage.getItem('id');
  const userRenderRecoil = useRecoilValue(userRender);

  useEffect(() => {
    const getMyInfoHandler = async () => {
      try {
        if (!id) return;

        const getComplet = await getMyInfoApi(id);

        if (!!getComplet.data.length) return setInfo(getComplet.data[0]);

        alert('잘못된 접근입니다.');
        localStorage.removeItem('id');
        navigate('/');

        // if (id) {
        //   const getComplet = await getMyInfoApi(id);

        //   if (getComplet.data.length === 0) {
        //     alert('잘못된 접근입니다.');
        //     localStorage.removeItem('id');
        //     navigate('/');
        //   } else {
        //     setInfo(getComplet.data[0]);
        //   }
        // }
      } catch (error) {}
    };

    getMyInfoHandler();
  }, [id, setInfo, navigate, userRenderRecoil]);

  return <Outlet />;
};

export default UserRouter;

import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { roomInfo } from '../recoil/room/roomInfo';

const ScheduleRouter = () => {
  const setInfo = useSetRecoilState(roomInfo);
  // 방 초기화 방지
  return <Outlet />;
};

export default ScheduleRouter;

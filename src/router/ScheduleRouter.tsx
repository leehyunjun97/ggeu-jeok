import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { roomInfo } from '../recoil/room/roomInfo';
import { userInfo } from '../recoil/user/user';
import { getRoomListApi } from '../services/room/room';
import { IRoomInfo } from '../types/room';

const ScheduleRouter = () => {
  const setInfo = useSetRecoilState(roomInfo);
  const myInfo = useRecoilValue(userInfo);

  // 방 초기화 방지
  // useEffect(() => {
  //   const getRoomList = async () => {
  //     const roomList = await getRoomListApi();
  //     const myRoomList = roomList.filter((item: IRoomInfo) =>
  //       item.member.find((it) => it.id === myInfo.id)
  //     );
  //     setInfo(myRoomList);
  //   };
  //   getRoomList();
  // }, [setInfo, myInfo.id]);

  return <Outlet />;
};

export default ScheduleRouter;

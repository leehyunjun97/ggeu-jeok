import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { myRoomProfile } from '../recoil/room/roomInfo';
import { userInfo } from '../recoil/user/user';
import { IMemberInfo, IRoomInfo } from '../types/room';

const ScheduleRouter = () => {
  const setMyProfile = useSetRecoilState(myRoomProfile);
  const myInfo = useRecoilValue(userInfo);
  const roomInfo: IRoomInfo = useLocation().state.roomInfo;

  useEffect(() => {
    setMyProfile(
      roomInfo.member.filter(
        (item: IMemberInfo) => item.email === myInfo.email
      )[0]
    );
  }, [myInfo.email, roomInfo.member, setMyProfile]);

  return <Outlet />;
};

export default ScheduleRouter;

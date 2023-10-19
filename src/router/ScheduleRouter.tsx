import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { myRoomProfile, roomInfo } from '../recoil/room/roomInfo';
import { userInfo } from '../recoil/user/user';
import { IMemberInfo, IRoomInfo } from '../types/room';

const ScheduleRouter = () => {
  const setMyProfile = useSetRecoilState(myRoomProfile);
  const myInfo = useRecoilValue(userInfo);
  const room = useRecoilValue(roomInfo);
  const navigate = useNavigate();

  // useEffect(() => {
  //   //state에 값이 없을 때
  //   if (!location.state) {
  //     const room_uuid = location.pathname.split('/')[3];
  //   }
  // }, [location.state, location.pathname]);

  useEffect(() => {
    setMyProfile(
      room &&
        room.member.filter(
          (item: IMemberInfo) => item.email === myInfo.email
        )[0]
    );
  }, [myInfo.email, room, setMyProfile]);

  return <Outlet />;
};

export default ScheduleRouter;

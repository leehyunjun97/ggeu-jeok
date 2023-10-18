import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { myRoomProfile } from '../recoil/room/roomInfo';
import { userInfo } from '../recoil/user/user';
import { IMemberInfo, IRoomInfo } from '../types/room';

const ScheduleRouter = () => {
  const setMyProfile = useSetRecoilState(myRoomProfile);
  const myInfo = useRecoilValue(userInfo);
  const location = useLocation();
  const navigate = useNavigate();
  const roomInfo: IRoomInfo = location.state?.roomInfo;

  // useEffect(() => {
  //   if (!location.state) {
  //     const room_uuid = location.pathname.split('/')[3];
  //     console.log(room_uuid);
  //     if (!room_uuid) alert('잘못된 접근!');
  //     return;
  //   }

  //   if (location.state) {
  //     const room_uuid = location.pathname.split('/')[3];
  //   }
  // }, [location.state]);

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

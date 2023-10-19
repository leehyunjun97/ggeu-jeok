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

  //recoil로 할지 state로 할지
  useEffect(() => {
    //state에 값이 없을 때
    if (!location.state) {
      const room_uuid = location.pathname.split('/')[3];
    }
  }, [location.state, location.pathname]);

  useEffect(() => {
    setMyProfile(
      roomInfo &&
        roomInfo.member.filter(
          (item: IMemberInfo) => item.email === myInfo.email
        )[0]
    );
  }, [myInfo.email, roomInfo, setMyProfile]);

  return <Outlet />;
};

export default ScheduleRouter;

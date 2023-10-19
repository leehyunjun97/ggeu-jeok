import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { myRoomProfile, roomInfo } from '../recoil/room/roomInfo';
import { userInfo } from '../recoil/user/user';
import { IMemberInfo, IRoomInfo } from '../types/room';
import { getMyRoomInfoApi } from '../services/room/room';

const ScheduleRouter = () => {
  const myInfo = useRecoilValue(userInfo);
  const room_uuid = useLocation().pathname.split('/')[3];
  const [room, setRoomInfo] = useRecoilState(roomInfo);
  const setMyProfile = useSetRecoilState(myRoomProfile);
  const navigate = useNavigate();

  useEffect(() => {
    const getMyRoomHandler = async () => {
      try {
        if (!room_uuid) {
          alert('잘못된 접근입니다.');
          navigate('/main');
          return;
        }

        const getComplet: IRoomInfo = await getMyRoomInfoApi(room_uuid);

        if (!getComplet) {
          alert('잘못된 접근입니다.');
          localStorage.removeItem('room_id');
          navigate('/main');
        }
        getComplet.uuid = room_uuid;
        setRoomInfo(getComplet);
      } catch (error) {}
    };

    getMyRoomHandler();
  }, [navigate, room_uuid, setRoomInfo]);

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

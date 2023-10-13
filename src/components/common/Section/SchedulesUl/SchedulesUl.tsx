import React, { useEffect, useState } from 'react';
import styles from './styles/schedulesUl.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import ScheduleInfoCard from '../../Card/ScheduleInfoCard/ScheduleInfoCard';
import { getRoomListApi } from '../../../../services/room/room';
import { IRoomInfo } from '../../../../types/room';
import { useRecoilValue } from 'recoil';
import { userInfo } from '../../../../recoil/user/user';
import { objTransArr } from '../../../../utils/common/objectTransformArray';

const SchedulesUl = () => {
  const [roomData, setRoomData] = useState<IRoomInfo[]>([]);
  const info = useRecoilValue(userInfo);
  const navigate = useNavigate();

  // 로컬스토리지에 룸 데이터베이스 키 저장
  // 스케쥴라우터에서 새로고침해도 그 키로 다시 불러오기

  useEffect(() => {
    const getRoomList = async () => {
      const data = await getRoomListApi();
      const roomList = objTransArr(data);
      // const myRoomList = roomList.filter((item: IRoomInfo) =>
      //   item.member.find((it) => it.id === info.id)
      // );
      // setRoomData(myRoomList);

      console.log(roomList);
    };
    getRoomList();
  }, []);

  return (
    <ul className={styles.ulList}>
      {/* {roomData &&
        roomData.map((item) => <ScheduleInfoCard key={item.id} room={item} />)}
      <li
        className={styles.plusLi}
        onClick={() => navigate('/schedule/create')}
      >
        <FontAwesomeIcon icon={faPlus} className={styles.plusIcon} />
      </li> */}
    </ul>
  );
};

export default SchedulesUl;

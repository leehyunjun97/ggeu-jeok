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

  useEffect(() => {
    const getRoomList = async () => {
      const data = await getRoomListApi();

      if (!data) return;

      const roomList: IRoomInfo[] = objTransArr(data);
      const myRoomList = roomList.filter((item: IRoomInfo) =>
        item.member.find((it) => it.id === info.id)
      );

      setRoomData(myRoomList);
    };
    getRoomList();
  }, [info.id]);

  return (
    <ul className={styles.ulList}>
      {roomData &&
        roomData.map((item) => (
          <ScheduleInfoCard key={item.uuid} room={item} />
        ))}

      <li
        className={styles.plusLi}
        onClick={() => navigate('/schedule/create')}
      >
        <FontAwesomeIcon icon={faPlus} className={styles.plusIcon} />
      </li>
    </ul>
  );
};

export default SchedulesUl;

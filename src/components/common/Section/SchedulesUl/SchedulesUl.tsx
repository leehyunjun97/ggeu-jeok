import React, { useEffect, useState } from 'react';
import styles from './styles/schedulesUl.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import ScheduleInfoCard from '../../Card/ScheduleInfoCard/ScheduleInfoCard';
import { getRoomListApi } from '../../../../services/room/room';

const SchedulesUl = () => {
  const [roomData, setRoomData] = useState([]);
  const navigate = useNavigate();

  // const [alarmData, setAlarmData] = useState([]);

  // useEffect(() => {
  //   const myAlarmList = async () => {
  //     setAlarmData(await myAlarmApi(email));
  //   };
  //   myAlarmList();
  // }, [email]);

  useEffect(() => {
    const getRoomList = async () => {
      const roomList = await getRoomListApi();
      setRoomData(roomList);
      console.log(roomData);
    };
    getRoomList();
  }, []);

  return (
    <ul className={styles.ulList}>
      <ScheduleInfoCard />
      {roomData &&
        roomData.map((item: any) => <ScheduleInfoCard key={item.id} />)}
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

import React, { useEffect, useState } from 'react';
import styles from './style/createRoom.module.css';
import Label from '../../../components/common/Label/Label';
import MapModal from '../../../components/common/Modal/MapModal/MapModal';
import ReactDatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import 'react-datepicker/dist/react-datepicker.css';
import InvitationList from './InvitationList';
import { IFriendInfo } from '../../../types/friend';
import { IRoomInfo } from '../../../types/room';
import { useRecoilValue } from 'recoil';
import { userInfo } from '../../../recoil/user/user';

const CreateRoom = () => {
  // id?: string;
  // title: string;
  // admin: string;
  // member: IMemberInfo[];
  // date: IDateDetail[];

  const info = useRecoilValue(userInfo);
  const { id, name, email, nickName, image } = info;
  const [roomInfo, setRoomInfo] = useState<IRoomInfo>({
    title: '',
    admin: info.email,
    location: '',
    member: [
      {
        id,
        name,
        email,
        nickName,
        class: 'admin',
        image,
      },
    ],
    date: [],
  });

  const [isModal, setIsModal] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [checkList, setCheckList] = useState<Array<IFriendInfo>>([]);

  console.log(roomInfo);

  const checkListFunction = (list: IFriendInfo[]) => {
    setCheckList(list);
  };

  const changeDateHandler = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const modalHandler = () => {
    setIsModal(!isModal);
  };

  const createRoomHandler = () => {};

  return (
    <div className={styles.main}>
      <h3>Make a plan</h3>
      <div className={styles.formSection}>
        <div className={styles.roomTitleSection}>
          <Label text='방 제목' />
          <input
            className={styles.roomTitleInput}
            placeholder='10글자 이내'
            type='text'
            value={roomInfo.title}
            onChange={(e) => {
              setRoomInfo({ ...roomInfo, title: e.target.value });
            }}
          />
        </div>
        <div className={styles.dateSection}>
          <div className={styles.dateSection2}>
            <Label text='날짜' />
            <ReactDatePicker
              selectsRange={true}
              className={styles.dateInput}
              locale={ko}
              dateFormat='yyyy년 MM월 dd일'
              selected={startDate}
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()}
              onChange={(dates) => {
                changeDateHandler(dates);
              }}
            />
          </div>
        </div>
        <div className={styles.locationSection}>
          <Label text='지역' />
          <input
            className={styles.locationInput}
            type='location'
            value={roomInfo.location}
          />
          <button className={styles.meetingBtn} onClick={modalHandler}>
            meeting
          </button>
        </div>
        <Label text='멤버' />
        <div className={styles.invitationSection}>
          <InvitationList checkListFunction={checkListFunction} />
        </div>
      </div>

      {isModal && (
        <MapModal
          closeModal={modalHandler}
          addr={roomInfo.location}
          setAddr={(lo: string) => {
            setRoomInfo({ ...roomInfo, location: lo });
          }}
        />
      )}
      <button className={styles.createBtn}>생성</button>
    </div>
  );
};

export default CreateRoom;

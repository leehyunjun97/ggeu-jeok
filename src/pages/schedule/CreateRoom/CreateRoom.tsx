import React, { useState } from 'react';
import styles from './style/createRoom.module.css';
import Label from '../../../components/common/Label/Label';
import MapModal from '../../../components/common/Modal/MapModal/MapModal';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import InvitationList from './InvitationList';
import { IFriendInfo } from '../../../types/friend';

const CreateRoom = () => {
  const [isModal, setIsModal] = useState(false);
  const [addr, setAddr] = useState('');

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [checkList, setCheckList] = useState<Array<IFriendInfo>>([]);

  const modalHandler = () => {
    setIsModal(!isModal);
  };

  const checkListFunction = (list: IFriendInfo[]) => {
    setCheckList(list);
  };


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
          />
        </div>
        <div className={styles.dateSection}>
          <div className={styles.dateSection2}>
            <Label text='놀러 가는 날' />
            {/* <input className={styles.dateInput} type='date' /> */}
            <ReactDatePicker
              dateFormat='yyyy년 MM월 dd일'
              className={styles.dateInput}
              selected={startDate}
              onChange={(date: Date) => setStartDate(date)}
              selectsStart
              minDate={new Date()}
              startDate={startDate}
              endDate={endDate}
            />
            <FontAwesomeIcon
              icon={faCalendarDays}
              className={styles.dateIcon}
            />
          </div>
          <div className={styles.dateSection2}>
            <Label text='집에 오는 날' />
            {/* <input className={styles.dateInput} type='date' /> */}
            <ReactDatePicker
              dateFormat='yyyy년 MM월 dd일'
              className={styles.dateInput}
              selected={endDate}
              onChange={(date: Date) => setEndDate(date)}
              selectsEnd
              minDate={new Date()}
              startDate={startDate}
              endDate={endDate}
            />
            <FontAwesomeIcon
              icon={faCalendarDays}
              className={styles.dateIcon}
            />
          </div>
        </div>
        <div className={styles.locationSection}>
          <Label text='지역' />
          <input
            className={styles.locationInput}
            type='location'
            value={addr}
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
        <MapModal closeModal={modalHandler} addr={addr} setAddr={setAddr} />
      )}
      <button>생성</button>
    </div>
  );
};

export default CreateRoom;

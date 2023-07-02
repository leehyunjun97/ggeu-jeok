import React, { useState } from 'react';
import styles from './style/createRoom.module.css';
import Label from '../../../components/common/Label/Label';
import MapModal from '../../../components/common/Modal/MapModal/MapModal';

const CreateRoom = () => {
  const [isModal, setIsModal] = useState(false);
  const [addr, setAddr] = useState('');

  const modalHandler = () => {
    setIsModal(!isModal);
  };

  return (
    <div className={styles.main}>
      <h3>Create a plan</h3>
      {/* 방 제목 ( 10글자 이내 )
          
      */}
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
            <Label text='Departure' />
            <input className={styles.dateInput} type='date' />
          </div>
          <div className={styles.dateSection2}>
            <Label text='Return' />
            <input className={styles.dateInput} type='date' />
          </div>
          {/* <div className={styles.timeSection}>
            <Label text='TIME' />
            <input className={styles.dateInput} type='time' />
          </div> */}
        </div>
        <div className={styles.locationSection}>
          <Label text='Location' />
          <input
            className={styles.locationInput}
            type='location'
            value={addr}
          />
          <button className={styles.meetingBtn} onClick={modalHandler}>
            meeting
          </button>
        </div>
      </div>

      {isModal && (
        <MapModal closeModal={modalHandler} addr={addr} setAddr={setAddr} />
      )}
    </div>
  );
};

export default CreateRoom;

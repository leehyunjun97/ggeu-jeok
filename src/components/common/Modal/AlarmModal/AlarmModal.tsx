import React, { Dispatch, SetStateAction } from 'react';
import styles from './style/alarmModal.module.css';
import AlarmCard from '../../Card/AlarmCard/AlarmCard';
import { escapeKeyDownHandler } from '../../../../utils/common/keyDown';
import { IAlarm } from '../../../../types/alarm';
import { IUserInfo } from '../../../../types/user';
import Button from '../../Button/Button';
import Portal from '../Portal/Portal';

interface IAlarmProps {
  isModal: boolean;
  setIsModal: Dispatch<SetStateAction<boolean>>;
  myInfo: IUserInfo;
}

const AlarmModal = ({ isModal, setIsModal, myInfo }: IAlarmProps) => {
  const modalHandler = () => {
    setIsModal(!isModal);
  };

  return (
    <Portal
      id='modal'
      children={
        <div
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
            escapeKeyDownHandler(e, modalHandler)
          }
          tabIndex={0}
        >
          <div className={styles.modalBackground} onClick={modalHandler}></div>
          <div className={styles.modalSection}>
            <Button.CloseButton onClick={modalHandler} />
            <section className={styles.titleSection}>
              <h4>알림</h4>
            </section>

            <section className={styles.alarmSection}>
              {myInfo.alarm.length > 0 ? (
                <ul style={{ padding: '25px' }}>
                  {myInfo.alarm.map((item: IAlarm) => (
                    <AlarmCard
                      key={item.uuid}
                      alarm={item}
                      myInfo={myInfo}
                      closeModal={modalHandler}
                    />
                  ))}
                </ul>
              ) : (
                <h4 className={styles.zeroAlarm}>알람이 없습니다.</h4>
              )}
            </section>
          </div>
        </div>
      }
    />
  );
};
export default AlarmModal;

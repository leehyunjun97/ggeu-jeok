import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import styles from './style/alarmModal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import AlarmCard from '../../Card/AlarmCard/AlarmCard';
import { escapeKeyDownHandler } from '../../../../utils/common/keyDown';
import { myAlarmsApi } from '../../../../services/alarm/alarm';
import { IAlarm } from '../../../../types/alarm';
import { useRecoilValue } from 'recoil';
import { userInfo } from '../../../../recoil/user/user';
import { objTransArr } from '../../../../utils/common/objectTransformArray';

interface IAlarmProps {
  isModal: boolean;
  setIsModal: Dispatch<SetStateAction<boolean>>;
}

const AlarmModal = ({ isModal, setIsModal }: IAlarmProps) => {
  const [alarmData, setAlarmData] = useState<IAlarm[]>([]);
  const myInfo = useRecoilValue(userInfo);

  useEffect(() => {
    const myAlarmList = async () => {
      const getCom = await myAlarmsApi(myInfo.uuid);
      if (!getCom) {
        return;
      }
      const alarms: IAlarm[] = objTransArr(getCom);
      setAlarmData(alarms);
    };
    myAlarmList();
  }, [myInfo.uuid]);

  const modalHandler = () => {
    setIsModal(!isModal);
  };

  return (
    <div
      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
        escapeKeyDownHandler(e, modalHandler)
      }
      tabIndex={0}
    >
      <div className={styles.modalBackground} onClick={modalHandler}></div>
      <div className={styles.modalSection}>
        <button onClick={modalHandler} className={styles.modalCloseBtn}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <section className={styles.titleSection}>
          <h4>알림</h4>
        </section>

        <section className={styles.alarmSection}>
          {alarmData.length > 0 ? (
            <ul style={{ padding: '25px' }}>
              {alarmData.map((item: IAlarm) => (
                <AlarmCard
                  key={item.uuid}
                  alarm={item}
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
  );
};
export default AlarmModal;

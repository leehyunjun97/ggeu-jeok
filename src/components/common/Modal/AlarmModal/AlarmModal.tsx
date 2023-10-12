import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import styles from './style/alarmModal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import AlarmCard from '../../Card/AlarmCard/AlarmCard';
import { escapeKeyDownHandler } from '../../../../utils/common/keyDown';
import { myAlarmsApi } from '../../../../services/alarm/alarm';
import { IAlarm } from '../../../../types/alarm';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userInfo, userRender } from '../../../../recoil/user/user';
import { objTransArr } from '../../../../utils/common/objectTransformArray';
import { IUserInfo } from '../../../../types/user';
import Button from '../../Button/Button';

interface IAlarmProps {
  isModal: boolean;
  setIsModal: Dispatch<SetStateAction<boolean>>;
  myInfo: IUserInfo;
}

const AlarmModal = ({ isModal, setIsModal, myInfo }: IAlarmProps) => {
  const [alarmData, setAlarmData] = useState<IAlarm[]>([]);
  // const myInfo = useRecoilValue(userInfo);

  useEffect(() => {
    const myAlarmList = async () => {
      const getCom = await myAlarmsApi(myInfo.uuid);
      if (!getCom) {
        return;
      }
      setAlarmData(objTransArr(getCom));
    };
    myAlarmList();
  }, [myInfo]);

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
        <Button.CloseButton onClick={modalHandler} />
        <section className={styles.titleSection}>
          <h4>알림</h4>
        </section>

        <section className={styles.alarmSection}>
          {alarmData && alarmData.length > 0 ? (
            <ul style={{ padding: '25px' }}>
              {alarmData.map((item: IAlarm) => (
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
  );
};
export default AlarmModal;

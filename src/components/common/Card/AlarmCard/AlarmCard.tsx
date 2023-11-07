import styles from './style/alarmCard.module.css';
import { addFriendApi } from '../../../../services/friend/friend';
import { useSetRecoilState } from 'recoil';
import { userRender } from '../../../../recoil/user/user';
import { IUserInfo } from '../../../../types/user';
import { IAlarm } from '../../../../types/alarm';
import {
  friendRequestRefusalApi,
  removeAlarm,
} from '../../../../services/alarm/alarm';
import { dateStringHandler } from '../../../../utils/common/date';
import Button from '../../Button/Button';
import { fromEmail } from '../../../../utils/common/userFindAndTrans';
import { useState } from 'react';
import BackgroundLoading from '../../Loading/BackgroundLoading';

interface IAlarmCardProps {
  alarm: IAlarm;
  closeModal: () => void;
  myInfo: IUserInfo;
}

const AlarmCard = ({ alarm, closeModal, myInfo }: IAlarmCardProps) => {
  const setUserRender = useSetRecoilState(userRender);
  const [isLoading, setIsLoading] = useState(false);

  const addFriendHandler = async () => {
    try {
      setIsLoading(true);

      const sendUser = await fromEmail(alarm.email);

      const [fatchComMy, fatchComYou] = await Promise.all([
        await addFriendApi(myInfo, sendUser),
        await addFriendApi(sendUser, myInfo),
      ]);

      if (fatchComMy.status !== 200 && fatchComYou.status !== 200) {
        return;
      }

      const alarms = fatchComMy.data.alarm.filter(
        (item: IAlarm) => item.uuid !== alarm.uuid
      );
      const delCom = await removeAlarm(fatchComMy.data, alarms);

      if (delCom.status === 200) {
        setUserRender((prev) => !prev);
        closeModal();
      }
    } catch (error) {
      alert('알람 수락 에러!');
    } finally {
      setIsLoading(false);
    }
  };

  const refusalHandler = async () => {
    try {
      setIsLoading(true);
      const sendUser = await fromEmail(alarm.email);
      const postCom = await friendRequestRefusalApi(myInfo, sendUser);
      if (postCom.status === 200) {
        alarmProcessingHandler();
      }
    } catch (error) {
      alert('알람 거절 에러!');
    } finally {
      setIsLoading(false);
    }
  };

  const alarmProcessingHandler = async () => {
    try {
      setIsLoading(true);
      const alarms = myInfo.alarm.filter((item) => item.uuid !== alarm.uuid);
      await removeAlarm(myInfo, alarms);
    } catch (error) {
      alert('알람 확인 에러');
    } finally {
      setUserRender((prev) => !prev);
      setIsLoading(false);
    }
  };

  return (
    <>
      <li className={styles.alarmCardBody}>
        <section className={styles.alarmContentSection}>
          <p>{`${alarm.nickName}(${alarm.email})님이`}</p>
          <p>{alarm.message}</p>
        </section>
        <section className={styles.btnSection}>
          {alarm.type === 'friendRequest' && (
            <Button.ReplyButton
              onClick={addFriendHandler}
              canecelOnClick={refusalHandler}
              disable={isLoading}
              successText='수락'
              cancelText='거절'
            />
          )}
          {alarm.type === 'friendRequestRefusal' && (
            <Button.CheckButton
              onClick={alarmProcessingHandler}
              disable={isLoading}
            />
          )}
        </section>
        <span className={styles.createAtSection}>
          {dateStringHandler(alarm.create_at)}
        </span>
      </li>
      {isLoading && <BackgroundLoading />}
    </>
  );
};

export default AlarmCard;

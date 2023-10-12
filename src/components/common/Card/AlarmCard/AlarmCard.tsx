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

interface IAlarmCardProps {
  alarm: IAlarm;
  closeModal: () => void;
  myInfo: IUserInfo;
}

const AlarmCard = ({ alarm, closeModal, myInfo }: IAlarmCardProps) => {
  const setUserRender = useSetRecoilState(userRender);

  const addFriendHandler = async () => {
    alert('누름');

    const sendUser = await fromEmail(alarm.email);

    const fatchCom: IUserInfo = await addFriendApi(myInfo, sendUser);
    await addFriendApi(sendUser, myInfo);
    setUserRender((prev) => !prev);
    closeModal();

    const alarms = fatchCom.alarm.filter((item) => item.uuid !== alarm.uuid);
    const delCom = await removeAlarm(fatchCom, alarms);
  };

  const refusalHandler = async () => {
    const sendUser = await fromEmail(alarm.email);
    const postCom = await friendRequestRefusalApi(myInfo, sendUser);
    checkHandler();
  };

  const checkHandler = async () => {
    const alarms = myInfo.alarm.filter((item) => item.uuid !== alarm.uuid);
    const delCom = await removeAlarm(myInfo, alarms);
    if (delCom.status === 200) {
      setUserRender((prev) => !prev);
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
              refusalOnClick={refusalHandler}
            />
          )}
          {alarm.type === 'friendRequestRefusal' && (
            <Button.CheckButton onClick={checkHandler} />
          )}
        </section>
        <span className={styles.createAtSection}>
          {dateStringHandler(alarm.create_at)}
        </span>
      </li>
    </>
  );
};

export default AlarmCard;

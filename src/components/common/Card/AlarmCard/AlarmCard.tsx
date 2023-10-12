import styles from './style/alarmCard.module.css';
import { addFriendApi } from '../../../../services/friend/friend';
import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from 'recoil';
import { userInfo, userRender } from '../../../../recoil/user/user';
import { IUserInfo } from '../../../../types/user';
import { IAlarm } from '../../../../types/alarm';
import { getLoginCheckApi } from '../../../../services/user/user';
import { objTransArr } from '../../../../utils/common/objectTransformArray';
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
  // setUserRender: SetterOrUpdater<boolean>;
}

const AlarmCard = ({ alarm, closeModal, myInfo }: IAlarmCardProps) => {
  const setUserRender = useSetRecoilState(userRender);
  // const myInfo = useRecoilValue(userInfo);

  const addFriendHandler = async () => {
    // const data = await getLoginCheckApi(alarm.email);
    // const sendUser: IUserInfo[] = objTransArr(data);

    // if (!myInfo.friend) {
    //   myInfo.friend = [];
    // }
    // if (!sendUser[0].friend) {
    //   sendUser[0] = { ...sendUser[0], friend: [] };
    // }

    const sendUser = await fromEmail(alarm.email);

    await addFriendApi(myInfo, sendUser);
    removeAlarm(myInfo.uuid, alarm.uuid);
    setUserRender((prev) => !prev);
    closeModal();
  };

  const refusalHandler = async () => {
    const sendUser = await fromEmail(alarm.email);
    const postCom = await friendRequestRefusalApi(myInfo, sendUser);
    console.log(postCom);

    // const delCom = await removeAlarm(myInfo.uuid, alarm.uuid);
    // if (delCom.status === 200) {
    //   setUserRender((prev) => !prev);
    // }
    checkHandler();
  };

  const checkHandler = async () => {
    console.log(myInfo);
    const delCom = await removeAlarm(myInfo.uuid, alarm.uuid);
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

  // else if (alarm.type === 'friendRequestRefusal') {
  //   return (
  //     <>
  //       <li className={styles.alarmCardBody}>
  //         <section className={styles.alarmContentSection}>
  //           <p>{`${alarm.nickName}(${alarm.email})님이`}</p>
  //           <p>{alarm.message}</p>
  //         </section>
  //         <section className={styles.btnSection}>
  //           <button className={styles.refusalBtn} onClick={checkHandler}>
  //             확인
  //           </button>
  //         </section>
  //       </li>
  //     </>
  //   );
  // }
};

export default AlarmCard;

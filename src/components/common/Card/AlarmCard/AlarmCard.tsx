import styles from './style/alarmCard.module.css';
import { addFriendApi } from '../../../../services/friend/friend';
import // friendRequestRefusalApi,
// removeAlarm,
'../../../../services/alarm/alarm';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userInfo, userRender } from '../../../../recoil/user/user';
import { IUserInfo } from '../../../../types/user';
import { IAlarm } from '../../../../types/alarm';
import { getLoginCheckApi } from '../../../../services/user/user';
import { objTransArr } from '../../../../utils/common/objectTransformArray';

interface IAlarmCardProps {
  alarm: IAlarm;
  closeModal: () => void;
  myInfo: IUserInfo;
}

const AlarmCard = ({ alarm, closeModal, myInfo }: IAlarmCardProps) => {
  const setUserRender = useSetRecoilState(userRender);

  const addFriendHandler = async () => {
    const data = await getLoginCheckApi(alarm.email);
    const sendUser: IUserInfo[] = objTransArr(data);

    if (!myInfo.friend) {
      myInfo = { ...myInfo, friend: [] };
    }
    if (!sendUser[0].friend) {
      sendUser[0] = { ...sendUser[0], friend: [] };
    }

    await addFriendApi(myInfo, sendUser[0]);
    // removeAlarm(myInfo.email, alarm.id);
    setUserRender((prev) => !prev);
    closeModal();
  };

  // const refusalHandler = async () => {
  //   const postCom = await friendRequestRefusalApi(myInfo.email, alarm.email);
  //   // removeAlarm(myInfo.email, alarm.id);
  //   setUserRender((prev) => !prev);
  // };

  // const checkHandler = () => {
  //   removeAlarm(myInfo.email, alarm.id);
  //   setUserRender((prev) => !prev);
  // };

  if (alarm.type === 'friendRequest') {
    return (
      <>
        <li className={styles.alarmCardBody}>
          <section className={styles.alarmContentSection}>
            <p>{`${alarm.nickName}(${alarm.email})님이`}</p>
            <p>{alarm.message}</p>
          </section>
          <section className={styles.btnSection}>
            <button className={styles.accepBtn} onClick={addFriendHandler}>
              수락
            </button>
            <button className={styles.refusalBtn}>거절</button>
          </section>
        </li>
      </>
    );
  }
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
  else {
    return <></>;
  }
};

export default AlarmCard;

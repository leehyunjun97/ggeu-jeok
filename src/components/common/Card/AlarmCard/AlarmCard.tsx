import styles from './style/alarmCard.module.css';
// import { addFriendApi } from '../../../../services/friend/friend';
import // friendRequestRefusalApi,
// removeAlarm,
'../../../../services/alarm/alarm';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userInfo, userRender } from '../../../../recoil/user/user';
import { IUserInfo } from '../../../../types/user';
import { IAlarm } from '../../../../types/alarm';

interface IAlarmCardProps {
  alarm: IAlarm;
  closeModal: () => void;
  myInfo: IUserInfo;
}

const AlarmCard = ({ alarm, closeModal, myInfo }: IAlarmCardProps) => {
  const setUserRender = useSetRecoilState(userRender);
  // const myInfo = useRecoilValue<IUserInfo>(userInfo);

  const addFriendHandler = async () => {
    // const postCom = await addFriendApi(myInfo, alarm.email);
    // console.log(postCom);
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
            <button className={styles.accepBtn}>수락</button>
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

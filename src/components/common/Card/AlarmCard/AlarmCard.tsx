import styles from './style/alarmCard.module.css';
import { addFriendApi } from '../../../../services/friend/friend';
import { removeAlarm } from '../../../../services/alarm/alarm';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userInfo, userRender } from '../../../../recoil/user/user';
import { IUserInfo } from '../../../../types/user';

const AlarmCard = ({ alarm, closeModal }: any) => {
  const setUserRender = useSetRecoilState(userRender);
  const myInfo = useRecoilValue<IUserInfo>(userInfo);

  const addFriendHandler = async () => {
    const postCom = await addFriendApi(myInfo, alarm.email);
    console.log(postCom);
    removeAlarm(myInfo.email, alarm.id);
    setUserRender((prev) => !prev);
    closeModal();
  };

  const refusalHandler = () => {
    removeAlarm(myInfo.email, alarm.id);
    setUserRender((prev) => !prev);
  };

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
            <button className={styles.refusalBtn} onClick={refusalHandler}>
              거절
            </button>
          </section>
        </li>
      </>
    );
  } else if (alarm.type === 'friendRequestRefusal') {
    return (
      <>
        <li className={styles.alarmCardBody}>
          <section className={styles.alarmContentSection}>
            <p>{`${alarm.nickName}(${alarm.email})님이`}</p>
            <p>{alarm.message}</p>
          </section>
          <section className={styles.btnSection}>
            <button className={styles.refusalBtn} onClick={refusalHandler}>
              확인
            </button>
          </section>
        </li>
      </>
    );
  } else {
    return <></>;
  }
};

export default AlarmCard;

import styles from './style/alarmCard.module.css';
import { addFriendApi } from '../../../../services/friend/friend';
import { removeAlarm } from '../../../../services/alarm/alarm';

const AlarmCard = ({ alarm, closeModal, email }: any) => {
  const addFriendHandler = async () => {
    const postCom = await addFriendApi(email, alarm.email);
    removeAlarm(email, alarm.id);
    closeModal();
  };

  const refusalHandler = () => {
    removeAlarm(email, alarm.id);
    closeModal();
  };

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
};

export default AlarmCard;

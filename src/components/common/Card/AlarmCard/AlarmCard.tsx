import styles from './style/alarmCard.module.css';
import { addFriendApi } from '../../../../services/friend/friend';

const AlarmCard = ({ alarm, closeModal, email }: any) => {
  const addFriendHandler = async () => {
    const postCom = await addFriendApi(email, alarm.email);
    console.log(postCom);
    closeModal();
  };

  const refusalHandler = () => {
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

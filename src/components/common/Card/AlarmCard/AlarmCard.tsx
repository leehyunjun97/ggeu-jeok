import styles from './style/alarmCard.module.css';
import { removeAlarm } from '../../../../services/alarm/alarm';

const AlarmCard = ({ alarm, closeModal }: any) => {
  const addFriendHandler = async () => {
    // const postCom = await postAddFriendApi(
    //   alarm.data.sender,
    //   alarm.data.receiver
    // );
    // console.log(postCom);
    // removeAlarm(alarm.id);
    // closeModal();
  };

  const refusalHandler = async () => {
    await removeAlarm(alarm.id);
    closeModal();
  };

  return (
    <>
      <li className={styles.alarmCardBody}>
        <section className={styles.alarmContentSection}>
          <p>{`${alarm.data.sender}님이`}</p>
          <p>{alarm.message.text}</p>
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

import React from 'react';
import styles from './style/friendInfoCard.module.css';
import bear from './bear.jpg';

const FriendInfoCard = () => {
  return (
    <li className={styles.cardBody}>
      <section className={styles.imageSection}>
        <img src={bear} alt='' className={styles.cardImg} />
      </section>
      <section className={styles.infoSection}>
        <p className={styles.emailP}>dlguswns41@naver.com</p>
        <p className={styles.nickNameP}>몬스터</p>
      </section>
    </li>
  );
};

export default FriendInfoCard;

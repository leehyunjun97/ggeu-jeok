import React from 'react';
import styles from './style/friendInfoCard.module.css';
import bear from './bear.jpg';
import { IUserInfo } from '../../../../types/user';

interface IProps {
  info: IUserInfo;
}

const FriendInfoCard = ({ info }: IProps) => {
  return (
    <li className={styles.cardBody}>
      <section className={styles.imageSection}>
        <img src={bear} alt='' className={styles.cardImg} />
      </section>
      <section className={styles.infoSection}>
        <p className={styles.emailP}>{info.email}</p>
        <p className={styles.nickNameP}>{info.nickName}</p>
      </section>
    </li>
  );
};

export default FriendInfoCard;

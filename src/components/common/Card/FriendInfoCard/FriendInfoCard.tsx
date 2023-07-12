import React from 'react';
import styles from './style/friendInfoCard.module.css';
import bear from './bear.jpg';
import { IUserInfo } from '../../../../types/user';
import { useOutletContext } from 'react-router-dom';
import { postAddFriendApi } from '../../../../services/friend/friend';

interface IProps {
  info: IUserInfo;
  add?: string;
  email?: string;
}

const FriendInfoCard = ({ info, add }: IProps) => {
  const { email }: IProps = useOutletContext();

  // 알람을 먼저 보내야지 씨방새야
  const addFriendHandler = async () => {
    if (add) {
      if (window.confirm('친구추가 하시겠습니까?')) {
        const postCom = await postAddFriendApi(email, info.email);
        console.log(postCom);
      } else {
        return;
      }
    }
  };

  return (
    <li className={styles.cardBody} onClick={addFriendHandler}>
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

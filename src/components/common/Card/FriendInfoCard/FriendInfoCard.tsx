import React, { useState } from 'react';
import styles from './style/friendInfoCard.module.css';
import bear from './bear.jpg';
import { IUserInfo } from '../../../../types/user';
import { useOutletContext } from 'react-router-dom';
import { postAddFriendApi } from '../../../../services/friend/friend';
import ReplyModal from '../../Modal/ReplyModal/ReplyModal';

interface IProps {
  info: IUserInfo;
  add?: string;
  email?: string;
}

const FriendInfoCard = ({ info, add }: IProps) => {
  const [isModal, setIsModal] = useState(false);

  const { email }: IProps = useOutletContext();

  const modalHandler = () => {
    setIsModal(!isModal);
  };

  // 알람을 먼저 보내야지 씨방새야
  const addFriendHandler = async () => {
    if (add) {
      if (window.confirm('친구요청을 보내시겠습니까?')) {
        const postCom = await postAddFriendApi(email, info.email);
        console.log(postCom);
      } else {
        return;
      }
    }
  };

  return (
    <>
      {isModal && (
        <ReplyModal
          closeModal={modalHandler}
          addFriendHandler={addFriendHandler}
          text='친구 요쳥을 보내시겠습니까?'
        />
      )}

      <li className={styles.cardBody} onClick={modalHandler}>
        <section className={styles.imageSection}>
          <img src={bear} alt='' className={styles.cardImg} />
        </section>
        <section className={styles.infoSection}>
          <p className={styles.emailP}>{info.email}</p>
          <p className={styles.nickNameP}>{info.nickName}</p>
        </section>
      </li>
    </>
  );
};

export default FriendInfoCard;

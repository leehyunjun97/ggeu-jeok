import React, { useState } from 'react';
import styles from './style/friendInfoCard.module.css';
import bear from './bear.jpg';
import { IUserInfo } from '../../../../types/user';
import { useOutletContext } from 'react-router-dom';
import ReplyModal from '../../Modal/ReplyModal/ReplyModal';
import { friendRequestApi } from '../../../../services/alarm/alarm';

interface IProps {
  info: IUserInfo;
  add?: string;
  email?: string;
}

const FriendInfoCard = ({ info, add }: IProps) => {
  const [isModal, setIsModal] = useState(false);

  const { email }: IProps = useOutletContext();

  const modalHandler = () => {
    if (add) {
      setIsModal(!isModal);
    }
  };

  const addFriendHandler = async () => {
    const postCom = await friendRequestApi(email, info.email);
    console.log(postCom);
    setIsModal(!isModal);
  };

  return (
    <>
      {isModal && (
        <ReplyModal
          closeModal={modalHandler}
          addFriendHandler={addFriendHandler}
          text='친구 요청을 보내시겠습니까?'
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

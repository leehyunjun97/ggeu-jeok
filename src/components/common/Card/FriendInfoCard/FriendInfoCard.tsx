import React, { useState } from 'react';
import styles from './style/friendInfoCard.module.css';
import { IUserInfo } from '../../../../types/user';
import ReplyModal from '../../Modal/ReplyModal/ReplyModal';
import {
  friendRequestApi,
  friendRequestCheckApi,
} from '../../../../services/alarm/alarm';
import { IFriendInfo } from '../../../../types/friend';
import { useRecoilValue } from 'recoil';
import { userInfo } from '../../../../recoil/user/user';
import { IMemberInfo } from '../../../../types/room';

interface IProps {
  info: IFriendInfo | IUserInfo | IMemberInfo;
  add?: string;
}

const FriendInfoCard = ({ info, add }: IProps) => {
  const [isModal, setIsModal] = useState(false);
  const myinfo = useRecoilValue(userInfo);

  const modalHandler = () => {
    if (add === 'friend') {
      setIsModal(!isModal);
    }
  };

  const addFriendHandler = async () => {
    const check = await friendRequestCheckApi(myinfo.email, info.email);

    if (check.length !== 1) {
      const postCom = await friendRequestApi(myinfo.email, info.email);
      console.log(postCom);

      if (postCom.request.status === 200) {
        setIsModal(!isModal);
      }
    } else {
      alert('이미 요청을 보낸 상태입니다.');
      setIsModal(!isModal);
    }
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
          <img src={info.image} alt='' className={styles.cardImg} />
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

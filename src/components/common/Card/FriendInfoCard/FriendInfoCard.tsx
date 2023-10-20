import React, { useState } from 'react';
import styles from './style/friendInfoCard.module.css';
import { IUserInfo } from '../../../../types/user';
import ReplyModal from '../../Modal/ReplyModal/ReplyModal';
import { friendRequestApi } from '../../../../services/alarm/alarm';
import { IFriendInfo } from '../../../../types/friend';
import { useRecoilValue } from 'recoil';
import { userInfo } from '../../../../recoil/user/user';
import { IMemberInfo } from '../../../../types/room';
import ProfileModal from '../../Modal/ProfileModal/ProfileModal';
import { fromEmail } from '../../../../utils/common/userFindAndTrans';

interface IProps {
  info: IFriendInfo | IUserInfo | IMemberInfo;
  add?: string;
}

const FriendInfoCard = ({ info, add }: IProps) => {
  const [isModal, setIsModal] = useState(false);
  const [isProfileModal, setIsProfileModal] = useState(false);
  const myinfo = useRecoilValue(userInfo);

  const cardClickHandler = () => {
    if (add === 'friend') {
      setIsModal(!isModal);
    } else {
      setIsProfileModal(!isProfileModal);
    }
  };

  const addFriendHandler = async () => {
    const sendUser: IUserInfo = await fromEmail(info.email);

    const alarmOverCheck = sendUser.alarm.filter(
      (item) => item.email === myinfo.email && item.type === 'friendRequest'
    );

    if (alarmOverCheck?.length >= 1) {
      alert('이미 요청을 보낸 상태입니다.');
      setIsModal(!isModal);
      return;
    }

    const postCom = await friendRequestApi(myinfo, sendUser);
    setIsModal(!isModal);
  };

  return (
    <>
      <li className={styles.cardBody} onClick={cardClickHandler}>
        <section className={styles.imageSection}>
          <img src={info.image} alt='' className={styles.cardImg} />
        </section>
        <section className={styles.infoSection}>
          <p className={styles.emailP}>{info.email}</p>
          <p className={styles.nickNameP}>{info.nickName}</p>
        </section>
      </li>
      {isModal && (
        <ReplyModal
          isModal={isModal}
          setIsModal={setIsModal}
          addFriendHandler={addFriendHandler}
          text='친구 요청을 보내시겠습니까?'
        />
      )}
      {isProfileModal && (
        <ProfileModal
          isProfileModal={isProfileModal}
          setIsProfileModal={setIsProfileModal}
          friendInfo={info}
        />
      )}
    </>
  );
};

export default FriendInfoCard;

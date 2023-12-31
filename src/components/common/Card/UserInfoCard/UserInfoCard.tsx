import React, { useEffect, useState } from 'react';
import styles from './style/userInfoCard.module.css';
import { IUserInfo } from '../../../../types/user';
import ReplyModal from '../../Modal/ReplyModal/ReplyModal';
import { alarmPushApi } from '../../../../services/alarm/alarm';
import { IFriendInfo } from '../../../../types/friend';
import { useRecoilValue } from 'recoil';
import { userInfo } from '../../../../recoil/user/user';
import { IMemberInfo } from '../../../../types/room';
import ProfileModal from '../../Modal/ProfileModal/ProfileModal';
import { fromEmail } from '../../../../utils/common/userFindAndTrans';
import BackgroundLoading from '../../Loading/BackgroundLoading';
import Toast from '../../Toast/Toast';
import Img from '../../Img/Img';
import { randomColorFunc } from '../../../../utils/common/randomColor';

interface IProps {
  info: IFriendInfo | IUserInfo | IMemberInfo;
  add?: string;
}

const UserInfoCard = ({ info, add }: IProps) => {
  const [isModal, setIsModal] = useState(false);
  const [isProfileModal, setIsProfileModal] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState<string>();
  const myinfo = useRecoilValue(userInfo);

  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [toastText, setToastText] = useState('');

  useEffect(() => {
    setBackgroundColor(randomColorFunc());
  }, []);

  const cardClickHandler = () => {
    if (add === 'friend') {
      setIsModal(!isModal);
    } else {
      setIsProfileModal(!isProfileModal);
    }
  };

  const addFriendHandler = async () => {
    try {
      setIsLoading(true);
      const sendUser: IUserInfo = await fromEmail(info.email);

      const alarmOverCheck = sendUser.alarm.filter(
        (item) => item.email === myinfo.email && item.type === 'friendRequest'
      );

      if (alarmOverCheck?.length >= 1) {
        alert('이미 요청을 보낸 상태입니다.');
        setIsModal(!isModal);
        return;
      }

      const postCom = await alarmPushApi(
        myinfo,
        sendUser,
        '친구요청을 보냈습니다.',
        'friendRequest'
      );
      if (postCom.status === 200) {
        setToastText('친구요청 보내기 완료!');
        setVisible(!visible);
        setIsModal(!isModal);
      }
    } catch (error) {
      alert('알람 에러!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <li
        className={styles.cardBody}
        onClick={cardClickHandler}
        style={{ backgroundColor }}
      >
        <section className={styles.imageSection}>
          <Img src={info.image} className={'profileImg'} />
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
          successFunc={addFriendHandler}
          text='친구 요청을 보내시겠습니까?'
          isLoading={isLoading}
        />
      )}
      {isProfileModal && (
        <ProfileModal
          isProfileModal={isProfileModal}
          setIsProfileModal={setIsProfileModal}
          friendInfo={info}
        />
      )}
      {visible && (
        <Toast text={toastText} visible={visible} setVisible={setVisible} />
      )}
      {isLoading && <BackgroundLoading />}
    </>
  );
};

export default UserInfoCard;

import React, { useState, useEffect } from 'react';
import styles from './style/main.module.css';
import FriendsList from '../../components/common/Section/FriendsListUl/FriendsList';
import SchedulesUl from '../../components/common/Section/SchedulesUl/SchedulesUl';
import { useOutletContext } from 'react-router-dom';
import { getMyFriendsApi } from '../../services/friend/friend';
import { useRecoilState } from 'recoil';
import { myFriendsList } from '../../recoil/friend/myFriend';

type IProps = {
  email: string;
};

const Main = () => {
  const { email }: IProps = useOutletContext();
  const [friendListRecoil, setFriendListRecoil] = useRecoilState(myFriendsList);
  const [data, setData] = useState();

  useEffect(() => {
    const myFriendsList = async () => {
      setData(await getMyFriendsApi(email));
      setFriendListRecoil(await getMyFriendsApi(email));
    };

    myFriendsList();
  }, [email, setFriendListRecoil]);

  return (
    <div className={styles.main}>
      <section className={styles.mainLeftSection}>
        <span className={styles.friendsListSpan}>친구 목록</span>
        <FriendsList />
      </section>
      <section className={styles.mainRightSection}>
        <span className={styles.scheduleSpan}>계획 일정</span>
        <SchedulesUl />
      </section>
    </div>
  );
};

export default Main;

import React, { useState } from 'react';
import styles from './style/friendList.module.css';
import { IUserInfo } from '../../../../types/user';
import FriendAddModal from '../../Modal/FriendAddModal/FriendAddModal';
import UserInfoCard from '../../Card/UserInfoCard/UserInfoCard';

interface ISearchProps {
  list?: IUserInfo[];
}

const FriendSearchList = ({ list }: ISearchProps) => {
  const [isModal, setIsModal] = useState(false);

  return (
    <>
      <ul className={styles.ulList}>
        {list &&
          list.map((item) => (
            <UserInfoCard key={item.id} info={item} add='friend' />
          ))}
      </ul>
      {isModal && <FriendAddModal isModal={isModal} setIsModal={setIsModal} />}
    </>
  );
};

export default FriendSearchList;

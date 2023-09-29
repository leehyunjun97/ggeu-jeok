import React, { useState } from 'react';
import styles from './style/friendList.module.css';
import { IUserInfo } from '../../../../types/user';
import FriendAddModal from '../../Modal/FriendAddModal/FriendAddModal';
import FriendInfoCard from '../../Card/FriendInfoCard/FriendInfoCard';

interface IProps {
  list?: IUserInfo[];
}

const FriendSearchList = ({ list }: IProps) => {
  const [isModal, setIsModal] = useState(false);

  const modalHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setIsModal(!isModal);
  };

  return (
    <>
      <ul className={styles.ulList}>
        {list &&
          list.map((item) => (
            <FriendInfoCard key={item.id} info={item} add='friend' />
          ))}
      </ul>
      {isModal && <FriendAddModal closeModal={modalHandler} />}
    </>
  );
};

export default FriendSearchList;

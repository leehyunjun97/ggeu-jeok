import React, { useState } from 'react';
import styles from './style/friendList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import FriendAddModal from '../../Modal/FriendAddModal/FriendAddModal';
import FriendInfoCard from '../../Card/FriendInfoCard/FriendInfoCard';
import { IUserInfo } from '../../../../types/user';

interface IProps {
  add?: string;
  list?: IUserInfo[];
}

const FriendsList = ({ add, list }: IProps) => {
  const [isModal, setIsModal] = useState(false);

  const modalHandler = () => {
    setIsModal(!isModal);
  };
  return (
    <>
      <ul className={styles.ulList}>
        {list &&
          list.map((item) => <FriendInfoCard key={item.id} info={item} />)}
        {!add && (
          <li className={styles.plusLi} onClick={modalHandler}>
            <FontAwesomeIcon icon={faPlus} className={styles.plusIcon} />
          </li>
        )}
      </ul>
      {isModal && <FriendAddModal closeModal={modalHandler} />}
    </>
  );
};

export default FriendsList;

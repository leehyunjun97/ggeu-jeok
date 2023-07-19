import React, { useState } from 'react';
import styles from './style/friendList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import FriendAddModal from '../../Modal/FriendAddModal/FriendAddModal';
import FriendInfoCard from '../../Card/FriendInfoCard/FriendInfoCard';
import { IUserInfo } from '../../../../types/user';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userSearch } from '../../../../recoil/search/userSearch';
import { myFriendsList } from '../../../../recoil/friend/myFriend';

interface IProps {
  add?: string;
  list?: IUserInfo[];
}

const FriendsList = ({ add, list }: IProps) => {
  const [isModal, setIsModal] = useState(false);
  const setUserSearchRecoil = useSetRecoilState(userSearch);
  const [friendListRecoil, setFriendListRecoil] = useRecoilState(myFriendsList);


  const modalHandler = () => {
    setIsModal(!isModal);
    if (isModal) {
      setUserSearchRecoil('');
    }
  };

  return (
    <>
      <ul className={styles.ulList}>
        {!list &&
          friendListRecoil.map((item) => (
            <FriendInfoCard key={item.id} info={item} add={add} />
          ))}
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

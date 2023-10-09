import React, { useState } from 'react';
import styles from './style/friendList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import FriendAddModal from '../../Modal/FriendAddModal/FriendAddModal';
import FriendInfoCard from '../../Card/FriendInfoCard/FriendInfoCard';
import { useRecoilValue } from 'recoil';
import { userInfo } from '../../../../recoil/user/user';

const FriendsList = () => {
  const [isModal, setIsModal] = useState(false);
  const info = useRecoilValue(userInfo);

  return (
    <>
      <ul className={styles.ulList}>
        {info.friend &&
          info.friend.map((item) => (
            <FriendInfoCard key={item.id} info={item} />
          ))}

        <li className={styles.plusLi} onClick={() => setIsModal(!isModal)}>
          <FontAwesomeIcon icon={faPlus} className={styles.plusIcon} />
        </li>
      </ul>
      {isModal && <FriendAddModal isModal={isModal} setIsModal={setIsModal} />}
    </>
  );
};

export default FriendsList;

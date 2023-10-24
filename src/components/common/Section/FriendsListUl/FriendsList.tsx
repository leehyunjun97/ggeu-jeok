import React, { useState } from 'react';
import styles from './style/friendList.module.css';
import FriendAddModal from '../../Modal/FriendAddModal/FriendAddModal';
import FriendInfoCard from '../../Card/FriendInfoCard/FriendInfoCard';
import { useRecoilValue } from 'recoil';
import { userInfo } from '../../../../recoil/user/user';
import DefaultInfoCard from '../../Card/FriendInfoCard/DefaultInfoCard';

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

        {/* <li className={styles.plusLi} onClick={() => setIsModal(!isModal)}>
          <FontAwesomeIcon icon={faPlus} className={styles.plusIcon} />
        </li> */}

        {!info.friend?.length && (
          <DefaultInfoCard onClick={() => setIsModal(!isModal)} />
        )}
        <DefaultInfoCard.Add onClick={() => setIsModal(!isModal)} />
      </ul>
      {isModal && <FriendAddModal isModal={isModal} setIsModal={setIsModal} />}
    </>
  );
};

export default FriendsList;

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

        {!info.friend?.length && (
          <DefaultInfoCard onClick={() => setIsModal(!isModal)} />
        )}

        <DefaultInfoCard onClick={() => setIsModal(!isModal)} add={true} />
      </ul>
      {isModal && <FriendAddModal isModal={isModal} setIsModal={setIsModal} />}
    </>
  );
};

export default FriendsList;

import React from 'react';
import styles from './style/friendList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useRecoilValue } from 'recoil';
import { roomInfo } from '../../../../recoil/room/roomInfo';
import FriendInfoCard from '../../Card/FriendInfoCard/FriendInfoCard';

const MembersList = () => {
  const getRoomInfo = useRecoilValue(roomInfo);

  return (
    <>
      <ul className={styles.ulList}>
        {getRoomInfo.member &&
          getRoomInfo.member.map((item) => (
            <FriendInfoCard key={item.id} info={item} />
          ))}

        <li className={styles.plusLi}>
          <FontAwesomeIcon icon={faPlus} className={styles.plusIcon} />
        </li>
      </ul>
    </>
  );
};

export default MembersList;

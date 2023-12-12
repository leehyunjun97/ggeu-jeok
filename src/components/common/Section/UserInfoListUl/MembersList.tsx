import React from 'react';
import styles from './style/friendList.module.css';
import UserInfoCard from '../../Card/UserInfoCard/UserInfoCard';
import { IRoomInfo } from '../../../../types/room';

interface IMembersListProps {
  room: IRoomInfo;
}

const MembersList = ({ room }: IMembersListProps) => {
  return (
    <>
      <ul className={styles.ulList}>
        {room &&
          room.member.map((item) => (
            // member라고 추가해서 정보에서 등급을 바꿀 수 있다던지..
            <UserInfoCard key={item.id} info={item} />
          ))}
      </ul>
    </>
  );
};

export default MembersList;

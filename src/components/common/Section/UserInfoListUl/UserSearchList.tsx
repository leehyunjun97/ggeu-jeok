import React, { useState } from 'react';
import styles from './style/friendList.module.css';
import { IUserInfo } from '../../../../types/user';
import FriendAddModal from '../../Modal/FriendAddModal/FriendAddModal';
import UserInfoCard from '../../Card/UserInfoCard/UserInfoCard';
import Title from '../../Heading/Title';

interface ISearchProps {
  list?: IUserInfo[];
}

const FriendSearchList = ({ list }: ISearchProps) => {
  const [isModal, setIsModal] = useState(false);

  return (
    <>
      <ul className={styles.ulList}>
        {!!list?.length ? (
          list.map((item) => (
            <UserInfoCard key={item.id} info={item} add='friend' />
          ))
        ) : (
          <Title
            text='검색 목록이 없습니다.'
            style={{ marginTop: '40%', marginLeft: '30%' }}
          />
        )}
      </ul>
      {isModal && <FriendAddModal isModal={isModal} setIsModal={setIsModal} />}
    </>
  );
};

export default FriendSearchList;

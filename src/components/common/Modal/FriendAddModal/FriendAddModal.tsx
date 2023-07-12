import React, { useState } from 'react';
import styles from './style/friendAddModal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import FriendsList from '../../Section/FriendsListUl/FriendsList';
import { useFetchUserSearch } from './hooks/useFetchUserSearch';
import { useSetRecoilState } from 'recoil';
import { userSearch } from '../../../../recoil/search/userSearch';
import { useOutletContext } from 'react-router-dom';

type IProps = {
  email: string;
};

const FriendAddModal = ({ closeModal }: any) => {
  const [userSearchState, setUserSearch] = useState('');
  const setUserSearchRecoil = useSetRecoilState(userSearch);
  const email: IProps = useOutletContext();

  const { data, isLoading } = useFetchUserSearch(email);

  return (
    <>
      <div className={styles.modalBackground} onClick={closeModal}></div>
      <div className={styles.modalSection}>
        <button onClick={closeModal} className={styles.modalCloseBtn}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <section className={styles.searchSection}>
          <span className={styles.subTtile}>이메일or닉네임</span>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            style={{ marginRight: '15px', opacity: '0.7', cursor: 'pointer' }}
          />
          <input
            placeholder='ex) monstamp'
            type='text'
            value={userSearchState}
            onChange={(e) => {
              setUserSearch(e.target.value);
            }}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === 'Enter') {
                setUserSearchRecoil(userSearchState);
              }
            }}
          />
        </section>
        <section className={styles.listSection}>
          <FriendsList add={'add'} list={data} />
        </section>
      </div>
    </>
  );
};

export default FriendAddModal;

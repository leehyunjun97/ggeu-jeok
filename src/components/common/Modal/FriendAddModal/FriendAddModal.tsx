import React from 'react';
import styles from './style/friendAddModal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import FriendsList from '../../Section/FriendsListUl/FriendsList';

const FriendAddModal = ({ closeModal }: any) => {
  return (
    <>
      <div className={styles.modalBackground} onClick={closeModal}></div>
      <div className={styles.modalSection}>
        <button onClick={closeModal} className={styles.modalCloseBtn}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <section className={styles.searchSection}>
          <span className={styles.subTtile}>아이디#닉네임</span>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            style={{ marginRight: '15px', opacity: '0.7', cursor: 'pointer' }}
          />
          <input type='text' />
        </section>
        <section className={styles.listSection}>
          <span className={styles.subTtile}>목록</span>
          <FriendsList add={'add'} />
          {/* 같은거 쓰면 안됨 시발려나 새로 추가하는 리스트 만들어야댐 */}
        </section>
      </div>
    </>
  );
};

export default FriendAddModal;

import React from 'react';
import styles from './style/replyModal.module.css';

interface IProps {
  closeModal: any;
  addFriendHandler?: any;
  text: string;
}

const ReplyModal = ({ closeModal, addFriendHandler, text }: IProps) => {
  return (
    <>
      <div className={styles.modalSection}>
        <section className={styles.titleSection}>
          <p>{text}</p>
        </section>
        <section className={styles.replyBtnSection}>
          <button onClick={addFriendHandler}>예</button>
          <button onClick={closeModal}>아니오</button>
        </section>
      </div>
    </>
  );
};

export default ReplyModal;

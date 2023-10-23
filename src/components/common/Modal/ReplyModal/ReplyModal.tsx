import React, { Dispatch, SetStateAction } from 'react';
import styles from './style/replyModal.module.css';
import Potal from '../Potal/Potal';

interface IProps {
  isModal?: boolean;
  setIsModal: Dispatch<SetStateAction<boolean>>;
  addFriendHandler?: any;
  text: string;
}

const ReplyModal = ({
  isModal,
  setIsModal,
  addFriendHandler,
  text,
}: IProps) => {
  const modalHandler = () => {
    setIsModal(!isModal);
  };

  return (
    <Potal
      children={
        <>
          <div className={styles.modalSection}>
            <section className={styles.titleSection}>
              <p>{text}</p>
            </section>
            <section className={styles.replyBtnSection}>
              <button onClick={addFriendHandler}>예</button>
              <button onClick={modalHandler}>아니오</button>
            </section>
          </div>
        </>
      }
    />
  );
};

ReplyModal.SimpleModal = ({ isModal, setIsModal, text }: IProps) => {
  const modalHandler = () => {
    setIsModal(!isModal);
  };
  return (
    <Potal
      children={
        <>
          <div className={styles.modalSection}>
            <section className={styles.titleSection}>
              <p>{text}</p>
            </section>
            <section className={styles.replyBtnSection}>
              <button onClick={modalHandler}>예</button>
            </section>
          </div>
        </>
      }
    />
  );
};

export default ReplyModal;

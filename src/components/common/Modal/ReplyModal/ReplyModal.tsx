import React, { Dispatch, SetStateAction } from 'react';
import styles from './style/replyModal.module.css';
import Portal from '../Portal/Portal';
import Button from '../../Button/Button';

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
    <Portal
      id='modal'
      children={
        <>
          <div className={styles.modalSection}>
            <section className={styles.titleSection}>
              <p>{text}</p>
            </section>
            <section className={styles.replyBtnSection}>
              <Button onClick={addFriendHandler} text={'예'} />
              <Button onClick={modalHandler} text={'아니오'} />
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
    <Portal
      id='modal'
      children={
        <>
          <div className={styles.modalSection}>
            <section className={styles.titleSection}>
              <p>{text}</p>
            </section>
            <section className={styles.replyBtnSection}>
              <Button onClick={modalHandler} text={'예'} />
            </section>
          </div>
        </>
      }
    />
  );
};

export default ReplyModal;

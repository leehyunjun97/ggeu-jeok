import React, { Dispatch, SetStateAction } from 'react';
import styles from './style/replyModal.module.css';
import Portal from '../Portal/Portal';
import Button from '../../Button/Button';

interface IProps {
  isModal?: boolean;
  setIsModal: Dispatch<SetStateAction<boolean>>;
  addFriendHandler?: any;
  text: string;
  isLoading: boolean;
}

const ReplyModal = ({
  isModal,
  setIsModal,
  addFriendHandler,
  text,
  isLoading,
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
              <Button.ReplyButton
                onClick={addFriendHandler}
                canecelOnClick={modalHandler}
                successText='예'
                cancelText='아니오'
              />
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

import React, { useState, Dispatch, SetStateAction } from 'react';
import styles from './style/friendAddModal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useFetchUserSearch } from './hooks/useFetchUserSearch';
import { useSetRecoilState } from 'recoil';
import { userSearch } from '../../../../recoil/search/userSearch';
import FriendSearchList from '../../Section/FriendsListUl/FriendSearchList';
import Button from '../../Button/Button';
import Label from '../../Label/Label';
import {
  enterKeyDownHandler,
  escapeKeyDownHandler,
} from '../../../../utils/common/keyDown';
import Input from '../../Input/Input';

interface IFriendModalIProps {
  isModal?: boolean;
  setIsModal: Dispatch<SetStateAction<boolean>>;
}

const FriendAddModal = ({ isModal, setIsModal }: IFriendModalIProps) => {
  const [userSearchState, setUserSearch] = useState('');
  const setUserSearchRecoil = useSetRecoilState(userSearch);

  const { data, isLoading } = useFetchUserSearch();

  const modalHandler = () => {
    setIsModal(!isModal);
    if (isModal) {
      setUserSearchRecoil('');
    }
  };

  const setUserSearchHandler = () => {
    setUserSearchRecoil(userSearchState);
  };

  return (
    <div
      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
        escapeKeyDownHandler(e, modalHandler)
      }
      tabIndex={0}
    >
      <div className={styles.modalBackground} onClick={modalHandler}></div>
      <div className={styles.modalSection}>
        <Button.CloseButton onClick={modalHandler} />
        <section className={styles.searchSection}>
          <Label text={'닉네임'} className={'search'} />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            style={{ marginRight: '15px', opacity: '0.7', cursor: 'pointer' }}
          />
          <Input
            placeholder='ex) monstamp'
            type='text'
            value={userSearchState}
            onChange={(e) => {
              setUserSearch(e.target.value);
            }}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
              enterKeyDownHandler(e, setUserSearchHandler)
            }
          />
        </section>
        <section className={styles.listSection}>
          {<FriendSearchList list={data} />}
        </section>
      </div>
    </div>
  );
};

export default FriendAddModal;

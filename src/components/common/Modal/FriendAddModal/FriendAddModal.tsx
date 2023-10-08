// import React, { useState } from 'react';
// import styles from './style/friendAddModal.module.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
// import { useFetchUserSearch } from './hooks/useFetchUserSearch';
// import { useSetRecoilState } from 'recoil';
// import { userSearch } from '../../../../recoil/search/userSearch';
// import FriendSearchList from '../../Section/FriendsListUl/FriendSearchList';

// const FriendAddModal = ({ closeModal }: any) => {
//   const [userSearchState, setUserSearch] = useState('');
//   const setUserSearchRecoil = useSetRecoilState(userSearch);

//   const { data, isLoading } = useFetchUserSearch();

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Escape') {
//       closeModal();
//     }
//   };

//   return (
//     <div onKeyDown={handleKeyDown} tabIndex={0}>
//       <div className={styles.modalBackground} onClick={closeModal}></div>
//       <div className={styles.modalSection}>
//         <button onClick={closeModal} className={styles.modalCloseBtn}>
//           <FontAwesomeIcon icon={faXmark} />
//         </button>
//         <section className={styles.searchSection}>
//           <span className={styles.subTtile}>이메일or닉네임</span>
//           <FontAwesomeIcon
//             icon={faMagnifyingGlass}
//             style={{ marginRight: '15px', opacity: '0.7', cursor: 'pointer' }}
//           />
//           <input
//             placeholder='ex) monstamp'
//             type='text'
//             value={userSearchState}
//             onChange={(e) => {
//               setUserSearch(e.target.value);
//             }}
//             onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
//               if (e.key === 'Enter') {
//                 setUserSearchRecoil(userSearchState);
//               }
//             }}
//           />
//         </section>
//         <section className={styles.listSection}>
//           {<FriendSearchList list={data} />}
//         </section>
//       </div>
//     </div>
//   );
// };

// export default FriendAddModal;

import React from 'react';

const FriendAddModal = () => <></>;

export default FriendAddModal;

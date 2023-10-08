// import React, { useState } from 'react';
// import styles from './style/friendList.module.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus } from '@fortawesome/free-solid-svg-icons';
// import FriendAddModal from '../../Modal/FriendAddModal/FriendAddModal';
// import FriendInfoCard from '../../Card/FriendInfoCard/FriendInfoCard';
// import { useRecoilValue, useSetRecoilState } from 'recoil';
// import { userSearch } from '../../../../recoil/search/userSearch';
// import { userInfo } from '../../../../recoil/user/user';

// const FriendsList = () => {
//   const [isModal, setIsModal] = useState(false);
//   const setUserSearchRecoil = useSetRecoilState(userSearch);
//   const info = useRecoilValue(userInfo);

//   const modalHandler = () => {
//     setIsModal(!isModal);
//     if (isModal) {
//       setUserSearchRecoil('');
//     }
//   };

//   return (
//     <>
//       <ul className={styles.ulList}>
//         {info.friend &&
//           info.friend.map((item) => (
//             <FriendInfoCard key={item.id} info={item} />
//           ))}

//         <li className={styles.plusLi} onClick={modalHandler}>
//           <FontAwesomeIcon icon={faPlus} className={styles.plusIcon} />
//         </li>
//       </ul>
//       {isModal && <FriendAddModal closeModal={modalHandler} />}
//     </>
//   );
// };

// export default FriendsList;

import React from 'react';

const FriendsList = () => <></>;

export default FriendsList;

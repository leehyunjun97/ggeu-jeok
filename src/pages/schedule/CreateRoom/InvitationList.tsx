import React from 'react';
import { useRecoilValue } from 'recoil';
import { userInfo } from '../../../recoil/user/user';

const InvitationList = () => {
  const info = useRecoilValue(userInfo);

  console.log(info.friend);

  return (
    <>
      {info.friend &&
        info.friend.map((item) => (
          <label key={item.id}>
            <input type='checkbox' id={item.id} onChange={() => {}} />
            <label htmlFor={item.id}>{item.email}</label>
          </label>
        ))}
    </>
  );
};

export default InvitationList;

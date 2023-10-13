import React, { useCallback, useState, Dispatch, SetStateAction } from 'react';
import { useRecoilValue } from 'recoil';
import { userInfo } from '../../../recoil/user/user';
import { IFriendInfo } from '../../../types/friend';
import { IUserInfo } from '../../../types/user';

interface IInvitaionProps {
  setCheckList: Dispatch<SetStateAction<IFriendInfo[]>>;
  checkList: IFriendInfo[];
  myInfo: IUserInfo;
}

const InvitationList = ({
  setCheckList,
  checkList,
  myInfo,
}: IInvitaionProps) => {
  const onCheckedItem = useCallback(
    (checked: boolean, friend: IFriendInfo) => {
      if (checked) {
        setCheckList((prev) => [...prev, friend]);
      } else if (!checked) {
        setCheckList(checkList.filter((item) => item.id !== friend.id));
      }
    },
    [checkList, setCheckList]
  );

  return (
    <>
      {myInfo.friend &&
        myInfo.friend.map((item) => (
          <label key={item.id}>
            <input
              type='checkbox'
              id={item.id}
              onChange={(e) => {
                onCheckedItem(e.target.checked, item);
              }}
            />
            <label htmlFor={item.id}>{item.email}</label>
          </label>
        ))}
    </>
  );
};

export default InvitationList;

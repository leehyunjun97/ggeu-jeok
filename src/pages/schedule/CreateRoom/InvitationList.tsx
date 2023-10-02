import React, { useCallback, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userInfo } from '../../../recoil/user/user';
import { IFriendInfo } from '../../../types/friend';

const InvitationList = ({ checkListFunction, setList }: any) => {
  const info = useRecoilValue(userInfo);
  const [checkedList, setCheckList] = useState<Array<IFriendInfo>>([]);

  const onCheckedItem = useCallback(
    (checked: boolean, friend: IFriendInfo) => {
      if (checked) {
        setCheckList((prev) => [...prev, friend]);
      } else if (!checked) {
        setCheckList(checkedList.filter((i) => i.id !== friend.id));
      }
      checkListFunction(checkedList);
      
    },
    [checkListFunction, checkedList]
  );

  console.log(checkedList);

  return (
    <>
      {info.friend &&
        info.friend.map((item) => (
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

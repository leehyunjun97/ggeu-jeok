import React, { Dispatch, SetStateAction } from 'react';
import { IFriendInfo } from '../../../types/friend';
import { IUserInfo } from '../../../types/user';
import Input from '../../../components/common/Input/Input';
import Label from '../../../components/common/Label/Label';

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
  const onCheckedItem = (checked: boolean, friend: IFriendInfo) => {
    if (checked) {
      setCheckList((prev) => [...prev, friend]);
    } else if (!checked) {
      setCheckList(checkList.filter((item) => item.id !== friend.id));
    }
  };

  return (
    <>
      {myInfo.friend &&
        myInfo.friend.map((item) => (
          <Label
            key={item.id}
            htmlFor={item.id}
            className={'userCheckboxLabel'}
          >
            <Input.Checkbox
              id={item.id}
              onChange={(e) => {
                onCheckedItem(e.target.checked, item);
              }}
              className={'userCheckbox'}
            />
            <span className={'checkboxSpan'}>{item.email}</span>
          </Label>
        ))}
    </>
  );
};

export default InvitationList;

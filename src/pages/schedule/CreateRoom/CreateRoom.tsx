import React, { useState } from 'react';
import styles from './style/createRoom.module.css';
import Label from '../../../components/common/Label/Label';
import MapModal from '../../../components/common/Modal/MapModal/MapModal';
import ReactDatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import 'react-datepicker/dist/react-datepicker.css';
import InvitationList from './InvitationList';
import { IFriendInfo } from '../../../types/friend';
import { IDateDetail, IMemberInfo, IRoomInfo } from '../../../types/room';
import { useRecoilValue } from 'recoil';
import { userInfo } from '../../../recoil/user/user';

const CreateRoom = () => {
  // room type
  // id?: string;
  // title: string;
  // admin: string;
  // member: IMemberInfo[];
  // date: IDateDetail[];

  const info = useRecoilValue(userInfo);
  const [memberList, setMemberList] = useState<IMemberInfo[]>([]);

  const [roomInfo, setRoomInfo] = useState<IRoomInfo>({
    title: '',
    admin: info.email,
    location: '',
    member: memberList,
    date: [{ dateDetail: '', subTitle: '', content: { one: '' } }],
  });

  // detail date 포맷
  // {
  //   "dateDetail": "2023-08-02",
  //   "subTitle": "오늘은 이거",
  //   "content": {
  //     "0시": "00시",
  //     "1시": "01시"
  //   }
  // },

  const [isModal, setIsModal] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [checkList, setCheckList] = useState<Array<IFriendInfo>>([]);

  const checkListFunction = (list: IFriendInfo[]) => {
    // 하나씩 밀려들어감
    setCheckList(list);
  };

  const changeDateHandler = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const modalHandler = () => {
    setIsModal(!isModal);
  };

  const getDateDiff = () => {
    const nowDate = new Date();
    const date = startDate;
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const dateStr = `${year}-${month}-${day}`;

    const diffDate = startDate.getTime() - endDate.getTime();
    const diffDay = Math.abs(diffDate / (1000 * 60 * 60 * 24));

    nowDate.setDate(startDate.getDate() + 1);

    console.log(nowDate.getDate());
  };

  const memberClassAddHandler = () => {
    checkList.forEach((item) => {
      const { email, nickName, name, image } = item;
      const obj1: IMemberInfo = {
        email,
        class: 'member',
        nickName,
        name,
        image,
      };
      memberList.push(obj1);
      console.log(memberList);
    });
  };

  const createRoomHandler = () => {
    getDateDiff();
  };

  return (
    <div className={styles.main}>
      <h3>Make a plan</h3>
      <div className={styles.formSection}>
        <div className={styles.roomTitleSection}>
          <Label text='방 제목' />
          <input
            className={styles.roomTitleInput}
            placeholder='10글자 이내'
            type='text'
            value={roomInfo.title}
            onChange={(e) => {
              setRoomInfo({ ...roomInfo, title: e.target.value });
            }}
          />
        </div>
        <div className={styles.dateSection}>
          <div className={styles.dateSection2}>
            <Label text='날짜' />
            <ReactDatePicker
              selectsRange={true}
              className={styles.dateInput}
              locale={ko}
              dateFormat='yyyy년 MM월 dd일'
              selected={startDate}
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()}
              onChange={(dates) => {
                changeDateHandler(dates);
              }}
            />
          </div>
        </div>
        <div className={styles.locationSection}>
          <Label text='지역' />
          <input
            className={styles.locationInput}
            type='location'
            value={roomInfo.location}
            readOnly
          />
          <button className={styles.meetingBtn} onClick={modalHandler}>
            meeting
          </button>
        </div>
        <Label text='멤버' />
        <div className={styles.invitationSection}>
          <InvitationList checkListFunction={checkListFunction} />
        </div>
      </div>

      {isModal && (
        <MapModal
          closeModal={modalHandler}
          addr={roomInfo.location}
          setAddr={(lo: string) => {
            setRoomInfo({ ...roomInfo, location: lo });
          }}
        />
      )}
      <button className={styles.createBtn} onClick={createRoomHandler}>
        생성
      </button>
    </div>
  );
};

export default CreateRoom;

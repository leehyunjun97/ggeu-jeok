import React, { useState, useRef, useEffect } from 'react';
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
import { dateStringHandler } from '../../../utils/common/date';
import {
  createMemberInfoObj,
  defaultContent,
  defaultRoomInfo,
} from '../../../constants/room/createRoom';
import Toast from '../../../components/common/Toast/Toast';
import { postCreateRoomApi } from '../../../services/room/room';

const CreateRoom = () => {
  const myInfo = useRecoilValue(userInfo);
  const [roomInfo, setRoomInfo] = useState<IRoomInfo>(defaultRoomInfo());

  const [isModal, setIsModal] = useState(false);
  const [visible, setVisible] = useState(false);
  const [toastText, setToastText] = useState('');

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [checkList, setCheckList] = useState<Array<IFriendInfo>>([]);

  const roomTitleRef = useRef<HTMLInputElement>(null);

  const changeDateHandler = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const modalHandler = () => {
    setIsModal(!isModal);
  };

  const dateDetailAddHandler = () => {
    const MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * 1000;
    const diffDate = startDate.getTime() - endDate.getTime();
    const diffDay = Math.abs(diffDate / MILLISECONDS_IN_A_DAY);

    const arr = Array.from(Array(diffDay + 1), (_, index) => index++);

    const dateDetailArray: IDateDetail[] = arr.map((it) => {
      const nowDate = new Date();
      nowDate.setDate(startDate.getDate() + it);
      const dateObj = {
        id: it + 1,
        dateDetail: dateStringHandler(nowDate),
        subTitle: '제목을 정해주세요!',
        content: defaultContent(),
      };
      return dateObj;
    });
    setRoomInfo((prev) => ({ ...prev, date: dateDetailArray }));
  };

  // console.log(roomInfo.date);

  const memberClassAddHandler = () => {
    const memberList: IMemberInfo[] = [];

    memberList.push(createMemberInfoObj(myInfo, 'admin'));
    checkList.forEach((item) => {
      memberList.push(createMemberInfoObj(item, 'member'));
    });
    return memberList;
  };

  const createRoomHandler = async () => {
    if (roomInfo.title.trim().length < 2) {
      setToastText('방 제목을 입력해주세요');
      setVisible(!visible);
      roomTitleRef.current?.focus();
      return;
    }
    if (roomInfo.location === '') {
      setToastText('지역을 선택해주세요');
      setVisible(!visible);
      return;
    }
    if (!checkList.length) {
      setToastText('멤버를 추가해주세요');
      setVisible(!visible);
      return;
    }

    dateDetailAddHandler();

    // todo
    // info 값들 다 뽑아 내고 얘가 마지막 setState
    // 생성 버튼 한 번 더 누르면 그제서야 값 잘들어감
    setRoomInfo((prev) => ({
      ...prev,
      admin: myInfo.email,
      member: memberClassAddHandler(),
      create_at: new Date(),
      dDay: startDate,
    }));

    console.log(roomInfo);

    try {
      const postCom = await postCreateRoomApi(roomInfo);
      if (postCom.status === 200) {
        // recoil setRoomInfo 해주기
        console.log(postCom);
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
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
            ref={roomTitleRef}
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
        <Label text='멤버 초대' />
        <div className={styles.invitationSection}>
          {!myInfo.friend.length ? (
            <span>친구 만들어</span>
          ) : (
            <InvitationList
              setCheckList={setCheckList}
              checkList={checkList}
              myInfo={myInfo}
            />
          )}
        </div>
      </div>

      <button className={styles.createBtn} onClick={createRoomHandler}>
        생성
      </button>
      {isModal && (
        <MapModal
          closeModal={modalHandler}
          addr={roomInfo.location}
          setAddr={(lo: string) => {
            setRoomInfo({ ...roomInfo, location: lo });
          }}
        />
      )}
      {visible && (
        <Toast text={toastText} visible={visible} setVisible={setVisible} />
      )}
    </div>
  );
};

export default CreateRoom;

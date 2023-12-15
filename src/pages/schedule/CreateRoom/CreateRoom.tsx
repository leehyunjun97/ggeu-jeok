import React, { useState, useRef } from 'react';
import styles from './style/createRoom.module.css';
import Label from '../../../components/common/Label/Label';
import ReactDatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import 'react-datepicker/dist/react-datepicker.css';
import InvitationList from './InvitationList';
import { IFriendInfo } from '../../../types/friend';
import { IDateDetail, ILocation, IMemberInfo, IRoomInfo } from '../../../types/room';
import { useRecoilValue } from 'recoil';
import { userInfo } from '../../../recoil/user/user';
import { dateStringHandler, dffDay } from '../../../utils/common/date';
import {
  defaultContent,
  defaultRoomInfo,
} from '../../../constants/room/createRoom';
import Toast from '../../../components/common/Toast/Toast';
import { postCreateRoomApi } from '../../../services/room/room';
import { createMemberInfoObj } from '../../../utils/room/createRoom';
import Button from '../../../components/common/Button/Button';
import BackgroundLoading from '../../../components/common/Loading/BackgroundLoading';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/common/Input/Input';
import Title from '../../../components/common/Heading/Title';
import MapModal from '../../../components/common/Modal/MapModal/MapModal';
import { IUserInfo } from '../../../types/user';
import { fromEmail } from '../../../utils/common/userFindAndTrans';
import { alarmPushApi } from '../../../services/alarm/alarm';

const CreateRoom = () => {
  const myInfo = useRecoilValue(userInfo);
  const [room, setRoomInfo] = useState<IRoomInfo>(defaultRoomInfo());

  const [isModal, setIsModal] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toastText, setToastText] = useState('');

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [checkList, setCheckList] = useState<Array<IFriendInfo>>([]);
  const navigate = useNavigate();

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
    const diffDay = dffDay(startDate, endDate || startDate);
    const arr = Array.from(Array(diffDay + 1), (_, index) => index++);

    const dateDetailArray: IDateDetail[] = arr.map((it) => {
      const nowDate = new Date(startDate);
      nowDate.setDate(startDate.getDate() + it);
      const dateObj = {
        id: it + 1,
        dateDetail: dateStringHandler(nowDate),
        subTitle: '제목을 정해주세요!',
        content: defaultContent(),
      };
      return dateObj;
    });
    return dateDetailArray;
  };

  const memberClassAddHandler = () => {
    const memberList: IMemberInfo[] = [];

    memberList.push(createMemberInfoObj(myInfo, 'admin'));
    checkList.forEach((item) => {
      memberList.push(createMemberInfoObj(item, 'member'));
    });
    return memberList;
  };

  const createRoomHandler = async () => {
    if (room.title.trim().length < 2) {
      setToastText('방 제목을 입력해주세요');
      setVisible(!visible);
      roomTitleRef.current?.focus();
      return;
    }
    if (room.location.placeName === '') {
      setToastText('지역을 선택해주세요');
      setVisible(!visible);
      return;
    }
    if (!checkList.length) {
      setToastText('멤버를 추가해주세요');
      setVisible(!visible);
      return;
    }

    setIsLoading(true);

    const date = dateDetailAddHandler();
    const member = memberClassAddHandler();

    const payload = {
      ...room,
      admin: myInfo.email,
      member,
      create_at: new Date(),
      dDay: startDate,
      date,
    };

    try {
      const postCom = await postCreateRoomApi(payload);

      payload.member.map(async (item) => {
        let sendUser: IUserInfo = await fromEmail(item.email);
        await alarmPushApi(myInfo, sendUser, '방에 초대 하셨습니다.', 'invite');
      });

      if (postCom.status === 200) {
        navigate(`/main`);
      }
    } catch (error: any) {
      alert('방 생성 에러');
      throw new Error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.main}>
      <Title text={'Make a plan'} />
      <div className={styles.formSection}>
        <div className={styles.roomTitleSection}>
          <Label text='방 제목' />
          <Input
            style={{ width: '60%' }}
            placeholder={'10글자 이내'}
            type={'text'}
            value={room.title}
            onChange={(e) => {
              const title = e.target.value;
              if (title.length <= 10) setRoomInfo({ ...room, title });
            }}
            inputRef={roomTitleRef}
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
          <Input.Location value={room.location.placeName} />
          <Button
            text={'meeting'}
            onClick={modalHandler}
            className={'meetingBtn'}
          />
        </div>
        <Label text='멤버 초대' />
        <div className={styles.invitationSection}>
          {!myInfo.friend.length ? (
            <span className={styles.noneFriend}>친구를 추가해주세요</span>
          ) : (
            <InvitationList
              setCheckList={setCheckList}
              checkList={checkList}
              myInfo={myInfo}
            />
          )}
        </div>
      </div>

      <Button
        className='roomCreateBtn'
        onClick={createRoomHandler}
        disable={isLoading}
        text={'생성'}
      />

      {isModal && (
        <MapModal
          closeModal={modalHandler}
          setAddr={(location: ILocation) => {
            setRoomInfo({ ...room, location });
          }}
        />
      )}
      {visible && (
        <Toast text={toastText} visible={visible} setVisible={setVisible} />
      )}
      {isLoading && <BackgroundLoading />}
    </div>
  );
};

export default CreateRoom;

import React, { useState } from 'react';
import styles from './style/detailSchedule.module.css';
import { useLocation } from 'react-router-dom';
import { IDateDetail, IMemberInfo } from '../../../types/room';
import Input from '../../../components/common/Input/Input';
import Button from '../../../components/common/Button/Button';
import { updateDetailDateContentsApi } from '../../../services/room/room';
import Toast from '../../../components/common/Toast/Toast';

interface IProps {
  myProfile: IMemberInfo;
}

const TitleSection = ({ myProfile }: IProps) => {
  const detailSchedule: IDateDetail = useLocation().state.detailSchedule;
  const roomInfo = useLocation().state.roomInfo;

  const [visible, setVisible] = useState(false);
  const [toastText, setToastText] = useState('');

  const [newTitle, setNewTitle] = useState(detailSchedule.subTitle);
  const [isTitle, setIsTitle] = useState(true);

  const subTitleToggle = () => {
    setNewTitle(detailSchedule.subTitle);
    setIsTitle(!isTitle);
  };

  const updateTitleHandler = async () => {
    // newTitle을 갖고 있는 detailDate
    const newDetail: IDateDetail = {
      ...detailSchedule,
      subTitle: newTitle,
    };

    // 지금 id 이외의 detailDate 리스트
    const otherData: IDateDetail[] = roomInfo.date.filter(
      (item: IDateDetail) => item.id !== detailSchedule.id
    );
    otherData.push(newDetail);

    const patchCom = await updateDetailDateContentsApi(roomInfo, otherData);
    if (patchCom.status === 200) {
      detailSchedule.subTitle = newTitle;
      subTitleToggle();
      setVisible(!visible);
      setToastText('수정되었습니다!');
    }
  };

  return (
    <div className={styles.spanSection}>
      {isTitle ? (
        <span className={styles.subTitle} onClick={subTitleToggle}>
          {detailSchedule.subTitle}
        </span>
      ) : (
        <div className={styles.newTitleInputSection}>
          <Input
            type={'text'}
            onChange={(e) => setNewTitle(e.target.value)}
            value={newTitle}
            readOnly={myProfile.class === 'member'}
            className={'newTitle'}
          />
          <Button
            onClick={updateTitleHandler}
            text={'수정'}
            className={'newTitleUpdateBtn'}
          />
          <Button
            onClick={subTitleToggle}
            text={'취소'}
            className={'newTitleBtn'}
          />
        </div>
      )}
      <span className={styles.scheduleSpan}>세부 일정</span>
      {visible && (
        <Toast text={toastText} visible={visible} setVisible={setVisible} />
      )}
    </div>
  );
};

export default TitleSection;

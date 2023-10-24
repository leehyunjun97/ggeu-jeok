import React, { useState } from 'react';
import styles from './style/detailSchedule.module.css';
import { IDateDetail, IMemberInfo } from '../../../types/room';
import Input from '../../../components/common/Input/Input';
import Button from '../../../components/common/Button/Button';
import Toast from '../../../components/common/Toast/Toast';
import Span from '../../../components/common/Span/Span';
import { useRecoilState, useRecoilValue } from 'recoil';
import { detailScheduleInfo, roomInfo } from '../../../recoil/room/roomInfo';
import BackgroundLoading from '../../../components/common/Loading/BackgroundLoading';
import { updateContentsFunc } from '../../../utils/room/updateContents';

interface IProps {
  myProfile: IMemberInfo;
}

const TitleSection = ({ myProfile }: IProps) => {
  const [detailSchedule, setDetailSchedule] =
    useRecoilState(detailScheduleInfo);
  const room = useRecoilValue(roomInfo);

  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toastText, setToastText] = useState('');

  const [newTitle, setNewTitle] = useState(detailSchedule.subTitle);
  const [isTitle, setIsTitle] = useState(true);

  const subTitleToggle = () => {
    if (myProfile.class === 'member') {
      setVisible(!visible);
      setToastText('관리자만 수정 가능합니다!');
      return;
    }
    setNewTitle(detailSchedule.subTitle);
    setIsTitle(!isTitle);
  };

  const updateTitleHandler = async () => {
    setIsLoading(true);
    const newDetail: IDateDetail = {
      ...detailSchedule,
      subTitle: newTitle,
    };

    updateContentsFunc(room, detailSchedule.id, newDetail, () => {
      setDetailSchedule({ ...detailSchedule, subTitle: newTitle });
      subTitleToggle();
      setVisible(!visible);
      setIsLoading(false);
      setToastText('수정되었습니다!');
    });
  };

  return (
    <div className={styles.spanSection}>
      {isTitle ? (
        <>
          <Span.Title
            text={detailSchedule.subTitle}
            className={`subTitle`}
            onClick={subTitleToggle}
          />
        </>
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
            disable={isLoading}
          />
          <Button
            onClick={subTitleToggle}
            text={'취소'}
            className={'newTitleBtn'}
          />
        </div>
      )}
      <Span text={'세부 일정'} className={'sectionsSpan'} />

      {visible && (
        <Toast text={toastText} visible={visible} setVisible={setVisible} />
      )}
      {isLoading && <BackgroundLoading />}
    </div>
  );
};

export default TitleSection;

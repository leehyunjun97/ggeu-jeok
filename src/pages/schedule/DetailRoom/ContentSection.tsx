import React, { useState, useEffect } from 'react';
import styles from './style/detailSchedule.module.css';
import {
  IDateDetail,
  IDateDetailContent,
  IMemberInfo,
} from '../../../types/room';
import { useRecoilState, useRecoilValue } from 'recoil';
import { detailScheduleInfo, roomInfo } from '../../../recoil/room/roomInfo';
import Toast from '../../../components/common/Toast/Toast';
import { getDetailInfoApi } from '../../../utils/room/myDateDetail';
import {
  updateContents,
  updateContentsFunc,
  updateState,
} from '../../../utils/room/updateContents';
import { noneOrBlock } from '../../../utils/common/displayNoneBlock';
import BackgroundLoading from '../../../components/common/Loading/BackgroundLoading';
import Button from '../../../components/common/Button/Button';
import ReplyModal from '../../../components/common/Modal/ReplyModal/ReplyModal';

interface IProps {
  myProfile: IMemberInfo;
  detailDatePath: string;
}

const ContentSection = ({ myProfile, detailDatePath }: IProps) => {
  const [detailSchedule, setDetailSchedule] =
    useRecoilState(detailScheduleInfo);

  const room = useRecoilValue(roomInfo);
  const [isModal, setIsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getContent = async () => {
      try {
        const data = await getDetailInfoApi(room.uuid, detailDatePath);
        data && setNewContent(data.content);
      } catch (error) {
        console.log(error);
      }
    };
    room.uuid && getContent();
  }, [detailDatePath, room.uuid]);

  const [newContent, setNewContent] = useState<IDateDetailContent[]>(
    detailSchedule.content
  );

  const [visible, setVisible] = useState(false);
  const [toastText, setToastText] = useState('');

  const updateContentByOneHandler = async (newContent: IDateDetailContent) => {
    setIsLoading(true);
    const newDetail: IDateDetail = {
      ...detailSchedule,
      content: updateContents(newContent, detailSchedule),
    };

    updateContentsFunc(room, detailSchedule.id, newDetail, () => {
      setDetailSchedule({ ...detailSchedule, content: newDetail.content });
      setVisible(!visible);
      setIsLoading(false);
      setToastText('수정되었습니다!');
    });
  };

  const updateContentsHandler = async () => {
    setIsLoading(true);
    const newDetail: IDateDetail = {
      ...detailSchedule,
      content: newContent,
    };

    updateContentsFunc(room, detailSchedule.id, newDetail, () => {
      setDetailSchedule({ ...detailSchedule, content: newDetail.content });
      setVisible(!visible);
      setIsLoading(false);
      setIsModal(!isModal);
      setToastText('전체 수정되었습니다!');
    });
  };

  return (
    <>
      <ul className={styles.contentSection}>
        {detailSchedule?.content?.map((item, index) => (
          <li key={item.hour} className={styles.contentLi}>
            <div className={styles.contentLeftSection}>{item.hour}</div>
            <div className={styles.contentRightSection}>
              <textarea
                className={styles.contentTextarea}
                value={newContent[index]?.text}
                readOnly={myProfile && myProfile.class === 'member'}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setNewContent(updateState(newContent, item, e))
                }
              />
              <Button
                text={'수정하기'}
                className={'contentsUpdateBtn'}
                onClick={() => updateContentByOneHandler(newContent[index])}
                style={noneOrBlock(
                  detailSchedule.content[index]?.text,
                  newContent[index]?.text
                )}
                disable={isLoading}
              />
            </div>
          </li>
        ))}
        {visible && (
          <Toast text={toastText} visible={visible} setVisible={setVisible} />
        )}
      </ul>
      <Button
        className={'contentsUpdateBtn'}
        text={'전체 수정'}
        onClick={() => setIsModal(!isModal)}
        style={{ position: 'fixed', bottom: '30px', right: '34px' }}
      />
      {isLoading && <BackgroundLoading />}
      {isModal && (
        <ReplyModal
          isModal={isModal}
          setIsModal={setIsModal}
          successFunc={updateContentsHandler}
          text='전체 내용을 수정하시겠습니까?'
          isLoading={isLoading}
        />
      )}
    </>
  );
};

export default ContentSection;

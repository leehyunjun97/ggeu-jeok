import React, { useState, useEffect } from 'react';
import styles from './style/detailSchedule.module.css';
import {
  IDateDetail,
  IDateDetailContent,
  IMemberInfo,
} from '../../../types/room';
import { updateDetailDateContentsApi } from '../../../services/room/room';
import { useRecoilState, useRecoilValue } from 'recoil';
import { detailScheduleInfo, roomInfo } from '../../../recoil/room/roomInfo';
import Toast from '../../../components/common/Toast/Toast';
import { getDetailInfoApi } from '../../../utils/room/myDateDetail';
import {
  updateContents,
  updateState,
} from '../../../utils/room/updateContents';

interface IProps {
  myProfile: IMemberInfo;
  detailDatePath: string;
}

const ContentSection = ({ myProfile, detailDatePath }: IProps) => {
  const [detailSchedule, setDetailSchedule] =
    useRecoilState(detailScheduleInfo);

  const room = useRecoilValue(roomInfo);

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
    const newDetail: IDateDetail = {
      ...detailSchedule,
      content: updateContents(newContent, detailSchedule),
    };

    const otherData: IDateDetail[] = room.date.filter(
      (item) => item.id !== detailSchedule.id
    );
    otherData.push(newDetail);

    const patchCom = await updateDetailDateContentsApi(room, otherData);

    if (patchCom.status === 200) {
      setDetailSchedule({ ...detailSchedule, content: newDetail.content });
      setVisible(!visible);
      setToastText('수정되었습니다!');
    }
  };

  const updateContentsHandler = async () => {};

  return (
    <>
      <ul className={styles.contentSection}>
        {detailSchedule.content.length !== 0 &&
          detailSchedule.content.map((item, index) => (
            <li key={item.hour} className={styles.contentLi}>
              <div className={styles.contentLeftSection}>{item.hour}</div>
              <div className={styles.contentRightSection}>
                <textarea
                  className={styles.contentTextarea}
                  value={newContent[index].text}
                  readOnly={myProfile && myProfile.class === 'member'}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    setNewContent(updateState(newContent, item, e));
                  }}
                />
                <button
                  className={styles.updateBtn}
                  onClick={() => {
                    updateContentByOneHandler(newContent[index]);
                  }}
                  style={
                    detailSchedule.content[index].text ===
                    newContent[index].text
                      ? { display: 'none' }
                      : { display: 'block' }
                  }
                >
                  수정하기
                </button>
              </div>
            </li>
          ))}
        {visible && (
          <Toast text={toastText} visible={visible} setVisible={setVisible} />
        )}
      </ul>
      <button className={styles.allUpdateBtn}>전체 수정</button>
    </>
  );
};

export default ContentSection;

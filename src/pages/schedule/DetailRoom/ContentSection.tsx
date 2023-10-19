import React, { useState, useEffect } from 'react';
import styles from './style/detailSchedule.module.css';
import {
  IDateDetail,
  IDateDetailContent,
  IMemberInfo,
} from '../../../types/room';
import { useLocation } from 'react-router-dom';
import { updateDetailDateContentsApi } from '../../../services/room/room';
import { useRecoilState, useRecoilValue } from 'recoil';
import { detailScheduleInfo, roomInfo } from '../../../recoil/room/roomInfo';
import Toast from '../../../components/common/Toast/Toast';

interface IProps {
  myProfile: IMemberInfo;
}

const ContentSection = ({ myProfile }: IProps) => {
  const [detailSchedule, setDetailSchedule] =
    useRecoilState(detailScheduleInfo);
  const room = useRecoilValue(roomInfo);

  // 정렬 필요..
  // useEffect(() => {
  //   Object.keys(detailSchedule.content).forEach((key: string) => {
  //     console.log(Number(key.replace('시', '')));
  //   });
  // }, []);

  const [newContent, setNewContent] = useState<IDateDetailContent>(
    detailSchedule.content
  );

  const [visible, setVisible] = useState(false);
  const [toastText, setToastText] = useState('');

  const updateContentByOneHandler = async (
    newContent: string | undefined,
    key: string
  ) => {
    const newDetail: IDateDetail = {
      ...detailSchedule,
      content: {
        ...detailSchedule.content,
        [key]: newContent,
      },
    };

    const otherData: IDateDetail[] = room.date.filter(
      (item: IDateDetail) => item.id !== detailSchedule.id
    );
    otherData.push(newDetail);

    const patchCom = await updateDetailDateContentsApi(room, otherData);

    if (patchCom.status === 200) {
      console.log(patchCom);
      setDetailSchedule({ ...detailSchedule, content: newDetail.content });
      setVisible(!visible);
      setToastText('수정되었습니다!');
    }
  };

  return (
    <ul className={styles.contentSection}>
      {Object.keys(detailSchedule.content).map((key) => (
        <li key={key} className={styles.contentLi}>
          <div className={styles.contentLeftSection}>{key}</div>
          <div className={styles.contentRightSection}>
            <textarea
              className={styles.contentTextarea}
              value={newContent[key]}
              readOnly={myProfile && myProfile.class === 'member'}
              onChange={(e) => {
                setNewContent({ ...newContent, [key]: e.target.value });
              }}
            />
            <button
              className={styles.updateBtn}
              onClick={() => {
                updateContentByOneHandler(newContent[key], key);
              }}
              style={
                detailSchedule.content[key] === newContent[key]
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
  );
};

export default ContentSection;

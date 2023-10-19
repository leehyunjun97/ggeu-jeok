import React, { useState } from 'react';
import styles from './style/detailSchedule.module.css';
import {
  IDateDetail,
  IDateDetailContent,
  IMemberInfo,
} from '../../../types/room';
import { useLocation } from 'react-router-dom';
import {
  updateDetailDateContentsApi,
  updateDetailDateContentsByOneApi,
} from '../../../services/room/room';

interface IProps {
  myProfile: IMemberInfo;
}

const ContentSection = ({ myProfile }: IProps) => {
  const detailSchedule: IDateDetail = useLocation().state.detailSchedule;
  const roomInfo = useLocation().state.roomInfo;

  console.log(detailSchedule.content);

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

    const otherData: IDateDetail[] = roomInfo.date.filter(
      (item: IDateDetail) => item.id !== detailSchedule.id
    );
    otherData.push(newDetail);

    const patchCom = await updateDetailDateContentsApi(roomInfo, otherData);
    if (patchCom.status === 200) {
      detailSchedule.content[key] = newContent;
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
    </ul>
  );
};

export default ContentSection;

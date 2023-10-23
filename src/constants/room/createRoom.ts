import { IDateDetailContent } from '../../types/room';

export const defaultContent = () => {
  let content: IDateDetailContent[] = [];
  for (let i = 0; i <= 24; i++) {
    content = [
      ...content,
      { id: i, hour: `${i}시`, text: '제목을 입력해주세요!' },
    ];
    // content = { ...content, [`${i}시`]: `${i}시` ];
  }

  return content;
};

export const defaultRoomInfo = () => {
  return {
    uuid: '',
    title: '',
    admin: '',
    location: '',
    member: [],
    date: [],
    talk: [],
  };
};

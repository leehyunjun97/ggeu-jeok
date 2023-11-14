import { IDateDetailContent } from '../../types/room';

export const defaultContent = () => {
  const arr = Array.from(Array(25), (_, index) => index++);
  const content: IDateDetailContent[] = arr.map((item) => {
    return { id: item, hour: `${item}시`, text: '내용을 입력해주세요!' };
  });

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

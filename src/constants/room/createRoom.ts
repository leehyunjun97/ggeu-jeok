export const defaultContent = () => {
  let content = {};
  for (let i = 0; i <= 24; i++) {
    content = { ...content, [`${i}시`]: `${i}시` };
  }

  return content;
};



export const defaultRoomInfo = () => {
  return {
    title: '',
    admin: '',
    location: '',
    member: [],
    date: [],
    talk: [],
  };
};

export const objTransArr = <T>(data: { [key: string]: T }) => {
  return Object.keys(data).map((key) => ({
    uuid: key,
    ...data[key],
  }));
};

export const objUuidAdd = <IUserInfo>(data: { [key: string]: IUserInfo }) => {
  const key = Object.keys(data)[0];

  return { ...data[key], uuid: key };
};

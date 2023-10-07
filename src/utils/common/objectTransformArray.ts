export const objTransArr = <T>(data: { [key: string]: T }) => {
  return Object.keys(data).map((key) => ({
    uuid: key,
    ...data[key],
  }));
};

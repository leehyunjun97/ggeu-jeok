export const dateStringHandler = (date: Date) => {
  const year = new Date(date).getFullYear();
  const month = ('0' + (new Date(date).getMonth() + 1)).slice(-2);
  const day = ('0' + new Date(date).getDate()).slice(-2);
  const dateStr = `${year}-${month}-${day}`;
  return dateStr;
};

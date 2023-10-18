const MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * 1000;

export const dateStringHandler = (date: Date) => {
  const year = new Date(date).getFullYear();
  const month = ('0' + (new Date(date).getMonth() + 1)).slice(-2);
  const day = ('0' + new Date(date).getDate()).slice(-2);
  const dateStr = `${year}-${month}-${day}`;
  return dateStr;
};

export const dffday = (startDate: Date, endDate: Date) => {
  const diffDate = startDate.getTime() - endDate.getTime();
  const diffDay = Math.abs(diffDate / MILLISECONDS_IN_A_DAY);
  return diffDay;
};

const MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * 1000;

export const dateStringHandler = (date: Date) => {
  const year = new Date(date).getFullYear();
  const month = ('0' + (new Date(date).getMonth() + 1)).slice(-2);
  const day = ('0' + new Date(date).getDate()).slice(-2);
  const dateStr = `${year}-${month}-${day}`;
  return dateStr;
};

export const dffDay = (startDate: Date, endDate: Date) => {
  const diffDate = startDate.getTime() - endDate.getTime();
  const diffDay = Math.abs(diffDate / MILLISECONDS_IN_A_DAY);
  return diffDay;
};

export const timeStringHandler = (date: Date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const amOrPm = hours >= 12 ? '오후' : '오전';
  const formattedHours = hours % 12 || 12;
  const formattedDate = `${amOrPm} ${formattedHours}:${minutes
    .toString()
    .padStart(2, '0')}`;

  return formattedDate;
};

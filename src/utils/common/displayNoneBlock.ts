export const noneOrBlock = (text: string, text2: string) => {
  return text === text2 ? { display: 'none' } : { display: 'block' };
};

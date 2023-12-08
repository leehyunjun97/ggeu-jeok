import { randomColors } from '../../constants/color/div';

export const randomColorFunc = () => {
  const randomIndex = Math.floor(Math.random() * randomColors.length);
  return randomColors[randomIndex];
};

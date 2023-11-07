import { IUserInfo } from '../../types/user';
import defaultImg from '../../assets/default.png';

export const initialSignUpInputState: IUserInfo = {
  uuid: '',
  id: '',
  email: '',
  password: '',
  name: '',
  nickName: '',
  friend: [],
  alarm: [],
  image: defaultImg,
};

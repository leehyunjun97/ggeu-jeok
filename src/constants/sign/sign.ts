import { IUserInfo } from '../../types/user';

export const initialSignUpInputState: IUserInfo = {
  uuid: '',
  id: '',
  email: '',
  password: '',
  name: '',
  nickName: '',
  friend: [],
  alarm: [],
  alarmIndex: 0,
  image:
    'https://firebasestorage.googleapis.com/v0/b/montamp-be910.appspot.com/o/images%2Fdefault.png?alt=media&token=e67e268a-b4f5-498a-a68e-4cb5a38ebc2e&_gl=1*r2tf3r*_ga*MTY3Mjk4ODAwOC4xNjgzMjY3ODY3*_ga_CW55HF8NVT*MTY5NjE0NjcxNy42LjEuMTY5NjE0NzIyOS41OC4wLjA.',
};

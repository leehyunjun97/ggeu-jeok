import axios from 'axios';
import { IUserInfo } from '../../types/user';
import { getUsersApi } from '../user/user';

// const postEmailCheckApi = async (email: string) => {
//   try {
//     const userList = await getUsersApi();
//     const isEmail = userList.find((item: any) => item.email === email);
//     return isEmail;
//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// };

const postSignupApi = async (signState: IUserInfo) => {
  try {
    const postComplet = await axios.post('http://localhost:4000/user', {
      email: signState.email,
      password: signState.password,
      nickName: signState.nickName,
      name: signState.name,
      image: signState.image,
      friend: [],
      alarm: [],
    });
    return postComplet;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export { postSignupApi };

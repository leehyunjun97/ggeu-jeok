import axios from 'axios';
import { IUserInfo } from '../../types/user';

const getUsersApi = async () => {
  try {
    const getComplet = await axios.get('http://localhost:4000/user');
    return getComplet.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const postEmailCheckApi = async (email: string) => {
  try {
    const userList = await getUsersApi();
    const isEmail = userList.find((item: any) => item.email === email);
    return isEmail;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const postSignupApi = async (signState: IUserInfo) => {
  try {
    const postComplet = await axios.post('http://localhost:4000/user', {
      email: signState.email,
      password: signState.password,
      nickName: signState.nickName,
      name: signState.name,
    });
    return postComplet;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const postUserSearchApi = async (search: string) => {
  try {
    const userList = await getUsersApi();
    const searchList = userList.filter(
      (item: any) => item.email === search || item.nickName === search
    );
    return searchList;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export { getUsersApi, postEmailCheckApi, postSignupApi, postUserSearchApi };

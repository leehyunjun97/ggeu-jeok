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

const notIncludeMyUserList = async (email: string) => {
  try {
    const myFriendsListFunc = async () => {
      const list = await postEmailCheckApi(email);
      return list.friend;
    };

    const userList = await getUsersApi();
    const myFriendsList = await myFriendsListFunc();

    return userList.filter((item: IUserInfo) => item.email !== email);
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

const userSearchApi = async (search: string, email: string) => {
  try {
    const notMyList = async () => {
      return await notIncludeMyUserList(email);
    };

    const list = await notMyList();

    console.log(list);

    return list.filter(
      (item: IUserInfo) => item.email === search || item.nickName === search
    );
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export { getUsersApi, postEmailCheckApi, postSignupApi, userSearchApi };

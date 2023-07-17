import axios from 'axios';
import { IUserInfo } from '../../types/user';
import { IFriendInfo } from '../../types/friend';

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
    const myFriendsList: any = myFriendsListFunc();

    return userList.filter((item: IUserInfo) =>
      myFriendsList.some(
        (it: any) => item.email !== email && it.email !== item.email
      )
    );
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

// const postUserSearchApi = async (search: string, email: string) => {
//   try {
//     const userList = await getUsersApi();
//     const friendList = await postMytFriendsApi(email);
//     const searchList = await userList
//       .filter((item: any) => item.email === search || item.nickName === search)
//       .filter((it: any) => it.email !== email);

//     const a = await searchList.filter((item: IUserInfo) =>
//       friendList.filter((i: any) => i.email !== item.email)
//     );

//     return a;
//   } catch (error: any) {
//     throw new Error(error.message);
//   }
// };

const userSearchApi = async (search: string, email: string) => {
  try {
    const notMyList = async () => {
      return await notIncludeMyUserList(email);
    };
  } catch (error) {}
};

export { getUsersApi, postEmailCheckApi, postSignupApi };

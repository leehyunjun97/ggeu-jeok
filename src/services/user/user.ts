import axios from 'axios';
import { IUserInfo } from '../../types/user';

const getUsersApi = async () => {
  try {
    const getComplet = await axios.get<{ data: { [key: string]: IUserInfo } }>(
      'https://ggeu-jeok-default-rtdb.firebaseio.com/user.json'
    );
    return getComplet.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getMyInfoApi = async (email: string) => {
  try {
    const getComplet = await axios.get(
      `https://ggeu-jeok-default-rtdb.firebaseio.com/user/${email}.json`
    );
    console.log(getComplet.data[0]);
    return getComplet;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const postEmailCheckApi = async (email: string) => {
  try {
    const userList = await getUsersApi();
    // const isEmail = userList.find((item: any) => item.email === email);
    return userList;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const postSignupApi = async (signState: IUserInfo) => {
  console.log(signState);
  try {
    const postComplet = await axios.post(
      'https://ggeu-jeok-default-rtdb.firebaseio.com/user.json',
      {
        id: signState.id,
        email: signState.email,
        password: signState.password,
        nickName: signState.nickName,
        name: signState.name,
        image: signState.image,
      }
    );
    return postComplet;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const userSearchApi = async (search: string) => {
  try {
    const getSearchCom = await axios.get(
      `http://localhost:4000/user?nickName=${search}`
    );

    return getSearchCom.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export {
  getUsersApi,
  postEmailCheckApi,
  postSignupApi,
  userSearchApi,
  getMyInfoApi,
};

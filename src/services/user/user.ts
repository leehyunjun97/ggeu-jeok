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

const getLoginCheckApi = async (email: string) => {
  try {
    const getComplet = await axios.get(
      `https://ggeu-jeok-default-rtdb.firebaseio.com/user.json?orderBy="email"&equalTo="${email}"`
    );
    return getComplet.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getMyInfoApi = async (id: string) => {
  try {
    const getComplet = await axios.get<IUserInfo>(
      `https://ggeu-jeok-default-rtdb.firebaseio.com/user/${id}.json`
    );
    return getComplet.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const userSearchApi = async (search: string) => {
  try {
    const getSearchCom = await axios.get(
      `https://ggeu-jeok-default-rtdb.firebaseio.com/user.json?orderBy="nickName"&equalTo="${search}"`
    );
    return getSearchCom.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export { getUsersApi, userSearchApi, getLoginCheckApi, getMyInfoApi };

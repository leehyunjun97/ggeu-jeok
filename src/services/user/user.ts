import axios from 'axios';
import { IUserInfo } from '../../types/user';
import { firebaseUrl } from '../../constants/url/baseUrl';

const getUsersApi = async () => {
  try {
    const getComplet = await axios.get<{ data: { [key: string]: IUserInfo } }>(
      `${firebaseUrl}/user.json`
    );

    return getComplet.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getLoginCheckApi = async (email: string) => {
  try {
    const getComplet = await axios.get(
      `${firebaseUrl}/user.json?orderBy="email"&equalTo="${email}"`
    );
    return getComplet.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getMyInfoApi = async (id: string) => {
  try {
    const getComplet = await axios.get<IUserInfo>(
      `${firebaseUrl}/user/${id}.json`
    );
    return getComplet.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const userSearchApi = async (search: string) => {
  try {
    const getSearchCom = await axios.get(
      `${firebaseUrl}/user.json?orderBy="nickName"&equalTo="${search}"`
    );
    return getSearchCom.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const imgUpdateApi = async (uuid: string, src: string) => {
  try {
    const putCom = await axios.put(
      `${firebaseUrl}/user/${uuid}/image.json`,
      `"${src}"`
    );
    return putCom;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export {
  getUsersApi,
  userSearchApi,
  getLoginCheckApi,
  getMyInfoApi,
  imgUpdateApi,
};

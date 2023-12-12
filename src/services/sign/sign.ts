import axios from 'axios';
import { IUserInfo } from '../../types/user';
import { firebaseUrl } from '../../constants/url/baseUrl';

const postSignupApi = async (signState: IUserInfo) => {
  try {
    const postComplet = await axios.post(`${firebaseUrl}/user.json`, signState);
    return postComplet;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export { postSignupApi };

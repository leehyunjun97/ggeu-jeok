import axios from 'axios';
import { IUserInfo } from '../../types/user';

const postSignupApi = async (signState: IUserInfo) => {
  try {
    const postComplet = await axios.post(
      'https://ggeu-jeok-default-rtdb.firebaseio.com/user.json',
      signState
    );
    return postComplet;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export { postSignupApi };

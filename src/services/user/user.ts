import axios from 'axios';

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

export { getUsersApi, postEmailCheckApi };

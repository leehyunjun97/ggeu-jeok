import axios from 'axios';
import { IUserInfo } from '../../types/user';
import { getUsersApi } from '../user/user';

const getFriendsApi = async () => {
  try {
    const getComplet = await axios.get('http://localhost:4000/friends');
    return getComplet.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const postMytFriendsApi = async (email: string) => {
  try {
    const friendList = await getFriendsApi();
    const getUserList = await getUsersApi();
    const myFriendsList = friendList.filter((item: any) =>
      item.friend_email === email
        ? ((item.friend_email = item.my_email), (item.my_email = email))
        : item.my_email === email
    );

    console.log(myFriendsList);

    const a = getUserList.filter((item: IUserInfo) =>
      myFriendsList.some((i: any) => i.friend_email === item.email)
    );

    return a;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const postAddFriendApi = async (
  my_email: string | undefined,
  friend_email: string
) => {
  try {
    const postComplet = await axios.post('http://localhost:4000/friends', {
      my_email,
      friend_email,
    });
    return postComplet;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export { getFriendsApi, postMytFriendsApi, postAddFriendApi };

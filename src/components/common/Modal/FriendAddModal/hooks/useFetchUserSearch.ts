import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { userSearch } from '../../../../../recoil/search/userSearch';
import { userSearchApi } from '../../../../../services/user/user';
import { userInfo } from '../../../../../recoil/user/user';
import { objTransArr } from '../../../../../utils/common/objectTransformArray';
import { IUserInfo } from '../../../../../types/user';

export const useFetchUserSearch = () => {
  const search = useRecoilValue(userSearch);
  const myInfo = useRecoilValue(userInfo);

  const { data, isLoading, refetch } = useQuery(
    ['getSearchList', search],
    async () => {
      const postComplet = await userSearchApi(search);

      const userList: IUserInfo[] = objTransArr(postComplet);

      const friendsId = myInfo.friend?.map((item) => item.id);

      const filterUsers = userList.filter(
        (item) => !friendsId?.includes(item.id)
      );

      return filterUsers.filter((item) => myInfo.id !== item.id);
    },
    {
      enabled: !!search,
      refetchOnWindowFocus: false,
    }
  );

  return { data, isLoading, refetch };
};

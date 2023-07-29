import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { userSearch } from '../../../../../recoil/search/userSearch';
import { userSearchApi } from '../../../../../services/user/user';
import { userInfo } from '../../../../../recoil/user/user';

export const useFetchUserSearch = () => {
  const search = useRecoilValue(userSearch);
  const myInfo = useRecoilValue(userInfo);

  const { data, isLoading, refetch } = useQuery(
    ['getSearchList', search],
    async () => {
      const postComplet = await userSearchApi(search);

      const filterId = myInfo.friend?.map((item) => item.id);
      const aa = postComplet.filter(
        (item: any) => !filterId?.includes(item.id)
      );

      return aa;
    },
    {
      enabled: !!search,
      refetchOnWindowFocus: false,
      useErrorBoundary: true,
      cacheTime: 5 * 10 * 1000,
      staleTime: 5 * 10 * 1000,
    }
  );

  return { data, isLoading, refetch };
};

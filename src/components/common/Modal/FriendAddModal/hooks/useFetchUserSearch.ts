import { useQuery } from 'react-query';
import { postUserSearchApi } from '../../../../../services/user/user';
import { useRecoilValue } from 'recoil';
import { userSearch } from '../../../../../recoil/search/userSearch';

export const useFetchUserSearch = () => {
  const search = useRecoilValue(userSearch);

  const { data, isLoading } = useQuery(
    ['getSearchList', search],
    async () => {
      const postComplet = await postUserSearchApi(search);
      return postComplet;
    },
    {
      enabled: !!search,
      refetchOnWindowFocus: false,
      useErrorBoundary: true,
      cacheTime: 5 * 10 * 1000,
      staleTime: 5 * 10 * 1000,
    }
  );

  return { data, isLoading };
};

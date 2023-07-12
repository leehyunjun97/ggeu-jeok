import { useQuery } from 'react-query';

export const useFetchMyFriendsList = () => {
  const { data, isLoading } = useQuery(['getFriendsList']);
  return { data, isLoading };
};

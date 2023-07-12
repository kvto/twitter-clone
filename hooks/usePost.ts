import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

const usePost = (postId: string) => {
  const { data, error, isLoading, mutate } = useSWR(postId ? `/api/post/${postId}` : null, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default usePost;

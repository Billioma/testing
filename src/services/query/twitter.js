import { useQuery } from "react-query";
import * as queryKey from "../queryKeys";
import { getTweets, getUser } from "../api/twitter";

export const useGetUser = (options = {}) => {
  const { data, isLoading, refetch } = useQuery(queryKey.GET_USER, getUser, {
    ...options,
  });

  return { data, isLoading, refetch };
};

export const useGetTweets = (options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    queryKey.GET_TWEETS,
    getTweets,
    {
      ...options,
    }
  );

  return { data, isLoading, refetch };
};

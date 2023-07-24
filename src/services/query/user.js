import { useQuery } from "react-query";
import { getUser, getUserSubscriptions } from "../api/user";

export const useGetUser = (options = {}) => {
  const { data, isLoading, refetch } = useQuery("GET_USER", getUser, {
    ...options,
  });

  return { data, isLoading, refetch };
};

export const useGetUserSubscriptions = (options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    "GET_USER_SUBSCRIPTIONS",
    getUserSubscriptions,
    {
      ...options,
    }
  );

  return { data, isLoading, refetch };
};

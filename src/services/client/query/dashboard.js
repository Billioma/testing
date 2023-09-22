import { useQuery } from "react-query";
import { getEventCount, getSubCount, getUserCount } from "../api/dashboard";

export const useGetUserCount = (options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    "GET_USERS_COUNT",
    getUserCount,
    {
      ...options,
    }
  );

  return { data, isLoading, refetch };
};

export const useGetSubCount = (options = {}) => {
  const { data, isLoading, refetch } = useQuery("GET_SUB_COUNT", getSubCount, {
    ...options,
  });

  return { data, isLoading, refetch };
};

export const useGetEventCount = (options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    "GET_EVENTS_COUNT",
    getEventCount,
    {
      ...options,
    }
  );

  return { data, isLoading, refetch };
};

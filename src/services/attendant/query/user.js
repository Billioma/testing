import { useQuery } from "react-query";
import { getUser, getUserZones } from "../api/user";

export const useGetUser = (options = {}) => {
  const { data, isLoading, refetch } = useQuery("GET_ATT_USER", getUser, {
    ...options,
  });

  return { data, isLoading, refetch };
};

export const useGetUserZones = (id, options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    ["getUserZones", id],
    getUserZones,
    {
      enabled: !!id,
      ...options,
    },
  );

  return { data, isLoading, refetch };
};

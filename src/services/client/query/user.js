import { useQuery } from "react-query";
import { getCards, getClientDetails } from "../api/user";

export const useGetClientDetails = (options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    "GET_CLIENT_DETAILS",
    getClientDetails,
    {
      ...options,
    }
  );

  return { data, isLoading, refetch };
};

export const useGetClientCards = (options = {}) => {
  const { data, isLoading, refetch } = useQuery("GET_CARDS", getCards, {
    ...options,
  });

  return { data, isLoading, refetch };
};

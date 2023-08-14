import { useQuery } from "react-query";
import { getClientDetails } from "../api/user";

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

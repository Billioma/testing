import { useQuery } from "react-query";
import { getCustomers } from "../api/users";

export const useGetAllCustomers = (options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_ALL_CUSTOMERS"],
    () => getCustomers(1, 1000000),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

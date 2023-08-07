import { useQuery } from "react-query";
import { getAttendants, getCustomers } from "../api/users";

export const useGetAttendants = (options = {}, page, limit) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_ATTENDANTS", page, limit],
    () => getAttendants(page, limit),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useGetCustomers = (options = {}, page, limit) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_CUSTOMERS", page, limit],
    () => getCustomers(page, limit),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

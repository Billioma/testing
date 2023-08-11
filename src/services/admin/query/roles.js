import { useQuery } from "react-query";
import { getRoles } from "../api/roles";

export const useGetAllRoles = (options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_ALL_ROLES"],
    () => getRoles(1, 10000),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

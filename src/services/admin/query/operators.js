import { useQuery } from "react-query";
import { getOperators } from "../api/operators";

export const useGetAllOperators = (options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_ALL_OPERATORS"],
    () => getOperators(1, 10000),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

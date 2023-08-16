import { useQuery } from "react-query";
import { getLocations } from "../api/locations";

export const useGetAllLocations = (options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_ALL_LOCATIONS"],
    () => getLocations(1, 10000),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

import { useMutation, useQuery } from "react-query";
import { getAmenities } from "../api/amenities";

export const useGetAmenities = (options = {}, page = 1, limit = 25) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_CLIENTS"],
    () => getAmenities(page, limit),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

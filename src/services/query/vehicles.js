import { useQuery } from "react-query";
import { getVehicles } from "../api/vehicles";

export const useGetVehicles = (options = {}) => {
  const { data, isLoading, refetch } = useQuery("GET_VEHICLES", getVehicles, {
    ...options,
  });

  return { data, isLoading, refetch };
};

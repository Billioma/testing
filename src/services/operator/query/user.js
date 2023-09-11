import { useQuery } from "react-query";
import { getOperatorLocation, getOperatorProfile } from "../api/user";

export const useGetOperatorProfile = (options = {}) => {
  const { data, isLoading, refetch } = useQuery("PROFILE", getOperatorProfile, {
    ...options,
  });

  return { data, isLoading, refetch };
};

export const useGetOperatorLocation = (options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    "OPERATOR_LOCATION",
    getOperatorLocation,
    {
      ...options,
    }
  );

  return { data, isLoading, refetch };
};

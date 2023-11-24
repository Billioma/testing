import { useMutation, useQuery } from "react-query";
import {
  getOperatorLocation,
  getOperatorProfile,
  updateOperatorPassword,
  updateOperatorProfile,
} from "../api/user";

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

export const useUpdateOpProfile = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(updateOperatorProfile, {
    mutationKey: "UPDATE_OP_PROFILE",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useUpdateOpPassword = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(updateOperatorPassword, {
    mutationKey: "UPDATE_OP_PASSWORD",
    ...options,
  });
  return { mutate, isLoading, data };
};

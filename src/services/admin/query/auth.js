import { useMutation, useQuery } from "react-query";
import {
  login,
  getProfile,
  updateAdminProfile,
  updateAdminPassword,
} from "../api/auth";

export const useLogin = (options = {}) => {
  const { mutate, isLoading } = useMutation(login, {
    mutationKey: "LOGIN",
    ...options,
  });

  return { mutate, isLoading };
};

export const useUpdateAdminProfile = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(updateAdminProfile, {
    mutationKey: "UPDATE_ADMIN_PROFILE",
    ...options,
  });

  return { mutate, isLoading, data };
};

export const useUpdateAdminPassword = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(updateAdminPassword, {
    mutationKey: "UPDATE_ADMIN_PASSWORD",
    ...options,
  });

  return { mutate, isLoading, data };
};

export const useGetProfile = (options = {}) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["GET_PROFILE"],
    queryFn: getProfile,
    options,
  });

  return { data, isLoading, refetch };
};

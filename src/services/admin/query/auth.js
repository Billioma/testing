import { useMutation, useQuery } from "@tanstack/react-query";
import { login, getProfile } from "../api/auth";

export const useLogin = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(login, {
    mutationKey: "LOGIN",
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

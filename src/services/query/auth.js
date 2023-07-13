import { useMutation } from "react-query";
import { login, register, resetPassword, updatePassword } from "../api/auth";

export const useLogin = (options = {}) => {
  const { mutate, isLoading } = useMutation(login, {
    mutationKey: "LOGIN",
    ...options,
  });
  return { mutate, isLoading };
};

export const useResetPassword = (options = {}) => {
  const { mutate, isLoading } = useMutation(resetPassword, {
    mutationKey: "RESET_PASSWORD",
    ...options,
  });
  return { mutate, isLoading };
};

export const useUpdatePassword = (options = {}) => {
  const { mutate, isLoading } = useMutation(updatePassword, {
    mutationKey: "UPDATE_PASSWORD",
    ...options,
  });
  return { mutate, isLoading };
};

export const useRegister = (options = {}) => {
  const { mutate, isLoading } = useMutation(register, {
    mutationKey: "REGISTER",
    ...options,
  });
  return { mutate, isLoading };
};

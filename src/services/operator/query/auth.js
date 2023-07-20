import { useMutation } from "react-query";
import { login, resetPassword, updatePassword } from "../api/auth";

export const useLogin = (options = {}) => {
  const { mutate, isLoading } = useMutation(login, {
    mutationKey: "OPERATOR_LOGIN",
    ...options,
  });
  return { mutate, isLoading };
};

export const useResetPassword = (options = {}) => {
  const { mutate, isLoading } = useMutation(resetPassword, {
    mutationKey: "OPERATOR_RESET_PASSWORD",
    ...options,
  });
  return { mutate, isLoading };
};

export const useUpdatePassword = (options = {}) => {
  const { mutate, isLoading } = useMutation(updatePassword, {
    mutationKey: "OPERATOR_UPDATE_PASSWORD",
    ...options,
  });
  return { mutate, isLoading };
};

import { useMutation } from "react-query";
import {
  clientLogin,
  clientResetPassword,
  clientUpdatePassword,
} from "../api/auth";

export const useClientLogin = (options = {}) => {
  const { mutate, isLoading } = useMutation(clientLogin, {
    mutationKey: "CLIENT_LOGIN",
    ...options,
  });
  return { mutate, isLoading };
};

export const useClientResetPassword = (options = {}) => {
  const { mutate, isLoading } = useMutation(clientResetPassword, {
    mutationKey: "CLIENT_RESET_PASSWORD",
    ...options,
  });
  return { mutate, isLoading };
};

export const useClientUpdatePassword = (options = {}) => {
  const { mutate, isLoading } = useMutation(clientUpdatePassword, {
    mutationKey: "CLIENT_UPDATE_PASSWORD",
    ...options,
  });
  return { mutate, isLoading };
};

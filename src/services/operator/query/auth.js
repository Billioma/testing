import { useMutation } from "react-query";
import {
  operatorLogin,
  operatorResetPassword,
  operatorUpdatePassword,
} from "../api/auth";

export const useOperatorLogin = (options = {}) => {
  const { mutate, isLoading } = useMutation(operatorLogin, {
    mutationKey: "OPERATOR_LOGIN",
    ...options,
  });
  return { mutate, isLoading };
};

export const useOperatorResetPassword = (options = {}) => {
  const { mutate, isLoading } = useMutation(operatorResetPassword, {
    mutationKey: "OPERATOR_RESET_PASSWORD",
    ...options,
  });
  return { mutate, isLoading };
};

export const useOperatorUpdatePassword = (options = {}) => {
  const { mutate, isLoading } = useMutation(operatorUpdatePassword, {
    mutationKey: "OPERATOR_UPDATE_PASSWORD",
    ...options,
  });
  return { mutate, isLoading };
};

import { useMutation } from "react-query";
import {
  customerLogin,
  customerRegister,
  customerResetPassword,
  customerUpdatePassword,
  operatorLogin,
  operatorResetPassword,
  operatorUpdatePassword,
} from "../api/auth";

export const useCustomerLogin = (options = {}) => {
  const { mutate, isLoading } = useMutation(customerLogin, {
    mutationKey: "CUSTOMER_LOGIN",
    ...options,
  });
  return { mutate, isLoading };
};

export const useCustomerResetPassword = (options = {}) => {
  const { mutate, isLoading } = useMutation(customerResetPassword, {
    mutationKey: "CUSTOMER_RESET_PASSWORD",
    ...options,
  });
  return { mutate, isLoading };
};

export const useCustomerUpdatePassword = (options = {}) => {
  const { mutate, isLoading } = useMutation(customerUpdatePassword, {
    mutationKey: "CUSTOMER_UPDATE_PASSWORD",
    ...options,
  });
  return { mutate, isLoading };
};

export const useCustomerRegister = (options = {}) => {
  const { mutate, isLoading } = useMutation(customerRegister, {
    mutationKey: "CUSTOMER_REGISTER",
    ...options,
  });
  return { mutate, isLoading };
};

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

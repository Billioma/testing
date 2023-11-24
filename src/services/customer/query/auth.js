import { useMutation, useQuery } from "react-query";
import {
  customerLogin,
  customerRegister,
  customerResetPassword,
  customerUpdatePassword,
  getPublicMakes,
  getPublicModels,
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

export const useGetPublicMakes = (options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    "PUBLCI_MAKES",
    getPublicMakes,
    {
      ...options,
    }
  );

  return { data, isLoading, refetch };
};

export const useGetPublicModels = (options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    "PUBLCI_MODELS",
    getPublicModels,
    {
      ...options,
    }
  );

  return { data, isLoading, refetch };
};

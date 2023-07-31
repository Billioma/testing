import { useMutation, useQuery } from "react-query";
import {
  customerCreateSubscription,
  customerUpdatePassword,
  customerUpdateUser,
  customerUploadPic,
  getUser,
  getUserSub,
  getUserSubscriptions,
} from "../api/user";

export const useGetUser = (options = {}) => {
  const { data, isLoading, refetch } = useQuery("GET_USER", getUser, {
    ...options,
  });

  return { data, isLoading, refetch };
};

export const useGetUserSubscriptions = (options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    "GET_USER_SUBSCRIPTIONS",
    getUserSubscriptions,
    {
      ...options,
    }
  );

  return { data, isLoading, refetch };
};

export const useCustomerUpdateUser = (options = {}) => {
  const { mutate, isLoading } = useMutation(customerUpdateUser, {
    mutationKey: "CUSTOMER_UPDATE_USER",
    ...options,
  });
  return { mutate, isLoading };
};

export const useGetUserSub = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getUserSub, {
    mutationKey: "GET_SUBSCRIPTIONS",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useCustomerUploadPic = (options = {}) => {
  const { mutate, isLoading } = useMutation(customerUploadPic, {
    mutationKey: "UPLOAD_PIC",
    ...options,
  });
  return { mutate, isLoading };
};

export const useCustomerUpdatePassword = (options = {}) => {
  const { mutate, isLoading } = useMutation(customerUpdatePassword, {
    mutationKey: "UPDATE_PASSWORD",
    ...options,
  });
  return { mutate, isLoading };
};

export const useCustomerCreateSubscription = (options = {}) => {
  const { mutate, isLoading } = useMutation(customerCreateSubscription, {
    mutationKey: "CREATE_SUBSCRIPTION",
    ...options,
  });
  return { mutate, isLoading };
};

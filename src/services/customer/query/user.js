import { useMutation, useQuery } from "react-query";
import {
  customerCreateSubscription,
  customerFundWallet,
  customerUpdatePassword,
  customerUpdateUser,
  customerUploadPic,
  deleteCard,
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

export const useGetUserSub = (limit = "", page = "", options = {}) => {
  const { mutate, isLoading, data } = useQuery(
    ["GET_SUBSCRIPTIONS", limit, page],
    getUserSub,
    {
      ...options,
    }
  );

  return { mutate, isLoading, data };
};

export const useCustomerUploadPic = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(customerUploadPic, {
    mutationKey: "UPLOAD_PIC",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useDeleteCard = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(deleteCard, {
    mutationKey: "DELETE_CARD",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useCustomerUpdatePassword = (options = {}) => {
  const { mutate, isLoading } = useMutation(customerUpdatePassword, {
    mutationKey: "UPDATE_PASSWORD",
    ...options,
  });
  return { mutate, isLoading };
};

export const useCustomerFundWallet = (options = {}) => {
  const { mutate, isLoading } = useMutation(customerFundWallet, {
    mutationKey: "FUND_WALLET",
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

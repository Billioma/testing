import { useMutation, useQuery } from "react-query";
import {
  adminUpdateUser,
  cancelSub,
  customerCreateSubscription,
  customerFundWallet,
  customerUpdatePassword,
  customerUpdatePreference,
  customerUpdateUser,
  customerUploadPic,
  deleteCard,
  getFaq,
  getPreference,
  getUser,
  getUserSub,
  getUserSubs,
  getUserSubscriptions,
  renewSub,
  sendMail,
} from "../api/user";

export const useGetUser = (options = {}) => {
  const { data, isLoading, refetch } = useQuery("GET_USER", getUser, {
    ...options,
  });

  return { data, isLoading, refetch };
};

export const useGetFaq = (options = {}) => {
  const { data, isLoading, refetch } = useQuery("GET_FAQ", getFaq, {
    ...options,
  });

  return { data, isLoading, refetch };
};

export const useGetPreference = (options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    "GET_PREFERENCE",
    getPreference,
    {
      ...options,
    }
  );

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

export const useAdminUpdateUser = (options = {}) => {
  const { mutate, isLoading } = useMutation(adminUpdateUser, {
    mutationKey: "ADMIN_UPDATE_USER",
    ...options,
  });
  return { mutate, isLoading };
};

export const useGetUserSubs = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getUserSubs, {
    mutationKey: "GET_USER_SUBS",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useCustomerUpdatePreference = (options = {}) => {
  const { mutate, isLoading } = useMutation(customerUpdatePreference, {
    mutationKey: "CUSTOMER_UPDATE_PREFERENCE",
    ...options,
  });
  return { mutate, isLoading };
};

export const useGetUserSub = (
  limit = "",
  page = "",
  filters = [],
  options = {}
) => {
  const { isLoading, data, refetch } = useQuery(
    ["GET_SUBSCRIPTIONS", limit, page, filters], // Include filters in the query key
    getUserSub,
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useCancelSub = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(cancelSub, {
    mutationKey: "CANCEL_SUB",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useSendMail = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(sendMail, {
    mutationKey: "SEND_MAIL",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useRenewSub = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(renewSub, {
    mutationKey: "RENEW_SUB",
    ...options,
  });
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

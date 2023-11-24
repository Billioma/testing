import { useMutation, useQuery } from "react-query";
import { getCards, getPaymentHistory, getPaymentTips } from "../api/payment";

export const useGetPaymentHistory = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getPaymentHistory, {
    mutationKey: "GET_PAYMENT_HISTORY",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetPaymentTips = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getPaymentTips, {
    mutationKey: "GET_PAYMENT_TIPS",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetCards = (options = {}) => {
  const { data, isLoading, refetch } = useQuery("GET_CARDS", getCards, {
    ...options,
  });

  return { data, isLoading, refetch };
};

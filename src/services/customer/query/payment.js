import { useMutation, useQuery } from "react-query";
import { getCards, getPaymentHistory } from "../api/payment";

export const useGetPaymentHistory = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getPaymentHistory, {
    mutationKey: "GET_PAYMENT_HISTORY",
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

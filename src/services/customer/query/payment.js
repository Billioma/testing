import { useQuery } from "react-query";
import { getCards, getPaymentHistory } from "../api/payment";

export const useGetPaymentHistory = (limit = "", page = "", options = {}) => {
  const { isLoading, data } = useQuery(
    ["GET_PAYMENT_HISTORY", limit, page],
    getPaymentHistory,
    {
      ...options,
    }
  );

  return { isLoading, data };
};

export const useGetCards = (options = {}) => {
  const { data, isLoading, refetch } = useQuery("GET_CARDS", getCards, {
    ...options,
  });

  return { data, isLoading, refetch };
};

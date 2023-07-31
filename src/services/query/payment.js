import { useMutation } from "react-query";
import { getPaymentHistory } from "../api/payment";

export const useGetPaymentHistory = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getPaymentHistory, {
    mutationKey: "GET_PAYMENT_HISTORY",
    ...options,
  });
  return { mutate, isLoading, data };
};

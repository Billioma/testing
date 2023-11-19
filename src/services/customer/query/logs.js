import { useMutation } from "react-query";
import { getCustomerServiceLogs } from "../api/logs";

export const useGetCustomerServiceLog = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getCustomerServiceLogs, {
    mutationKey: "GET_CUST_SERVICE_LOG_DETAILS",
    ...options,
  });
  return { mutate, isLoading, data };
};

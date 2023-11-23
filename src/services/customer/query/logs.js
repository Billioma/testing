import { useQuery } from "react-query";
import { getCustomerServiceLogs } from "../api/logs";

export const useGetCustomerServiceLog = (
  options = {},
  type = "",
  page = 1,
  limit = 25,
) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_CUST_SERVICE_LOG_DETAILS", type, page, limit],
    () => getCustomerServiceLogs(type, page, limit),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

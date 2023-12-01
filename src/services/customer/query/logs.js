import { useQuery } from "react-query";
import {
  getCustomerParkingLogs,
  getCustomerServiceLogs,
  getServiceLog,
} from "../api/logs";

export const useGetCustomerServiceLog = (
  options = {},
  type = "",
  page = 1,
  limit = 25
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

export const useGetCustomerparkingLog = (
  options = {},
  type = "",
  page = 1,
  limit = 25
) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_CUST_PARKING_LOG_DETAILS", type, page, limit],
    () => getCustomerParkingLogs(type, page, limit),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useGetServiceLog = (id = "", options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    ["getServiceLog", id],
    () => getServiceLog(id),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

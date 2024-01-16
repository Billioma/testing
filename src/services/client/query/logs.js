import { useMutation, useQuery } from "react-query";
import {
  getClientParkedLogs,
  getClientServiceLog,
  getClientServiceLogs,
  getClientValetedLogs,
} from "../api/logs";

export const useGetClientParkedLogs = (
  options = {},
  page = 1,
  limit = 25,
  query
) => {
  const { data, isLoading, refetch } = useQuery(
    ["CLIENT_PARKED_LOGS", limit, page, query],
    () => getClientParkedLogs(page, limit, query),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useGetClientValetedLogs = (
  options = {},
  page = 1,
  limit = 25,
  query
) => {
  const { data, isLoading, refetch } = useQuery(
    ["CLIENT_VALETED_LOGS", limit, page, query],
    () => getClientValetedLogs(page, limit, query),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useGetClientServiceLog = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getClientServiceLog, {
    mutationKey: "GET_CLIENT_SERVICE_LOG_DETAILS",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetClientServicedLogs = (
  options = {},
  page = 1,
  limit = 25,
  query
) => {
  const { data, isLoading, refetch } = useQuery(
    ["CLIENT_Serviced_LOGS", limit, page, query],
    () => getClientServiceLogs(page, limit, query),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

import { useQuery } from "react-query";
import {
  getEventCount,
  getLogsCount,
  getSubCount,
  getTransactionCount,
  getUserCount,
} from "../api/dashboard";

export const useGetUserCount = (options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    "GET_USERS_COUNT",
    getUserCount,
    {
      ...options,
    }
  );

  return { data, isLoading, refetch };
};

export const useGetLogsCount = (options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    "GET_LOGS_COUNT",
    getLogsCount,
    {
      ...options,
    }
  );

  return { data, isLoading, refetch };
};

export const useGetTransactionCount = (options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    "GET_transactionS_COUNT",
    getTransactionCount,
    {
      ...options,
    }
  );

  return { data, isLoading, refetch };
};

export const useGetSubCount = (options = {}) => {
  const { data, isLoading, refetch } = useQuery("GET_SUB_COUNT", getSubCount, {
    ...options,
  });

  return { data, isLoading, refetch };
};

export const useGetEventCount = (options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    "GET_EVENTS_COUNT",
    getEventCount,
    {
      ...options,
    }
  );

  return { data, isLoading, refetch };
};

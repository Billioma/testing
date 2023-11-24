import { useMutation, useQuery } from "react-query";
import {
  getAdminReport,
  getAdminTran,
  getReports,
  getTrans,
} from "../api/report";

export const useGetAdminReport = (
  type = "",
  options = {},
  page = 1,
  limit = 50,
  query
) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_ADMIN_REPORT", page, limit, query, type],
    () => getAdminReport(type, page, limit, query),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useGetReports = (
  options = {},
  type = "",
  page = 1,
  limit = 50,
  query
) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_ADMIN_REPORT", type, page, limit, query],
    () => getReports(type, page, limit, query),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useGetTran = (options = {}, page = 1, limit = 50, query) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_ADM_TRAN", page, limit, query],
    () => getTrans(page, limit, query),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useGetAdminRep = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getAdminReport, {
    mutationKey: "GET_ADMIN_REP",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetAdminTran = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getAdminTran, {
    mutationKey: "GET_ADMIN_TRAN",
    ...options,
  });
  return { mutate, isLoading, data };
};

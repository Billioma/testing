import { useMutation, useQuery } from "react-query";
import { getAdminReport, getAdminTran } from "../api/report";

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

export const useGetAdminTran = (options = {}, page = 1, limit = 50, query) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_ADMIN_TRAN", page, limit, query],
    () => getAdminTran(page, limit, query),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

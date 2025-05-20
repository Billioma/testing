import { useMutation, useQuery } from "react-query";
import {
  deleteSalesReport,
  editSales,
  getLocationPerf,
  getManagerGrid,
  getManagerPerf,
  getManagerSalesReports,
  getSalesReport,
  getSalesReportLocations,
  getSalesReports,
  getSalesReportsLocationTrans,
} from "../api/audit";

export const useGetSalesReports = (
  options = {},
  page = 1,
  limit = 25,
  query
) => {
  const { data, isLoading, refetch } = useQuery(
    ["getSalesReports", limit, page, query],
    () => getSalesReports(page, limit, query),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useGetSalesReport = (options = {}, id = "") => {
  const { data, isLoading, refetch } = useQuery(
    ["getSalesReport", id],
    () => getSalesReport(id),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useGetLocationPerf = (options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    "getLocationPerf",
    getLocationPerf,
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useGetManagerPerf = (options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    "getManagerPerf",
    getManagerPerf,
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useGetManagerSalesReports = (
  options = {},
  search = "",
  page = 1,
  limit = 25,
  startDate,
  endDate
) => {
  const { data, isLoading, refetch } = useQuery(
    ["getManagerSalesReports", search, limit, page, startDate, endDate],
    () => getManagerSalesReports(search, page, limit, startDate, endDate),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useGetSalesReportLocations = (
  options = {},
  page = 1,
  limit = 25,
  startDate,
  endDate
) => {
  const { data, isLoading, refetch } = useQuery(
    ["getSalesReportLocations", page, limit, startDate, endDate],
    () => getSalesReportLocations(page, limit, startDate, endDate),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useGetManagerGrid = (
  options = {},
  managerId = "",
  page = 1,
  limit = 25,
  startDate,
  endDate
) => {
  const { data, isLoading, refetch } = useQuery(
    ["getManagerGrid", managerId, page, limit, startDate, endDate],
    () => getManagerGrid(managerId, page, limit, startDate, endDate),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useGetSalesReportsLocationTrans = (
  options = {},
  id,
  managerId,
  zoneId,
  page = 1,
  limit = 25,
  startDate,
  endDate
) => {
  const { data, isLoading, refetch } = useQuery(
    [
      "getSalesReportsLocationTrans",
      id,
      managerId,
      zoneId,
      page,
      limit,
      startDate,
      endDate,
    ],
    () =>
      getSalesReportsLocationTrans(
        id,
        managerId,
        zoneId,
        page,
        limit,
        startDate,
        endDate
      ),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useDeleteSalesReport = (options = {}) => {
  const { isLoading, mutate } = useMutation(deleteSalesReport, {
    mutationKey: ["deleteSalesReport"],
    ...options,
  });

  return { isLoading, mutate };
};

export const useEditSales = (options = {}) => {
  const { isLoading, mutate } = useMutation(editSales, {
    mutationKey: ["editSales"],
    ...options,
  });

  return { isLoading, mutate };
};

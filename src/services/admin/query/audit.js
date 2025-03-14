import { useMutation, useQuery } from "react-query";
import {
  deleteSalesReport,
  getSalesReports,
  getSalesReportsLocationGrid,
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

export const useGetSalesReportsLocationGrid = (
  id,
  options = {},
  managerId,
  page = 1,
  limit = 25,
  startDate,
  endDate
) => {
  const { data, isLoading, refetch } = useQuery(
    [
      "getSalesReportsLocationGrid",
      id,
      managerId,
      page,
      limit,
      startDate,
      endDate,
    ],
    () =>
      getSalesReportsLocationGrid(
        id,
        managerId,
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

export const useGetSalesReportsLocationTrans = (
  id,
  options = {},
  managerId,
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
      page,
      limit,
      startDate,
      endDate,
    ],
    () =>
      getSalesReportsLocationTrans(
        id,
        managerId,
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

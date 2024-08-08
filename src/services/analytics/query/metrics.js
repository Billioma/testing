import { useQuery } from "react-query";
import { getCustomerMetrics, getReserveParkingMetrics } from "../api/metrics";

const useGetMetrics = (
  key,
  fetchFunction,
  options = {},
  from = "",
  to = ""
) => {
  const { data, isLoading, refetch } = useQuery(
    [key, from, to],
    () => fetchFunction(from, to),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useGetCustomerMetrics = (options = {}, from = "", to = "") => {
  return useGetMetrics(
    "getCustomerMetrics",
    getCustomerMetrics,
    options,
    from,
    to
  );
};

export const useGetReserveParkingMetrics = (
  options = {},
  from = "",
  to = ""
) => {
  return useGetMetrics(
    "getReserveParkingMetrics",
    getReserveParkingMetrics,
    options,
    from,
    to
  );
};

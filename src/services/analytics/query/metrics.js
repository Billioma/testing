import { useQuery } from "react-query";
import { getClientMetrics, getCustomerMetrics, getInteractionMetrics, getOperatorMetrics, getPayToParkMetrics, getReserveParkingMetrics, getValetParkMetrics } from "../api/metrics";

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

export const useGetClientMetrics = (options = {}, from = "", to = "") => {
  return useGetMetrics(
    "getClientMetrics",
    getClientMetrics,
    options,
    from,
    to
  );
};

export const useGetOperatorMetrics = (options = {}, from = "", to = "") => {
  return useGetMetrics(
    "getOperatorMetrics",
    getOperatorMetrics,
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

export const useGetPayToParkMetrics = (
  options = {},
  from = "",
  to = ""
) => {
  return useGetMetrics(
    "getPayToParkMetrics",
    getPayToParkMetrics,
    options,
    from,
    to
  );
};

export const useGetValetOarkMetrics = (
  options = {},
  from = "",
  to = ""
) => {
  return useGetMetrics(
    "getValetParkMetrics",
    getValetParkMetrics,
    options,
    from,
    to
  );
};

export const useGetInteractionMetrics = (
  options = {},
  from = "",
  to = ""
) => {
  return useGetMetrics(
    "getInteractionMetrics",
    getInteractionMetrics,
    options,
    from,
    to
  );
};

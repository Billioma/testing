import { useQuery } from "react-query";
import { getCarMetrics, getClientMetrics, getCustomerMetrics, getEventParkMetrics, getInteractionMetrics, getOperatorMetrics, getPayToParkMetrics, getReserveParkingMetrics, getServiceMetrics, getSubMetrics, getValetParkMetrics, getVehicleMetrics } from "../api/metrics";

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

export const useGetVehicleMetrics = (options = {}, from = "", to = "") => {
  return useGetMetrics(
    "getVehicleMetrics",
    getVehicleMetrics,
    options,
    from,
    to
  );
};

export const useGetSubMetrics = (options = {}, from = "", to = "") => {
  return useGetMetrics(
    "getSubMetrics",
    getSubMetrics,
    options,
    from,
    to
  );
};

export const useGetServiceMetrics = (options = {}, from = "", to = "") => {
  return useGetMetrics(
    "getServiceMetrics",
    getServiceMetrics,
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

export const useGetEventParkMetrics = (
  options = {},
  from = "",
  to = ""
) => {
  return useGetMetrics(
    "getEventParkMetrics",
    getEventParkMetrics,
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

export const useGetCarMetrics = (
  options = {},
  from = "",
  to = ""
) => {
  return useGetMetrics(
    "getCarMetrics",
    getCarMetrics,
    options,
    from,
    to
  );
};

import { useQuery } from "react-query";
import {
  getAttendantMetrics,
  getBusinessMetrics,
  getBusMetrics,
  getCarMetrics,
  getClientMetrics,
  getCustomerMetrics,
  getEventParkMetrics,
  getIncidentsMetrics,
  getInteractionMetrics,
  getLocationDetailsMetrics,
  getLocationMetrics,
  getOperatorMetrics,
  getPaymentMetrics,
  getPayToParkMetrics,
  getPointsMetric,
  getReserveParkingMetrics,
  getServiceMetrics,
  getSubMetrics,
  getTransactionsMetrics,
  getValetParkMetrics,
  getVehicleMetrics,
} from "../api/metrics";

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

const useGetDetailsMetrics = (
  key,
  fetchFunction,
  options = {},
  id = "",
  from = "",
  to = ""
) => {
  const { data, isLoading, refetch } = useQuery(
    [key, id, from, to],
    () => fetchFunction(id, from, to),
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
  return useGetMetrics("getClientMetrics", getClientMetrics, options, from, to);
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
  return useGetMetrics("getSubMetrics", getSubMetrics, options, from, to);
};

export const useGetPaymentMetrics = (options = {}, from = "", to = "") => {
  return useGetMetrics(
    "getPaymentMetrics",
    getPaymentMetrics,
    options,
    from,
    to
  );
};

export const useGetLocationMetrics = (options = {}, from = "", to = "") => {
  return useGetMetrics(
    "getLocationMetrics",
    getLocationMetrics,
    options,
    from,
    to
  );
};

export const useGetLocationDetailsMetrics = (
  options = {},
  id = "",
  from = "",
  to = ""
) => {
  return useGetDetailsMetrics(
    "getLocationDetailsMetrics",
    getLocationDetailsMetrics,
    options,
    id,
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

export const useGetTransactionsMetrics = (options = {}, from = "", to = "") => {
  return useGetMetrics(
    "getTransactionsMetrics",
    getTransactionsMetrics,
    options,
    from,
    to
  );
};

export const useGetIncidentsMetrics = (options = {}, from = "", to = "") => {
  return useGetMetrics(
    "getIncidentsMetrics",
    getIncidentsMetrics,
    options,
    from,
    to
  );
};

export const useGetAttendantMetrics = (options = {}, from = "", to = "") => {
  return useGetMetrics(
    "getAttendantMetrics",
    getAttendantMetrics,
    options,
    from,
    to
  );
};

export const useGetPointsMetrics = (options = {}, from = "", to = "") => {
  return useGetMetrics(
    "getPointsMetric",
    getPointsMetric,
    options,
    from,
    to
  );
};

export const useGetBusinessMetrics = (options = {}, from = "", to = "") => {
  return useGetMetrics(
    "getBusinessMetrics",
    getBusinessMetrics,
    options,
    from,
    to
  );
};

export const useGetPayToParkMetrics = (options = {}, from = "", to = "") => {
  return useGetMetrics(
    "getPayToParkMetrics",
    getPayToParkMetrics,
    options,
    from,
    to
  );
};

export const useGetValetOarkMetrics = (options = {}, from = "", to = "") => {
  return useGetMetrics(
    "getValetParkMetrics",
    getValetParkMetrics,
    options,
    from,
    to
  );
};

export const useGetEventParkMetrics = (options = {}, from = "", to = "") => {
  return useGetMetrics(
    "getEventParkMetrics",
    getEventParkMetrics,
    options,
    from,
    to
  );
};

export const useGetInteractionMetrics = (options = {}, from = "", to = "") => {
  return useGetMetrics(
    "getInteractionMetrics",
    getInteractionMetrics,
    options,
    from,
    to
  );
};

export const useGetCarMetrics = (options = {}, from = "", to = "") => {
  return useGetMetrics("getCarMetrics", getCarMetrics, options, from, to);
};

export const useGetBusMetrics = (options = {}, from = "", to = "") => {
  return useGetMetrics("getBusMetrics", getBusMetrics, options, from, to);
};

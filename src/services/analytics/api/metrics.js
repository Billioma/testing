import axiosInstance from "../../axiosInstance";
import * as API from "../url";

const fetchMetrics = async (apiUrl, from, to) => {
  const params = new URLSearchParams();
  if (from) params.append("from", from);
  if (to) params.append("to", to);

  const url = params.toString() ? `${apiUrl}?${params.toString()}` : apiUrl;

  const response = await axiosInstance.get(url);
  return response.data;
};

export const getCustomerMetrics = (from, to) =>
  fetchMetrics(API.CUSTOMER_METRICS, from, to);

export const getReserveParkingMetrics = (from, to) =>
  fetchMetrics(API.RESERVE_PARKING_METRICS, from, to);

export const getClientMetrics = (from, to) =>
  fetchMetrics(API.CLIENT_METRICS, from, to);

export const getOperatorMetrics = (from, to) =>
  fetchMetrics(API.OPERATORS_METRICS, from, to);

export const getPayToParkMetrics = (from, to) =>
  fetchMetrics(API.PAY_TO_PARK_METRICS, from, to);

export const getValetParkMetrics = (from, to) =>
  fetchMetrics(API.VALET_PARK_METRICS, from, to);

export const getEventParkMetrics = (from, to) =>
  fetchMetrics(API.EVENT_PARK_METRICS, from, to);

export const getInteractionMetrics = (from, to) =>
  fetchMetrics(API.INTERACTIONS_METRICS, from, to);

export const getCarMetrics = (from, to) =>
  fetchMetrics(API.CAR_METRICS, from, to);

export const getVehicleMetrics = (from, to) =>
  fetchMetrics(API.VEHICLES_METRICS, from, to);

export const getSubMetrics = (from, to) =>
  fetchMetrics(API.SUB_METRICS, from, to);

export const getServiceMetrics = (from, to) =>
  fetchMetrics(API.SERVICE_RATING_METRICS, from, to);

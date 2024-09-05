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

export const getInteractionMetrics = (from, to) =>
  fetchMetrics(API.INTERACTIONS_METRICS, from, to);

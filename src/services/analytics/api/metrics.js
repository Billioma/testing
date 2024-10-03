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

const fetchDetailsMetrics = async (apiUrl, id, from, to) => {
  // Include the id in the URL path if provided
  const urlWithId = id ? `${apiUrl}/${id}` : apiUrl;

  // Append 'from' and 'to' as query parameters
  const params = new URLSearchParams();
  if (from) params.append("from", from);
  if (to) params.append("to", to);

  const url = params.toString() ? `${urlWithId}?${params.toString()}` : urlWithId;
  const response = await axiosInstance.get(url);
  return response.data;
};


export const getCustomerMetrics = (from, to) =>
  fetchMetrics(API.CUSTOMER_METRICS, from, to);

export const getReserveParkingMetrics = (from, to) =>
  fetchMetrics(API.RESERVE_PARKING_METRICS, from, to);

export const getTransactionsMetrics = (from, to) =>
  fetchMetrics(API.TRANSACTIONS_METRICS, from, to);

export const getIncidentsMetrics = (from, to) =>
  fetchMetrics(API.INCIDENTS_METRICS, from, to);

export const getAttendantMetrics = (from, to) =>
  fetchMetrics(API.ATTENDANTS_METRICS, from, to);

export const getPointsMetric = (from, to) =>
  fetchMetrics(API.POINTS_METRICS, from, to);

export const getBusinessMetrics = (from, to) =>
  fetchMetrics(API.BUSINESS_METRICS, from, to);

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

export const getBusMetrics = (from, to) =>
  fetchMetrics(API.BUS_METRICS, from, to);


export const getVehicleMetrics = (from, to) =>
  fetchMetrics(API.VEHICLES_METRICS, from, to);

export const getSubMetrics = (from, to) =>
  fetchMetrics(API.SUB_METRICS, from, to);

export const getLocationMetrics = (from, to) =>
  fetchMetrics(API.LOCATIONS_METRICS, from, to);

export const getLocationDetailsMetrics = (id, from, to) =>
  fetchDetailsMetrics(API.LOCATIONS_DETAILS_METRICS, id, from, to);

export const getServiceMetrics = (from, to) =>
  fetchMetrics(API.SERVICE_RATING_METRICS, from, to);

export const getPaymentMetrics = (from, to) =>
  fetchMetrics(API.PAYMENT_METRICS, from, to);

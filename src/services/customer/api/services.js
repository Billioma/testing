import * as API from "../url";
import axiosInstance from "../../axiosInstance";

export const createPayToPark = async (body) => {
  const res = await axiosInstance.post("customer/" + API.PAY_TO_PARK, body);
  return res.data;
};

export const createReserveParking = async (body) => {
  const res = await axiosInstance.post("customer/" + API.RESERVE_PARKING, body);
  return res.data;
};

export const requestReserveParking = async (body) => {
  const res = await axiosInstance.post(
    "customer/" + API.REQUEST_RESERVE_PARKING,
    body
  );
  return res.data;
};

export const createServiceBookings = async (body) => {
  const res = await axiosInstance.post(
    "customer/" + API.SERVICE_BOOKINGS,
    body
  );
  return res.data;
};

export const getPayToPark = async ({ queryKey }) => {
  const [, limit, page] = queryKey;
  const res = await axiosInstance.get(
    "customer/" + `${API.GET_PAY_TO_PARK}?limit=${limit}&page=${page}`
  );
  return res.data;
};

export const getReserveParking = async ({ queryKey }) => {
  const [, limit, page] = queryKey;
  const res = await axiosInstance.get(
    "customer/" + `${API.RESERVE_PARKING}?limit=${limit}&page=${page}`
  );
  return res.data;
};

export const getBookingRate = async ({ queryKey }) => {
  const [, id, type] = queryKey;
  const res = await axiosInstance.get(
    "customer/" + `${API.BOOKING_RATES}/${id}?serviceType=${type}`
  );
  return res.data;
};

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

export const createEventParking = async (body) => {
  const res = await axiosInstance.post("customer/" + API.EVENT_PARKING, body);
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

export const getPayToPark = async () => {
  const res = await axiosInstance.get("customer/" + `${API.GET_PAY_TO_PARK}`);
  return res.data;
};

export const getReserveParking = async () => {
  const res = await axiosInstance.get("customer/" + `${API.RESERVE_PARKING}`);
  return res.data;
};

export const cancelBooking = async (query) => {
  const res = await axiosInstance.get("customer/" + API.CANCEL_BOOKING(query));
  return res.data;
};

export const cancelReserve = async (query) => {
  const res = await axiosInstance.get("customer/" + API.CANCEL_RESERVE(query));
  return res.data;
};

export const getEventParking = async () => {
  const res = await axiosInstance.get("customer/" + `${API.EVENT_PARKING}`);
  return res.data;
};

export const getCarService = async () => {
  const res = await axiosInstance.get("customer/" + `${API.SERVICE_BOOKINGS}`);
  return res.data;
};

export const getBookingRate = async ({ queryKey }) => {
  const [, id, type] = queryKey;
  const res = await axiosInstance.get(
    "customer/" + `${API.BOOKING_RATES}/${id}?serviceType=${type}`
  );
  return res.data;
};

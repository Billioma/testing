import * as API from "../url";
import axiosInstance from "../../axiosInstance";

export const getUserVehicles = async (query) => {
  const res = await axiosInstance.get(
    API.GET_USER_VEHICLE(query.license, query.zone),
  );
  return res.data;
};

export const getUserRates = async ({ queryKey }) => {
  const [, id] = queryKey;
  const res = await axiosInstance.get(`${API.GET_USER_RATES}/${id}`);
  return res.data;
};

export const getTickets = async ({ queryKey }) => {
  const [, id, from, to, term] = queryKey;
  const res = await axiosInstance.get(
    `${API.ALL_TICKET}/${id}?from=${from}&to=${to}&term=${term}`,
  );
  return res.data;
};

export const newTicket = async (body) => {
  const res = await axiosInstance.post(API.NEW_TICKET, body);
  return res.data;
};

export const addVehicle = async (body) => {
  const res = await axiosInstance.post(API.ADD_VEHICLE, body);
  return res.data;
};

export const retrieveTicket = async ({ query, body }) => {
  const res = await axiosInstance.post(API.RETRIEVE_TICKET(query), body);
  return res.data;
};

export const makePayment = async ({ query, body }) => {
  const res = await axiosInstance.post(API.MAKE_PAYMENT(query), body);
  return res.data;
};

export const getAttMakes = async () => {
  const res = await axiosInstance.get(API.ATT_MAKES);
  return res.data;
};

export const getAttModels = async () => {
  const res = await axiosInstance.get(API.ATT_MODELS);
  return res.data;
};

import * as API from "../url";
import axiosInstance from "../../axiosInstance";

export const getLocations = async (query) => {
  const res = await axiosInstance.get(
    API.GET_LOCATIONS(query.limit, query.page)
  );
  return res.data;
};

export const getZones = async (query) => {
  const res = await axiosInstance.get(API.GET_ZONES(query.limit, query.page));
  return res.data;
};

export const getRates = async (query) => {
  const res = await axiosInstance.get(API.GET_RATES(query.limit, query.page));
  return res.data;
};

export const getPolicies = async (query) => {
  const res = await axiosInstance.get(
    API.GET_POLICIES(query.limit, query.page)
  );
  return res.data;
};

export const getLocation = async (query) => {
  const res = await axiosInstance.get(API.UPDATE_LOCATION(query.id));
  return res.data;
};

export const getOperatorLocation = async () => {
  const res = await axiosInstance.get(API.GET_OP_LOCATION);
  return res.data;
};

export const getZone = async (query) => {
  const res = await axiosInstance.get(API.UPDATE_ZONE(query.id));
  return res.data;
};

export const getRate = async (query) => {
  const res = await axiosInstance.get(API.UPDATE_RATE(query.id));
  return res.data;
};

export const getPolicy = async (query) => {
  const res = await axiosInstance.get(API.UPDATE_POLICY(query.id));
  return res.data;
};

export const deleteLocation = async (query) => {
  const res = await axiosInstance.delete(API.UPDATE_LOCATION(query));
  return res.data;
};

export const deleteZone = async (query) => {
  const res = await axiosInstance.delete(API.UPDATE_ZONE(query));
  return res.data;
};

export const deleteRate = async (query) => {
  const res = await axiosInstance.delete(API.UPDATE_RATE(query));
  return res.data;
};

export const deletePolicy = async (query) => {
  const res = await axiosInstance.delete(API.UPDATE_POLICY(query));
  return res.data;
};

export const updateLocation = async ({ query, body }) => {
  const res = await axiosInstance.patch(API.UPDATE_LOCATION(query), body);
  return res.data;
};

export const updateZone = async ({ query, body }) => {
  const res = await axiosInstance.patch(API.UPDATE_ZONE(query), body);
  return res.data;
};

export const updateRate = async ({ query, body }) => {
  const res = await axiosInstance.patch(API.UPDATE_RATE(query), body);
  return res.data;
};

export const updatePolicy = async ({ query, body }) => {
  const res = await axiosInstance.patch(API.UPDATE_POLICY(query), body);
  return res.data;
};

export const createLocation = async (body) => {
  const res = await axiosInstance.post(API.GET_LOCATION, body);
  return res.data;
};

export const createZone = async (body) => {
  const res = await axiosInstance.post(API.GET_ZONE, body);
  return res.data;
};

export const createRate = async (body) => {
  const res = await axiosInstance.post(API.GET_RATE, body);
  return res.data;
};

export const createPolicy = async (body) => {
  const res = await axiosInstance.post(API.GET_POLICY, body);
  return res.data;
};

export const getAmenities = async () => {
  const res = await axiosInstance.get(API.GET_AMENITIES);
  return res.data;
};

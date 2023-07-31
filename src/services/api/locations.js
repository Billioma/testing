import axios from "axios";
import * as API from "../url";
import axiosInstance from "../axiosInstance";

export const getStates = async () => {
  const res = await axios.get(API.GET_STATES);
  return res.data;
};

export const getLocations = async () => {
  const res = await axiosInstance.get(API.GET_LOCATIONS);
  return res.data;
};

export const getEvents = async () => {
  const res = await axiosInstance.get(API.GET_EVENTS);
  return res.data;
};

export const getPlans = async () => {
  const res = await axiosInstance.get(API.GET_PLANS);
  return res.data;
};

export const getServices = async () => {
  const res = await axiosInstance.get(API.GET_SERVICES);
  return res.data;
};

export const getCities = async (query) => {
  const res = await axios.get(API.GET_CITIES(query));
  return res.data;
};

export const getZone = async (query) => {
  const res = await axiosInstance.get(API.GET_ZONE(query));
  return res.data;
};

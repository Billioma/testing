import axiosInstance from "../../axiosInstance";
import * as API from "../url";

export const getLocations = async (page, limit, query) => {
  const response = await axiosInstance.get(
    API.ADMIN_LOCATIONS +
      `?page=${page}&limit=${limit}&sort=createdAt,DESC&${query || ""}`
  );
  return response.data;
};

export const getAdminLocations = async (query) => {
  const res = await axiosInstance.get(
    API.ADMIN_LOCATIONS_LIST(query.filterString, query.limit, query.page)
  );
  return res.data;
};

export const getAdminLocation = async (query) => {
  const res = await axiosInstance.get(API.ADMIN_LOCATION(query.id));
  return res.data;
};

export const getAdminZones = async (query) => {
  const res = await axiosInstance.get(
    API.ADMIN_ZONES_LIST(query.filterString, query.limit, query.page)
  );
  return res.data;
};

export const getAdminZone = async (query) => {
  const res = await axiosInstance.get(API.ADMIN_ZONE(query.id));
  return res.data;
};

export const getZones = async (page, limit, query) => {
  const response = await axiosInstance.get(
    API.ADMIN_ZONES +
      `?page=${page}&limit=${limit}&sort=createdAt,DESC&${query || ""}`
  );
  return response.data;
};

export const getRates = async (page, limit, query) => {
  const response = await axiosInstance.get(
    API.ADMIN_RATES +
      `?page=${page}&limit=${limit}&sort=createdAt,DESC&${query || ""}`
  );
  return response.data;
};

export const getAdminRates = async (query) => {
  const res = await axiosInstance.get(
    API.ADMIN_RATES_LIST(query.filterString, query.limit, query.page)
  );
  return res.data;
};

export const getAdminRate = async (query) => {
  const res = await axiosInstance.get(API.ADMIN_RATE(query.id));
  return res.data;
};

export const getAdminAmenities = async (query) => {
  const res = await axiosInstance.get(
    API.ADMIN_AMENITIES_LIST(query.filterString, query.limit, query.page)
  );
  return res.data;
};

export const getAdminAmenity = async (query) => {
  const res = await axiosInstance.get(API.ADMIN_AMENITY(query.id));
  return res.data;
};

export const getAdminPolicies = async (query) => {
  const res = await axiosInstance.get(
    API.ADMIN_POLICIES_LIST(query.filterString, query.limit, query.page)
  );
  return res.data;
};

export const getAdminPolicy = async (query) => {
  const res = await axiosInstance.get(API.ADMIN_POLICY(query.id));
  return res.data;
};

export const addLocation = async (data) => {
  const response = await axiosInstance.post(API.ADMIN_LOCATIONS, data);
  return response.data;
};

export const addZone = async (data) => {
  const response = await axiosInstance.post(API.ADMIN_ZONES, data);
  return response.data;
};

export const editLocation = async ({ query, body }) => {
  const response = await axiosInstance.patch(API.ADMIN_LOCATION(query), body);

  return response.data;
};

export const addRate = async (data) => {
  const response = await axiosInstance.post(API.ADMIN_RATES, data);
  return response.data;
};

export const editRate = async ({ query, body }) => {
  const response = await axiosInstance.patch(API.ADMIN_RATE(query), body);

  return response.data;
};

export const editZone = async ({ query, body }) => {
  const response = await axiosInstance.patch(API.ADMIN_ZONE(query), body);

  return response.data;
};

export const deleteLocation = async (id) => {
  const response = await axiosInstance.delete(`${API.ADMIN_LOCATIONS}/${id}`);
  return response.data;
};

export const deleteZone = async (id) => {
  const response = await axiosInstance.delete(`${API.ADMIN_ZONES}/${id}`);
  return response.data;
};

export const deleteRate = async (id) => {
  const response = await axiosInstance.delete(`${API.ADMIN_RATES}/${id}`);
  return response.data;
};

export const deletePolicy = async (id) => {
  const response = await axiosInstance.delete(`${API.ADMIN_POLICIES}/${id}`);
  return response.data;
};

export const addPolicy = async (data) => {
  const response = await axiosInstance.post(API.ADMIN_POLICIES, data);
  return response.data;
};

export const editPolicy = async ({ query, body }) => {
  const response = await axiosInstance.patch(API.ADMIN_POLICY(query), body);

  return response.data;
};
export const getPolicies = async (page, limit, query) => {
  const response = await axiosInstance.get(
    API.ADMIN_POLICIES +
      `?page=${page}&limit=${limit}&sort=createdAt,DESC&${query || ""}`
  );
  return response.data;
};

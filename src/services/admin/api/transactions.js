import axiosInstance from "../../axiosInstance";
import * as API from "../url";

export const getPayToPark = async (page, limit, query) => {
  const response = await axiosInstance.get(
    `${API.ADMIN_PAY_TO_PARK}?page=${page}&limit=${limit}&sort=id,DESC&${
      query || ""
    }`
  );
  return response.data;
};

export const getEventParking = async (page, limit, query) => {
  const response = await axiosInstance.get(
    `${API.ADMIN_EVENT_PARKING}?page=${page}&limit=${limit}&sort=id,DESC&${
      query || ""
    }`
  );
  return response.data;
};

export const getTips = async (page, limit, query) => {
  const response = await axiosInstance.get(
    `${API.ADMIN_TIPS}?page=${page}&limit=${limit}&sort=id,DESC&${query || ""}`
  );
  return response.data;
};

export const getPayToParkList = async (query) => {
  const res = await axiosInstance.get(
    API.ADMIN_PAY_TO_PARK_LIST(query.filterString, query.limit, query.page)
  );
  return res.data;
};

export const getPayToParkDetails = async (query) => {
  const res = await axiosInstance.get(API.ADMIN_PAY_TO_PARK_DETAIL(query.id));
  return res.data;
};

export const getReservedParkingList = async (query) => {
  const res = await axiosInstance.get(
    API.ADMIN_RESERVED_PARKING_LIST(query.filterString, query.limit, query.page)
  );
  return res.data;
};

export const getReservedParkingDetails = async (query) => {
  const res = await axiosInstance.get(
    API.ADMIN_RESERVED_PARKING_DETAIL(query.id)
  );
  return res.data;
};

export const getEventParkingList = async (query) => {
  const res = await axiosInstance.get(
    API.ADMIN_EVENT_PARKING_LIST(query.filterString, query.limit, query.page)
  );
  return res.data;
};

export const getEventParkingDetails = async (query) => {
  const res = await axiosInstance.get(API.ADMIN_EVENT_PARKING_DETAIL(query.id));
  return res.data;
};

export const getCarServiceList = async (query) => {
  const res = await axiosInstance.get(
    API.ADMIN_CAR_SERVICES_LIST(query.filterString, query.limit, query.page)
  );
  return res.data;
};

export const getCarServiceDetails = async (query) => {
  const res = await axiosInstance.get(API.ADMIN_CAR_SERVICE_DETAIL(query.id));
  return res.data;
};

export const getTipsList = async (query) => {
  const res = await axiosInstance.get(
    API.ADMIN_TIPS_LIST(query.filterString, query.limit, query.page)
  );
  return res.data;
};

export const getTipsDetails = async (query) => {
  const res = await axiosInstance.get(API.ADMIN_TIPS_DETAIL(query.id));
  return res.data;
};

export const getCarServices = async (page, limit, query) => {
  const response = await axiosInstance.get(
    `${API.ADMIN_CAR_SERVICES}?page=${page}&limit=${limit}&sort=id,DESC&${
      query || ""
    }`
  );
  return response.data;
};

export const deletePayToPark = async (id) => {
  const response = await axiosInstance.delete(`${API.ADMIN_PAY_TO_PARK}/${id}`);
  return response.data;
};

export const deleteTips = async (id) => {
  const response = await axiosInstance.delete(`${API.ADMIN_PAY_TO_PARK}/${id}`);
  return response.data;
};

export const getReservedParking = async (page, limit, query) => {
  const response = await axiosInstance.get(
    `${API.ADMIN_RESERVED_PARKING}?page=${page}&limit=${limit}&sort=id,DESC&${
      query || ""
    }`
  );
  return response.data;
};

export const deleteReservedParking = async (id) => {
  const response = await axiosInstance.delete(
    `${API.ADMIN_RESERVED_PARKING}/${id}`
  );
  return response.data;
};

export const editReservedParking = async ({ query, body }) => {
  const response = await axiosInstance.patch(
    API.ADMIN_RESERVED_PARKING_DETAIL(query),
    body
  );

  return response.data;
};

export const editEventParking = async ({ query, body }) => {
  const response = await axiosInstance.patch(
    API.ADMIN_EVENT_PARKING_DETAIL(query),
    body
  );

  return response.data;
};

export const addReservedParking = async (data) => {
  const response = await axiosInstance.post(
    `${API.ADMIN_RESERVED_PARKING}`,
    data
  );

  return response.data;
};

export const deleteTip = async (id) => {
  const response = await axiosInstance.delete(`${API.ADMIN_TIPS}/${id}`);
  return response.data;
};

export const deleteCarService = async (id) => {
  const response = await axiosInstance.delete(
    `${API.ADMIN_CAR_SERVICES}/${id}`
  );
  return response.data;
};

export const deleteEventParking = async (id) => {
  const response = await axiosInstance.delete(
    `${API.ADMIN_EVENT_PARKING}/${id}`
  );
  return response.data;
};

export const editCarService = async ({ query, body }) => {
  const response = await axiosInstance.patch(
    API.ADMIN_CAR_SERVICE_DETAIL(query),
    body
  );

  return response.data;
};

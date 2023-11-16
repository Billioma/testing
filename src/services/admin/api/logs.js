import axiosInstance from "../../axiosInstance";
import * as API from "../url";

export const getValetedVehicles = async (page, limit) => {
  const response = await axiosInstance.get(
    `${API.ADMIN_SERVICE_LOGS}?page=${page}&limit=${limit}&sort=id,DESC&filter=service.serviceType||$eq||VALET`
  );
  return response.data;
};

export const getAdminServiceLogs = async (query) => {
  const res = await axiosInstance.get(
    API.ADMIN_SERVICE_LOGS_LIST(
      query.type,
      query.filterString,
      query.limit,
      query.page
    )
  );
  return res.data;
};

export const getAdminServiceLog = async (query) => {
  const res = await axiosInstance.get(API.ADMIN_SERVICE_LOGS_DETAIL(query.id));
  return res.data;
};

export const makePaymentServiceLog = async (query) => {
  const res = await axiosInstance.post(API.SERVICE_LOG_MAKE_PAYMENT(query.id));
  return res.data;
};

export const editValetedVehicle = async (data) => {
  const response = await axiosInstance.patch(
    `${API.ADMIN_SERVICE_LOGS}/${data.id}`,
    data
  );

  return response.data;
};

export const editServiceLogs = async ({ query, body }) => {
  const response = await axiosInstance.patch(
    API.ADMIN_SERVICE_LOGS_DETAIL(query),
    body
  );

  return response.data;
};

export const retrieveTickets = async (id) => {
  const response = await axiosInstance.get(
    `${API.ADMIN_SERVICE_TICKET}/${id}`
  );
  return response.data;
};

export const deleteValetedVehicle = async (id) => {
  const response = await axiosInstance.delete(
    `${API.ADMIN_SERVICE_LOGS}/${id}`
  );
  return response.data;
};

export const getParkedVehicles = async (page, limit) => {
  const response = await axiosInstance.get(
    `${API.ADMIN_SERVICE_LOGS}?page=${page}&limit=${limit}&sort=id,DESC&filter=service.serviceType||$eq||PARKING`
  );
  return response.data;
};

export const editParkedVehicle = async (data) => {
  const response = await axiosInstance.patch(
    `${API.ADMIN_SERVICE_LOGS}/${data.id}`,
    data
  );

  return response.data;
};

export const deleteParkedVehicle = async (id) => {
  const response = await axiosInstance.delete(
    `${API.ADMIN_SERVICE_LOGS}/${id}`
  );
  return response.data;
};

export const getServicedVehicles = async (page, limit) => {
  const response = await axiosInstance.get(
    `${API.ADMIN_SERVICE_LOGS}?page=${page}&limit=${limit}&sort=id,DESC&filter=service.serviceType||$eq||SERVICE`
  );
  return response.data;
};

export const editServicedVehicle = async (data) => {
  const response = await axiosInstance.patch(
    `${API.ADMIN_SERVICE_LOGS}/${data.id}`,
    data
  );

  return response.data;
};

export const deleteServicedVehicle = async (id) => {
  const response = await axiosInstance.delete(
    `${API.ADMIN_SERVICE_LOGS}/${id}`
  );
  return response.data;
};

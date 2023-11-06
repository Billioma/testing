import axiosInstance from "../../axiosInstance";
import * as API from "../url";

export const getClients = async (page, limit, query) => {
  const response = await axiosInstance.get(
    `${API.ADMIN_CLIENTS}?page=${page}&limit=${limit}&sort=id,DESC&${
      query || ""
    }`
  );
  return response.data;
};

export const getAdminClients = async (query) => {
  const res = await axiosInstance.get(
    API.ADMIN_CLIENTS_LIST(query.filterString, query.limit, query.page)
  );
  return res.data;
};

export const getAdminClient = async (query) => {
  const res = await axiosInstance.get(API.ADMIN_CLIENT(query.id));
  return res.data;
};

export const getAdminClientUsers = async (query) => {
  const res = await axiosInstance.get(API.CLIENT_USERS(query.id));
  return res.data;
};

export const detachAdminClientUser = async (query) => {
  const res = await axiosInstance.get(
    API.DETACH_CLIENT_USER(query.id, query.email)
  );
  return res.data;
};

export const getClientUsers = async (id) => {
  const response = await axiosInstance.get(`${API.ADMIN_CLIENTS}/users/${id}`);
  return response.data;
};

export const addClient = async (data) => {
  const response = await axiosInstance.post(`${API.ADMIN_CLIENTS}`, data);
  return response.data;
};

export const deleteClient = async (id) => {
  const response = await axiosInstance.delete(`${API.ADMIN_CLIENTS}/${id}`);
  return response.data;
};

export const editClient = async ({ query, body }) => {
  const res = await axiosInstance.patch(API.ADMIN_CLIENT(query), body);
  return res.data;
};

export const getClientsInvoices = async (page, limit, query) => {
  const response = await axiosInstance.get(
    `${API.ADMIN_CLIENTS_INVOICES}?page=${page}&limit=${limit}&sort=id,DESC&${
      query || ""
    }`
  );
  return response.data;
};

export const deleteClientInvoice = async (id) => {
  const response = await axiosInstance.delete(
    `${API.ADMIN_CLIENTS_INVOICES}/${id}`
  );
  return response.data;
};

export const addClientInvoice = async (data) => {
  const response = await axiosInstance.post(
    `${API.ADMIN_CLIENTS_INVOICES}`,
    data
  );
  return response.data;
};

export const makeClientPayment = async (data) => {
  const response = await axiosInstance.post(
    `${API.ADMIN_CLIENTS_INVOICES}/${data.id}/payment`,
    data
  );
  return response.data;
};

export const updateClientInvoice = async (data) => {
  const response = await axiosInstance.patch(
    `${API.ADMIN_CLIENTS_INVOICES}/${data.id}`,
    data
  );
  return response.data;
};

export const getClientsEvents = async (page, limit, query) => {
  const response = await axiosInstance.get(
    `${API.ADMIN_EVENTS}?page=${page}&limit=${limit}&sort=id,DESC&${
      query || ""
    }`
  );
  return response.data;
};

export const addClientEvent = async (data) => {
  const response = await axiosInstance.post(`${API.ADMIN_EVENTS}`, data);
  return response.data;
};

export const updateClientEvent = async (data) => {
  const response = await axiosInstance.patch(
    `${API.ADMIN_EVENTS}/${data.id}`,
    data
  );
  return response.data;
};

export const deleteClientEvent = async (id) => {
  const response = await axiosInstance.delete(`${API.ADMIN_EVENTS}/${id}`);
  return response.data;
};

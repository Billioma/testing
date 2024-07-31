import axiosInstance from "../../axiosInstance";
import * as API from "../url";

export const getAttendants = async (page, limit, query) => {
  const response = await axiosInstance.get(
    API.ADMIN_ATTENDANTS +
      `?page=${page}&limit=${limit}&sort=createdAt,DESC&${query || ""}`
  );
  return response.data;
};

export const getAdminAttendant = async (query) => {
  const res = await axiosInstance.get(API.ADMIN_ATTENDANT(query.id));
  return res.data;
};

export const getAllStaffs = async () => {
  const res = await axiosInstance.get(API.ALL_STAFFS);
  return res.data;
};

export const getAdminEvent = async (query) => {
  const res = await axiosInstance.get(API.ADMIN_EVENT(query.id));
  return res.data;
};

export const getAdminAttendantList = async (query) => {
  const res = await axiosInstance.get(
    API.ADMIN_ATTENDANTS_LIST(query.filterString, query.limit, query.page)
  );
  return res.data;
};

export const getAdminCustomerList = async (query) => {
  const res = await axiosInstance.get(
    API.ADMIN_CUSTOMERS_LIST(query.filterString, query.limit, query.page)
  );
  return res.data;
};

export const getAdminCustomer = async (query) => {
  const res = await axiosInstance.get(API.ADMIN_CUSTOMER(query.id));
  return res.data;
};

export const getCustomers = async (page, limit, query) => {
  const response = await axiosInstance.get(
    API.ADMIN_CUSTOMERS +
      `?page=${page}&limit=${limit}&sort=createdAt,DESC&${query || ""}`
  );
  return response.data;
};

export const getOperatorsList = async (query) => {
  const res = await axiosInstance.get(
    API.ADMIN_OPERATORS_LIST(query.filterString, query.limit, query.page)
  );
  return res.data;
};

export const getOperator = async (query) => {
  const response = await axiosInstance.get(API.ADMIN_OPERATOR(query.id));
  return response.data;
};

export const getOperators = async (page, limit, query) => {
  const response = await axiosInstance.get(
    API.ADMIN_OPERATORS +
      `?page=${page}&limit=${limit}&sort=createdAt,DESC&${query || ""}`
  );
  return response.data;
};

export const getAdministrators = async (page, limit, query) => {
  const response = await axiosInstance.get(
    API.ADMIN_ADMINISTRATORS +
      `?page=${page}&limit=${limit}&sort=createdAt,DESC&${query || ""}`
  );
  return response.data;
};

export const getAdministratorsList = async (query) => {
  const res = await axiosInstance.get(
    API.ADMIN_ADMINISTRATORS_LIST(query.filterString, query.limit, query.page)
  );
  return res.data;
};

export const getManagers = async () => {
  const response = await axiosInstance.get(API.MANAGERS);
  return response.data;
};

export const createAdministrator = async (data) => {
  const response = await axiosInstance.post(API.ADMIN_ADMINISTRATORS, data);
  return response.data;
};

export const createOperator = async (data) => {
  const response = await axiosInstance.post(API.ADMIN_OPERATORS, data);
  return response.data;
};

export const createAttendant = async (data) => {
  const response = await axiosInstance.post(API.ADMIN_ATTENDANTS, data);
  return response.data;
};

export const editCustomer = async ({ query, body }) => {
  const response = await axiosInstance.patch(API.ADMIN_CUSTOMER(query), body);
  return response.data;
};

export const fundCustomer = async ({ query, body }) => {
  const response = await axiosInstance.post(API.FUND_CUSTOMER(query), body);
  return response.data;
};

export const editAdministrator = async (data) => {
  const response = await axiosInstance.patch(
    `${API.ADMIN_ADMINISTRATORS}/${data.id}`,
    data
  );
  return response.data;
};

export const getAdmin = async (query) => {
  const response = await axiosInstance.get(API.ADMIN_ADMINISTRATOR(query.id));
  return response.data;
};

export const editAdmin = async ({ query, body }) => {
  const response = await axiosInstance.patch(
    API.ADMIN_ADMINISTRATOR(query),
    body
  );
  return response.data;
};

export const editOperator = async (data) => {
  const response = await axiosInstance.patch(
    `${API.ADMIN_OPERATORS}/${data.id}`,
    data
  );
  return response.data;
};

export const editAdminOperator = async ({ query, body }) => {
  const response = await axiosInstance.patch(API.ADMIN_OPERATOR(query), body);
  return response.data;
};

export const editAttendant = async ({ query, body }) => {
  const response = await axiosInstance.patch(API.ADMIN_ATTENDANT(query), body);
  return response.data;
};

export const deleteAttendant = async (id) => {
  const response = await axiosInstance.delete(`${API.ADMIN_ATTENDANTS}/${id}`);
  return response;
};

export const deleteAdministrator = async (id) => {
  const response = await axiosInstance.delete(
    `${API.ADMIN_ADMINISTRATORS}/${id}`
  );
  return response;
};

export const deleteOperator = async (id) => {
  const response = await axiosInstance.delete(`${API.ADMIN_OPERATORS}/${id}`);
  return response;
};

export const deleteCustomer = async (id) => {
  const response = await axiosInstance.delete(`${API.ADMIN_CUSTOMERS}/${id}`);
  return response;
};

export const createCustomer = async (data) => {
  const response = await axiosInstance.post(API.ADMIN_CUSTOMERS, data);
  return response.data;
};

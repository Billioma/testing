import axiosInstance from "../../axiosInstance";
import * as API from "../url";

export const getRoles = async (page, limit, query) => {
  const response = await axiosInstance.get(
    `${API.ADMIN_ROLES}?page=${page}&limit=${limit}&sort=createdAt,DESC&${
      query || ""
    }`
  );
  return response.data;
};

export const getJobs = async (page, limit, query) => {
  const response = await axiosInstance.get(
    `${API.ADMIN_JOBS}?page=${page}&limit=${limit}&sort=createdAt,DESC&${
      query || ""
    }`
  );
  return response.data;
};

export const getDepts = async (page, limit, query) => {
  const response = await axiosInstance.get(
    `${API.ADMIN_DEPTS}?page=${page}&limit=${limit}&sort=createdAt,DESC&${
      query || ""
    }`
  );
  return response.data;
};

export const getAdminRoles = async (query) => {
  const res = await axiosInstance.get(
    API.ADMIN_ROLES_LIST(query.filterString, query.limit, query.page)
  );
  return res.data;
};

export const getAdminRole = async (query) => {
  const res = await axiosInstance.get(API.ADMIN_ROLE(query.id));
  return res.data;
};

export const getAdminPermissions = async (query) => {
  const res = await axiosInstance.get(
    API.ADMIN_PERMISSIONS_LIST(query.filterString, query.limit, query.page)
  );
  return res.data;
};

export const getAdminPermission = async (query) => {
  const res = await axiosInstance.get(API.ADMIN_PERMISSION(query.id));
  return res.data;
};

export const getAdminVehicleMakes = async (query) => {
  const res = await axiosInstance.get(
    API.ADMIN_VEHICLE_MAKES_LIST(query.filterString, query.limit, query.page)
  );
  return res.data;
};

export const getAdminVehicleMake = async (query) => {
  const res = await axiosInstance.get(API.ADMIN_VEHICLE_MAKE(query.id));
  return res.data;
};

export const getAdminVehicleModels = async (query) => {
  const res = await axiosInstance.get(
    API.ADMIN_VEHICLE_MODELS_LIST(query.filterString, query.limit, query.page)
  );
  return res.data;
};

export const getAdminVehicleModel = async (query) => {
  const res = await axiosInstance.get(API.ADMIN_VEHICLE_MODEL(query.id));
  return res.data;
};

export const getAdminFaqs = async (query) => {
  const res = await axiosInstance.get(
    API.ADMIN_FAQS_LIST(query.filterString, query.limit, query.page)
  );
  return res.data;
};

export const getAdminFaq = async (query) => {
  const res = await axiosInstance.get(API.ADMIN_FAQ(query.id));
  return res.data;
};

export const getAdminBanks = async (query) => {
  const res = await axiosInstance.get(
    API.ADMIN_BANKS_LIST(query.filterString, query.limit, query.page)
  );
  return res.data;
};

export const getAdminBank = async (query) => {
  const res = await axiosInstance.get(API.ADMIN_BANK(query.id));
  return res.data;
};

export const editRole = async ({ query, body }) => {
  const response = await axiosInstance.patch(API.ADMIN_ROLE(query), body);

  return response.data;
};

export const getPermissions = async (page, limit, query) => {
  const response = await axiosInstance.get(
    API.ADMIN_ROLES_PERMISSIONS +
      `?page=${page}&limit=${limit}&sort=createdAt,DESC&${query || ""}`
  );
  return response.data;
};

export const editPermission = async ({ query, body }) => {
  const response = await axiosInstance.patch(API.ADMIN_PERMISSION(query), body);

  return response.data;
};

export const addRole = async (data) => {
  const response = await axiosInstance.post(`${API.ADMIN_ROLES}`, data);
  return response.data;
};

export const addPermission = async (data) => {
  const response = await axiosInstance.post(`${API.ADMIN_PERMISSIONS}`, data);
  return response.data;
};

export const deleteRole = async (id) => {
  const response = await axiosInstance.delete(`${API.ADMIN_ROLES}/${id}`);
  return response.data;
};

export const deletePermissions = async (id) => {
  const response = await axiosInstance.delete(`${API.ADMIN_PERMISSIONS}/${id}`);
  return response.data;
};

export const addModel = async (data) => {
  const response = await axiosInstance.post(
    `${API.ADMIN_VEHICLE_MODELS}`,
    data
  );
  return response.data;
};

export const getModels = async (page, limit, query) => {
  if (window.location.pathname.includes("/admin")) {
    const response = await axiosInstance.get(
      `${
        API.ADMIN_VEHICLE_MODELS
      }?page=${page}&limit=${limit}&sort=createdAt,DESC&${query || ""}`
    );
    return response.data;
  } else {
    // Return an empty array or handle it according to your requirements
    return [];
  }
};

export const editModel = async ({ query, body }) => {
  const response = await axiosInstance.patch(
    API.ADMIN_VEHICLE_MODEL(query),
    body
  );

  return response.data;
};

export const deleteModel = async (id) => {
  const response = await axiosInstance.delete(
    `${API.ADMIN_VEHICLE_MODELS}/${id}`
  );
  return response.data;
};

export const addMake = async (data) => {
  const response = await axiosInstance.post(`${API.ADMIN_VEHICLE_MAKES}`, data);
  return response.data;
};

export const getMakes = async (page, limit, query) => {
  if (window.location.pathname.includes("/admin")) {
    const response = await axiosInstance.get(
      `${
        API.ADMIN_VEHICLE_MAKES
      }?page=${page}&limit=${limit}&sort=createdAt,DESC&${query || ""}`
    );
    return response.data;
  } else {
    // Return an empty array or handle it according to your requirements
    return [];
  }
};

export const editMake = async ({ query, body }) => {
  const response = await axiosInstance.patch(
    API.ADMIN_VEHICLE_MAKE(query),
    body
  );

  return response.data;
};

export const deleteMake = async (id) => {
  const response = await axiosInstance.delete(
    `${API.ADMIN_VEHICLE_MAKES}/${id}`
  );
  return response.data;
};

export const addBankDetail = async (data) => {
  const response = await axiosInstance.post(`${API.ADMIN_BANK_DETAILS}`, data);
  return response.data;
};

export const getBankDetails = async (page, limit, query) => {
  const response = await axiosInstance.get(
    `${
      API.ADMIN_BANK_DETAILS
    }?page=${page}&limit=${limit}&sort=createdAt,DESC&${query || ""}`
  );
  return response.data;
};

export const editBankDetail = async ({ query, body }) => {
  const response = await axiosInstance.patch(API.ADMIN_BANK(query), body);

  return response.data;
};

export const deleteBankDetail = async (id) => {
  const response = await axiosInstance.delete(
    `${API.ADMIN_BANK_DETAILS}/${id}`
  );
  return response.data;
};

export const addFaq = async (data) => {
  const response = await axiosInstance.post(`${API.ADMIN_FAQS}`, data);
  return response.data;
};

export const getFaqs = async (page, limit, query) => {
  const response = await axiosInstance.get(
    `${API.ADMIN_FAQS}?page=${page}&limit=${limit}&sort=createdAt,DESC&${
      query || ""
    }`
  );
  return response.data;
};

export const editFaq = async ({ query, body }) => {
  const response = await axiosInstance.patch(API.ADMIN_FAQ(query), body);

  return response.data;
};

export const deleteFaq = async (id) => {
  const response = await axiosInstance.delete(`${API.ADMIN_FAQS}/${id}`);
  return response.data;
};

export const getLocations = async (page, limit, query) => {
  const response = await axiosInstance.get(
    API.ADMIN_LOCATIONS +
      `?page=${page}&limit=${limit}&sort=createdAt,DESC&${query || ""}`
  );
  return response.data;
};

import * as API from "../url";
import axiosInstance from "../../axiosInstance";

export const getAdminReport = async (query) => {
  const res = await axiosInstance.get(
    API.GET_ADMIN_REPORTS(
      query.type,
      query.filterString,
      query.limit,
      query.page
    )
  );
  return res.data;
};

export const getReports = async (type, page, limit, query) => {
  const res = await axiosInstance.get(
    `${
      API.ADMIN_REPORTS
    }/${type}?page=${page}&limit=${limit}&sort=createdAt,DESC&${query || ""}`
  );
  return res.data;
};

export const getReportsExports = async (query) => {
  const res = await axiosInstance.get(
    API.ADMIN_REPORT(query.type, query.query)
  );
  return res.data;
};

export const getReportsExport = async (type, query) => {
  const res = await axiosInstance.get(
    `${API.ADMIN_REPORTS}/${type}/export?sort=createdAt,DESC&${query || ""}`
  );
  return res.data;
};

export const getTrans = async (page, limit, query) => {
  const res = await axiosInstance.get(
    `${API.GET_TRAN}?page=${page}&limit=${limit}&sort=createdAt,DESC&${
      query || ""
    }`
  );
  return res.data;
};

export const getAdminIncidents = async (type, page, limit, query) => {
  const res = await axiosInstance.get(
    type
      ? API.INCIDENTS +
          `?page=${page}&limit=${limit}&sort=createdAt,DESC&${
            query || ""
          }&filter=status||$eq||${type}`
      : API.INCIDENTS +
          `?page=${page}&limit=${limit}&sort=createdAt,DESC&${query || ""}`
  );
  return res.data;
};

export const getAdminIncident = async (id) => {
  const res = await axiosInstance.get(`${API.INCIDENT}/${id}`);
  return res.data;
};

export const createIncident = async (body) => {
  const res = await axiosInstance.post(API.INCIDENTS, body);
  return res.data;
};

export const reUpload = async ({ query, body }) => {
  const res = await axiosInstance.patch(API.RE_UPLOAD(query), body);
  return res.data;
};

export const updateIncident = async ({ query, body }) => {
  const res = await axiosInstance.patch(API.INCIDENT_UPDATE(query), body);
  return res.data;
};

export const delAdminIncident = async (query) => {
  const res = await axiosInstance.delete(API.INCIDENT_UPDATE(query));
  return res.data;
};

export const uploadIncidentDocs = async ({ query, body }) => {
  const res = await axiosInstance.patch(API.INCIDENT_DOC(query), body);
  return res.data;
};

export const getPoints = async (page, limit, query) => {
  const res = await axiosInstance.get(
    `${
      API.GET_TRAN
    }?page=${page}&limit=${limit}&sort=createdAt,DESC&filter=paymentMethod||cont||%227%22&${
      query || ""
    }`
  );
  return res.data;
};

export const getAdminTran = async (query) => {
  const res = await axiosInstance.get(
    API.GET_ADMIN_TRAN(query.filterString, query.limit, query.page)
  );
  return res.data;
};

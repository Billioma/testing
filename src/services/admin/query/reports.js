import { useMutation, useQuery } from "react-query";
import {
  createIncident,
  delAdminIncident,
  getAdminIncident,
  getAdminIncidents,
  getAdminReport,
  getAdminTran,
  getPoints,
  getReports,
  getReportsExport,
  getReportsExports,
  getTrans,
  reUpload,
  updateIncident,
  uploadIncidentDocs,
} from "../api/report";

export const useGetAdminReport = (
  type = "",
  options = {},
  page = 1,
  limit = 50,
  query
) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_ADMIN_REPORT", page, limit, query, type],
    () => getAdminReport(type, page, limit, query),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useGetReports = (
  options = {},
  type = "",
  page = 1,
  limit = 50,
  query
) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_ADMIN_REPORT", type, page, limit, query],
    () => getReports(type, page, limit, query),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useGetReportExports = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getReportsExports, {
    mutationKey: "getReportsExport",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetReportExport = (options = {}, type = "", query) => {
  const { data, isLoading, refetch } = useQuery(
    ["getReportsExport", type, query],
    () => getReportsExport(type, query),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useGetTran = (options = {}, page = 1, limit = 50, query) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_ADM_TRAN", page, limit, query],
    () => getTrans(page, limit, query),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useGetAdminIncidents = (
  options = {},
  type = "",
  page = 1,
  limit = 50,
  query
) => {
  const { data, isLoading, refetch } = useQuery(
    ["getAdminIncidents", type, page, limit, query],
    () => getAdminIncidents(type, page, limit, query),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useGetAdminIncident = (id = "", options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    ["getAdminIncident", id],
    () => getAdminIncident(id),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useCreateIncident = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(createIncident, {
    mutationKey: "createIncident",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useReUpload = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(reUpload, {
    mutationKey: "reUpload",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useUpdateIncident = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(updateIncident, {
    mutationKey: "updateIncident",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useDelAdminIncident = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(delAdminIncident, {
    mutationKey: "delAdminIncident",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useUploadIncidentDocs = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(uploadIncidentDocs, {
    mutationKey: "uploadIncidentDocs",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetPoints = (options = {}, page = 1, limit = 50, query) => {
  const { data, isLoading, refetch } = useQuery(
    ["getPoints", page, limit, query],
    () => getPoints(page, limit, query),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useGetAdminRep = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getAdminReport, {
    mutationKey: "GET_ADMIN_REP",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetAdminTran = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getAdminTran, {
    mutationKey: "GET_ADMIN_TRAN",
    ...options,
  });
  return { mutate, isLoading, data };
};

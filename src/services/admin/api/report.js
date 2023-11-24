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
    `${API.ADMIN_REPORTS}/${type}?page=${page}&limit=${limit}&sort=id,DESC&${
      query || ""
    }`
  );
  return res.data;
};

export const getTrans = async (page, limit, query) => {
  const res = await axiosInstance.get(
    `${API.GET_TRAN}?page=${page}&limit=${limit}&sort=id,DESC&${query || ""}`
  );
  return res.data;
};

export const getAdminTran = async (query) => {
  const res = await axiosInstance.get(
    API.GET_ADMIN_TRAN(query.filterString, query.limit, query.page)
  );
  return res.data;
};

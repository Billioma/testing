import * as API from "../url";
import axiosInstance from "../../axiosInstance";

export const getAdminReport = async (type, page, limit, query) => {
  const res = await axiosInstance.get(
    API.GET_ADMIN_REPORTS(type, page, limit, query)
  );
  return res.data;
};

export const getAdminTran = async (page, limit, query) => {
  const res = await axiosInstance.get(API.GET_ADMIN_TRAN(page, limit, query));
  return res.data;
};

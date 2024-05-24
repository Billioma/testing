import * as API from "../url";
import axiosInstance from "../../axiosInstance";

export const requestLoan = async (body) => {
  const res = await axiosInstance.post(API.REQUEST_LOAN, body);
  return res.data;
};

export const getLoan = async (page, limit) => {
  const res = await axiosInstance.get(
    `${API.REQUEST_LOAN}?page=${page}&limit=${limit}&sort=createdAt,DESC`
  );
  return res.data;
};

export const getLoanBalance = async () => {
  const res = await axiosInstance.get(API.LOAN_BALANCE);
  return res.data;
};

export const getLoanDetails = async (id) => {
  const res = await axiosInstance.get(API.REQUEST_LOAN + `/${id}`);
  return res.data;
};

export const updateLoan = async ({ query, body }) => {
  const response = await axiosInstance.patch(API.UPDATE_LOAN(query), body);
  return response.data;
};

export const withdrawLoan = async (query) => {
  const response = await axiosInstance.patch(API.WITHDRAW_LOAN(query));
  return response.data;
};

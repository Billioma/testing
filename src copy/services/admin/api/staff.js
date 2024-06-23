import axiosInstance from "../../axiosInstance";
import * as API from "../url";

export const addStaff = async (data) => {
  const response = await axiosInstance.post(API.STAFFS, data);
  return response.data;
};

export const addStaffDoc = async (data) => {
  const response = await axiosInstance.post(API.EMPLOYEE_DOC, data);
  return response.data;
};

export const getStaffs = async (page, limit, query) => {
  const response = await axiosInstance.get(
    API.STAFFS +
      `?page=${page}&limit=${limit}&sort=createdAt,DESC&${query || ""}`,
  );
  return response.data;
};

export const editStaff = async ({ query, body }) => {
  const response = await axiosInstance.patch(API.STAFF(query), body);
  return response.data;
};

export const activateStaff = async (query) => {
  const response = await axiosInstance.patch(API.ACTIVATE_STAFF(query));
  return response.data;
};

export const editEmployeeDoc = async ({ query, body }) => {
  const response = await axiosInstance.patch(
    API.UPDATE_EMPLOYEE_DOC(query),
    body,
  );
  return response.data;
};

export const approveLicense = async (query) => {
  const response = await axiosInstance.patch(API.APPROVE_LICENSE(query));
  return response.data;
};

export const deleteStaff = async (id) => {
  const response = await axiosInstance.delete(`${API.STAFFS}/${id}`);
  return response.data;
};

export const deleteLeave = async (id) => {
  const response = await axiosInstance.delete(`${API.REQUEST_LEAVE}/${id}`);
  return response.data;
};

export const deleteLoan = async (id) => {
  const response = await axiosInstance.delete(`${API.REQUEST_LOAN}/${id}`);
  return response.data;
};

export const deleteMed = async (id) => {
  const response = await axiosInstance.delete(`${API.REQUEST_MED}/${id}`);
  return response.data;
};

export const cancelMed = async (id) => {
  const response = await axiosInstance.patch(`${API.REQUEST_MED}/cancel/${id}`);
  return response.data;
};

export const cancelLeave = async (id) => {
  const response = await axiosInstance.patch(
    `${API.REQUEST_LEAVE}/cancel/${id}`,
  );
  return response.data;
};

export const cancelLoan = async (id) => {
  const response = await axiosInstance.patch(
    `${API.REQUEST_LOAN}/cancel/${id}`,
  );
  return response.data;
};

export const delEmployeeDoc = async (query) => {
  const response = await axiosInstance.delete(API.UPDATE_EMPLOYEE_DOC(query));
  return response.data;
};

export const getStaffLeaveBalance = async (query) => {
  const response = await axiosInstance.get(API.GET_STAFF_LEAVE_BALANCE(query));
  return response.data;
};

export const getStaffLoanBalance = async (query) => {
  const response = await axiosInstance.get(API.GET_STAFF_LOAN_BALANCE(query));
  return response.data;
};

export const approveLeave = async ({ query, body }) => {
  const response = await axiosInstance.patch(API.APPROVE_LEAVE(query), body);
  return response.data;
};

export const rejectLeave = async ({ query, body }) => {
  const response = await axiosInstance.patch(API.REJECT_LEAVE(query), body);
  return response.data;
};

export const approveLoan = async ({ query, body }) => {
  const response = await axiosInstance.patch(API.APPROVE_LOAN(query), body);
  return response.data;
};

export const approveMed = async (query) => {
  const response = await axiosInstance.patch(API.APPROVE_MED(query));
  return response.data;
};

export const loanPaid = async ({ query, body }) => {
  const response = await axiosInstance.patch(API.LOAN_PAID(query), body);
  return response.data;
};

export const disburseLoan = async (query) => {
  const response = await axiosInstance.patch(API.DISBURSE_LOAN(query));
  return response.data;
};

export const rejectLoan = async (query) => {
  const response = await axiosInstance.patch(API.REJECT_LOAN(query));
  return response.data;
};

export const rejectMed = async (query) => {
  const response = await axiosInstance.patch(API.REJECT_MED(query));
  return response.data;
};

export const adminCreateLeave = async (body) => {
  const response = await axiosInstance.post(API.REQUEST_LEAVE, body);
  return response.data;
};

export const adminCreateMed = async (body) => {
  const response = await axiosInstance.post(API.REQUEST_MED, body);
  return response.data;
};

export const adminCreateLoan = async (body) => {
  const response = await axiosInstance.post(API.REQUEST_LOAN, body);
  return response.data;
};

export const getStaff = async (id) => {
  const res = await axiosInstance.get(API.STAFFS + `/${id}`);
  return res.data;
};

export const getLeave = async (type, page, limit, query) => {
  const res = await axiosInstance.get(
    type
      ? API.REQUEST_LEAVE +
          `?page=${page}&limit=${limit}&sort=createdAt,DESC&${
            query || ""
          }&filter=status||$eq||${type}`
      : API.REQUEST_LEAVE +
          `?page=${page}&limit=${limit}&sort=createdAt,DESC&${query || ""}`,
  );
  return res.data;
};

export const getLeaveDetails = async (id) => {
  const res = await axiosInstance.get(API.REQUEST_LEAVE + `/${id}`);
  return res.data;
};

export const getMed = async (type, page, limit, query) => {
  const res = await axiosInstance.get(
    type
      ? API.REQUEST_MED +
          `?page=${page}&limit=${limit}&sort=createdAt,DESC&${
            query || ""
          }&filter=status||$eq||${type}`
      : API.REQUEST_MED +
          `?page=${page}&limit=${limit}&sort=createdAt,DESC&${query || ""}`,
  );
  return res.data;
};

export const getMedDetails = async (id) => {
  const res = await axiosInstance.get(API.REQUEST_MED + `/${id}`);
  return res.data;
};

export const getLoan = async (type, page, limit, query) => {
  const res = await axiosInstance.get(
    type
      ? API.REQUEST_LOAN +
          `?page=${page}&limit=${limit}&sort=createdAt,DESC&${
            query || ""
          }&filter=status||$eq||${type}`
      : API.REQUEST_LOAN +
          `?page=${page}&limit=${limit}&sort=createdAt,DESC&${query || ""}`,
  );
  return res.data;
};

export const getLoanDetails = async (id) => {
  const res = await axiosInstance.get(API.REQUEST_LOAN + `/${id}`);
  return res.data;
};

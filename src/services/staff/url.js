export const LOGIN = process.env.REACT_APP_BASE_URL + "staff/auth/login";
export const SEND_PASS_OTP =
  process.env.REACT_APP_BASE_URL + "staff/auth/password-reset";
export const VRIFY_PASS__OTP =
  process.env.REACT_APP_BASE_URL + "staff/auth/verify-reset-code";
export const UPDATE_PASS =
  process.env.REACT_APP_BASE_URL + "staff/auth/update-password";

export const GET_USER = "staff/auth/profile";
export const REQUEST_LEAVE = "staff/leave-request";
export const LEAVE_BALANCE = "staff/leave-request/leave-balance";
export const REQUEST_LOAN = "staff/loan-request";
export const LOAN_BALANCE = "staff/loan-request/loan-balance";
export const REFRESH_TOKEN = "/auth/refresh";
export const UPDATE_LEAVE = (id = "") => `staff/leave-request/${id}`;
export const WITHDRAW_LEAVE = (id = "") => `staff/leave-request/withdraw/${id}`;
export const WITHDRAW_LOAN = (id = "") => `staff/loan-request/withdraw/${id}`;
export const UPDATE_LOAN = (id = "") => `staff/loan-request/${id}`;

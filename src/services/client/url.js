export const LOGIN = "auth/login";
export const REGISTER = "auth/register";
export const RESET_PASSWORD = "auth/password-reset";
export const CHANGE_PASSWORD = (id = "", hash = "") =>
  `auth/update-password/${id}/${hash}`;
export const CHANGE_USER_PASSWORD = "update-password";
export const GET_CLIENT_DETAILS = "auth/profile";
export const GET_USERS = (limit = "", page = "") =>
  `client/users?limit=${limit}&page=${page}&sort=id,DESC`;
export const GET_CLIENT_USERS = "client/users/?";
export const GET_USERS_COUNT = "client/dashboard/users";
export const FUND_WALLET = "cards/fund-wallet";
export const GET_SUB_COUNT = "client/dashboard/subscriptions";
export const GET_MEM_PLAN = "public/membership-plans?corporate=1";
export const GET_EVENT_COUNT = "client/dashboard/events";
export const CREATE_EVENTS = "client/events";
export const CREATE_SUB = "client/membership-subscriptions";
export const GET_EVENTS = (limit = "", page = "") =>
  `client/events?limit=${limit}&page=${page}&sort=id,DESC`;
export const GET_SUBS = (limit = "", page = "") =>
  `client/membership-subscriptions?limit=${limit}&page=${page}&sort=id,DESC`;
export const DEL_EVENTS = (id = "") => `client/events/${id}`;
export const LOOKUP_USER = (email = "") =>
  `client/users/lookup-user?email=${email}`;
export const ATTACH_USER = (email = "") =>
  `client/users/attach-user?email=${email}`;
export const DETACH_USER = (email = "") =>
  `client/users/detach-user?email=${email}`;
  export const GET_CARDS = "client/cards";

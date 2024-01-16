export const LOGIN = "auth/login";
export const REGISTER = "auth/register";
export const RESET_PASSWORD = "auth/password-reset";
export const CHANGE_PASSWORD = (id = "", hash = "") =>
  `auth/update-password/${id}/${hash}`;
export const CHANGE_USER_PASSWORD = "update-password";
export const GET_CLIENT_DETAILS = "auth/profile";
export const GET_CLIENTS_USERS = "client/users";
export const GET_USERS = (filterString = "", limit = "", page = "") =>
  `client/users?${filterString}&limit=${limit}&page=${page}&sort=createdAt,DESC`;
export const CLIENT_EVENT_PARKING_LIST = (
  filterString = "",
  limit = "",
  page = ""
) =>
  `client/event-parking?${filterString}&limit=${limit}&page=${page}&sort=createdAt,DESC`;
export const CLIENT_EVENT_PARKING_DETAIL = (id = "") =>
  `client/event-parking/${id}`;

export const CANCEL_CLIENT_EVENT = (id = "") =>
  `client/event-parking/cancel/${id}`;
export const GET_CLIENT_USERS = "client/users/?";
export const GET_USERS_COUNT = "client/dashboard/users";
export const FUND_WALLET = "cards/fund-wallet";
export const GET_SUB_COUNT = "client/dashboard/subscriptions";
export const GET_MEM_PLAN = "public/membership-plans?corporate=1";
export const GET_EVENT_COUNT = "client/dashboard/events";
export const CREATE_EVENTS = "client/events";
export const CLIENT_SERVICE_LOGS = "client/service-logs";
export const CREATE_SUB = "client/membership-subscriptions";
export const CLIENTELE_EVENTS = "client/events";
export const GET_EVENTS = (filterString = "", limit = "", page = "") =>
  `client/events?${filterString}&limit=${limit}&page=${page}&sort=createdAt,DESC`;
export const GET_SUBS = (filterString = "", limit = "", page = "") =>
  `client/membership-subscriptions?${filterString}&limit=${limit}&page=${page}&sort=createdAt,DESC`;
export const DEL_EVENTS = (id = "") => `client/events/${id}`;
export const LOOKUP_USER = (email = "") =>
  `client/users/lookup-user?email=${email}`;
export const ATTACH_USER = (email = "") =>
  `client/users/attach-user?email=${email}`;
export const DETACH_USER = (email = "") =>
  `client/users/detach-user?email=${email}`;
export const GET_CARDS = "client/cards";

export const CLIENT_SERVICE_LOGS_DETAIL = (id = "") =>
  `client/service-logs/${id}`;

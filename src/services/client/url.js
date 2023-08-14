export const LOGIN = "auth/login";
export const REGISTER = "auth/register";
export const RESET_PASSWORD = "auth/password-reset";
export const CHANGE_PASSWORD = (id = "", hash = "") =>
  `auth/update-password/${id}/${hash}`;
export const CHANGE_USER_PASSWORD = "update-password";
export const GET_CLIENT_DETAILS = "auth/profile";
export const GET_USERS = () => `client/users`;
export const CREATE_EVENTS = "client/events";
export const GET_EVENTS = () => `client/events`;
export const DEL_EVENTS = (id = "") => `client/events/${id}`;
export const LOOKUP_USER = (email = "") =>
  `client/users/lookup-user?email=${email}`;
export const ATTACH_USER = (email = "") =>
  `client/users/attach-user?email=${email}`;
export const DETACH_USER = (email = "") =>
  `client/users/detach-user?email=${email}`;

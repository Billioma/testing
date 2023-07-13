export const LOGIN = process.env.REACT_APP_BASE_URL + "auth/login";
export const REGISTER = process.env.REACT_APP_BASE_URL + "auth/register";
export const RESET_PASSWORD =
  process.env.REACT_APP_BASE_URL + "auth/password-reset";
export const CHANGE_PASSWORD = (id = "", hash = "") =>
  `${process.env.REACT_APP_BASE_URL}auth/update-password/${id}/${hash}`;

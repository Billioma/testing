export const LOGIN = "auth/login";
export const RESET_PASSWORD = "auth/password-reset";
export const CHANGE_PASSWORD = (id = "", hash = "") =>
  `auth/update-password/${id}/${hash}`;

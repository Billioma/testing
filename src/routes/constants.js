export const PUBLIC_PATHS = {
  LOGIN: "/customer/auth/login",
  RESET_PASS: "/customer/auth/forgot-password",
  CHANGE_PASS: "/customer/auth/password-reset/:id/:hash",
  CHANGE_SUCCESS: "/customer/auth/password-success",
  RESET_SENT: "/customer/auth/reset-success",
  SIGNUP: "/customer/auth/signup",
};

export const PRIVATE_PATHS = {
  DASHBOARD: "/customer/dashboard",
  SERVICES: "/customer/services",
  SUBSCRIPTION: "/customer/subscriptions",
  HISTORY: "/customer/history",
  HELP_CENTER: "/customer/help-center",
};

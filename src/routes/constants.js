export const PUBLIC_PATHS = {
  CUST_LOGIN: "/customer/auth/login",
  OP_LOGIN: "/operator/auth/login",
  CUST_RESET_PASS: "/customer/auth/forgot-password",
  CUST_CHANGE_PASS: "/customer/auth/password-reset/:id/:hash",
  CUST_CHANGE_SUCCESS: "/customer/auth/password-success",
  CUST_RESET_SENT: "/customer/auth/reset-success",
  CUST_SIGNUP: "/customer/auth/signup",
  OP_SIGNUP: "/operator/auth/signup",
};

export const PRIVATE_PATHS = {
  CUST_DASHBOARD: "/customer/dashboard",
  CUST_SERVICES: "/customer/services",
  CUST_SUBSCRIPTION: "/customer/subscriptions",
  CUST_HISTORY: "/customer/history",
  CUST_HELP_CENTER: "/customer/help-center",
};

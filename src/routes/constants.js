export const PUBLIC_PATHS = {
  CUST_LOGIN: "/customer/auth/login",
  OP_LOGIN: "/operator/auth/login",
  CUST_RESET_PASS: "/customer/auth/forgot-password",
  CUST_CHANGE_PASS: "/customer/auth/password-reset/:id/:hash",
  CUST_CHANGE_SUCCESS: "/customer/auth/password-success",
  CUST_RESET_SENT: "/customer/auth/reset-success",
  CUST_SIGNUP: "/customer/auth/signup",
  OP_SIGNUP: "/operator/auth/signup",
  OPERATOR_RESET_PASSWORD: "/operator/auth/forgot-password",
  OPERATOR_RESET_SENT: "/operator/auth/reset-success",
  OPERATOR_CHANGE_SUCCESS: "/operator/auth/password-success",
  OPERATOR_CHANGE_PASS: "/operator/auth/password-reset/:id/:hash",
};

export const PRIVATE_PATHS = {
  CUST_DASHBOARD: "/customer/dashboard",
  OP_DASHBOARD: "/operator/dashboard",
  CUST_SERVICES: "/customer/services",
  CUST_SERVICES_PARK: "/customer/services/park",
  CUST_SERVICES_RESERVE_PARK: "/customer/services/reserve-parking",
  CUST_SERVICES_EVENT_PARK: "/customer/services/event-parking",
  CUST_SUBSCRIPTION: "/customer/subscriptions",
  CUST_HISTORY: "/customer/history",
  CUST_HELP_CENTER: "/customer/help-center",
  CUST_VEHICLES: "/customer/vehicles",
};

export const PUBLIC_PATHS = {
  // CUSTOMER ROUTES
  CUST_LOGIN: "/customer/auth/login",
  CUST_RESET_PASS: "/customer/auth/forgot-password",
  CUST_CHANGE_PASS: "/customer/auth/password-reset/:id/:hash",
  CUST_CHANGE_SUCCESS: "/customer/auth/password-success",
  CUST_RESET_SENT: "/customer/auth/reset-success",
  CUST_SIGNUP: "/customer/auth/signup",

  //OPERATOR ROUTES
  OP_LOGIN: "/operator/auth/login",
  OP_SIGNUP: "/operator/auth/signup",
  OPERATOR_RESET_PASSWORD: "/operator/auth/forgot-password",
  OPERATOR_RESET_SENT: "/operator/auth/reset-success",
  OPERATOR_CHANGE_SUCCESS: "/operator/auth/password-success",
  OPERATOR_CHANGE_PASS: "/operator/auth/password-reset/:id/:hash",

  // ADMIN ROUTES
  ADMIN_LOGIN: "/admin/auth/login",
  ADMIN_RESET_PASSWORD: "/admin/auth/reset-password",
  ADMIN_RESET_PASSWORD_LINK: "/admin/auth/reset-password-link",
};

export const PRIVATE_PATHS = {
  // CUSTOMER ROUTES
  CUST_DASHBOARD: "/customer/dashboard",
  CUST_SERVICES: "/customer/services",
  CUST_SERVICES_PARK: "/customer/services/park",
  CUST_SERVICES_RESERVE_PARK: "/customer/services/reserve-parking",
  CUST_SERVICES_EVENT_PARK: "/customer/services/event-parking",
  CUST_SERVICES_CAR_SERVICE: "/customer/services/car-service",
  CUST_SUBSCRIPTION: "/customer/subscriptions",
  CUST_ADD_SUBSCRIPTION: "/customer/add-subscriptions",
  CUST_HISTORY: "/customer/history",
  CUST_HELP_CENTER: "/customer/help-center",
  CUST_VEHICLES: "/customer/vehicles",
  CUST_PROFILE: "/customer/account/profile",
  CUST_SETTINGS: "/customer/account/settings",
  CUST_PAYMENT: "/customer/account/payment",
  CUST_EDIT_PROFILE: "/customer/account/update-profile",

  //OPERATOR ROUTES
  OP_DASHBOARD: "/operator/dashboard",

  // ADMIN ROUTES
  ADMIN_DASHBOARD: "/admin/dashboard",
  ADMIN_SERVICES: "/admin/services",
  ADMIN_ATTENDANTS: "/admin/users/attendants",
  ADMIN_CUSTOMERS: "/admin/users/customers",
};

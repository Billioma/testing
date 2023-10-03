export const PUBLIC_PATHS = {
  // CUSTOMER ROUTES
  CUST_LOGIN: "/customer/auth/login",
  CUST_RESET_PASS: "/customer/auth/forgot-password",
  CUST_CHANGE_PASS: "/customer/auth/password-reset/:id/:hash",
  CUST_CHANGE_SUCCESS: "/customer/auth/password-success",
  CUST_RESET_SENT: "/customer/auth/reset-success",
  CUST_SIGNUP: "/customer/auth/signup",
  CUST_PARK: "/customer/pay-to-park",
  CUST_SCAN_PARK: "/customer/scan-qr",

  // CLIENT ROUTES
  CLIENT_LOGIN: "/client/auth/login",
  CLIENT_RESET_PASS: "/client/auth/forgot-password",
  CLIENT_CHANGE_PASS: "/client/auth/password-reset/:id/:hash",
  CLIENT_CHANGE_SUCCESS: "/client/auth/password-success",
  CLIENT_RESET_SENT: "/client/auth/reset-success",

  //OPERATOR ROUTES
  OP_LOGIN: "/operator/auth/login",
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
  CUST_ADD_SUBSCRIPTION: "/customer/subscriptions/create",
  CUST_HISTORY: "/customer/history",
  CUST_HELP_CENTER: "/customer/help-center",
  CUST_HELP_CENTER_MAIL: "/customer/help-center/contact-us",
  CUST_HELP_CENTER_FAQ: "/customer/help-center/FAQs",
  CUST_VEHICLES: "/customer/vehicles",
  CUST_PROFILE: "/customer/account/profile",
  CUST_SETTINGS: "/customer/account/settings",
  CUST_PAYMENT: "/customer/account/payment",
  CUST_EDIT_PROFILE: "/customer/account/update-profile",

  //CLIENT ROUTES
  CLIENT_DASHBOARD: "/client/dashboard",
  CLIENT_USERS: "/client/users",
  CLIENT_PROFILE: "/client/profile",
  CLIENT_ADD_USER: "/client/users/create",
  CLIENT_EVENTS: "/client/events",
  CLIENT_LOGS: "/client/logs/pay-to-park",
  CLIENT_LOGS_DETAILS: "/client/logs/pay-to-park/details",
  CLIENT_LOGS_VALET: "/client/logs/valet-park",
  CLIENT_LOGS_VALET_DETAILS: "/client/logs/valet-park/details",
  CLIENT_TRAN: "/client/transactions",
  CLIENT_TRAN_DETAILS: "/client/transaction-details",
  CLIENT_ADD_EVENT: "/client/events/create",
  CLIENT_EDIT_EVENT: "/client/events/:id",
  CLIENT_ADD_SUB: "/client/subscriptions/create",
  CLIENT_VIEW_SUB: "/client/subscriptions",

  //OPERATOR ROUTES
  OP_DASHBOARD: "/operator/dashboard",
  OP_ATTENDANT: "/operator/users/attendants",
  OP_ADD_ATTENDANT: "/operator/users/attendants/create",
  OP_ATTENDANT_DETAILS: "/operator/users/attendants/:id",
  OP_LOCATIONS: "/operator/locations/all",
  OP_LOCATION_DETAILS: "/operator/locations/all/:id",
  OP_ADD_LOCATION: "/operator/locations/all/create",
  OP_ZONES: "/operator/locations/zones",
  OP_ZONE_DETAILS: "/operator/locations/zones/:id",
  OP_ADD_ZONE: "/operator/locations/zones/create",
  OP_ADD_POLICY: "/operator/locations/policies/create",
  OP_RATES: "/operator/locations/rates",
  OP_ADD_RATE: "/operator/locations/rates/create",
  OP_RATE_DETAILS: "/operator/locations/rates/:id",
  OP_POLICIES: "/operator/locations/policies",
  OP_POLICY_DETAILS: "/operator/locations/policies/:id",
  OP_VALETED: "/operator/logs/valeted-vehicles",
  OP_VALETED_DETAILS: "/operator/logs/valeted-vehicles/:id",
  OP_PARKED: "/operator/logs/parked-vehicles",
  OP_PARKED_DETAILS: "/operator/logs/parked-vehicles/:id",
  OP_SERVICED: "/operator/logs/serviced-vehicles",
  OP_SERVICED_DETAILS: "/operator/logs/serviced-vehicles/:id",
  OP_REP_PAYMENTS: "/operator/reports/payments",
  OP_REP_LOCATIONS: "/operator/reports/locations",
  OP_REP_ZONES: "/operator/reports/zones",
  OP_REP_LOGS: "/operator/reports/logs",
  OP_PROFILE: "/operator/profile",

  // ADMIN ROUTES
  ADMIN_DASHBOARD: "/admin/dashboard",
  ADMIN_SERVICES: "/admin/services",
  ADMIN_ATTENDANTS: "/admin/users/attendants",
  ADMIN_CUSTOMERS: "/admin/users/customers",
  ADMIN_ADD_ATTENDANT: "/admin/users/attendants/new",
  ADMIN_VIEW_ATTENDANT: "/admin/users/attendants/details/:id",
  ADMIN_ADD_CUSTOMER: "/admin/users/customers/new",
  ADMIN_VIEW_CUSTOMER: "/admin/users/customers/details/:id",

  ADMIN_ADMINISTRATORS: "/admin/users/administrators",
  ADMIN_ADD_ADMINISTRATOR: "/admin/users/administrators/new",
  ADMIN_VIEW_ADMINISTRATOR: "/admin/users/administrators/details/:id",

  ADMIN_OPERATORS: "/admin/users/operatrs",
  ADMIN_ADD_OPERATOR: "/admin/users/operatrs/new",
  ADMIN_VIEW_OPERATOR: "/admin/users/operatrs/details/:id",

  ADMIN_VEHICLES: "/admin/vehicles",
  ADMIN_VIEW_VEHICLE: "/admin/vehicles/details/:id",
  ADMIN_ADD_VEHICLE: "/admin/vehicles/new",

  ADMIN_MEMBERSHIP_PLANS: "/admin/memberships/plans",
  ADMIN_ADD_MEMBERSHIP_PLAN: "/admin/memberships/plans/new",
  ADMIN_VIEW_MEMBERSHIP_PLAN: "/admin/memberships/plans/details/:id",

  ADMIN_MEMBERSHIP_FEATURES: "/admin/memberships/features",
  ADMIN_ADD_MEMBERSHIP_FEATURE: "/admin/memberships/features/new",
  ADMIN_VIEW_MEMBERSHIP_FEATURE: "/admin/memberships/features/details/:id",

  ADMIN_CUSTOMER_SUBSCRIPTIONS: "/admin/memberships/customer-subscriptions",
  ADMIN_ADD_CUSTOMER_SUBSCRIPTION:
    "/admin/memberships/customer-subscriptions/new",
  ADMIN_VIEW_CUSTOMER_SUBSCRIPTION:
    "/admin/memberships/customer-subscriptions/details/:id",

  ADMIN_CORPORATE_SUBSCRIPTIONS: "/admin/memberships/corporate-subscriptions",
  ADMIN_ADD_CORPORATE_SUBSCRIPTION:
    "/admin/memberships/corporate-subscriptions/new",
  ADMIN_VIEW_CORPORATE_SUBSCRIPTION:
    "/admin/memberships/corporate-subscriptions/details/:id",

  ADMIN_PAYTOPARK: "/admin/transactions/pay-to-park",
  ADMIN_VIEW_PAYTOPARK: "/admin/transactions/pay-to-park/:id",
  ADMIN_RESERVED_PARKING: "/admin/transactions/reserved-parking",
  ADMIN_VIEW_RESERVED_PARKING:
    "/admin/transactions/reserved-parking/details/:id",
  ADMIN_ADD_RESERVED_PARKING: "/admin/transactions/reserved-parking/new",

  ADMIN_CAR_SERVICES: "/admin/transactions/car-services",

  ADMIN_CLIENTS: "/admin/clients/list",
  ADMIN_ADD_CLIENT: "/admin/clients/list/new",
  ADMIN_VIEW_CLIENT: "/admin/clients/list/details/:id",

  ADMIN_CLIENTS_INVOICES: "/admin/clients/invoices",
  ADMIN_VIEW_CLIENT_INVOICE: "/admin/clients/invoices/details/:id",
  ADMIN_ADD_CLIENT_INVOICE: "/admin/clients/invoices/new",

  ADMIN_EVENTS: "/admin/clients/events",
  ADMIN_ADD_EVENT: "/admin/clients/events/new",
  ADMIN_VIEW_EVENT: "/admin/clients/events/details/:id",

  ADMIN_LOCATIONS: "/admin/locations/locations",
  ADMIN_ADD_LOCATION: "/admin/locations/locations/new",
  ADMIN_VIEW_LOCATION: "/admin/locations/locations/details/:id",

  ADMIN_ZONES: "/admin/locations/zones",
  ADMIN_VIEW_ZONE: "/admin/locations/zones/details/:id",
  ADMIN_ADD_ZONE: "/admin/locations/zones/new",

  ADMIN_RATES: "/admin/locations/rates",
  ADMIN_VIEW_RATE: "/admin/locations/rates/details/:id",
  ADMIN_ADD_RATE: "/admin/locations/rates/new",

  ADMIN_AMENITIES: "/admin/locations/amenities",
  ADMIN_VIEW_AMENITY: "/admin/locations/amenities/details/:id",
  ADMIN_ADD_AMENITY: "/admin/locations/amenities/new",

  ADMIN_POLICIES: "/admin/locations/policies",
  ADMIN_VIEW_POLICY: "/admin/locations/policies/details/:id",
  ADMIN_ADD_POLICY: "/admin/locations/policies/new",

  ADMIN_REP_PAYMENTS: "/admin/reports/payments",
  ADMIN_REP_LOCATIONS: "/admin/reports/locations",
  ADMIN_REP_ZONES: "/admin/reports/zones",
  ADMIN_REP_VEHICLES: "/admin/reports/vehicles",
  ADMIN_REP_CUSTOMERS: "/admin/reports/customers",
  ADMIN_REP_INVOICES: "/admin/reports/invoices",
  ADMIN_REP_SUBS: "/admin/reports/subscrptions",
  ADMIN_REP_LOGS: "/admin/reports/logs",
  ADMIN_REP_HISTORY: "/admin/reports/transactions",
};

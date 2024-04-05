export const PUBLIC_PATHS = {
  // CUSTOMER ROUTES
  CUST_LOGIN: "/customer/auth/login",
  CUST_LOGIN_REDIRECT: "/customer/auth/login/:redirect",
  CUST_RESET_PASS: "/customer/auth/forgot-password",
  CUST_CHANGE_PASS: "/customer/auth/password-reset",
  CUST_CHANGE_SUCCESS: "/customer/auth/password-success",
  CUST_RESET_SENT: "/customer/auth/reset-success",
  CUST_SIGNUP: "/customer/auth/signup",
  CUST_PARK: "/customer/pay-to-park/:zoneCode",
  CUST_SCAN_PARK: "/customer/scan-qr",

  // CLIENT ROUTES
  CLIENT_LOGIN: "/client/auth/login",
  CLIENT_RESET_PASS: "/client/auth/forgot-password",
  CLIENT_CHANGE_PASS: "/client/auth/password-reset",
  CLIENT_CHANGE_SUCCESS: "/client/auth/password-success",
  CLIENT_RESET_SENT: "/client/auth/reset-success",

  //OPERATOR ROUTES
  OP_LOGIN: "/operator/auth/login",
  OPERATOR_RESET_PASSWORD: "/operator/auth/forgot-password",
  OPERATOR_RESET_SENT: "/operator/auth/reset-success",
  OPERATOR_CHANGE_SUCCESS: "/operator/auth/password-success",
  OPERATOR_CHANGE_PASS: "/operator/auth/password-reset",

  // ADMIN ROUTES
  ADMIN_LOGIN: "/admin/auth/login",
  ADMIN_RESET_PASSWORD: "/admin/auth/reset-password",
  ADMIN_RESET_PASSWORD_LINK: "/admin/auth/reset-password-link",
};

export const PRIVATE_PATHS = {
  // CUSTOMER ROUTES
  CUST_DASHBOARD: "/customer/dashboard",
  CUST_SERVICES_PARK: "/customer/services/pay-to-park",
  CUST_HISTORY_PARK_DETAILS: "/customer/history/user/pay-to-park/:id",
  CUST_SERVICE_PARK_DETAILS: "/customer/history/company/pay-to-park/:id",
  CUST_SERVICE_VALET_DETAILS: "/customer/history/company/valet-parking/:id",
  CUST_SERVICES_RESERVE_PARK: "/customer/services/reserve-parking",
  CUST_SERVICES_RESERVE_PARK_DETAILS:
    "/customer/history/company/reserve-parking/:id",
  CUST_HISTORY_RESERVE_PARK_DETAILS:
    "/customer/history/user/reserve-parking/:id",
  CUST_SERVICES_EVENT_PARK: "/customer/services/event-parking",
  CUST_SERVICES_EVENT_PARK_DETAILS:
    "/customer/history/company/event-parking/:id",
  CUST_HISTORY_EVENT_PARK_DETAILS: "/customer/history/user/event-parking/:id",
  CUST_SERVICES_CAR_SERVICE: "/customer/services/car-service",
  CUST_SERVICES_CAR_SERVICE_DETAILS:
    "/customer/history/company/car-service/:id",
  CUST_SUBSCRIPTION: "/customer/subscriptions",
  CUST_ADD_SUBSCRIPTION: "/customer/subscriptions/create",

  CUST_HISTORY_USER: "/customer/history/user",
  CUST_HISTORY_US: "/customer/history/company",
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
  CLIENT_LOGS: "/client/logs/parked-vehicles",
  CLIENT_LOGS_DETAILS: "/client/logs/parked-vehicles/details/:id",
  CLIENT_LOGS_VALET: "/client/logs/valeted-vehicles",
  CLIENT_LOGS_VALET_DETAILS: "/client/logs/valeted-vehicles/details/:id",
  CLIENT_LOGS_SERVICED: "/client/logs/serviced-vehicles",
  CLIENT_LOGS_SERVICED_DETAILS: "/client/logs/serviced-vehicles/details/:id",
  CLIENT_TRAN: "/client/transactions",
  CLIENT_TRAN_DETAILS: "/client/transactions/details/:id",
  CLIENT_ADD_EVENT: "/client/events/create",
  CLIENT_EDIT_EVENT: "/client/events/:id",
  CLIENT_ADD_SUB: "/client/subscriptions/create",
  CLIENT_VIEW_SUB: "/client/subscriptions",

  //OPERATOR ROUTES
  OP_DASHBOARD: "/operator/dashboard",
  OP_TRANSACTION: "/operator/transactions",
  OP_PTP_TRANSACTION: "/operator/transactions/pay-to-park",
  OP_PTP_TRANSACTION_DETAILS: "/operator/transactions/pay-to-park/:id",
  OP_RP_TRANSACTION: "/operator/transactions/reservations",
  OP_RP_TRANSACTION_DETAILS: "/operator/transactions/reservations/:id",
  OP_EV_TRANSACTION: "/operator/transactions/event-parking/",
  OP_EV_TRANSACTION_DETAILS: "/operator/transactions/event-parking/:id",
  OP_SERVICE_TRANSACTION: "/operator/transactions/car-services/",
  OP_SERVICE_TRANSACTION_DETAILS: "/operator/transactions/car-services/:id",
  OP_TRANSACTION_DETAILS: "/operator/transactions/transaction-details",
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
  ADMIN_ADD_ATTENDANT: "/admin/users/attendants/create",
  ADMIN_VIEW_ATTENDANT: "/admin/users/attendants/details/:id",
  ADMIN_ADD_CUSTOMER: "/admin/users/customers/create",
  ADMIN_VIEW_CUSTOMER: "/admin/users/customers/details/:id",

  ADMIN_ADMINISTRATORS: "/admin/users/administrators",
  ADMIN_ADD_ADMINISTRATOR: "/admin/users/administrators/create",
  ADMIN_VIEW_ADMINISTRATOR: "/admin/users/administrators/details/:id",

  ADMIN_OPERATORS: "/admin/users/operators",
  ADMIN_ADD_OPERATOR: "/admin/users/operators/create",
  ADMIN_VIEW_OPERATOR: "/admin/users/operators/details/:id",
  ADMIN_PROFILE: "/admin/profile",
  ADMIN_EDIT_PROFILE: "/admin/update-profile",

  ADMIN_VEHICLES: "/admin/vehicles",
  ADMIN_VIEW_VEHICLE: "/admin/vehicles/details/:id",
  ADMIN_ADD_VEHICLE: "/admin/vehicles/create",

  ADMIN_MEMBERSHIP_PLANS: "/admin/memberships/plans",
  ADMIN_ADD_MEMBERSHIP_PLAN: "/admin/memberships/plans/create",
  ADMIN_VIEW_MEMBERSHIP_PLAN: "/admin/memberships/plans/details/:id",

  ADMIN_MEMBERSHIP_FEATURES: "/admin/memberships/features",
  ADMIN_ADD_MEMBERSHIP_FEATURE: "/admin/memberships/features/create",
  ADMIN_VIEW_MEMBERSHIP_FEATURE: "/admin/memberships/features/details/:id",

  ADMIN_CUSTOMER_SUBSCRIPTIONS: "/admin/memberships/customer-subscriptions",
  ADMIN_ADD_CUSTOMER_SUBSCRIPTION:
    "/admin/memberships/customer-subscriptions/create",
  ADMIN_VIEW_CUSTOMER_SUBSCRIPTION:
    "/admin/memberships/customer-subscriptions/details/:id",

  ADMIN_CORPORATE_SUBSCRIPTIONS: "/admin/memberships/corporate-subscriptions",
  ADMIN_ADD_CORPORATE_SUBSCRIPTION:
    "/admin/memberships/corporate-subscriptions/create",
  ADMIN_VIEW_CORPORATE_SUBSCRIPTION:
    "/admin/memberships/corporate-subscriptions/details/:id",

  ADMIN_PAYTOPARK: "/admin/transactions/pay-to-park",
  ADMIN_EVENTPARK: "/admin/transactions/event-parking",
  ADMIN_VIEW_EVENTPARK: "/admin/transactions/event-parking/details/:id",
  ADMIN_VIEW_PAYTOPARK: "/admin/transactions/pay-to-park/:id",
  ADMIN_RESERVED_PARKING: "/admin/transactions/reserved-parking",
  ADMIN_VIEW_RESERVED_PARKING:
    "/admin/transactions/reserved-parking/details/:id",
  ADMIN_ADD_RESERVED_PARKING: "/admin/transactions/reserved-parking/create",

  ADMIN_CAR_SERVICES: "/admin/transactions/car-services",
  ADMIN_TIPS: "/admin/transactions/tips",
  ADMIN_VIEWTIPS: "/admin/transactions/tips/:id",
  ADMIN_POINTS: "/admin/transactions/points",
  ADMIN_VIEWPOINTS: "/admin/transactions/points/:id",
  ADMIN_VIEW_CAR_SERVICE: "/admin/transactions/car-services/details/:id",
  ADMIN_ADD_CAR_SERVICE: "/admin/transactions/car-services/create",

  ADMIN_CLIENTS: "/admin/clients/all",
  ADMIN_ADD_CLIENT: "/admin/clients/all/create",
  ADMIN_VIEW_CLIENT: "/admin/clients/all/details/:id",

  ADMIN_SUPP_FEEDBACK: "/admin/support/feedback",
  ADMIN_RATE_FEEDBACK: "/admin/support/ratings",
  ADMIN_VIEW_FEEDBACK: "/admin/support/feedback/:id",

  ADMIN_CLIENTS_INVOICES: "/admin/clients/invoices",
  ADMIN_VIEW_CLIENT_INVOICE: "/admin/clients/invoices/details/:id",
  ADMIN_ADD_CLIENT_INVOICE: "/admin/clients/invoices/create",

  ADMIN_EVENTS: "/admin/events",
  ADMIN_ADD_EVENT: "/admin/events/create",
  ADMIN_VIEW_EVENT: "/admin/events/details/:id",

  ADMIN_LOCATIONS: "/admin/locations/all",
  ADMIN_ADD_LOCATION: "/admin/locations/all/create",
  ADMIN_VIEW_LOCATION: "/admin/locations/all/details/:id",

  ADMIN_ZONES: "/admin/locations/zones",
  ADMIN_VIEW_ZONE: "/admin/locations/zones/details/:id",
  ADMIN_ADD_ZONE: "/admin/locations/zones/create",

  ADMIN_RATES: "/admin/locations/rates",
  ADMIN_VIEW_RATE: "/admin/locations/rates/details/:id",
  ADMIN_ADD_RATE: "/admin/locations/rates/create",

  ADMIN_AMENITIES: "/admin/locations/amenities",
  ADMIN_VIEW_AMENITY: "/admin/locations/amenities/details/:id",
  ADMIN_ADD_AMENITY: "/admin/locations/amenities/create",

  ADMIN_POLICIES: "/admin/locations/policies",
  ADMIN_VIEW_POLICY: "/admin/locations/policies/details/:id",
  ADMIN_ADD_POLICY: "/admin/locations/policies/create",

  ADMIN_VALETED_VEHICLES: "/admin/logs/valeted-vehicles",
  ADMIN_VIEW_VALETED_VEHICLE: "/admin/logs/valeted-vehicles/details/:id",

  ADMIN_PARKED_VEHICLES: "/admin/logs/parked-vehicles",
  ADMIN_VIEW_PARKED_VEHICLE: "/admin/logs/parked-vehicles/details/:id",

  ADMIN_SERVICED_VEHICLES: "/admin/logs/serviced-vehicles",
  ADMIN_VIEW_SERVICED_VEHICLE: "/admin/logs/serviced-vehicles/details/:id",

  ADMIN_CONFIG_ROLES: "/admin/configurations/roles",
  ADMIN_CONFIG_ADD_ROLE: "/admin/configurations/roles/create",
  ADMIN_CONFIG_VIEW_ROLE: "/admin/configurations/roles/details/:id",
  ADMIN_CONFIG_PERMISSIONS: "/admin/configurations/permissions",
  ADMIN_CONFIG_ADD_PERMISSION: "/admin/configurations/permissions/create",
  ADMIN_CONFIG_VIEW_PERMISSION: "/admin/configurations/permissions/details/:id",

  ADMIN_CONFIG_VEHICLE_MAKES: "/admin/configurations/vehicle-makes",
  ADMIN_CONFIG_ADD_VEHICLE_MAKE: "/admin/configurations/vehicle-makes/create",
  ADMIN_CONFIG_VIEW_VEHICLE_MAKE:
    "/admin/configurations/vehicle-makes/details/:id",

  ADMIN_CONFIG_VEHICLE_MODELS: "/admin/configurations/vehicle-models",
  ADMIN_CONFIG_ADD_VEHICLE_MODEL: "/admin/configurations/vehicle-models/create",
  ADMIN_CONFIG_VIEW_VEHICLE_MODEL:
    "/admin/configurations/vehicle-models/details/:id",

  ADMIN_CONFIG_FAQS: "/admin/configurations/faqs",
  ADMIN_CONFIG_ADD_FAQ: "/admin/configurations/faqs/create",
  ADMIN_CONFIG_VIEW_FAQ: "/admin/configurations/faqs/details/:id",

  ADMIN_CONFIG_BANK_DETAILS: "/admin/configurations/bank-details",
  ADMIN_CONFIG_ADD_BANK_DETAIL: "/admin/configurations/bank-details/create",
  ADMIN_CONFIG_VIEW_BANK_DETAIL:
    "/admin/configurations/bank-details/details/:id",

  ADMIN_CONFIG_QR_CODE: "/admin/configurations/qr-code/create",

  ADMIN_REP_PAYMENTS: "/admin/reports/payments",
  ADMIN_REP_LOCATIONS: "/admin/reports/locations",
  ADMIN_REP_ZONES: "/admin/reports/zones",
  ADMIN_REP_VEHICLES: "/admin/reports/vehicles",
  ADMIN_REP_CUSTOMERS: "/admin/reports/customers",
  ADMIN_REP_INVOICES: "/admin/reports/invoices",
  ADMIN_REP_SUBS: "/admin/reports/subscriptions",
  ADMIN_REP_LOGS: "/admin/reports/logs",
  ADMIN_REP_HISTORY: "/admin/reports/payment-history",
  ADMIN_REP_TIPS: "/admin/reports/tips",
};

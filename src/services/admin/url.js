const BASE_URL = process.env.REACT_APP_BASE_URL;

export const LOGIN = "auth/login";
export const GET_PROFILE = BASE_URL + "admin/auth/profile";

export const GET_ADMIN_DASHBOARD_DATA = BASE_URL + "admin/dashboard/metrics";
export const ADMIN_SERVICES = "admin/services";
export const ADMIN_SERVICES_LIST = (filterString = "", limit = "", page = "") =>
  `admin/services?${filterString}&limit=${limit}&page=${page}&sort=createdAt,DESC`;
export const GET_USERS_METRICS = "admin/dashboard/user-metrics";
export const GET_USERS_METRICS_FILTER = (from = "", to = "") =>
  `admin/dashboard/user-metrics/?from=${from}&to=${to}`;
export const GET_SERVICES_METRIC_FILTER = (from = "", to = "") =>
  `admin/dashboard/services-metrics/?from=${from}&to=${to}`;
export const GET_ACTIVITIES_METRICS_FILTER = (from = "", to = "") =>
  `admin/dashboard/activities-metrics/?from=${from}&to=${to}`;
export const GET_SERVICES_METRICS = "admin/dashboard/services-metrics";
export const GET_ACTIVITIES_METRICS = "admin/dashboard/activities-metrics";

export const CREATE_SERVICE = "admin/services";
export const ADMIN_ATTENDANTS = "admin/attendants";
export const ADMIN_ATTENDANT = (id = "") => `admin/attendants/${id}`;
export const ADMIN_ATTENDANTS_LIST = (
  filterString = "",
  limit = "",
  page = ""
) =>
  `admin/attendants?${filterString}&limit=${limit}&page=${page}&sort=createdAt,DESC`;
export const ADMIN_CUSTOMERS = "admin/customers";
export const ADMIN_CUSTOMERS_LIST = (
  filterString = "",
  limit = "",
  page = ""
) =>
  `admin/customers?${filterString}&limit=${limit}&page=${page}&sort=createdAt,DESC`;

export const ADMIN_CUSTOMER = (id = "") => `admin/customers/${id}`;
export const FUND_CUSTOMER = (id = "") => `admin/customers/fund-wallet/${id}`;

export const ADMIN_OPERATORS = "admin/operators";
export const ADMIN_OPERATOR = (id = "") => `admin/operators/${id}`;
export const ADMIN_OPERATORS_LIST = (
  filterString = "",
  limit = "",
  page = ""
) =>
  `admin/operators?${filterString}&limit=${limit}&page=${page}&sort=createdAt,DESC`;

export const ADMIN_ADMINISTRATORS = "admin/users";
export const ADMIN_ADMINISTRATOR = (id = "") => `admin/users/${id}`;
export const ADMIN_ADMINISTRATORS_LIST = (
  filterString = "",
  limit = "",
  page = ""
) =>
  `admin/users?${filterString}&limit=${limit}&page=${page}&sort=createdAt,DESC`;
export const CLIENT_USERS = (id = "") => `admin/clients/users/${id}`;
export const DETACH_CLIENT_USER = (id = "", email = "") =>
  `admin/clients/detach-user/${id}/?email=${email}`;
export const ATTACH_CLIENT_USER = (id = "", email = "") =>
  `admin/clients/attach-user/${id}/?email=${email}`;
export const MANAGERS = "admin/entity-selectors/users/?search=&manager=1";
export const CUSTOMERS = "admin/entity-selectors/customers/";

export const ADMIN_LOCATIONS = "admin/locations";
export const ADMIN_LOCATIONS_LIST = (
  filterString = "",
  limit = "",
  page = ""
) =>
  `admin/locations?${filterString}&limit=${limit}&page=${page}&sort=createdAt,DESC`;

export const ADMIN_LOCATION = (id = "") => `admin/locations/${id}`;
export const ADMIN_ZONES = "admin/zones";
export const ADMIN_ZONES_LIST = (filterString = "", limit = "", page = "") =>
  `admin/zones?${filterString}&limit=${limit}&page=${page}&sort=createdAt,DESC`;

export const ADMIN_ZONE = (id = "") => `admin/zones/${id}`;

export const ADMIN_ROLES = "admin/roles";
export const ADMIN_DEPTS = "admin/department";
export const ADMIN_JOBS = "admin/job-title";
export const ADMIN_PERMISSIONS = "admin/permissions";
export const ADMIN_ROLES_PERMISSIONS = "admin/roles/permissions";
export const ADMIN_ROLES_LIST = (filterString = "", limit = "", page = "") =>
  `admin/roles?${filterString}&limit=${limit}&page=${page}&sort=createdAt,DESC`;

export const ADMIN_ROLE = (id = "") => `admin/roles/${id}`;

export const ADMIN_PERMISSIONS_LIST = (
  filterString = "",
  limit = "",
  page = ""
) =>
  `admin/permissions?${filterString}&limit=${limit}&page=${page}&sort=createdAt,DESC`;

export const ADMIN_PERMISSION = (id = "") => `admin/permissions/${id}`;

export const ADMIN_VEHICLE_MAKES_LIST = (
  filterString = "",
  limit = "",
  page = ""
) =>
  `admin/vehicle-makes?${filterString}&limit=${limit}&page=${page}&sort=createdAt,DESC`;

export const ADMIN_VEHICLE_MAKE = (id = "") => `admin/vehicle-makes/${id}`;

export const ADMIN_VEHICLE_MODELS_LIST = (
  filterString = "",
  limit = "",
  page = ""
) =>
  `admin/vehicle-models?${filterString}&limit=${limit}&page=${page}&sort=createdAt,DESC`;

export const ADMIN_VEHICLE_MODEL = (id = "") => `admin/vehicle-models/${id}`;

export const UPLOAD_MEDIA = "system/media-upload";
export const SERVICE_LOG_MAKE_PAYMENT = (id = "") =>
  `admin/service-logs/make-payment/${id}`;

export const ADMIN_RATINGS_METRIC = "admin/dashboard/ratings-metrics";

export const ADMIN_FEEDBACKS = "admin/feedbacks";
export const ADMIN_FEEDBACK_REPLY = "admin/feedbacks/reply";
export const ADMIN_FEEDBACK = (id = "") => `admin/feedbacks/${id}`;

export const ADMIN_VEHICLES = "admin/vehicles";
export const ADMIN_VEHICLES_LIST = (filterString = "", limit = "", page = "") =>
  `admin/vehicles?${filterString}&limit=${limit}&page=${page}&sort=createdAt,DESC`;
export const ADMIN_VEHICLE = (id = "") => `admin/vehicles/${id}`;

export const ADMIN_VEHICLE_MAKES = "admin/vehicle-makes";
export const ADMIN_VEHICLE_MODELS = "admin/vehicle-models";

export const ADMIN_CORPORATE_PLANS = "public/membership-plans";
export const ADMIN_MEMBERSHIP_PLANS = "admin/membership-plans";

export const ADMIN_MEMBERSHIP_PLANS_LIST = (
  filterString = "",
  limit = "",
  page = ""
) =>
  `admin/membership-plans?${filterString}&limit=${limit}&page=${page}&sort=createdAt,DESC`;

export const ADMIN_MEMBERSHIP_PLAN = (id = "") =>
  `admin/membership-plans/${id}`;

export const ADMIN_MEMBERSHIP_FEATURES_LIST = (
  filterString = "",
  limit = "",
  page = ""
) =>
  `admin/membership-plan-features?${filterString}&limit=${limit}&page=${page}&sort=createdAt,DESC`;

export const ADMIN_MEMBERSHIP_FEATURE = (id = "") =>
  `admin/membership-plan-features/${id}`;

export const ADMIN_CUSTOMER_SUBS_LIST = (
  filterString = "",
  limit = "",
  page = ""
) =>
  `admin/membership-subscriptions?${filterString}&limit=${limit}&page=${page}&sort=createdAt,DESC`;

export const ADMIN_CUSTOMER_SUB = (id = "") =>
  `admin/membership-subscriptions/${id}`;

export const ADMIN_CORP_SUBS_LIST = (
  filterString = "",
  limit = "",
  page = ""
) =>
  `admin/corporate-subscriptions?${filterString}&limit=${limit}&page=${page}&sort=createdAt,DESC`;

export const ADMIN_CORP_SUB = (id = "") =>
  `admin/corporate-subscriptions/${id}`;
export const ADMIN_MEMBERSHIP_FEATURES = "admin/membership-plan-features";
export const ADMIN_CUSTOMER_SUBSCRIPTIONS = "admin/membership-subscriptions";
export const ADMIN_CUSTOMER_SUBSCRIPTION = (id = "") =>
  `admin/membership-subscriptions/${id}`;
export const ADMIN_CORPORATE_SUBSCRIPTIONS = "admin/corporate-subscriptions";

export const ADMIN_CLIENTS = "admin/clients";
export const ADMIN_CLIENTS_LIST = (filterString = "", limit = "", page = "") =>
  `admin/clients?${filterString}&limit=${limit}&page=${page}&sort=createdAt,DESC`;
export const ADMIN_CLIENT = (id = "") => `admin/clients/${id}`;
export const ADMIN_EVENTS = "admin/events";

export const ADMIN_EVENT = (id = "") => `admin/events/${id}`;

export const ADMIN_EVENTS_LIST = (filterString = "", limit = "", page = "") =>
  `admin/events?${filterString}&limit=${limit}&page=${page}&sort=createdAt,DESC`;

export const ADMIN_CLIENTS_INVOICES = "admin/client-invoices";
export const ADMIN_CLIENTS_MAKE_PAYMENT = (id = "") =>
  `admin/client-invoices/${id}/payment`;
export const ADMIN_CLIENT_INVOICE = (id = "") => `admin/client-invoices/${id}`;
export const ADMIN_CLIENTS_INVOICES_LIST = (
  filterString = "",
  limit = "",
  page = ""
) =>
  `admin/client-invoices?${filterString}&limit=${limit}&page=${page}&sort=createdAt,DESC`;
export const ADMIN_PAY_TO_PARK = "admin/pay-to-park";
export const ADMIN_PAY_TO_PARK_LIST = (
  filterString = "",
  limit = "",
  page = ""
) =>
  `admin/pay-to-park?${filterString}&limit=${limit}&page=${page}&sort=createdAt,DESC`;
export const ADMIN_PAY_TO_PARK_DETAIL = (id = "") => `admin/pay-to-park/${id}`;
export const ADMIN_EVENT_PARKING_LIST = (
  filterString = "",
  limit = "",
  page = ""
) =>
  `admin/event-parking?${filterString}&limit=${limit}&page=${page}&sort=createdAt,DESC`;

export const ADMIN_EVENT_PARKING = "admin/event-parking";
export const ADMIN_TIPS = "admin/tips";
export const ADMIN_REPORTS = "admin/reports";
export const ADMIN_REPORT = (type = "", query = "") =>
  `admin/reports/${type}/export?sort=createdAt,DESC&${query || ""}`;

export const ADMIN_RESERVED_PARKING = "admin/reservations";
export const ADMIN_RESERVED_PARKING_LIST = (
  filterString = "",
  limit = "",
  page = ""
) =>
  `admin/reservations?${filterString}&limit=${limit}&page=${page}&sort=createdAt,DESC`;

export const ADMIN_RESERVED_PARKING_DETAIL = (id = "") =>
  `admin/reservations/${id}`;

export const ADMIN_POINTS_DETAIL = (id = "") => `admin/transactions/${id}`;

export const ADMIN_EVENT_PARKING_DETAIL = (id = "") =>
  `admin/event-parking/${id}`;

export const ADMIN_CAR_SERVICES = "admin/service-bookings";
export const ADMIN_CAR_SERVICES_LIST = (
  filterString = "",
  limit = "",
  page = ""
) =>
  `admin/service-bookings?${filterString}&limit=${limit}&page=${page}&sort=createdAt,DESC`;

export const ADMIN_CAR_SERVICE_DETAIL = (id = "") =>
  `admin/service-bookings/${id}`;

export const ADMIN_TIPS_LIST = (filterString = "", limit = "", page = "") =>
  `admin/tips?${filterString}&limit=${limit}&page=${page}&sort=createdAt,DESC`;

export const ADMIN_TIPS_DETAIL = (id = "") => `admin/tips/${id}`;

export const ADMIN_SERVICE_LOGS_LIST = (
  type = "",
  filterString = "",
  limit = "",
  page = ""
) =>
  `admin/service-logs?filter=service.serviceType||$eq||${type}&${filterString}&limit=${limit}&page=${page}&sort=createdAt,DESC`;

export const ADMIN_SERVICE_LOGS_DETAIL = (id = "") =>
  `admin/service-logs/${id}`;
export const ADMIN_SERVICE_TICKET = "admin/service-logs/retrieve-ticket";

export const ADMIN_AMENITIES = "admin/amenities";

export const ADMIN_SERVICE_LOGS = "admin/service-logs";

export const GET_ADMIN_REPORTS = (
  type = "",
  filterString = "",
  limit = "",
  page = ""
) =>
  `admin/reports/${type}?${filterString}&limit=${limit}&page=${page}&sort=createdAt,DESC`;

export const GET_REPORTS = "admin/reports";

export const GET_ADMIN_TRAN = (filterString = "", limit = "", page = "") =>
  `admin/transactions?${filterString}&limit=${limit}&page=${page}&sort=createdAt,DESC`;

export const GET_TRAN = "admin/transactions";

export const STAFFS = "/admin/staff";
export const DEPTS = "/admin/department";
export const REQUEST_LEAVE = "admin/leave-request";
export const REQUEST_LOAN = "admin/loan-request";
export const ADMIN_REQUEST_LEAVE = (id = "") => `admin/leave-request/${id}`;
export const ADMIN_REQUEST_LOAN = (id = "") => `admin/loan-request/${id}`;
export const STAFF_LIST = (filterString = "", limit = "", page = "") =>
  `admin/staff?${filterString}&limit=${limit}&page=${page}&sort=createdAt,DESC`;
export const STAFF = (id = "") => `admin/staff/${id}`;
export const ACTIVATE_STAFF = (id = "") => `admin/staff/activate/${id}`;
export const UPDATE_EMPLOYEE_DOC = (id = "") =>
  `admin/employee-documents/${id}`;
export const UPDATE_DEPT = (id = "") => `admin/department/${id}`;
export const GET_STAFF_LEAVE_BALANCE = (id = "") =>
  `admin/leave-request/leave-balance/${id}`;
export const GET_STAFF_LOAN_BALANCE = (id = "") =>
  `admin/loan-request/loan-balance/${id}`;
export const APPROVE_LICENSE = (id = "") =>
  `admin/staff/approve-driver-license/${id}`;
export const EMPLOYEE_DOC = "admin/employee-documents";

export const ADMIN_RATES = "admin/rates";
export const ADMIN_RATES_LIST = (filterString = "", limit = "", page = "") =>
  `admin/rates?${filterString}&limit=${limit}&page=${page}&sort=createdAt,DESC`;

export const ADMIN_RATE = (id = "") => `admin/rates/${id}`;
export const APPROVE_LEAVE = (id = "") => `admin/leave-request/approve/${id}`;
export const REJECT_LEAVE = (id = "") => `admin/leave-request/reject/${id}`;
export const APPROVE_LOAN = (id = "") => `admin/loan-request/approve/${id}`;
export const LOAN_PAID = (id = "") =>
  `admin/loan-request/${id}/repayment-plan/set-to-paid`;
export const REJECT_LOAN = (id = "") => `admin/loan-request/decline/${id}`;

export const ADMIN_AMENITIES_LIST = (
  filterString = "",
  limit = "",
  page = ""
) =>
  `admin/amenities?${filterString}&limit=${limit}&page=${page}&sort=createdAt,DESC`;

export const ADMIN_AMENITY = (id = "") => `admin/amenities/${id}`;

export const ADMIN_POLICIES = "admin/policies";

export const ADMIN_POLICIES_LIST = (filterString = "", limit = "", page = "") =>
  `admin/policies?${filterString}&limit=${limit}&page=${page}&sort=createdAt,DESC`;

export const ADMIN_POLICY = (id = "") => `admin/policies/${id}`;

export const ADMIN_BANK_DETAILS = "admin/bank-details";

export const ADMIN_BANKS_LIST = (filterString = "", limit = "", page = "") =>
  `admin/bank-details?${filterString}&limit=${limit}&page=${page}&sort=createdAt,DESC`;

export const ADMIN_BANK = (id = "") => `admin/bank-details/${id}`;
export const ADMIN_FAQS = "admin/faqs";

export const ADMIN_FAQS_LIST = (filterString = "", limit = "", page = "") =>
  `admin/faqs?${filterString}&limit=${limit}&page=${page}&sort=createdAt,DESC`;

export const ADMIN_FAQ = (id = "") => `admin/faqs/${id}`;

export const UPDATE_ADMIN_PROFILE = "/admin/update-profile";
export const UPDATE_ADMIN_PASSWORD = "/admin/update-password";

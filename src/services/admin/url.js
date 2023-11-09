const BASE_URL = process.env.REACT_APP_BASE_URL;

export const LOGIN = BASE_URL + "admin/auth/login";
export const GET_PROFILE = BASE_URL + "admin/auth/profile";

export const GET_ADMIN_DASHBOARD_DATA = BASE_URL + "admin/dashboard/metrics";
export const ADMIN_SERVICES = "admin/services";
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
  `admin/attendants?${filterString}&limit=${limit}&page=${page}&sort=id,DESC`;
export const ADMIN_CUSTOMERS = "admin/customers";
export const ADMIN_CUSTOMERS_LIST = (
  filterString = "",
  limit = "",
  page = ""
) => `admin/customers?${filterString}&limit=${limit}&page=${page}&sort=id,DESC`;

export const ADMIN_CUSTOMER = (id = "") => `admin/customers/${id}`;

export const ADMIN_OPERATORS = "admin/operators";
export const ADMIN_OPERATOR = (id = "") => `admin/operators/${id}`;
export const ADMIN_OPERATORS_LIST = (
  filterString = "",
  limit = "",
  page = ""
) => `admin/operators?${filterString}&limit=${limit}&page=${page}&sort=id,DESC`;

export const ADMIN_ADMINISTRATORS = "admin/users";
export const ADMIN_ADMINISTRATOR = (id = "") => `admin/users/${id}`;
export const ADMIN_ADMINISTRATORS_LIST = (
  filterString = "",
  limit = "",
  page = ""
) => `admin/users?${filterString}&limit=${limit}&page=${page}&sort=id,DESC`;
export const CLIENT_USERS = (id = "") => `admin/clients/users/${id}`;
export const DETACH_CLIENT_USER = (id = "", email = "") =>
  `admin/clients/detach-user/${id}/?email=${email}`;
export const ATTACH_CLIENT_USER = (id = "", email = "") =>
  `admin/clients/attach-user/${id}/?email=${email}`;
export const MANAGERS = "admin/entity-selectors/users/?search=&manager=1";
export const CUSTOMERS = "admin/entity-selectors/customers/";

export const ADMIN_LOCATIONS = "admin/locations";
export const ADMIN_ZONES = "admin/zones";

export const ADMIN_ROLES = "admin/roles";
export const UPLOAD_MEDIA = "system/media-upload";

export const ADMIN_VEHICLES = "admin/vehicles";
export const ADMIN_VEHICLE_MAKES = "admin/vehicle-makes";
export const ADMIN_VEHICLE_MODELS = "admin/vehicle-models";

export const ADMIN_CORPORATE_PLANS = "public/membership-plans";
export const ADMIN_MEMBERSHIP_PLANS = "admin/membership-plans";
export const ADMIN_MEMBERSHIP_FEATURES = "admin/membership-plan-features";
export const ADMIN_CUSTOMER_SUBSCRIPTIONS = "admin/membership-subscriptions";
export const ADMIN_CORPORATE_SUBSCRIPTIONS = "admin/corporate-subscriptions";

export const ADMIN_CLIENTS = "admin/clients";
export const ADMIN_CLIENTS_LIST = (filterString = "", limit = "", page = "") =>
  `admin/clients?${filterString}&limit=${limit}&page=${page}&sort=id,DESC`;
export const ADMIN_CLIENT = (id = "") => `admin/clients/${id}`;
export const ADMIN_EVENTS = "admin/events";

export const ADMIN_EVENT = (id = "") => `admin/events/${id}`;

export const ADMIN_EVENTS_LIST = (filterString = "", limit = "", page = "") =>
  `admin/events?${filterString}&limit=${limit}&page=${page}&sort=id,DESC`;

export const ADMIN_CLIENTS_INVOICES = "admin/client-invoices";
export const ADMIN_CLIENTS_MAKE_PAYMENT = (id = "") =>
  `admin/client-invoices/${id}/payment`;
export const ADMIN_CLIENT_INVOICE = (id = "") => `admin/client-invoices/${id}`;
export const ADMIN_CLIENTS_INVOICES_LIST = (
  filterString = "",
  limit = "",
  page = ""
) =>
  `admin/client-invoices?${filterString}&limit=${limit}&page=${page}&sort=id,DESC`;
export const ADMIN_PAY_TO_PARK = "admin/pay-to-park";

export const ADMIN_RESERVED_PARKING = "admin/reservations";

export const ADMIN_CAR_SERVICES = "admin/service-bookings";

export const ADMIN_AMENITIES = "admin/amenities";

export const ADMIN_SERVICE_LOGS = "admin/service-logs";

export const GET_ADMIN_REPORTS = (
  type = "",
  page = "",
  limit = "",
  query = ""
) => `admin/reports/${type}/?limit=${limit}&page=${page}&sort=id,DESC&${query}`;

export const GET_ADMIN_TRAN = (page = "", limit = "", query = "") =>
  `admin/transactions/?limit=${limit}&page=${page}&sort=id,DESC&${query}`;

export const ADMIN_RATES = "admin/rates";
export const ADMIN_POLICIES = "admin/policies";

export const ADMIN_BANK_DETAILS = "admin/bank-details";
export const ADMIN_FAQS = "admin/faqs";

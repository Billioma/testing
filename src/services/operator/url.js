export const LOGIN = "auth/login";
export const RESET_PASSWORD = "auth/password-reset";
export const UPDATE_OPERATOR = "/operator/update-profile";
export const UPDATE_PASS = "/operator/update-password";
export const EXP_LOC = () => `operator/reports/locations/export/?&sort=id,DESC`;
export const EXP_ZONE = () => `operator/reports/zones/export/?&sort=id,DESC`;
export const EXP_LOG = () => `operator/reports/parking/export/?&sort=id,DESC`;
export const EXP_PAY = () => `operator/reports/payments/export/?&sort=id,DESC`;
export const CHANGE_PASSWORD = (id = "", hash = "") =>
  `auth/update-password/${id}/${hash}`;
export const METRICS = "operator/dashboard/metrics";
export const METRICS_FILTER = (from = "", to = "") =>
  `operator/dashboard/metrics/?from=${from}&to=${to}`;
export const OPERATOR_PROFILE = "operator/auth/profile";
export const CREATE_ATTENDANT = "operator/attendants";
export const GET_ATTENDANTS = (filterString = "", limit = "", page = "") =>
  `operator/attendants?${filterString}&limit=${limit}&page=${page}&sort=id,DESC`;
export const GET_LOCATIONS = (filterString = "", limit = "", page = "") =>
  `operator/locations?${filterString}&limit=${limit}&page=${page}&sort=id,DESC`;
export const GET_ZONES = (filterString = "", limit = "", page = "") =>
  `operator/zones?${filterString}&limit=${limit}&page=${page}&sort=id,DESC`;
export const GET_RATES = (filterString = "", limit = "", page = "") =>
  `operator/rates?${filterString}&limit=${limit}&page=${page}&sort=id,DESC`;
export const GET_POLICIES = (filterString = "", limit = "", page = "") =>
  `operator/policies?${filterString}&limit=${limit}&page=${page}&sort=id,DESC`;
export const GET_VALETED = (limit = "", page = "") =>
  `operator/service-logs?filter=service_log_service.serviceType%7C%7C%24eq%7C%7CVALET&limit=${limit}&page=${page}&sort=id,DESC`;
export const GET_PARKED = (limit = "", page = "") =>
  `operator/service-logs?filter=service_log_service.serviceType%7C%7C%24eq%7C%7CPARKING&limit=${limit}&page=${page}&sort=id,DESC`;
export const GET_SERVICED = (filterString = "", limit = "", page = "") =>
  `operator/service-logs?${filterString}&filter=service_log_service.serviceType%7C%7C%24eq%7C%7CSERVICE&limit=${limit}&page=${page}&sort=id,DESC`;
export const GET_REP_LOCATION = (filterString = "", limit = "", page = "") =>
  `operator/reports/locations?${filterString}&limit=${limit}&page=${page}&sort=id,DESC`;
export const GET_REP_ZONE = (filterString = "", limit = "", page = "") =>
  `operator/reports/zones?${filterString}&limit=${limit}&page=${page}&sort=id,DESC`;
export const GET_REP_LOGS = (filterString = "", limit = "", page = "") =>
  `operator/reports/parking?${filterString}&limit=${limit}&page=${page}&sort=id,DESC`;
export const GET_REP_PAYMENT = (filterString = "", limit = "", page = "") =>
  `operator/reports/payments?${filterString}&limit=${limit}&page=${page}&sort=id,DESC`;
export const UPDATE_ATTENDANT = (id = "") => `operator/attendants/${id}`;
export const UPDATE_LOCATION = (id = "") => `operator/locations/${id}`;
export const GET_LOG = (id = "") => `operator/service-logs/${id}`;
export const UPDATE_ZONE = (id = "") => `operator/zones/${id}`;
export const UPDATE_POLICY = (id = "") => `operator/policies/${id}`;
export const UPDATE_RATE = (id = "") => `operator/rates/${id}`;
export const GET_LOCATION = "operator/locations";
export const GET_OP_LOCATION = "operator/locations";
export const GET_ZONE = "operator/zones";
export const GET_POLICY = "operator/policies";
export const GET_RATE = "operator/rates";
export const GET_AMENITIES = "public/amenities";

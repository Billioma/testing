const BASE_URL = process.env.REACT_APP_BASE_URL;

export const LOGIN = "auth/login";
export const GET_PROFILE = BASE_URL + "admin/auth/profile";

export const GET_ADMIN_DASHBOARD_DATA =
  BASE_URL + "admin/dashboard/staff/metrics";

export const ADMIN_LOCATIONS = "admin/locations";
export const ADMIN_LOCATIONS_LIST = (
  filterString = "",
  limit = "",
  page = "",
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
  page = "",
) =>
  `admin/permissions?${filterString}&limit=${limit}&page=${page}&sort=createdAt,DESC`;

export const ADMIN_PERMISSION = (id = "") => `admin/permissions/${id}`;

export const ADMIN_VEHICLE_MAKES_LIST = (
  filterString = "",
  limit = "",
  page = "",
) =>
  `admin/vehicle-makes?${filterString}&limit=${limit}&page=${page}&sort=createdAt,DESC`;

export const ADMIN_VEHICLE_MAKE = (id = "") => `admin/vehicle-makes/${id}`;

export const ADMIN_VEHICLE_MODELS_LIST = (
  filterString = "",
  limit = "",
  page = "",
) =>
  `admin/vehicle-models?${filterString}&limit=${limit}&page=${page}&sort=createdAt,DESC`;

export const ADMIN_VEHICLE_MODEL = (id = "") => `admin/vehicle-models/${id}`;

export const UPLOAD_MEDIA = "system/media-upload";

export const ADMIN_VEHICLE_MAKES = "admin/vehicle-makes";
export const ADMIN_VEHICLE_MODELS = "admin/vehicle-models";

export const GET_REPORTS = "admin/reports";

export const GET_ADMIN_TRAN = (filterString = "", limit = "", page = "") =>
  `admin/transactions?${filterString}&limit=${limit}&page=${page}&sort=createdAt,DESC`;

export const GET_TRAN = "admin/transactions";

export const STAFFS = "/admin/staff";
export const DEPTS = "/admin/department";
export const REQUEST_LEAVE = "admin/leave-request";
export const REQUEST_MED = "admin/medical-assistance";
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
export const APPROVE_MED = (id = "") =>
  `admin/medical-assistance/approve/${id}`;
export const LOAN_PAID = (id = "") =>
  `admin/loan-request/${id}/repayment-plan/set-to-paid`;
export const DISBURSE_LOAN = (id = "") => `admin/loan-request/disburse/${id}`;
export const REJECT_LOAN = (id = "") => `admin/loan-request/decline/${id}`;
export const REJECT_MED = (id = "") => `admin/medical-assistance/decline/${id}`;

export const ADMIN_AMENITIES_LIST = (
  filterString = "",
  limit = "",
  page = "",
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
export const ADMIN_CREATE_SCHEDULE_BY_LOCATION =
  "/admin/schedule/create-by-location";
export const ADMIN_CREATE_SCHEDULE_BY_STAFF = "/admin/schedule/create-by-staff";
export const GET_SCHEDULES = "/admin/schedule/current-week";

export const GET_SCHEDULES_DAY = (
  week = "",
  day = "",
  page = "",
  limit = "",
  search = "",
) =>
  `/admin/schedule/day?week=${week}&dayOfWeek=${day}&page=${page}&limit=${limit}&search=${search}`;

export const GET_SCHEDULES_LOCATION = (week = "", day = "", id = "") =>
  `/admin/schedule/location?week=${week}&dayOfWeek=${day}&locationId=${id}`;
export const DEL_SCHEDULES_LOCATION = (id = "") => `/admin/schedule/day/${id}`;

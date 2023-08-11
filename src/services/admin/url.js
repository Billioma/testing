const BASE_URL = process.env.REACT_APP_BASE_URL;

export const LOGIN = BASE_URL + "admin/auth/login";
export const GET_PROFILE = BASE_URL + "admin/auth/profile";

export const GET_ADMIN_DASHBOARD_DATA = BASE_URL + "admin/dashboard/metrics";
export const GET_SERVICES = "admin/services";

export const CREATE_SERVICE = "admin/services";
export const ADMIN_ATTENDANTS = "admin/attendants";
export const ADMIN_CUSTOMERS = "admin/customers";

export const ADMIN_OPERATORS = "admin/operators";
export const ADMIN_ADMINISTRATORS = "admin/users";

export const GET_LOCATIONS = "admin/locations";

export const ADMIN_ROLES = "admin/roles";
export const UPLOAD_MEDIA = "system/media-upload";

export const LOGIN = "auth/login";
export const REGISTER = "auth/register";
export const RESET_PASSWORD = "auth/password-reset";
export const CHANGE_PASSWORD = (id = "", hash = "") =>
  `auth/update-password/${id}/${hash}`;
export const CHANGE_USER_PASSWORD = "update-password";

export const CUSTOMER_SERVICE_LOGS = "customer/service-logs";
export const CUSTOMER_SERVICE_LOGS_LIST = (limit = "", page = "") =>
  `customer/service-logs?limit=${limit}&page=${page}&sort=createdAt,DESC`;

export const REFRESH_TOKEN = "/auth/refresh";
export const PUBLIC_MAKES = "self-parking/get-makes";
export const PUBLIC_MODELS = "self-parking/get-models";
export const GET_VEHICLES = "vehicles";
export const INCIDENTS = "customer/incident-report";
export const DEL_VEHICLES = (id = "") => `vehicles/${id}`;
export const INCIDENT = (id = "") => `customer/incident-report/${id}`;
export const INCIDENT_STATUS = (id = "") =>
  `/admin/incident-report/${id}/update-status`;
export const INCIDENT_DOCS = (id = "") => `/admin/incident-report/documents/${id}`;
export const CLAIM_VEHICLES = (id = "") =>
  `vehicles/claim-vehicle?licenseNumber=${id}`;
export const DEL_CARDS = (id = "") => `cards/${id}`;
export const GET_MAKE = "vehicles/get-makes";
export const GET_CARDS = "cards";
export const GET_MODEL = "vehicles/get-models";
export const GET_USER = "auth/profile";
export const GET_FAQ = "public/faqs";
export const GET_PAYMENT_HISTORY = (filterString = "", limit, page) =>
  `transactions?${filterString}&limit=${limit}&page=${page}&sort=createdAt,DESC`;
export const GET_PAYMENT_TIPS = (filterString = "", limit, page) =>
  `tips?${filterString}&limit=${limit}&page=${page}&sort=createdAt,DESC`;
export const UPLOAD_PIC = "system/media-upload";
export const PAY_TO_PARK = "pay-to-park";
export const PAY_TO_PARK_RATE = (id = "") => `customer/pay-to-park/rate/${id}`;
export const NON_USER_PAY_TO_PARK = "self-parking/pay-to-park";
export const TIPS = "customers/tips?sort=createdAt,DESC";
export const CREATE_TIPS = "customers/tips";
export const RESERVE_PARKING = "reserve-parking";
export const RESERVE_PARKING_RATE = (id = "") =>
  `customer/reserve-parking/rate/${id}`;
export const EVENT_PARKING = "event-parking";
export const EVENT_PARKING_RATE = (id = "") =>
  `customer/event-parking/rate/${id}`;

export const EVENT_PARKING_POST = "event-parking/multiple";
export const REQUEST_RESERVE_PARKING = "reserve-parking/request-reservation";
export const GET_PAY_TO_PARK = "pay-to-park";
export const UPDATE_USER = "update-profile";
export const GET_SUBSCRIPTION = "membership-subscriptions";
export const GET_SUBSCRIPTIONS = "membership-subscriptions";
export const CANCEL_RESERVE = (id = "") => `reserve-parking/cancel/${id}`;
export const CANCEL_BOOKING = (id = "") => `service-bookings/cancel/${id}`;
export const CANCEL_SUBSCRIPTIONS = (id = "") =>
  `membership-subscriptions/cancel/${id}`;
export const GET_SUBS = (filterString = "", limit, page) =>
  `membership-subscriptions?${filterString}&limit=${limit}&page=${page}&sort=createdAt,DESC`;
export const RENEW_SUBSCRIPTIONS = (id = "") =>
  `membership-subscriptions/renew/${id}`;
export const GET_LOCATIONS = "public/locations";
export const GET_PLANS = "public/membership-plans";
export const FUND_WALLET = "cards/fund-wallet";
export const GET_EVENTS = "public/events";
export const SERVICE_BOOKINGS = "service-bookings";
export const SERVICE_BOOKINGS_RATE = (id = "") =>
  `customer/service-bookings/rate/${id}`;
export const BOOKING_RATES = "service-bookings/rates";
export const GET_ZONE = (zone = "") => `public/zone?term=${zone}`;
export const GET_SERVICES = "public/services";
export const GET_STATES = "https://locus.fkkas.com/api/states";
export const SEND_MAIL = "support-email/send-message";
export const GET_PREFERENCE = "preferences";
export const UPDATE_PREFERENCE = "preferences/update";

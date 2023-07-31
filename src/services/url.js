export const LOGIN = "auth/login";
export const REGISTER = "auth/register";
export const RESET_PASSWORD = "auth/password-reset";
export const CHANGE_PASSWORD = (id = "", hash = "") =>
  `auth/update-password/${id}/${hash}`;
export const CHANGE_USER_PASSWORD = "update-password";

export const GET_VEHICLES = "vehicles";
export const DEL_VEHICLES = (id = "") => `vehicles/${id}`;
export const GET_MAKE = "vehicles/get-makes";
export const GET_MODEL = "vehicles/get-models";
export const GET_USER = "auth/profile";
export const GET_PAYMENT_HISTORY = (page = "", limit = "") =>
  `transactions/?limit=${limit}&page=${page}`;
export const UPLOAD_PIC = "system/media-upload";
export const PAY_TO_PARK = "pay-to-park";
export const GET_PAY_TO_PARK = (page = "", limit = "") =>
  `pay-to-park?limit=${limit}&page=${page}`;
export const UPDATE_USER = "update-profile";
export const GET_SUBSCRIPTION = "membership-subscriptions";
export const GET_SUBSCRIPTIONS = (page = "", limit = "") =>
  `membership-subscriptions/?limit=${limit}&page=${page}`;
export const GET_LOCATIONS = "public/locations";
export const GET_PLANS = "public/membership-plans";
export const GET_EVENTS = "public/events";
export const GET_ZONE = (zone = "") => `public/zone?term=${zone}`;
export const GET_SERVICES = "public/services";
export const GET_STATES = "https://locus.fkkas.com/api/states";
export const GET_CITIES = (state = "") =>
  `https://locus.fkkas.com/api/regions/${state}`;

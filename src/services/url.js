export const LOGIN = "auth/login";
export const REGISTER = "auth/register";
export const RESET_PASSWORD = "auth/password-reset";
export const CHANGE_PASSWORD = (id = "", hash = "") =>
  `auth/update-password/${id}/${hash}`;

export const GET_VEHICLES = "vehicles";
export const GET_MAKE = "vehicles/get-makes";
export const GET_MODEL = "vehicles/get-models";
export const GET_USER = "auth/profile";
export const GET_SUBSCRIPTION = "membership-subscriptions";
export const GET_LOCATIONS = "public/locations";
export const GET_EVENTS = "public/events";
export const GET_SERVICES = "public/services";
export const GET_STATES = "https://locus.fkkas.com/api/states";
export const GET_CITIES = (state = "") =>
  `https://locus.fkkas.com/api/regions/${state}`;

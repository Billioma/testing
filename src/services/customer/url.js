export const LOGIN = "auth/login";
export const REGISTER = "auth/register";
export const RESET_PASSWORD = "auth/password-reset";
export const CHANGE_PASSWORD = (id = "", hash = "") =>
  `auth/update-password/${id}/${hash}`;
export const CHANGE_USER_PASSWORD = "update-password";

export const GET_VEHICLES = "vehicles";
export const DEL_VEHICLES = (id = "") => `vehicles/${id}`;
export const DEL_CARDS = (id = "") => `cards/${id}`;
export const GET_MAKE = "vehicles/get-makes";
export const GET_CARDS = "cards";
export const GET_MODEL = "vehicles/get-models";
export const GET_USER = "auth/profile";
export const GET_FAQ = "public/faqs";
export const GET_PAYMENT_HISTORY = "transactions";
export const UPLOAD_PIC = "system/media-upload";
export const PAY_TO_PARK = "pay-to-park";
export const RESERVE_PARKING = "reserve-parking";
export const EVENT_PARKING = "event-parking";
export const REQUEST_RESERVE_PARKING = "reserve-parking/request-reservation";
export const GET_PAY_TO_PARK = "pay-to-park";
export const UPDATE_USER = "update-profile";
export const GET_SUBSCRIPTION = "membership-subscriptions";
export const GET_SUBSCRIPTIONS = "membership-subscriptions";
export const CANCEL_RESERVE = (id = "") => `reserve-parking/cancel/${id}`;
export const CANCEL_BOOKING = (id = "") => `service-bookings/cancel/${id}`;
export const CANCEL_SUBSCRIPTIONS = (id = "") =>
  `membership-subscriptions/cancel/${id}`;
export const RENEW_SUBSCRIPTIONS = (id = "") =>
  `membership-subscriptions/renew/${id}`;
export const GET_LOCATIONS = "public/locations";
export const GET_PLANS = "public/membership-plans";
export const FUND_WALLET = "cards/fund-wallet";
export const GET_EVENTS = "public/events";
export const SERVICE_BOOKINGS = "service-bookings";
export const BOOKING_RATES = "service-bookings/rates";
export const GET_ZONE = (zone = "") => `public/zone?term=${zone}`;
export const GET_SERVICES = "public/services";
export const GET_STATES = "https://locus.fkkas.com/api/states";
export const GET_CITIES = (state = "") =>
  `https://locus.fkkas.com/api/regions/${state}`;

export const LOGIN = "auth/login";
export const GET_USER = "auth/profile";
export const GET_USER_ZONES = "attendant/zones";
export const GET_USER_NOTI = "attendant/notifications";
export const GET_USER_RATES = "attendant/rates";
export const GET_USER_VEHICLE = (license = "", zoneId = "") =>
  `attendant/vehicles/search-vehicle?license=${license}&zoneId=${zoneId}`;
export const NEW_TICKET = "attendant/tickets/new-ticket";
export const ALL_TICKET = "attendant/tickets/list";
export const ATT_MAKES = "attendant/vehicles/get-makes";
export const ATT_MODELS = "attendant/vehicles/get-models";
export const ADD_VEHICLE = "attendant/vehicles/save-new";
export const UPDATE_USER = "attendant/profile/update-profile";
export const UPDATE_PASS = "attendant/profile/update-password";
export const RETRIEVE_TICKET = (id = "") =>
  `attendant/tickets/retrieve-ticket/${id}`;
export const MAKE_PAYMENT = (id = "") => `attendant/tickets/make-payment/${id}`;
export const CHECK_NOTI = (id = "") =>
  `attendant/notifications/mark-as-read/${id}`;
export const CHECK_RESERVE = (zoneId = "", reservationId = "") =>
  `attendant/reservations/daily/${zoneId}?reservationId=${reservationId}`;
export const CHECK_PTP = (zoneId = "", ticketNumber = "") =>
  `attendant/tickets/check-pay-to-park/${zoneId}?ticketNumber=${ticketNumber}`;
export const PROCESS_PTP = (payToParkId = "") =>
  `attendant/tickets/pay-to-park-ticket/${payToParkId}`;
export const PROCESS_RESERVE = (id = "") =>
  `attendant/reservations/process/${id}`;
export const CHECK_EVENT = (reservationNumber = "") =>
  `attendant/event-parking/check?reservationNumber=${reservationNumber}`;
export const PROCESS_EVENT = (id = "") =>
  `attendant/event-parking/process/${id}`;

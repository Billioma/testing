export const LOGIN = "auth/login";
export const GET_USER = "auth/profile";
export const GET_USER_ZONES = "attendant/zones";
export const GET_USER_RATES = "attendant/rates";
export const GET_USER_VEHICLE = (license = "", zoneId = "") =>
  `attendant/vehicles/search-vehicle?license=${license}&zoneId=${zoneId}`;
export const NEW_TICKET = "attendant/tickets/new-ticket";
export const ALL_TICKET = "attendant/tickets/list";
export const ATT_MAKES = "attendant/vehicles/get-makes";
export const ATT_MODELS = "attendant/vehicles/get-models";
export const ADD_VEHICLE = "attendant/vehicles/save-new";
export const RETRIEVE_TICKET = (id = "") =>
  `attendant/tickets/retrieve-ticket/${id}`;
export const MAKE_PAYMENT = (id = "") => `attendant/tickets/make-payment/${id}`;

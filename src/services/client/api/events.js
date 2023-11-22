import * as API from "../url";
import axiosInstance from "../../axiosInstance";

export const getEvents = async (query) => {
  const res = await axiosInstance.get(
    API.GET_EVENTS(query.filterString, query.limit, query.page)
  );
  return res.data;
};

export const getEventParkingList = async (query) => {
  const res = await axiosInstance.get(
    API.CLIENT_EVENT_PARKING_LIST(query.filterString, query.limit, query.page)
  );
  return res.data;
};

export const cancelClientSub = async (query) => {
  const res = await axiosInstance.get(API.CANCEL_CLIENT_EVENT(query));
  return res.data;
};

export const getEventParkingDetails = async (query) => {
  const res = await axiosInstance.get(
    API.CLIENT_EVENT_PARKING_DETAIL(query.id)
  );
  return res.data;
};

export const getEventDetails = async (query) => {
  const res = await axiosInstance.get(API.DEL_EVENTS(query));
  return res.data;
};

export const createEvent = async (body) => {
  const res = await axiosInstance.post(API.CREATE_EVENTS, body);
  return res.data;
};

export const deleteEvent = async (query) => {
  const res = await axiosInstance.delete(API.DEL_EVENTS(query));
  return res.data;
};

export const editEvent = async ({ query, body }) => {
  const res = await axiosInstance.patch(API.DEL_EVENTS(query), body);
  return res.data;
};

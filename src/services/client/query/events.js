import { useMutation, useQuery } from "react-query";
import {
  cancelClientSub,
  createEvent,
  deleteEvent,
  editEvent,
  getClienteleEvents,
  getEventDetails,
  getEventParkingDetails,
  getEventParkingList,
  getEvents,
} from "../api/events";

export const useGetClientEventParkingList = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getEventParkingList, {
    mutationKey: "GET_Client_Event_PARKING_LIST",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useCancelClientSub = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(cancelClientSub, {
    mutationKey: "CANCEL_CLIEINT_SUB",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetClientEventParkingDetails = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getEventParkingDetails, {
    mutationKey: "GET_Client_Event_PARKING_DETAILS",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetEvents = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getEvents, {
    mutationKey: "GET_EVENTS",
    ...options,
  });
  return { mutate, isLoading, data };
};
export const useGetClienteleEvents = (
  options = {},
  page = 1,
  limit = 25,
  query
) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_CLIENTELE_EVENTS", limit, page, query],
    () => getClienteleEvents(page, limit, query),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useCreateEvents = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(createEvent, {
    mutationKey: "CREATE_EVENTS",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useDelEvent = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(deleteEvent, {
    mutationKey: "DEL_EVENTS",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useEditEvent = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(editEvent, {
    mutationKey: "EDIT_EVENTS",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetEventDetails = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getEventDetails, {
    mutationKey: "GET_EVENT_DETAILS",
    ...options,
  });
  return { mutate, isLoading, data };
};

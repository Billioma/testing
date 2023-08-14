import { useMutation } from "react-query";
import {
  createEvent,
  deleteEvent,
  editEvent,
  getEventDetails,
  getEvents,
} from "../api/events";

export const useGetEvents = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getEvents, {
    mutationKey: "GET_EVENTS",
    ...options,
  });
  return { mutate, isLoading, data };
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

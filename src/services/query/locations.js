import { useMutation, useQuery } from "react-query";
import {
  getCities,
  getEvents,
  getLocations,
  getServices,
  getStates,
} from "../api/locations";

export const useGetStates = (options = {}) => {
  const { data, isLoading, refetch } = useQuery("GET_STATES", getStates, {
    ...options,
  });

  return { data, isLoading, refetch };
};

export const useGetLocations = (options = {}) => {
  const { data, isLoading, refetch } = useQuery("GET_LOCATIONS", getLocations, {
    ...options,
  });

  return { data, isLoading, refetch };
};

export const useGetServices = (options = {}) => {
  const { data, isLoading, refetch } = useQuery("GET_SERVICES", getServices, {
    ...options,
  });

  return { data, isLoading, refetch };
};

export const useGetEvents = (options = {}) => {
  const { data, isLoading, refetch } = useQuery("GET_EVENTS", getEvents, {
    ...options,
  });

  return { data, isLoading, refetch };
};

export const useGetCities = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getCities, {
    mutationKey: "GET_CITIES",
    ...options,
  });
  return { mutate, isLoading, data };
};

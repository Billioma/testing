import { useMutation, useQuery } from "react-query";
import {
  getBookingRate,
  createPayToPark,
  createServiceBookings,
  getPayToPark,
  getReserveParking,
  requestReserveParking,
  createReserveParking,
  getCarService,
  getEventParking,
  createEventParking,
} from "../api/services";

export const useGetPayToPark = (options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_PAY_TO_PARK"],
    getPayToPark,
    {
      ...options,
    }
  );
  return { data, isLoading, refetch };
};

export const useGetReserveParking = (options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    ["RESERVE_PARKING"],
    getReserveParking,
    {
      ...options,
    }
  );
  return { data, isLoading, refetch };
};

export const useGetEventParking = (options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    ["EVENT_PARKING"],
    getEventParking,
    {
      ...options,
    }
  );
  return { data, isLoading, refetch };
};

export const useGetCarService = (options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    ["CAR_SERVICE"],
    getCarService,
    {
      ...options,
    }
  );
  return { data, isLoading, refetch };
};

export const useCreateServiceBookings = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(createServiceBookings, {
    mutationKey: "CREATE_SERVICE_BOOKINGS",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useCreateReserveParking = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(createReserveParking, {
    mutationKey: "CREATE_RESERVE_PARKING",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useCreateEventParking = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(createEventParking, {
    mutationKey: "CREATE_EVENT_PARKING",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useRequestReserveParking = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(requestReserveParking, {
    mutationKey: "REQUEST_RESERVE_PARKING",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetBookingRate = (id = "", type = "", options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    ["BOOKING_RATES", id, type],
    getBookingRate,
    {
      ...options,
    }
  );

  return { data, isLoading, refetch };
};

export const useCreatePayToPark = (options = {}) => {
  const { mutate, isLoading } = useMutation(createPayToPark, {
    mutationKey: "CREATE_PAY_TO_PARK",
    ...options,
  });
  return { mutate, isLoading };
};

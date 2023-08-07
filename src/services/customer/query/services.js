import { useMutation, useQuery } from "react-query";
import {
  getBookingRate,
  createPayToPark,
  createServiceBookings,
  getPayToPark,
  getReserveParking,
  requestReserveParking,
  createReserveParking,
} from "../api/services";

export const useGetPayToPark = (limit = "", page = "", options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_PAY_TO_PARK", limit, page],
    getPayToPark,
    {
      ...options,
    }
  );
  return { data, isLoading, refetch };
};

export const useGetReserveParking = (limit = "", page = "", options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    ["RESERVE_PARKING", limit, page],
    getReserveParking,
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

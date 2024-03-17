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
  getPayToParkDetails,
  getEventParking,
  createEventParking,
  cancelReserve,
  cancelBooking,
  getTips,
  createTips,
  getReserveParkDetails,
  getEventParkDetails,
  createNonUserPayToPark,
  payToParkRate,
  reserveParkRate,
  eventParkRate,
  serviceBookRate,
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

export const usePayToParkRate = (options = {}) => {
  const { isLoading, mutate } = useMutation(payToParkRate, {
    mutationKey: ["payToParkRate"],
    ...options,
  });

  return { isLoading, mutate };
};

export const useReserveRate = (options = {}) => {
  const { isLoading, mutate } = useMutation(reserveParkRate, {
    mutationKey: ["reserveParkRate"],
    ...options,
  });

  return { isLoading, mutate };
};

export const useEventRate = (options = {}) => {
  const { isLoading, mutate } = useMutation(eventParkRate, {
    mutationKey: ["eventParkRate"],
    ...options,
  });

  return { isLoading, mutate };
};

export const useServiceBookRate = (options = {}) => {
  const { isLoading, mutate } = useMutation(serviceBookRate, {
    mutationKey: ["serviceBookRate"],
    ...options,
  });

  return { isLoading, mutate };
};

export const useGetPayToParkDetails = (id = "", options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_PAY_TO_PARK_DETAILS", id],
    getPayToParkDetails,
    {
      ...options,
    }
  );
  return { data, isLoading, refetch };
};

export const useGetReserveParkDetails = (id = "", options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_RESERVE_PARK_DETAILS", id],
    getReserveParkDetails,
    {
      ...options,
    }
  );
  return { data, isLoading, refetch };
};

export const useGetEventParkDetails = (id = "", options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_EVENT_PARK_DETAILS", id],
    getEventParkDetails,
    {
      ...options,
    }
  );
  return { data, isLoading, refetch };
};

export const useGetTips = (options = {}) => {
  const { data, isLoading, refetch } = useQuery("GET_TIPS", getTips, {
    ...options,
  });
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

export const useGetEventParking = (limit = "", page = "", options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    ["EVENT_PARKING", limit, page],
    getEventParking,
    {
      ...options,
    }
  );
  return { data, isLoading, refetch };
};

export const useGetCarService = (limit = "", page = "", options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    ["CAR_SERVICE", limit, page],
    getCarService,
    {
      ...options,
    }
  );
  return { data, isLoading, refetch };
};

export const useCancelReserve = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(cancelReserve, {
    mutationKey: "CANCEL_RESERVE",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useCreateTips = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(createTips, {
    mutationKey: "CREATE_TIPS",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useCancelBooking = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(cancelBooking, {
    mutationKey: "CANCEL_BOOKING",
    ...options,
  });
  return { mutate, isLoading, data };
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
  const { mutate, isLoading, data } = useMutation(createPayToPark, {
    mutationKey: "CREATE_PAY_TO_PARK",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useCreateNonUserPayToPark = (options = {}) => {
  const { mutate, isLoading } = useMutation(createNonUserPayToPark, {
    mutationKey: "CREATE_NON_USER_PAY_TO_PARK",
    ...options,
  });
  return { mutate, isLoading };
};

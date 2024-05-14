import { useMutation, useQuery } from "react-query";
import {
  getPayToPark,
  deletePayToPark,
  getReservedParking,
  deleteReservedParking,
  deleteCarService,
  editReservedParking,
  addReservedParking,
  getCarServices,
  editCarService,
  getPayToParkList,
  getPayToParkDetails,
  getReservedParkingList,
  getReservedParkingDetails,
  getEventParkingList,
  getEventParkingDetails,
  getCarServiceDetails,
  getCarServiceList,
  deleteEventParking,
  editEventParking,
  getTipsList,
  getTipsDetails,
  getEventParking,
  getTips,
  deleteTip,
  getPointsDetails,
} from "../api/transactions";

export const useGetPayToPark = (options = {}, page = 1, limit = 25, query) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_PAY_TO_PARK", page, limit, query],
    () => getPayToPark(page, limit, query),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useGetEventParking = (
  options = {},
  page = 1,
  limit = 25,
  query
) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_PEVENT_PARKING", page, limit, query],
    () => getEventParking(page, limit, query),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useGetTips = (options = {}, page = 1, limit = 25, query) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_PTIPS", page, limit, query],
    () => getTips(page, limit, query),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useGetAdminPayToParkList = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getPayToParkList, {
    mutationKey: "GET_ADMIN_PAY_TO_PARK_LIST",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetAdminPayToParkDetails = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getPayToParkDetails, {
    mutationKey: "GET_ADMIN_PAY_TO_PARK_DETAILS",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetAdminReservedParkingList = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getReservedParkingList, {
    mutationKey: "GET_ADMIN_RESERVED_PARKING_LIST",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetAdminReservedParkingDetails = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getReservedParkingDetails, {
    mutationKey: "GET_ADMIN_RESERVED_PARKING_DETAILS",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetPointsDetails = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getPointsDetails, {
    mutationKey: "getPointsDetails",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetAdminEventParkingList = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getEventParkingList, {
    mutationKey: "GET_ADMIN_Event_PARKING_LIST",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetAdminEventParkingDetails = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getEventParkingDetails, {
    mutationKey: "GET_ADMIN_Event_PARKING_DETAILS",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetAdminCarServicesList = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getCarServiceList, {
    mutationKey: "GET_ADMIN_CAR_SERVICES_LIST",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetAdminCarServicesDetails = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getCarServiceDetails, {
    mutationKey: "GET_ADMIN_CAR_SERVICES_DETAILS",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetAdminTipsList = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getTipsList, {
    mutationKey: "GET_ADMIN_TIPS_LIST",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetAdminTipsDetails = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getTipsDetails, {
    mutationKey: "GET_ADMIN_TIPS_DETAILS",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useDeletePayToPark = (options = {}) => {
  const { isLoading, mutate } = useMutation(deletePayToPark, {
    mutationKey: ["DELETE_PAY_TO_PARK"],
    ...options,
  });

  return { isLoading, mutate };
};

export const useDeleteReservedParking = (options = {}) => {
  const { isLoading, mutate } = useMutation(deleteReservedParking, {
    mutationKey: ["DELETE_RESERVED_PARKING"],
    ...options,
  });

  return { isLoading, mutate };
};

export const useEditReservedParking = (options = {}) => {
  const { isLoading, mutate } = useMutation(editReservedParking, {
    mutationKey: ["EDIT_RESERVED_PARKING"],
    ...options,
  });

  return { isLoading, mutate };
};

export const useEditEventParking = (options = {}) => {
  const { isLoading, mutate } = useMutation(editEventParking, {
    mutationKey: ["EDIT_EVENT_PARKING"],
    ...options,
  });

  return { isLoading, mutate };
};

export const useAddReservedParking = (options = {}) => {
  const { isLoading, mutate } = useMutation(addReservedParking, {
    mutationKey: ["ADD_RESERVED_PARKING"],
    ...options,
  });

  return { isLoading, mutate };
};

export const useGetReservedParking = (
  options = {},
  page = 1,
  limit = 25,
  query
) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_RESERVED_PARKING", page, limit, query],
    () => getReservedParking(page, limit, query),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useGetCarServices = (
  options = {},
  page = 1,
  limit = 25,
  query
) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_CAR_SERVICES", page, limit, query],
    () => getCarServices(page, limit, query),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useDeleteTip = (options = {}) => {
  const { isLoading, mutate } = useMutation(deleteTip, {
    mutationKey: ["DELETE_TIP"],
    ...options,
  });

  return { isLoading, mutate };
};

export const useDeleteCarService = (options = {}) => {
  const { isLoading, mutate } = useMutation(deleteCarService, {
    mutationKey: ["DELETE_CAR_SERVICE"],
    ...options,
  });

  return { isLoading, mutate };
};

export const useDeleteEventParking = (options = {}) => {
  const { isLoading, mutate } = useMutation(deleteEventParking, {
    mutationKey: ["DELETE_EVENT_PARKING"],
    ...options,
  });

  return { isLoading, mutate };
};

export const useEditCarService = (options = {}) => {
  const { isLoading, mutate } = useMutation(editCarService, {
    mutationKey: ["EDIT_CAR_SERVICE"],
    ...options,
  });

  return { isLoading, mutate };
};

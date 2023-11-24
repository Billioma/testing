import { useMutation, useQuery } from "react-query";
import {
  cancelOpEv,
  cancelOpRp,
  cancelOpService,
  getOpEv,
  getOpEvDetails,
  getOpPtp,
  getOpPtpDetails,
  getOpRp,
  getOpRpDetails,
  getOpService,
  getOpServicesDetails,
} from "../api/transactions";

export const useGetOpPtp = (options = {}, page = 1, limit = 25, query) => {
  const { data, isLoading, refetch } = useQuery(
    ["OP_PTP", limit, page, query],
    () => getOpPtp(page, limit, query),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useGetOpRp = (options = {}, page = 1, limit = 25, query) => {
  const { data, isLoading, refetch } = useQuery(
    ["OP_RP", limit, page, query],
    () => getOpRp(page, limit, query),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useGetOpEv = (options = {}, page = 1, limit = 25, query) => {
  const { data, isLoading, refetch } = useQuery(
    ["OP_EV", limit, page, query],
    () => getOpEv(page, limit, query),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useGetOpService = (options = {}, page = 1, limit = 25, query) => {
  const { data, isLoading, refetch } = useQuery(
    ["OP_SERVICE", limit, page, query],
    () => getOpService(page, limit, query),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useCancelOpRp = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(cancelOpRp, {
    mutationKey: "CANCEL_OP_RP",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useCancelOpEv = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(cancelOpEv, {
    mutationKey: "CANCEL_OP_EV",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useCancelOpService = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(cancelOpService, {
    mutationKey: "CANCEL_OP_SErVICE",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetOpPtpDetails = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getOpPtpDetails, {
    mutationKey: "OP_PTP_DETAILS",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetOpRpDetails = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getOpRpDetails, {
    mutationKey: "OP_RP_DETAILS",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetOpEvDetails = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getOpEvDetails, {
    mutationKey: "OP_EV_DETAILS",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetOpServiceDetails = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getOpServicesDetails, {
    mutationKey: "OP_SERVICE_DETAILS",
    ...options,
  });
  return { mutate, isLoading, data };
};

import { useMutation, useQuery } from "react-query";
import {
  getClients,
  getClientUsers,
  addClient,
  deleteClient,
  editClient,
  getClientsInvoices,
  deleteClientInvoice,
  addClientInvoice,
  makeClientPayment,
  updateClientInvoice,
  getClientsEvents,
  addClientEvent,
  updateClientEvent,
  deleteClientEvent,
} from "../api/clients";

export const useGetClients = (options = {}, page = 1, limit = 25, query) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_CLIENTS", limit, page, query],
    () => getClients(page, limit, query),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useGetClientUsers = (options = {}, id) => {
  const { isLoading, data, mutate } = useMutation(getClientUsers, {
    mutationKey: ["GET_CLIENT_USERS", id],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useAddClient = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(addClient, {
    mutationKey: ["ADD_CLIENT"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useDeleteClient = (options = {}) => {
  const { isLoading, mutate } = useMutation(deleteClient, {
    mutationKey: ["DELETE_CLIENT"],
    ...options,
  });

  return { isLoading, mutate };
};

export const useEditClient = (options = {}) => {
  const { isLoading, mutate } = useMutation(editClient, {
    mutationKey: ["EDIT_CLIENT"],
    ...options,
  });

  return { isLoading, mutate };
};

export const useGetClientsInvoices = (
  options = {},
  page = 1,
  limit = 25,
  query
) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_CLIENTS_INVOICES", limit, page, query],
    () => getClientsInvoices(page, limit, query),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useDeleteClientInvoice = (options = {}) => {
  const { isLoading, mutate } = useMutation(deleteClientInvoice, {
    mutationKey: ["DELETE_CLIENT_INVOICE"],
    ...options,
  });

  return { isLoading, mutate };
};

export const useAddClientInvoice = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(addClientInvoice, {
    mutationKey: ["ADD_CLIENT_INVOICE"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useMakeClientPayment = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(makeClientPayment, {
    mutationKey: ["MAKE_CLIENT_PAYMENT"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useUpdateClientInvoice = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(updateClientInvoice, {
    mutationKey: ["UPDATE_CLIENT_INVOICE"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useGetClientsEvents = (
  options = {},
  page = 1,
  limit = 25,
  query
) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_CLIENTS_EVENTS", limit, page, query],
    () => getClientsEvents(page, limit, query),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useAddClientEvent = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(addClientEvent, {
    mutationKey: ["ADD_CLIENT_EVENT"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useUpdateClientEvent = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(updateClientEvent, {
    mutationKey: ["UPDATE_CLIENT_EVENT"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useDeleteClientEvent = (options = {}) => {
  const { isLoading, mutate } = useMutation(deleteClientEvent, {
    mutationKey: ["DELETE_CLIENT_EVENT"],
    ...options,
  });

  return { isLoading, mutate };
};

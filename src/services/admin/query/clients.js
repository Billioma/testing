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
  updateClientInvoice,
  getClientsEvents,
  addClientEvent,
  updateClientEvent,
  deleteClientEvent,
  getAdminClients,
  getAdminClient,
  getAdminClientUsers,
  detachAdminClientUser,
  getAdminClientsInvoicesList,
  getAdminClientInvoice,
  adminClientMakePayment,
  getEntityCustomers,
  attachAdminClientUser,
  getAdminEventsList,
  sendClientInvoice,
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

export const useGetEntityCustomers = (email = "", options = {}) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_ENTITY_CUSTOMERS", email],
    getEntityCustomers,
    {
      ...options,
    }
  );

  return { data, isLoading, refetch };
};

export const useGetAdminClients = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getAdminClients, {
    mutationKey: "GET_ADMIN_CLIENTS_LIST",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetAdminClient = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getAdminClient, {
    mutationKey: "GET_ADMIN_CLIENT",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetAdminClientInvoice = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getAdminClientInvoice, {
    mutationKey: "GET_ADMIN_CLIENT_INVOICE",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetClientUsers = (options = {}, id) => {
  const { isLoading, data, mutate } = useMutation(getClientUsers, {
    mutationKey: ["GET_CLIENT_USERS", id],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useGetAdminClientUsers = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(getAdminClientUsers, {
    mutationKey: ["GET_ADMIN_CLIENT_USERS"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useDetachAdminClientUser = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(detachAdminClientUser, {
    mutationKey: ["DETACH_ADMIN_CLIENT_USER"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useAttachAdminClientUser = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(attachAdminClientUser, {
    mutationKey: ["ATTACH_ADMIN_CLIENT_USER"],
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

export const useGetAdminClientsInvoicesList = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getAdminClientsInvoicesList, {
    mutationKey: "GET_ADMIN_CLIENTS_INVOICE_LIST",
    ...options,
  });
  return { mutate, isLoading, data };
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

export const useAdminClientMakePayment = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(adminClientMakePayment, {
    mutationKey: "MAKE_PAYMENT_CLIENT",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useUpdateClientInvoice = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(updateClientInvoice, {
    mutationKey: ["UPDATE_CLIENT_INVOICE"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useGetAdminEvents = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getAdminEventsList, {
    mutationKey: "GET_ADMIN_EVENTS_LIST",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useSendClientInvoice = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(sendClientInvoice, {
    mutationKey: "sendClientInvoice",
    ...options,
  });
  return { mutate, isLoading, data };
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

export const usesendClientInvoice = (
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

import { useQuery, useMutation } from "react-query";
import {
  getAttendants,
  getCustomers,
  createAttendant,
  editAttendant,
  deleteAttendant,
  createCustomer,
  editCustomer,
  deleteCustomer,
  getAdministrators,
  createAdministrator,
  editAdministrator,
  deleteAdministrator,
  deleteOperator,
  getOperators,
  createOperator,
  editOperator,
} from "../api/users";

export const useGetAttendants = (options = {}, page, limit, query) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_ATTENDANTS", page, limit, query],
    () => getAttendants(page, limit, query),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useGetAdministrators = (options = {}, page, limit, query) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_ADMINISTRATORS", page, limit, query],
    () => getAdministrators(page, limit, query),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useCreateAdministrator = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(createAdministrator, {
    mutationKey: ["CREATE_ATTENDANT"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useEditAdministrator = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(editAdministrator, {
    mutationKey: ["EDIT_ADMINISTRATOR"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useDeleteAdministrator = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(deleteAdministrator, {
    mutationKey: ["DELETE_ADMINISTRATOR"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useGetOperators = (options = {}, page = 1, limit = 25, query) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_OPERATORS", page, limit, query],
    () => getOperators(page, limit, query),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useCreateOperator = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(createOperator, {
    mutationKey: ["CREATE_OPERATOR"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useEditOperator = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(editOperator, {
    mutationKey: ["EDIT_OPERATOR"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useDeleteOperator = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(deleteOperator, {
    mutationKey: ["DELETE_OPERATOR"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useCreateAttendant = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(createAttendant, {
    mutationKey: ["CREATE_ATTENDANT"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useCreateCustomer = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(createCustomer, {
    mutationKey: ["CREATE_CUSTOMER"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useEditCustomer = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(editCustomer, {
    mutationKey: ["EDIT_CUSTOMER"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useEditAttendant = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(editAttendant, {
    mutationKey: ["EDIT_ATTENDANT"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useDeleteAttendant = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(deleteAttendant, {
    mutationKey: ["DELETE_ATTENDANT"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useDeleteCustomer = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(deleteCustomer, {
    mutationKey: ["DELETE_CUSTOMER"],
    ...options,
  });

  return { isLoading, data, mutate };
};

export const useGetCustomers = (options = {}, page, limit, query) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_CUSTOMERS", page, limit, query],
    () => getCustomers(page, limit, query),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

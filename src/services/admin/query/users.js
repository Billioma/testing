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
  getManagers,
  getAdminCustomerList,
  getAdminCustomer,
  getAdminAttendantList,
  getAdminAttendant,
  getAdministratorsList,
  editAdmin,
  getAdmin,
  getOperatorsList,
  getOperator,
  editAdminOperator,
  getAdminEvent,
  fundCustomer,
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

export const useGetAdminAttendant = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getAdminAttendant, {
    mutationKey: "GET_ADMIN_ATTENDANT",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetAdminEvent = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getAdminEvent, {
    mutationKey: "GET_ADMIN_EVENT",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetAdminAttendantsList = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getAdminAttendantList, {
    mutationKey: "GET_ADMIN_ATTENDANT_LIST",
    ...options,
  });
  return { mutate, isLoading, data };
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

export const useGetAdministratorsList = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getAdministratorsList, {
    mutationKey: "GET_ADMIN_LIST",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetManagers = (options = {}) => {
  const { data, isLoading, refetch } = useQuery("GET_MANAGERS", getManagers, {
    ...options,
  });

  return { data, isLoading, refetch };
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

export const useGetAdmin = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getAdmin, {
    mutationKey: "GET_ADMIN",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useEditAdmin = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(editAdmin, {
    mutationKey: ["EDIT_ADMIN"],
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

export const useGetOperator = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getOperator, {
    mutationKey: "GET_ADMIN_OP",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetOperatorList = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getOperatorsList, {
    mutationKey: "GET_OPS_LIST",
    ...options,
  });
  return { mutate, isLoading, data };
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

export const useEditAdminOperator = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(editAdminOperator, {
    mutationKey: ["EDIT_ADMIN_OP"],
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

export const useFundCustomer = (options = {}) => {
  const { isLoading, data, mutate } = useMutation(fundCustomer, {
    mutationKey: ["fundCustomer"],
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

export const useGetAdminCustomer = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getAdminCustomer, {
    mutationKey: "GET_ADMIN_CUSTOMER",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useGetAdminCustomers = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getAdminCustomerList, {
    mutationKey: "GET_ADMIN_CUSTOMERS_LIST",
    ...options,
  });
  return { mutate, isLoading, data };
};

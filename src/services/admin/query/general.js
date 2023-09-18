import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getDashboardData,
  uploadMedia,
  getUsersMetrics,
  getServicesMetrics,
  getActivitiesMetrics,
} from "../api/general";

export const useGetAdminDashboardData = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["GET_ADMIN_DASHBOARD_DATA"],
    queryFn: getDashboardData,
  });

  return { data, isLoading, refetch };
};

export const useGetUsersMetrics = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["GET_DASHBOARD_USERS_METRICS"],
    queryFn: getUsersMetrics,
  });

  return { data, isLoading, refetch };
};

export const useGetServicesMetrics = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["GET_DASHBOARD_SERVICES_METRICS"],
    queryFn: getServicesMetrics,
  });

  return { data, isLoading, refetch };
};

export const useGetActivitiesMetrics = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["GET_DASHBOARD_ACTIVITIES_METRICS"],
    queryFn: getActivitiesMetrics,
  });

  return { data, isLoading, refetch };
};

export const useUploadMedia = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(uploadMedia, {
    mutationKey: "ADMIN_UPLOAD",
    ...options,
  });
  return { mutate, isLoading, data };
};

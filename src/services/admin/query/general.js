import { useQuery, useMutation } from "@tanstack/react-query";
import { getDashboardData, uploadMedia } from "../api/general";

export const useGetAdminDashboardData = (options = {}) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["GET_ADMIN_DASHBOARD_DATA"],
    queryFn: getDashboardData,
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

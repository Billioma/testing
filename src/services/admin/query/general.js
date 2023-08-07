import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "../api/general";

export const useGetAdminDashboardData = (options = {}) => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["GET_ADMIN_DASHBOARD_DATA"],
    queryFn: getDashboardData,
  });

  return { data, isLoading, refetch };
};

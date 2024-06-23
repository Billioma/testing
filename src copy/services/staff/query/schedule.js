import { useQuery } from "react-query";
import { getSchedule } from "../api/schedule";

export const useGetSchedule = (options = {}) => {
  const { data, isLoading, refetch } = useQuery("getSchedule", getSchedule, {
    ...options,
  });

  return { data, isLoading, refetch };
};

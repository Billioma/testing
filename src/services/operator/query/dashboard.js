import { useMutation, useQuery } from "react-query";
import { getMetrics, getMetricsFilter } from "../api/dashboard";

export const useGetMetrics = (options = {}) => {
  const { data, isLoading, refetch } = useQuery("METRICS", getMetrics, {
    ...options,
  });

  return { data, isLoading, refetch };
};

export const useGetMetricsFilter = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getMetricsFilter, {
    mutationKey: "METRICS_FILTER",
    ...options,
  });
  return { mutate, isLoading, data };
};

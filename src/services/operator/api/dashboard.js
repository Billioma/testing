import * as API from "../url";
import axiosInstance from "../../axiosInstance";

export const getMetrics = async () => {
  const res = await axiosInstance.get(API.METRICS);
  return res.data;
};

export const getMetricsFilter = async (query) => {
  const res = await axiosInstance.get(
    API.METRICS_FILTER(query?.query?.from, query?.query?.to)
  );
  return res.data;
};

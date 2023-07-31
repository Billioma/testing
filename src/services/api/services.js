import * as API from "../url";
import axiosInstance from "../axiosInstance";

export const createPayToPark = async (body) => {
  const res = await axiosInstance.post("customer/" + API.PAY_TO_PARK, body);
  return res.data;
};

export const getPayToPark = async (query) => {
  const res = await axiosInstance.get(
    "customer/" + API.GET_PAY_TO_PARK(query.query.page, query.query.limit)
  );
  return res.data;
};

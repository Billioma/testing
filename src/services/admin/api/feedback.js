import axiosInstance from "../../axiosInstance";
import * as API from "../url";

export const getFeedbacks = async (page, limit, query) => {
  const response = await axiosInstance.get(
    API.ADMIN_FEEDBACKS +
      `?page=${page}&limit=${limit}&sort=createdAt,DESC&${query || ""}`
  );
  return response.data;
};

export const getFeedback = async (query) => {
  const res = await axiosInstance.get(API.ADMIN_FEEDBACK(query.id));
  return res.data;
};

export const feedbackReply = async (body) => {
  const res = await axiosInstance.post(API.ADMIN_FEEDBACK_REPLY, body);
  return res.data;
};

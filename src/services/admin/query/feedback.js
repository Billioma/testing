import { useMutation, useQuery } from "react-query";
import { feedbackReply, getFeedback, getFeedbacks } from "../api/feedback";

export const useGetFeedbacks = (
  options = {},
  page = 1,
  limit = 25,
  query,
  type = ""
) => {
  const { data, isLoading, refetch } = useQuery(
    ["GET_FEEDBACK", page, limit, query, type],
    () => getFeedbacks(page, limit, query, type),
    {
      ...options,
    }
  );

  return { isLoading, data, refetch };
};

export const useGetFeedback = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(getFeedback, {
    mutationKey: "getFeedback",
    ...options,
  });
  return { mutate, isLoading, data };
};

export const useFeedbackReply = (options = {}) => {
  const { mutate, isLoading, data } = useMutation(feedbackReply, {
    mutationKey: "feedbackReply",
    ...options,
  });
  return { mutate, isLoading, data };
};

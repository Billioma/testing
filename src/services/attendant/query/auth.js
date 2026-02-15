import { useMutation } from "react-query";
import { attendantLogin } from "../api/auth";

export const useAttendantLogin = (options = {}) => {
  const { mutate, isLoading } = useMutation(attendantLogin, {
    mutationKey: "attendantLogin",
    ...options,
  });
  return { mutate, isLoading };
};

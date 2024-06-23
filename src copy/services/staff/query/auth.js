import { useMutation } from "react-query";
import { login, sendPassOtp, updatePassword, verifyPassOtp } from "../api/auth";

export const useLogin = (options = {}) => {
  const { mutate, isLoading } = useMutation(login, {
    mutationKey: "login",
    ...options,
  });
  return { mutate, isLoading };
};

export const useSendPassOtp = (options = {}) => {
  const { mutate, isLoading } = useMutation(sendPassOtp, {
    mutationKey: "sendPassOtp",
    ...options,
  });
  return { mutate, isLoading };
};

export const useVerifyPassOtp = (options = {}) => {
  const { mutate, isLoading } = useMutation(verifyPassOtp, {
    mutationKey: "verifyPassOtp",
    ...options,
  });
  return { mutate, isLoading };
};

export const useUpdatePassword = (options = {}) => {
  const { mutate, isLoading } = useMutation(updatePassword, {
    mutationKey: "updatePassword",
    ...options,
  });
  return { mutate, isLoading };
};

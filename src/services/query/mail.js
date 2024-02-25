import { sendMail } from "../api/mail";
import { useMutation } from "react-query";

export const useSendMail = (options = {}) => {
  const { mutate, isLoading } = useMutation(sendMail, {
    mutationKey: "SEND_MAIL",
    ...options,
  });
  return { mutate, isLoading };
};

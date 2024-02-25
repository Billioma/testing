import axios from "axios";

export const sendMail = async (body) => {
  const res = await axios.post(
    "https://api.parkinspace.ng/support-email/send-message",
    body
  );
  return res.data;
};

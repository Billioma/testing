import React, { useEffect, useState } from "react";
import { useSendMail } from "../services/query/mail";
import useCustomToast from "../utils/notifications";
import { Spinner } from "@chakra-ui/react";

export const Layout = ({
  label,
  placeholder,
  handleKeyPress,
  value,
  type,
  onChange,
}) => {
  return (
    <div className="mb-[20px] w-full">
      <div className="text-[#757575] text-[10px] mb-[8px] font-medium">
        {label}
      </div>
      {label === "Message" ? (
        <textarea
          value={value}
          onChange={onChange}
          placeholder="Enter your message"
          className="w-full bg-[#E4E6E8] h-[96px] text-sm border border-[#D4D6D8] rounded-[4px] p-[14px] text-[#242628] placeholder:text-[#242628]"
        />
      ) : (
        <input
          type={type}
          value={value}
          onKeyPress={handleKeyPress}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-[#E4E6E8] text-sm border border-[#D4D6D8] rounded-[4px] p-[14px] text-[#242628] placeholder:text-[#242628]"
        />
      )}
    </div>
  );
};

const Contact = () => {
  const { successToast, errorToast } = useCustomToast();
  const { mutate, isLoading } = useSendMail({
    onSuccess: () => {
      successToast("Mail Sent Successfully");
      setValues({ name: "", email: "", phone: "", message: "" });
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to send mail. Try again."
      );
    },
  });

  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(values);
  };

  const handleKeyPress = (e) => {
    if (values?.phone?.length >= 11) {
      e.preventDefault();
    }
  };

  return (
    <div className="full_width" id="top">
      <div className="relative bg-white px-[20px] lg:px-[120px] pt-[100px] pb-[56px] lg:pb-[60px] lg:pt-[130px]">
        <div className="text-center font-[Cooper] text-[#242628] text-[40px] lg:text-[56px] font-[900]">
          Contact us
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="mt-[5px] text-center w-[75%] lg:w-[24%] text-sm text-[#242628] leading-[150%]">
            Send us a message below and we’ll get back to you in 6 hours or
            less.
          </div>

          <form onSubmit={handleSubmit} className="w-full">
            <div className="mt-[20px] flex flex-col justify-center items-center w-full">
              <div className="w-full lg:w-[40%]">
                <Layout
                  placeholder="Enter your name"
                  label="Name"
                  value={values?.name}
                  onChange={(e) =>
                    setValues({ ...values, name: e.target.value })
                  }
                />
                <Layout
                  label="Email"
                  type="email"
                  placeholder="Enter your email address"
                  value={values?.email}
                  onChange={(e) =>
                    setValues({ ...values, email: e.target.value })
                  }
                />
                <Layout
                  type="number"
                  label="Phone Number"
                  handleKeyPress={handleKeyPress}
                  placeholder="Enter your phone number"
                  value={values?.phone}
                  onChange={(e) =>
                    setValues({ ...values, phone: e.target.value })
                  }
                />
                <Layout
                  label="Message"
                  value={values?.message}
                  onChange={(e) =>
                    setValues({ ...values, message: e.target.value })
                  }
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`${
                  isLoading ? "cursor-not-allowed opacity-[0.7]" : ""
                } rounded-[4px] bg-[#0D0718] mt-[8px] py-[15px] w-full lg:w-[40%] text-sm text-white font-medium`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-[20px]">
                    <Spinner size="md" />
                    <div>Sending</div>
                  </div>
                ) : (
                  <div> Send</div>
                )}
              </button>
            </div>
          </form>
        </div>

        <img
          src="/assets/parked-car.png"
          className="hidden lg:flex absolute left-0 bottom-0"
        />
      </div>
    </div>
  );
};

export default Contact;

import React from "react";

export const Layout = ({ label, placeholder }) => {
  return (
    <div className="mb-[24px] w-full">
      <div className="text-[#757575] text-[10px] mb-[8px] font-medium">
        {label}
      </div>
      {label === "Message" ? (
        <textarea
          placeholder="Enter your message"
          className="w-full bg-[#A4A6A8] lg:bg-transparent h-[96px] text-sm border border-[#d4d6d8] rounded-[4px] px-[15px] py-[16px] text-[#242628] lg:text-white placeholder:text-[#242628] lg:placeholder:text-white"
        />
      ) : (
        <input
          placeholder={placeholder}
          className="w-full bg-[#A4A6A8] lg:bg-transparent text-sm border border-[#d4d6d8] rounded-[4px] px-[15px] py-[16px] text-[#242628] lg:text-white placeholder:text-[#242628] lg:placeholder:text-white"
        />
      )}
    </div>
  );
};

const Contact = () => {
  return (
    <div className="full_width">
      <div className="relative bg-[#242628] px-[20px] lg:px-[120px] py-[56px] lg:py-[120px]">
        <img
          src="/assets/contact-one.svg"
          className="hidden lg:flex absolute left-0 top-[64px]"
        />
        <div className="text-center font-[Cooper] text-white text-[40px] lg:text-[64px] font-[900]">
          Contact us
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="mt-[5px] text-center w-[75%] lg:-[28%] text-sm text-[#646668] lg:text-[#f4f6f8] leading-[150%]">
            Send us a message below and we’ll get back to you in 6 hours or
            less.
          </div>

          <div className="mt-[32px] flex flex-col justify-center items-center w-full">
            <div className="w-full lg:w-[40%]">
              <Layout placeholder="Enter your name" label="Name" />
              <Layout label="Email" placeholder="Enter your email address" />
              <Layout
                label="Phone Number"
                placeholder="Enter your phone number"
              />
              <Layout label="Message" />
            </div>

            <button className="rounded-[4px] bg-[#0D0718] mt-[8px] py-[15px] w-full lg:w-[40%] text-sm text-white font-medium">
              Send
            </button>
          </div>
        </div>

        <img
          src="/assets/contact-two.svg"
          className="hidden lg:flex absolute right-0 bottom-[64px]"
        />
        <img
          src="/assets/parked-car.svg"
          className="hidden lg:flex absolute left-0 bottom-0"
        />
      </div>
    </div>
  );
};

export default Contact;

import React from "react";

export const Layout = ({ label, placeholder }) => {
  return (
    <div className="mb-[20px] w-full">
      <div className="text-[#757575] text-[10px] mb-[8px] font-medium">
        {label}
      </div>
      {label === "Message" ? (
        <textarea
          placeholder="Enter your message"
          className="w-full bg-[#E4E6E8] h-[96px] text-sm border border-[#D4D6D8] rounded-[4px] p-[14px] text-[#242628] placeholder:text-[#242628]"
        />
      ) : (
        <input
          placeholder={placeholder}
          className="w-full bg-[#E4E6E8] text-sm border border-[#D4D6D8] rounded-[4px] p-[14px] text-[#242628] placeholder:text-[#242628]"
        />
      )}
    </div>
  );
};

const Contact = () => {
  return (
    <div className="full_width">
      <div className="relative bg-white px-[20px] lg:px-[120px] pt-[100px] pb-[56px] lg:pb-[60px] lg:pt-[150px]">
        <div className="text-center font-[Cooper] text-[#242628] text-[40px] lg:text-[64px] font-[900]">
          Contact us
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="mt-[5px] text-center w-[75%] lg:w-[24%] text-sm text-[#242628] leading-[150%]">
            Send us a message below and we’ll get back to you in 6 hours or
            less.
          </div>

          <div className="mt-[20px] flex flex-col justify-center items-center w-full">
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
          src="/assets/parked-car.png"
          className="hidden lg:flex absolute left-0 bottom-0"
        />
      </div>
    </div>
  );
};

export default Contact;

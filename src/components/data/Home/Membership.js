import React from "react";

const Membership = () => {
  return (
    <div className="full_width" id="about">
      <div className="py-[56px] pb-0 lg:pt-[100px] flex flex-col justify-center items-center">
        <div className="px-[20px] lg:px-[unset] w-full lg:w-[48%]">
          <div className="flex flex-col justify-center items-center">
            <div className="text-[#242424] text-center text-[45px] leading-[150%] font-[Cooper]">
              About <span className="text-red">Parkin</span>Space
            </div>
          </div>

          <div className="w-[100%] flex flex-col justify-center items-center mt-[20px] text-center text-[#101410] text-sm leading-[150%]">
            <div className="w-[60%] mt-[20px] text-center text-[#101410] text-sm leading-[150%]">
              ParkinSpace is powered by EZPark, a premier parking management
              company. Our technology is the easy, fast and stress-free way to
              find, reserve and pay for parking services. <br />
              <br />
              Sign up for a free account in seconds and immediately access valet
              and self parking services on-demand or in advance.
            </div>
          </div>
        </div>

        <div className="mt-[20px] flex items-center font-medium text-sm gap-[24px]">
          <button className="bg-red rounded-[4px] px-[34px] py-[10px] text-white">
            Sign up
          </button>
          <button className="bg-transparent rounded-[4px] border border-black hover:bg-black hover:text-white px-[26px] py-[10px] text-black ">
            Login
          </button>
        </div>

        <div className="mt-[40px] lg:mt-[50px]">
          <img src="/assets/devices.png" />
        </div>
      </div>
    </div>
  );
};

export default Membership;

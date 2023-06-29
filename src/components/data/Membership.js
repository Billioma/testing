import React from "react";

const Membership = () => {
  return (
    <div className="py-[56px] pb-0 lg:py-[120px] flex flex-col justify-center items-center">
      <div className="w-full lg:w-[48%]">
        <div className="flex flex-col justify-center items-center">
          <div className="text-[#242424] text-center text-[40px] leading-[150%] font-[Cooper]">
            <span className="text-red">Parkin</span>Space <br />
            <span className="text-[70px] hidden lg:flex">Membership</span>
          </div>

          <div className="mt-[24px] hidden lg:flex">
            <button className="bg-[#FEF1F1] text-xs font-medium hover:bg-[red] hover:text-white px-[20px] text-red rounded-[4px] py-[12px]">
              SIGN UP NOW, IT'S FREE
            </button>
          </div>
        </div>

        <div className="mt-[40px] text-center text-[#101410] text-sm lg:ext-base leading-[150%]">
          With a ParkinSpace subscription, you get priority access to our
          signature valet parking services at various destinations and trending
          events in Nigeria.
          <br />
          <br />
          Enjoy exclusive discounts and earn reward points to use towards EZPark
          services such as pay-to-park or car wash/auto detailing. Access your
          account to make payments, view your service history and track reward
          points.
        </div>
      </div>

      <div className="mt-[40px] flex items-center font-medium text-sm gap-[24px]">
        <button className="bg-red rounded-[4px] px-[34px] py-[10px] text-white ">
          Sign up
        </button>
        <button className="bg-transparent rounded-[4px] border border-black hover:bg-black hover:text-white px-[26px] py-[10px] text-black ">
          Login
        </button>
      </div>

      <div className="mt-[40px] lg:mt-[100px]">
        <img src="/assets/devices.svg" />
      </div>
    </div>
  );
};

export default Membership;

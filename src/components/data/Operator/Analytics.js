import React from "react";
const Analytics = () => {
  return (
    <div className="full_width">
      <div className="flex w-full bg-[#fff] flex-col items-center justify-center px-[20px] lg:px-[120px] py-[56px] lg:py-[120px]">
        <div className="flex flex-col md:flex-row w-full lg:w-[1326px] justify-between gap-[40px] items-center">
          <div className="bg-[#444648] flex flex-col items-center justify-center w-full text-white rounded-[4px] p-[32px]">
            <img src="/assets/anal1.png" />

            <div className="mt-[32px] mb-[24px] font-[Cooper] text-[32px] font-[900]">
              Analytics for you
            </div>
            <div className="text-[20px] leading-[150%]">
              Stay informed on your business with the different tools and
              functionalities including Analytics, Reporting, Rates & Policy
              Management, Payments and Administration.
            </div>

            <div className="mt-[32px] w-[70%] md:w-[50%]">
              <button className="w-full py-[17px] text-black text-sm bg-white">
                Sign Up
              </button>
            </div>
          </div>

          <div className="bg-[#F4F6F8] flex flex-col items-center justify-center w-full rounded-[4px] p-[32px]">
            <img src="/assets/anal2.png" />

            <div className="mt-[32px] text-[#242424] mb-[24px] font-[Cooper] text-[32px] font-[900]">
              Simple but flexible
            </div>
            <div className="text-[20px] text-[#101410] leading-[150%]">
              Stay informed on your business with the different tools and
              functionalities including Analytics, Reporting, Rates & Policy
              Management, Payments and Administration.
            </div>

            <div className="mt-[32px] w-[70%] md:w-[50%]">
              <button className="w-full py-[17px] text-white text-sm bg-[#242424]">
                Request a Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;

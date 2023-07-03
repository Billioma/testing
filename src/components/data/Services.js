import React from "react";
import { services } from "../common/constants";

const Services = () => {
  return (
    <div className="full_width">
      <div className="flex items-center justify-center flex-col bg-[#131618] relative py-[40px] lg:py-[100px] px-[20px] lg:px-[120px] mt-[100px] lg:mt-[144px]">
        <div className="text-center font-[Cooper] text-white text-[40px] lg:text-[60px] font-[900] mb-[40px] lg:mb-[60px]">
          Our Services
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-[24px] lg:gap-[40px]">
          {services.map((data, i) => (
            <div key={i} className="relative">
              <img src={data.pic} className="md:w-[397px] lg:h-[440px]" />
              <div className="absolute text-white bottom-[32px] px-[32px]">
                <div className="font-[Cooper] text-[24px] lg:text-[32px] mb-[16px]">
                  {data?.title}
                </div>
                <div className="text-[#f4f6f8] text-sm leading-[150%]">
                  {data.desc}
                </div>
                <button className="text-black flex justify-center text-sm gap-[10px] items-center mt-[16px] bg-white rounded-[4px] py-[17px] w-full">
                  {data?.button}
                  <img src="/assets/arrow-right.svg" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <img
          src="/assets/parked-car.svg"
          className="hidden lg:flex absolute left-0 bottom-0"
        />
      </div>
    </div>
  );
};

export default Services;

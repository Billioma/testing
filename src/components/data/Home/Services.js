import React from "react";
import { services } from "../../common/constants";

const Services = () => {
  return (
    <div className="full_width" id="services">
      <div className="flex items-center justify-center flex-col bg-[#131618] relative py-[40px] lg:pb-[130px] lg:pt-[100px] px-[20px] lg:px-[120px] mt-[100px] lg:mt-[144px]">
        <div className="text-center font-[Cooper] text-white text-[40px] lg:text-[60px] font-[900] ">
          Services
        </div>

        <div className="text-white text-center mt-[20px] lg:mt-[unset] mb-[40px] lg:mb-[50px]">
          Available at 100+ locations between Lagos and Abuja
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-[24px] lg:gap-[40px]">
          {services.map((data, i) => (
            <div key={i} className="relative">
              <img src={data.pic} />
              <div className="absolute text-white bottom-[32px] px-[32px]">
                <div className="font-[Cooper] text-[24px] lg:text-[32px] mb-[16px]">
                  {data?.title}
                </div>
                <div className="text-[#f4f6f8] text-sm leading-[150%]">
                  {data.desc}
                </div>
                <button className="text-black flex justify-center text-sm gap-[10px] items-center mt-[16px] bg-white rounded-[4px] py-[17px] w-full">
                  {data?.button}
                  <img src="/assets/arrow-right.png" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <img
          src="/assets/parked-car.png"
          className="hidden lg:flex absolute left-0 bottom-0"
        />
      </div>
    </div>
  );
};

export default Services;

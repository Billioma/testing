import React, { useState } from "react";
import {
  carService,
  eventPark,
  howTabs,
  payPark,
  reservePark,
} from "../../common/constants";

const How = () => {
  const [tab, setTab] = useState("Pay-to-Park");
  return (
    <div id="how" className="full_width">
      <div className="bg-[#fff] py-[56px] lg:py-[70px] flex flex-col justify-center items-center w-full">
        <div className="px-[20px] lg:px-[unset] lg:w-[1256px]">
          <div className="text-center font-[Cooper] text-black text-[32px] md:text-[45px] lg:text-[54px] font-[900]">
            How It Works
          </div>

          <div className="flex mt-[32px] md:mt-[30px] mb-[46px] justify-center items-center w-full">
            <div className="flex flex-wrap md:flex-nowrap gap-y-[16px] md:gap-y-[unset] justify-center md:justify-normal items-center w-fit border border-[#d4d6d8] rounded-[21px] md:rounded-[30px] p-[4px]">
              {howTabs.map((data, i) => (
                <div
                  onClick={() => setTab(data)}
                  key={i}
                  className={`${
                    tab === data
                      ? "bg-red rounded-[40px] text-white"
                      : "hover:text-red text-black"
                  }  px-[24px] py-[12px] cursor-pointer font-medium w-[50%] md:w-[unset] flex justify-center items-center`}
                >
                  {data}
                </div>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center md:gap-[15px] lg:gap-[40px]">
            {(tab.includes("Pay")
              ? payPark
              : tab.includes("Reserve")
              ? reservePark
              : tab.includes("Event")
              ? eventPark
              : tab.includes("Car") && carService
            ).map((data, i) => (
              <div
                key={i}
                className="flex md:min-h-[30vh] lg:min-h-[330px] text-black w-full flex-col items-center gap-[24px] bg-[#E4E6E8] p-[24px] rounded-[8px]"
              >
                <div className="bg-[#EE383A] text-base lg:text-[20px] text-white font-bold h-[25px] w-[25px] lg:h-[40px] lg:w-[40px] rounded-[80px] flex flex-col justify-center items-center">
                  {i + 1}
                </div>
                <img
                  src={data.pic}
                  className="md:w-[55px] lg:w-[88px] md:h-[55px] lg:h-[88px]"
                />
                <div className="md:text-xs lg:text-base leading-[150%] text-center">
                  {data?.text}
                </div>
              </div>
            ))}
          </div>

          <div className="row flex md:hidden">
            <div className="column pr-[20px]">
              {(tab.includes("Pay")
                ? payPark
                : tab.includes("Reserve")
                ? reservePark
                : tab.includes("Event")
                ? eventPark
                : tab.includes("Car") && carService
              )
                .filter((_, index) => index === 0 || index === 2)
                .map((data, i) => (
                  <div
                    key={i}
                    className={`${
                      i === 0 ? "min-h-[228px]" : "min-h-[190px]"
                    } img flex h-fit text-black flex-col items-center gap-[16px] bg-[#E4E6E8] p-[16px] rounded-[8px]`}
                  >
                    <div className="bg-[#EE383A] text-base lg:text-[20px] text-white font-bold h-[40px] w-[40px] rounded-[80px] flex flex-col justify-center items-center">
                      {i === 0 ? "1" : "3"}
                    </div>
                    <img src={data.pic} className="w-[64px] h-[64px]" />
                    <div className="w-[95%] text-[10px]  leading-[150%] text-center">
                      {data?.text}
                    </div>
                  </div>
                ))}
            </div>

            <div className="column">
              {(tab.includes("Pay")
                ? payPark
                : tab.includes("Reserve")
                ? reservePark
                : tab.includes("Event")
                ? eventPark
                : tab.includes("Car") && carService
              )
                .filter((_, index) => index === 1 || index === 3)
                .map((data, i) => (
                  <div
                    key={i}
                    className={`${
                      i !== 0 ? "min-h-[228px]" : "min-h-[190px]"
                    } img flex text-black flex-col items-center gap-[16px] bg-[#E4E6E8] p-[16px] rounded-[8px]`}
                  >
                    <div className="bg-[#EE383A] text-base lg:text-[20px] text-white font-bold h-[40px] w-[40px] rounded-[80px] flex flex-col justify-center items-center">
                      {i === 0 ? "2" : "4"}
                    </div>
                    <img src={data.pic} className="w-[64px] h-[64px] " />
                    <div className="w-[85%] text-[10px] leading-[150%] text-center">
                      {data?.text}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="mt-[50px]">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://parkinspace-webapp.netlify.app/customer/auth/signup"
          >
            <button className="text-white bg-red text-sm rounded-[4px] w-[156px] py-[12px]">
              Get Started
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default How;

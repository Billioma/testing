import React, { useState } from "react";
import { eventPark, howTabs, payPark, reservePark } from "../common/constants";

const How = () => {
  const [tab, setTab] = useState("Pay-to-Park");
  return (
    <div className="full_width mt-[56px] lg:mt-[unset]">
      <div className="bg-[#141618] py-[56px] lg:py-[90px] flex flex-col justify-center items-center w-full">
        <div className="px-[20px] lg:px-[unset] lg:w-[1256px]">
          <div className="text-center font-[Cooper] text-white text-[60px] font-[900] ">
            How It Works
          </div>

          <div className="flex mt-[32px] md:mt-[40px] mb-[56px] justify-center items-center w-full">
            <div className="flex flex-wrap md:flex-nowrap gap-y-[16px] md:gap-y-[unset] justify-center md:justify-normal items-center w-fit border border-[#d4d6d8] rounded-[21px] md:rounded-[30px] p-[4px]">
              {howTabs.map((data, i) => (
                <div
                  onClick={() => setTab(data)}
                  key={i}
                  className={`${
                    tab === data ? "bg-red rounded-[40px]" : "hover:text-red"
                  } text-white px-[24px] py-[12px] cursor-pointer w-[50%] md:w-[unset] flex justify-center items-center`}
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
              : tab.includes("Event") && eventPark
            ).map((data, i) => (
              <div
                key={i}
                className="flex md:min-h-[30vh] lg:min-h-[330px] text-white w-full flex-col items-center gap-[24px] bg-[#242628] p-[24px] rounded-[8px]"
              >
                <div className="bg-[#EE383A] font-bold h-[25px] w-[25px] lg:h-[40px] lg:w-[40px] rounded-[80px] flex flex-col justify-center items-center">
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
                : tab.includes("Event") && eventPark
              )
                .filter((_, index) => index === 0 || index === 2)
                .map((data, i) => (
                  <div
                    key={i}
                    className={`${
                      i === 0 ? "min-h-[228px]" : "min-h-[190px]"
                    } img flex h-fit text-white flex-col items-center gap-[16px] bg-[#242628] p-[16px] rounded-[8px]`}
                  >
                    <div className="bg-[#EE383A] font-bold h-[24px] w-[24px] rounded-[80px] flex flex-col justify-center items-center">
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
                : tab.includes("Event") && eventPark
              )
                .filter((_, index) => index === 1 || index === 3)
                .map((data, i) => (
                  <div
                    key={i}
                    className={`${
                      i !== 0 ? "min-h-[228px]" : "min-h-[190px]"
                    } img flex text-white flex-col items-center gap-[16px] bg-[#242628] p-[16px] rounded-[8px]`}
                  >
                    <div className="bg-[#EE383A] font-bold h-[24px] w-[24px] rounded-[80px] flex flex-col justify-center items-center">
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
      </div>
    </div>
  );
};

export default How;

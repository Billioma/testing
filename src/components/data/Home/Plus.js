import React from "react";
import { plusGrid } from "../common/constants";

export const Divider = ({ color }) => {
  return <div className={`bg-${color} h-[40px] rounded-full w-[4px]`}></div>;
};

const Plus = () => {
  return (
    <div className="full_width">
      <div className="bg-[#F4F6F8] px-[20px] lg:px-[120px] py-[56px] lg:py-[90px] flex flex-col justify-center items-center">
        <div className="w-full lg:w-[54%]">
          <div className="text-[#242424] text-center text-[32px] lg:text-[60px] leading-[128%] font-[Cooper]">
            <span className="text-red">Parkin</span>Space Plus
          </div>

          <div className="flex flex-col justify-center items-center w-full">
            <div className="mt-[15px] w-[82%] text-center text-[#444] text-sm lg:text-base leading-[150%]">
              For just ₦5,000 a month, gain priority access, exclusive
              discounts, and special offers that will make every parking moment
              a delightful experience. Upgrade now and enjoy the ultimate
              convenience and perks. Join ParkinSpace Plus today!
            </div>
          </div>
        </div>

        <div className="mt-[15px]">
          <button className="bg-[#242424] rounded-[4px] px-[26px] py-[13px] text-white font-medium">
            Sign up now
          </button>
        </div>

        <div className="mt-[40px] lg:mt-[50px]">
          <div className="flex text-sm lg:text-base flex-col lg:flex-row w-full items-center gap-[20px] lg:gap-[40px]">
            {plusGrid.map((data, i) => (
              <div
                key={i}
                className={`${
                  i === 0
                    ? "bg-[#FDE8E8]"
                    : i === 1
                    ? "bg-[#fff]"
                    : i === 2 && "bg-[#E6E6E6]"
                } rounded-[4px] p-[24px] w-full`}
              >
                <div className="font-[Cooper] text-[24px]">{data.title}</div>
                <div className="mt-[24px] leading-[150%] flex text-[#242638] items-center gap-[12px]">
                  <Divider color={i === 0 ? "red" : "black"} />
                  <div>{data.text1}</div>
                </div>
                <div className="mt-[24px] leading-[150%] text-[#242638] flex items-center gap-[12px]">
                  <Divider color={i === 0 ? "red" : "black"} />
                  <div>{data.text2}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plus;

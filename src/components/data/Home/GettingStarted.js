import React from "react";
import { started } from "../../common/constants";

const GettingStarted = () => {
  return (
    <div className="pt-[80px] pb-[100px] md:pt-[120px] bg-[#F4F6F8] full_width">
      <div className="flex w-full flex-col justify-center items-center">
        <div className="flex w-full lg:w-[70%] flex-col justify-start lg:justify-center items-start lg:items-center">
          <div className="px-[20px] lg:px-[unset] flex flex-col md:flex-row lg:justify-between gap-[60px] lg:gap-[unset] items-center">
            <div className="text-center lg:text-start w-full">
              <span className="text-black text-center w-full leading-[120%] text-[20px]">
                Getting started with
              </span>
              <br />
              <div className="my-[5px] lg:my-[8px] font-[Cooper] text-[45px] lg:text-[60px] leading-[120%]">
                <span className="text-red">Parkin</span>Space
              </div>
              <div className="text-center lg:text-start w-full lg:w-[60%] text-black leading-[150%] text-base">
                Sign up for a free account in 4 quick steps and you're good to
                go.
              </div>

              <div className="mt-[32px] justify-center lg:justify-start flex items-center font-medium text-sm gap-[24px]">
                <button className="bg-red rounded-[4px] px-[34px] py-[10px] text-white ">
                  Sign up
                </button>
                <button className="bg-transparent rounded-[4px] border border-black hover:bg-black hover:text-white px-[26px] py-[10px] text-black ">
                  Login
                </button>
              </div>
            </div>

            <div className="flex w-full lg:w-[80%] justify-end items-end">
              <div className="w-[100%]">
                {started.map((data, i) => (
                  <div
                    key={data.id}
                    className="mb-[40px] flex items-center gap-[20px] lg:gap-[40px]"
                  >
                    <div className="relative">
                      <div className="text-white bg-[#EE383A] font-bold h-[30px] lg:h-[40px] w-[30px] lg:w-[40px] rounded-full flex flex-col justify-center items-center">
                        {data.id}
                      </div>
                      {i !== 3 && (
                        <img
                          src="/assets/arrow.png"
                          className="absolute top-[50px] right-[30%] z-[5]"
                        />
                      )}
                    </div>

                    <div className="w-[100%] bg-white rounded-[8px] p-[24px]">
                      <div className="flex items-center gap-[24px]">
                        <img src={data?.img} className="w-[64px] h-[64px]" />

                        <div className="text-sm lg:text-base text-[#242628] leading-[150%]">
                          {data?.text}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GettingStarted;

import React from "react";
import {
  formatDate,
  formatTextWithHashtags,
  trim,
  trimID,
} from "../../utlils/helper";
import { mobileTwitterActions, twitterActions } from "./constants";
import { FiArrowLeft } from "react-icons/fi";

const Twitter = ({ main, tweets }) => {
  return (
    <div className="w-full justify-center flex flex-col items-center relative">
      <div className="relative">
        <img src="/assets/iphone.svg" className="hidden md:flex" />
        <img src="/assets/iphone-mini.svg" className="flex md:hidden" />

        <div className="w-full justify-center flex flex-col items-center">
          <div className="bg-black absolute p-[20px] md:p-[30px] px-[10px] md:px-[20px] w-[83%] h-full md:h-[94%] top-[20px] md:top-[40px] rounded-t-[28px] md:rounded-t-[48px]">
            <div className="flex items-center gap-[15px] md:gap-[30px] text-white">
              <div className="hidden md:flex">
                <FiArrowLeft size="22px" />
              </div>
              <div className="flex md:hidden">
                <FiArrowLeft size="15px" />
              </div>
              <div className="flex items-center w-full justify-between">
                <div>
                  <div className="font-bold text-xs md:text-[18px]">
                    {main?.name}
                  </div>
                  <div className="text-[gray] text-xs md:text-sm">
                    {main?.statuses_count} Tweets
                  </div>
                </div>

                <div>
                  <button className="px-[10px] md:px-[20px] rounded-full py-[3px] text-xs md:text-base md:py-[5px] font-bold bg-white text-black">
                    Follow
                  </button>
                </div>
              </div>
            </div>

            {tweets?.map((data, i) => {
              return (
                <div
                  key={i}
                  className="border-b border-[gray] mx-[-20px] px-[20px] md:px-[20px] my-[10px] pb-[10px]"
                >
                  <div className="text-white text-sm gap-0 md:gap-[10px] flex items-start">
                    <div className="w-[20%]">
                      <img
                        className="rounded-full object-cover w-[25px] h-[25px] md:w-[50px] md:h-[50px]"
                        src={main?.profile_image_url}
                      />
                    </div>

                    <div className="w-full">
                      <div className="flex text-[10px] md:text-base items-center gap-[5px] md:gap-[20px]">
                        <div className="font-bold">
                          {trim(data?.user?.name)}
                        </div>
                        <div className="text-[gray] font-medium">
                          @{trimID(data?.user?.screen_name)}
                        </div>
                        <div className="text-[gray] font-medium">
                          • {formatDate(data?.created_at)}
                        </div>
                      </div>

                      <div className="mt-[5px] md:mt-[10px] text-[10px] md:text-xs font-medium leading-[150%]">
                        {formatTextWithHashtags(data?.text)}
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex justify-center items-center">
                    <div className="w-[60%] hidden md:flex justify-between gap-[20px] pt-[10px] text-[gray] items-center">
                      {twitterActions.map((dat, i) => (
                        <div
                          className={`cursor-pointer ${
                            i !== 2 ? "hover:text-[#2596be]" : "hover:text-red"
                          }`}
                          key={i}
                        >
                          {dat}
                        </div>
                      ))}
                    </div>
                    <div className="w-[60%] flex md:hidden justify-between gap-0 pt-[10px] text-[gray] items-center">
                      {mobileTwitterActions.map((dat, i) => (
                        <div
                          className={`cursor-pointer ${
                            i !== 2 ? "hover:text-[#2596be]" : "hover:text-red"
                          }`}
                          key={i}
                        >
                          {dat}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <img src="/assets/shadow.svg" className="absolute bottom-0 z-[-3]" />
    </div>
  );
};

export default Twitter;

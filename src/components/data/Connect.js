import React, { useState } from "react";
import { connectTabs } from "../common/constants";
import { useGetTweets, useGetUser } from "../../services/query/twitter";
import Twitter from "../common/Twitter";
import Instagram from "../common/Instagram";
import Facebook from "../common/Facebook";

const Connect = () => {
  const [tab, setTab] = useState("Twitter");
  const { data: user } = useGetUser();
  const { data: tweets } = useGetTweets();
  const main = user?.length && user[0];

  return (
    <div className="full_width">
      <div className="pb-0 py-[56px] md:py-[60px] md:pb-0 overflow-y-hidden relative">
        <div className="text-center font-[Cooper] text-[#242628] text-[32px] md:text-[60px] font-[900]">
          Connect with us
        </div>
        <div className="flex justify-center items-center w-full">
          <div className="w-[70%] md:w-[unset] mt-[5px] text-center text-sm md:text-base leading-[150%]">
            Get the latest news and updates with EZPark by visiting any of our
            social media platforms
          </div>
        </div>
        <div className="flex mt-[24px] md:mt-[36px] mb-[38px] justify-center items-center w-full">
          <div className="flex text-sm md:text-base items-center w-fit border border-[#d4d6d8] rounded-[30px] p-[4px]">
            {connectTabs.map((data, i) => (
              <div
                onClick={() => setTab(data)}
                key={i}
                className={`${
                  tab === data
                    ? "bg-red rounded-[40px] text-white"
                    : "hover:text-red"
                } text-black font-medium px-[24px] py-[12px] cursor-pointer`}
              >
                {data}
              </div>
            ))}
          </div>
        </div>

        {tab === "Twitter" && <Twitter main={main} tweets={tweets} />}
        {tab === "Instagram" && <Instagram />}
        {tab === "Facebook" && <Facebook />}
        <img
          src="/assets/parked-right.svg"
          className="hidden md:flex absolute right-0 bottom-0"
        />
        <img
          src="/assets/parked-right-mini.svg"
          className="flex md:hidden absolute right-0 bottom-0"
        />
      </div>
    </div>
  );
};

export default Connect;

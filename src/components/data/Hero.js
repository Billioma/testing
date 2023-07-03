import React from "react";

const Hero = () => {
  return (
    <div className="mt-[80px] lg:mt-[200px] md:mt-[150px]">
      <div className="flex flex-col md:flex-row w-full gap-[70px] lg:justify-between items-center">
        <div className="w-full text-[#101410]">
          <div className="font-[Cooper] text-[32px] md:text-[45px] lg:text-[60px] leading-[120%]">
            Reserves and Pay for <span className="text-red">parking</span> across
            Nigeria
          </div>

          <div className="mt-[15px] md:mt-[20px] w-[80%] text-sm md:text-[18px] leading-[120%]">
            ParkinSpace is powered by EZPark Limited, a premier parking
            management company.
          </div>

          <div className="flex sm:hidden md:flex items-center my-[24px] md:my-[25px] gap-[24px]">
            <img src="/assets/play-store.svg" className="cursor-pointer" />
            <img src="/assets/app-store.svg" className="cursor-pointer" />
          </div>

          <div className="flex md:hidden items-center my-[24px] md:my-[25px] gap-[24px]">
            <img src="/assets/play-mini.svg" className="cursor-pointer" />
            <img src="/assets/app-mini.svg" className="cursor-pointer" />
          </div>

          <div className="text-[18px] md-[24px] md:mb-[25px] font-medium">
            or
          </div>

          <div className="flex items-center gap-[12px]">
            <input
              className="bg-[#F4F6F8] text-[12px] lg:text-base rounded-[4px] placeholder:text-[#242424] text-[#242424] px-[16px] font-medium w-[100%] md:w-[230px] lg:w-[280px] py-[12px] lg:py-[15px]"
              placeholder="enter your email address"
            />
            <button className="px-[16px] bg-[#EE383A] font-medium rounded-[4px] md:py-[15px] py-[12px] w-[100%] lg:w-[unset] text-[12px] lg:text-base text-white">
              Get download link
            </button>
          </div>
        </div>

        <div className="w-full">
          <div className="relative flex flex-col justify-center items-center">
            <div className="absolute top-[-25px] lg:top-[-30px] z-[-5] left-0 rounded-[4px] bg-black lg:w-[288px] w-[144px] h-[72px] lg:h-[143px]"></div>
            <div>
              <img
                src="/assets/hero.svg"
                className="w-[320px] md:w-[400px] md:h-[400px] lg:w-[486px] h-[320px] lg:h-[486px] rounded-[4px]"
              />
            </div>
            <div className="absolute bottom-[-25px] lg:bottom-[-30px] z-[-5] right-0 bg-red rounded-[4px] lg:w-[288px] w-[144px] h-[72px] lg:h-[143px]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

import React from "react";

const Hero = () => {
  return (
    <div className="pt-[100px] pb-[100px] lg:pt-[170px] md:pt-[150px] bg-[#F4F6F8] full_width">
      <div className="flex w-full flex-col justify-center items-center">
        <div className="px-[20px] lg:px-[unset] flex flex-col md:flex-row lg:w-[1256px] gap-[70px] lg:justify-between items-center">
          <div className="w-full text-[#101410]">
            <div className="w-[95%] font-[Cooper] text-[32px] md:text-[45px] lg:text-[60px] leading-[120%]">
              Find, Reserve and Pay for{" "}
              <span className="text-red">parking services</span> across Nigeria
            </div>

            <div className="font-medium mt-[15px] md:mt-[20px] w-[80%] text-sm md:text-[18px] leading-[120%]">
              Download our free app on
            </div>

            <div className="flex sm:hidden md:flex items-center my-[24px] md:my-[25px] gap-[24px]">
              <img src="/assets/play-store.png" className="cursor-pointer" />
              <img src="/assets/app-store.png" className="cursor-pointer" />
            </div>

            <div className="flex md:hidden items-center my-[24px] md:my-[25px] gap-[24px]">
              <img src="/assets/play-mini.png" className="cursor-pointer" />
              <img src="/assets/app-mini.png" className="cursor-pointer" />
            </div>

            <div className="text-[18px] md-[24px] md:mb-[25px] font-medium">
              or
            </div>

            <div className="flex items-center gap-[12px]">
              <input
                className="bg-[#F4F6F8] text-[12px] lg:text-base rounded-[4px] placeholder:text-[#242424] text-[#242424] border border-[#D4D6D8] px-[16px] font-medium w-[100%] md:w-[230px] lg:w-[280px] py-[12px] lg:py-[15px]"
                placeholder="enter your email address"
              />
              <button className="px-[16px] bg-[#EE383A] font-medium rounded-[4px] md:py-[15px] py-[12px] w-[100%] lg:w-[unset] text-[12px] lg:text-base text-white">
                Get download link
              </button>
            </div>
          </div>

          <div className="w-full">
            <div className="relative z-[5] flex flex-col justify-center items-center">
              <div className="absolute top-[-25px] lg:top-[-30px] z-[-1] left-0 rounded-[4px] bg-black lg:w-[288px] w-[144px] h-[72px] lg:h-[143px]"></div>
              <div>
                <img
                  src="/assets/hero.png"
                  className="w-[320px] md:w-[400px] md:h-[400px] lg:w-[486px] h-[320px] lg:h-[486px] rounded-[4px]"
                />
              </div>
              <div className="absolute bottom-[-25px] lg:bottom-[-30px] z-[-5] right-0 bg-red rounded-[4px] lg:w-[288px] w-[144px] h-[72px] lg:h-[143px]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

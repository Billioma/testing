import React from "react";

const Hero = () => {
  return (
    <div className="relative h-screen full_width">
      <img
        className="absolute w-full z-[-1] h-screen object-cover"
        src="/assets/heroo.png"
      />

      <div className="z-[100] flex flex-col justify-center h-[80vh] md:h-screen items-center">
        <div className="flex justify-center items-center w-full">
          <div className="text-white text-center text-[32px] md:text-[60px] font-[900] leading-[128%] md:w-[70%] font-[Cooper]">
            ParkinSpace operator provides solutions for parking providers
          </div>
        </div>
        <div className="mt-[24px] text-[18px] text-center md:w-[50%] leading-[150%] text-white flex justify-center items-center">
          ParkinSpaceOperatoris our easy-to-use, web-based technology solution
          for parking providers that fosters simplifies the management of
          dailyparking operations
        </div>

        <div className="flex mt-[40px] items-center gap-[12px]">
          <input
            className="bg-transparent border border-white text-sm placeholder:text-white text-white px-[16px] font-medium w-[100%] md:w-[230px] lg:w-[280px] py-[12px] lg:py-[15px]"
            placeholder="enter your email address"
          />

          <button className="bg-white border border-white text-sm text-black px-[16px] font-medium w-full md:w-[50%] py-[12px] lg:py-[15px]">
            Get download link
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;

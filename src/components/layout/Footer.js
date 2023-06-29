import React from "react";
import { company, information } from "../common/constants";

const Footer = () => {
  return (
    <div className="bg-[#242628] px-[20px] flex flex-col justify-center items-center w-full">
      <div className="w-full lg:w-[1256px]">
        <div className="text-white flex flex-col lg:flex-row items-start justify-between py-[56px] lg:py-[120px] lg:pb-[64px]">
          <div className="flex flex-col gap-[16px] lg:gap-[24px] w-full lg:w-[40%]">
            <div className="text-[28px] lg:text-[44px] font-[Cooper]">
              Download our App
            </div>

            <div className="text-sm lg:text-base leading-[150%]">
              Download our app to get one free parking at select locations in
              Lagos and Abuja with the links below
            </div>

            <div className="hidden lg:flex items-center gap-[24px] w-full">
              <img src="/assets/play-store.svg" className="cursor-pointer" />
              <img src="/assets/app-store.svg" className="cursor-pointer" />
            </div>

            <div className="flex lg:hidden items-center gap-[24px] w-full">
              <img src="/assets/play-mini.svg" className="cursor-pointer" />
              <img src="/assets/app-mini.svg" className="cursor-pointer" />
            </div>
          </div>

          <div className="hidden lg:flex flex-col gap-[24px]">
            <div className="font-medium">COMPANY</div>
            <div>
              {company.map((dat, i) => (
                <div className="mb-[24px]" key={i}>
                  {dat}
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex flex-col gap-[24px]">
            <div className="font-medium">INFORMATION</div>
            <div>
              {information.map((dat, i) => (
                <div className="mb-[24px]" key={i}>
                  {dat}
                </div>
              ))}
            </div>
          </div>

          <div className="flex mt-[56px] lg:hidden justify-between w-full items-center">
            <div className="flex flex-col gap-[24px]">
              <div className="font-medium">COMPANY</div>
              <div>
                {company.map((dat, i) => (
                  <div className="mb-[24px]" key={i}>
                    {dat}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-[24px]">
              <div className="font-medium">INFORMATION</div>
              <div>
                {information.map((dat, i) => (
                  <div className="mb-[24px]" key={i}>
                    {dat}
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

export default Footer;

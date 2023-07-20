import React from "react";
import { companies, information } from "../common/constants";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#242628] px-[20px] flex flex-col justify-center items-center w-full">
      <div className="w-full lg:w-[1256px]">
        <div className="text-white flex flex-col lg:flex-row items-start justify-between py-[56px] lg:py-[120px] lg:pb-[40px]">
          <div className="flex flex-col gap-[16px] lg:gap-[24px] w-full lg:w-[40%]">
            <div className="text-[28px] leading-[100%] lg:text-[36px] font-[Cooper]">
              Download our free App
            </div>

            <p>
              Download our app to get one free parking at select locations in
              Lagos and Abuja with the links below
            </p>

            <div className="hidden lg:flex items-center gap-[24px] w-full">
              <img src="/assets/play-store.png" className="cursor-pointer" />
              <img src="/assets/app-store.png" className="cursor-pointer" />
            </div>

            <div className="flex lg:hidden items-center gap-[24px] w-full">
              <img src="/assets/play-mini.png" className="cursor-pointer" />
              <img src="/assets/app-mini.png" className="cursor-pointer" />
            </div>
          </div>

          <div className="hidden lg:flex flex-col gap-[24px]">
            <div className="font-medium">COMPANY</div>
            <div>
              {companies.map((dat, i) => (
                <div className="mb-[21px] cursor-pointer" key={i}>
                  <a href={dat?.id}>{dat?.name}</a>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:flex flex-col gap-[24px]">
            <div className="font-medium">INFORMATION</div>
            <div>
              {information.map((dat, i) => (
                <div
                  onClick={() => (i === 0 ? navigate(dat?.link) : "")}
                  className="cursor-pointer mb-[21px]"
                  key={i}
                >
                  {dat?.name}
                </div>
              ))}
            </div>
          </div>

          {/* <div className="hidden lg:flex flex-col gap-[24px]">
            <div className="font-medium">LOCATIONS</div>
            <div>
              {company.map((dat, i) => (
                <div className="mb-[21px]" key={i}>
                  {dat}
                </div>
              ))}
            </div>
          </div> */}

          {/* <div className="hidden lg:flex flex-col gap-[24px]">
            <div className="font-medium">CONNECT</div>
            <div className="grid grid-cols-2 items-center gap-[24px]">
              {connect.map((dat, i) => (
                <div key={i}>
                  <a href={dat?.link} target="_blank" rel="noreferrer">
                    <img
                      src={dat?.icon}
                      className="cursor-pointer w-[20px] h-[20px]"
                    />
                  </a>
                </div>
              ))}
            </div>
          </div> */}

          <div className="flex lg:hidden mt-[56px] w-full gap-5 items-start">
            <div className="flex lg:hidden flex-col w-1/2 gap-[24px]">
              <div className="font-medium">COMPANY</div>
              <div>
                {companies.map((dat, i) => (
                  <div
                    onClick={() => (i === 0 ? navigate(dat?.link) : "")}
                    className="cursor-pointer mb-[21px]"
                    key={i}
                  >
                    {dat?.name}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex lg:hidden w-1/2 flex-col gap-[24px]">
              <div className="font-medium">INFORMATION</div>
              <div>
                {information.map((dat, i) => (
                  <div
                    onClick={() => (i === 0 ? navigate(dat?.link) : "")}
                    className="cursor-pointer mb-[21px]"
                    key={i}
                  >
                    {dat?.name}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* <div className="flex lg:hidden mt-[40px] w-full flex-col justify-center items-center">
            <div className="flex  flex-col justify-center items-center gap-[24px]">
              <div className="font-medium">LOCATIONS</div>
              <div className="flex items-center gap-[24px]">
                {company.map((dat, i) => (
                  <div className="mb-[21px]" key={i}>
                    {dat}
                  </div>
                ))}
              </div>
            </div>
          </div> */}
        </div>
      </div>

      <div className="flex flex-col justify-center items-center w-full">
        <div className="flex justify-center items-center  border-t border-[#545658] w-[100%] lg:w-[50%] pt-[40px] pb-[64px]">
          <div className="text-white text-sm leading-[100%]">
            ©2023 EZPark Limited. All rights reserved
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

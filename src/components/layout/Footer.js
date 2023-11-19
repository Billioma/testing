import React from "react";
import { BsTwitter, BsLinkedin } from "react-icons/bs";
import { RiInstagramFill, RiFacebookFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const Footer = () => {
  const locations = ["Lagos", "Abuja"];
  const today = new Date();

  const information = [
    "Terms and Conditions",
    "Frequently Asked Questions",
    "Careers",
  ];

  return (
    <div className="full_width bg-[#242628] flex justify-center relative">
      <div className="bg-[#242628] px-4 justify-center items-center w-[1296px]">
        <div className="w-full">
          <div className="text-white flex flex-col lg:flex-row items-start justify-between py-[56px] lg:py-[100px] lg:pb-[64px]">
            <div className="flex flex-col gap-[16px] lg:gap-[24px] w-full lg:w-[40%]">
              <div className="text-[32px] font-[Cooper]">Connect with us</div>

              <div className="flex mt-[24px] lg:mt-[unset] items-center gap-[40px] w-full lg:pl-[30px]">
                <Link target="_blank" to="https://twitter.com/EZParkLimited">
                  <BsTwitter color="white" size={26} />
                </Link>
                <Link
                  target="_blank"
                  to="https://www.instagram.com/ezparklimited/"
                >
                  <RiInstagramFill color="white" size={26} />
                </Link>
                <Link
                  target="_blank"
                  to="https://web.facebook.com/EZParkLimited/?_rdc=1&_rdr"
                >
                  <RiFacebookFill color="white" size={26} />
                </Link>
                <Link
                  target="_blank"
                  to="https://www.linkedin.com/company/ezpark-limited/"
                >
                  <BsLinkedin color="white" size={26} />
                </Link>
              </div>
            </div>

            <div className="hidden lg:flex flex-col gap-[24px]">
              <div className="font-medium">LOCATIONS</div>
              <div>
                {locations.map((dat, i) => (
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

            <div className="flex mt-[60px] lg:hidden justify-between w-full items-start">
              <div className="flex flex-col gap-[24px]">
                <div className="font-medium">LOCATIONS</div>
                <div>
                  {locations.map((dat, i) => (
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

        <div className="w-full mb-7 flex flex-col items-center gap-5">
          <hr className="w-[40%] border-zinc-600" />
          <span className="text-white">
            ©{today.getFullYear()} EZPark Limited. All rights reserved
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;

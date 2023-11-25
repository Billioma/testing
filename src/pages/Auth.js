import React from "react";
import { ArrowIcon, loginAs } from "../components/common/constants";
import { useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";

const Auth = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-end mt-[120px] w-full">
        <MdClose cursor="pointer" size="24px" onClick={() => navigate(-1)} />
      </div>
      <div className="flex justify-center items-center flex-col h-[60vh] w-full">
        <div className="font-[Cooper] mb-[40px] text-[#101410] text-[20px] md:text-[35px] lg:text-[40px] leading-[100%]">
          Login as
        </div>

        <div className="flex sm:flex-col md:flex-row gap-[64px] items-center">
          {loginAs.map((dat, i) => (
            <a
              key={i}
              target="_blank"
              rel="noreferrer"
              onClick={() => navigate(-1)}
              href={dat?.path}
            >
              <div className="hover-parent border cursor-pointer hover:border-red hover:text-red border-[#444648] rounded-[4px] py-[8px] px-[20px] flex justify-center items-center gap-[8px]">
                <div className="hover-child">{dat?.img}</div>
                <div className="hover-fin-child">{dat?.hover}</div>
                <div className="leading-[100%] hover-text font-medium text-[#444648]">
                  {dat?.title}
                </div>
                <div className="hover-fin-child">
                  <ArrowIcon fill="#EE383A" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Auth;

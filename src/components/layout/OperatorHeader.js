import React, { useEffect, useState } from "react";
import { operatorMenu } from "../common/constants";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import OperatorMenu from "./OperatorMenu";

const OperatorHeader = () => {
  const [show, setShow] = useState(false);
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 20);
    });
  }, []);
  return (
    <div
      className={`w-full flex justify-center items-center font-medium fixed top-0 ${
        scroll ? "scroll text-black" : "bg-transparent text-white"
      } z-[200]`}
    >
      <div className="w-[1326px] px-[20px] py-[24px] lg:py-[16px]">
        <div className="flex items-center w-full justify-between">
          <div className="w-[100%]">
            {scroll ? (
              <>
                <img
                  src="/assets/alt-logo.svg"
                  className="flex lg:hidden w-[134px] h-[28px]"
                />
                <img
                  src="/assets/alt-logo.svg"
                  className="hidden lg:flex w-[268px] h-[56px]"
                />
              </>
            ) : (
              <>
                <img
                  src="/assets/logo.svg"
                  className="flex lg:hidden w-[134px] h-[28px]"
                />
                <img
                  src="/assets/logo.svg"
                  className="hidden lg:flex w-[268px] h-[56px]"
                />
              </>
            )}
          </div>

          <div
            onClick={() => setShow((prev) => !prev)}
            className="w-full flex justify-end lg:hidden"
          >
            <HiOutlineMenuAlt3 size="24px" />
          </div>

          <div className="w-full flex sm:hidden lg:flex mt-[15px] items-center justify-between text-sm gap-[28px]">
            <div className="flex w-full items-center gap-[28px]">
              {operatorMenu.map((data, i) => (
                <div
                  key={i}
                  className="hover-underlinee-animation cursor-pointer"
                >
                  {data}
                </div>
              ))}
              <div className="flex gap-[24px] items-center w-[30%]">
                <button className="bg-transparent">Login</button>
                <button className="text-white bg-[#0D0718] rounded-[4px] w-[156px] py-[12px]">
                  Sign up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <OperatorMenu isOpen={show} onClose={() => setShow(false)} />
    </div>
  );
};

export default OperatorHeader;

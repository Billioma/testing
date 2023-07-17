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
              <img
                src="/assets/alt-loggo.svg"
                className="w-[154px] h-[28px] lg:w-[265px] lg:h-[37px]"
              />
            ) : (
              <img
                src="/assets/alt-logo.svg"
                className="w-[154px] h-[28px] lg:w-[265px] lg:h-[37px]"
              />
            )}
          </div>

          <div
            onClick={() => setShow((prev) => !prev)}
            className="w-full flex justify-end lg:hidden"
          >
            <HiOutlineMenuAlt3 size="24px" />
          </div>

          <div className="w-full flex sm:hidden justify-end lg:flex mt-[15px] items-center text-sm gap-[32px]">
            {operatorMenu.map((data, i) => (
              <div
                key={i}
                className="hover-underlinee-animation cursor-pointer"
              >
                {data}
              </div>
            ))}
          </div>
        </div>
      </div>
      <OperatorMenu isOpen={show} onClose={() => setShow(false)} />
    </div>
  );
};

export default OperatorHeader;

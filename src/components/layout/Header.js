import React from "react";
import { headers } from "../common/constants";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import Menu from "./Menu";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [show, setShow] = React.useState(false);
  const navigate = useNavigate();
  return (
    <div
      style={{ boxShadow: "0px 2px 24px 0px rgba(100, 102, 104, 0.15)" }}
      className="w-full flex justify-center items-center font-medium fixed top-0 bg-[#fff] z-10"
    >
      <div className="w-[1296px] px-[20px] py-[24px] lg:py-[16px]">
        <div className="flex items-center w-full justify-between">
          <div className="w-[100%] lg:w-[50%]">
            <img
              src="/assets/logo.png"
              className="flex lg:hidden w-[134px] h-[28px]"
            />
            <img
              src="/assets/logo.png"
              className="hidden lg:flex w-[268px] h-[56px]"
            />
          </div>
          <div
            onClick={() => setShow((prev) => !prev)}
            className="w-full flex justify-end lg:hidden"
          >
            <HiOutlineMenuAlt3 size="24px" />
          </div>

          <div className="w-full flex sm:hidden lg:flex mt-[15px] items-center justify-between text-sm gap-[32px]">
            <div className=" flex w-full items-center justify-between text-[#444648]">
              {headers.map((data, i) => (
                <div
                  key={i}
                  onClick={() => i === 3 && navigate("/operators")}
                  className="hover-underline-animation cursor-pointer"
                >
                  {data?.name}
                </div>
              ))}
            </div>

            <div className="flex gap-[24px] items-center w-[30%]">
              <button className="text-[#EE383A] bg-transparent">Login</button>
              <button className="text-white bg-red rounded-[4px] w-[156px] py-[12px]">
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>

      <Menu isOpen={show} onClose={() => setShow(false)} />
    </div>
  );
};

export default Header;

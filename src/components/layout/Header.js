import React from "react";
import { headers } from "../common/constants";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import Menu from "./Menu";
import Auth from "../../pages/Auth";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [show, setShow] = React.useState(false);
  return (
    <div
      style={{ boxShadow: "0px 2px 24px 0px rgba(100, 102, 104, 0.15)" }}
      className="w-full flex justify-center items-center font-medium fixed top-0 bg-[#fff] z-10"
    >
      <div className="w-[1326px] px-[20px] py-[24px] lg:py-[16px]">
        <div className="flex items-center w-full justify-between">
          <div className="w-[100%] lg:w-[55%]">
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

          <div className="w-[100%] sm:hidden lg:flex mt-[15px] text-sm">
            <div className=" flex w-full items-center gap-[32px] text-[#444648]">
              {headers.map((data, i) => (
                <div
                  key={i}
                  className="dropdown hover-underline-animation cursor-pointer"
                >
                  <a href={data?.path} target="_blank" rel="noreferrer">
                    {data?.name}
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div
            onClick={() => navigate("/redirect=")}
            className="mt-[15px] sm:hidden lg:flex gap-[24px] items-center w-[30%]"
          >
            <button className="text-[#EE383A] bg-transparent">Login</button>

            <a
              target="_blank"
              rel="noreferrer"
              href="https://parkinspace-webapp.netlify.app/customer/auth/signup"
            >
              <button className="text-white bg-red rounded-[4px] w-[156px] py-[12px]">
                Sign Up
              </button>
            </a>
          </div>
        </div>
      </div>

      <Menu isOpen={show} onClose={() => setShow(false)} />
    </div>
  );
};

export default Header;

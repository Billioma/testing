import React from "react";
import { headers } from "../common/constants";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import Menu from "./Menu";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [show, setShow] = React.useState(false);

  return (
    <div
      style={{ boxShadow: "0px 2px 24px 0px rgba(100, 102, 104, 0.15)" }}
      className="w-full font-[Satoshi] flex justify-center items-center font-medium fixed top-0 bg-[#fff] z-10"
    >
      <div className="w-[1350px] px-[20px] lg:px-0 py-[24px] lg:py-[16px]">
        <div className="flex items-center w-full justify-between">
          <div className="flex items-center w-full gap-8">
            <div className="w-[100%] lg:w-[20%]">
              <img
                src="/assets/logo.png"
                className="flex lg:hidden w-[134px] h-[28px]"
              />
              <img
                src="/assets/logo.png"
                className="hidden lg:flex h-[40px] object-contain cursor-pointer"
                onClick={() => navigate("/")}
              />
            </div>

            <div
              onClick={() => setShow((prev) => !prev)}
              className="w-full flex justify-end lg:hidden"
            >
              <HiOutlineMenuAlt3 size="24px" />
            </div>

            <div className="w-[100%] sm:hidden lg:flex mt-[8px] text-sm">
              <div className="flex w-full items-center gap-[32px] text-[#444648]">
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
          </div>

          <div className="font-[Sailec] mt-[15px] sm:hidden lg:flex gap-[24px] items-center w-[30%]">
            <div onClick={() => navigate("/redirect=")}>
              <button className="text-[#EE383A] bg-transparent">Login</button>
            </div>

            <a
              target="_blank"
              rel="noreferrer"
              href="https://app.parkinspace.ng/customer/auth/signup"
            >
              <button className="text-white bg-red rounded-[4px] w-[140px] h-[40px]">
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

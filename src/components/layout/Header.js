import React from "react";
import { headers } from "../common/constants";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import Menu from "./Menu";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Header = () => {
  const [show, setShow] = React.useState(false);
  const navigate = useNavigate();
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
                <div key={i} className="dropdown hover-underline-animation">
                  <div className="cursor-pointer">{data?.name}</div>
                  {data.sub && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      className="dropdown-content z-[999999] top-0 left-[-20px] bg-transparent"
                      whileInView={{ y: [6, 0], opacity: 1 }}
                    >
                      <div className="drop z-[999999]">
                        {data.sub?.map((item, i) => (
                          <div className="dropdown-text" key={i}>
                            {item?.subs?.map((dat, i) => (
                              <div
                                key={i}
                                style={{ transition: ".3s ease-in-out" }}
                                onClick={() => dat.route && navigate(dat.route)}
                                className="hover:text-red mb-[21px] cursor-pointer text-[#444648] text-sm font-normal"
                              >
                                {dat?.name}
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-[15px] sm:hidden lg:flex gap-[24px] items-center w-[30%]">
            <button className="text-[#EE383A] bg-transparent">Login</button>
            <button className="text-white bg-red rounded-[4px] w-[156px] py-[12px]">
              Sign Up
            </button>
          </div>
        </div>
      </div>

      <Menu isOpen={show} onClose={() => setShow(false)} />
    </div>
  );
};

export default Header;

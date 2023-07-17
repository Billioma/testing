import React from "react";
import { MdClose } from "react-icons/md";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { headers } from "../common/constants";
import { useNavigate } from "react-router-dom";

const Menu = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      direction="right"
      style={{ height: "100vh", width: "100%", padding: "24px" }}
    >
      <div className="flex justify-between w-full items-center">
        <img src="/assets/logo.png" className=" w-[134px] h-[28px]" />
        <MdClose onClick={onClose} size="25px" />
      </div>

      <div className="flex flex-col items-center justify-center w-full">
        <div className="mt-[48px] flex flex-col items-center justify-center gap-[40px] text-[#444648] font-medium leading-[100%]">
          {headers.map((data, i) => (
            <div
              onClick={() => {
                i === 3 && navigate("/operators");
                onClose();
              }}
              key={i}
              className="hover-underline-animation cursor-pointer"
            >
              {data?.name}
            </div>
          ))}
          <button onClick={onClose} className="text-red bg-transparent">
            Login
          </button>
          <button
            onClick={onClose}
            className="w-full text-white bg-red rounded-[4px] py-[12px]"
          >
            Sign Up
          </button>
        </div>
      </div>
    </Drawer>
  );
};

export default Menu;

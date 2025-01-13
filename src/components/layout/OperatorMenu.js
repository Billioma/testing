import React from "react";
import { MdClose } from "react-icons/md";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { operatorMenu } from "../common/constants";
import { useNavigate } from "react-router-dom";

const OperatorMenu = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      direction="top"
      style={{ height: "90vh", width: "100%", padding: "24px" }}
    >
      <div className="flex justify-between w-full items-center">
        <img
          onClick={() => navigate("/")}
          src="/assets/logo.svg"
          className=" w-[134px] h-[28px]"
        />
        <MdClose onClick={onClose} size="25px" />
      </div>

      <div className="flex flex-col  items-center justify-center w-full">
        <div className="mt-[48px] flex flex-col items-center justify-center gap-[40px] text-black font-medium leading-[100%]">
          {operatorMenu.map((data, i) => (
            <div
              onClick={onClose}
              key={i}
              className="hover-underline-animation cursor-pointer"
            >
              {data}
            </div>
          ))}
          <button onClick={onClose} className="bg-transparent">
            Login
          </button>
          <button
            onClick={onClose}
            className="w-full text-white bg-[#0D0718] rounded-[4px] py-[12px]"
          >
            Sign Up
          </button>
        </div>
      </div>
    </Drawer>
  );
};

export default OperatorMenu;

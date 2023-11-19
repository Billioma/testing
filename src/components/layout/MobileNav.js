import React from "react";
import { Link } from "react-scroll";
import { IoMdClose } from "react-icons/io";

const MobileNav = ({ isOpen, toggleNav, activeSection }) => {
  return (
    <nav
      className={`fixed z-20 bg-neutral-900 inset-x-0 text-white min-h-[60vh] pt-[1rem] px-5 pb-10 transition-all duration-500 ${
        isOpen ? "translate-y-[14rem]" : "-translate-y-full"
      }`}
    >
      <div className="flex justify-between items-center flex-row mb-[4rem]">
        <img
          src="/assets/ezpark-light.svg"
          alt="ezpark-logo"
          className="md:w-[200px] w-[146px]"
        />

        <button
          className="text-white text-xl focus:outline-none"
          onClick={toggleNav}
        >
          <IoMdClose size={30} color="#fff" />
        </button>
      </div>

      <div className="space-y-4 gap-8 flex flex-col justify-center items-center ">
        <Link
          to="aboutus"
          className={`cursor-pointer border-b-2 pb-1 transition-all duration-700 ${
            activeSection === "aboutus"
              ? "border-[#fff]"
              : " border-transparent"
          }`}
          onClick={toggleNav}
          smooth={true}
          duration={500}
        >
          About Us
        </Link>
        <Link
          to="services"
          className={`cursor-pointer border-b-2 pb-1 transition-all duration-700 ${
            activeSection === "services"
              ? "border-[#fff]"
              : " border-transparent"
          }`}
          smooth={true}
          onClick={toggleNav}
          duration={500}
        >
          Services
        </Link>

        <Link
          to="clients"
          className={`cursor-pointer border-b-2 pb-1 transition-all duration-700 ${
            activeSection === "clients"
              ? "border-[#fff]"
              : " border-transparent"
          }`}
          smooth={true}
          duration={500}
          onClick={toggleNav}
        >
          Clients
        </Link>
        <Link
          to="parkinspace"
          className={`cursor-pointer border-b-2 pb-1 transition-all duration-700 ${
            activeSection === "parkinspace"
              ? "border-[#fff]"
              : " border-transparent"
          }`}
          smooth={true}
          duration={500}
          onClick={toggleNav}
        >
          ParkinSpace
        </Link>
        <Link
          to="contact"
          className={`cursor-pointer border-b-2 pb-1 transition-all duration-700 ${
            activeSection === "contact"
              ? "border-[#fff]"
              : " border-transparent"
          }`}
          smooth={true}
          duration={500}
          onClick={toggleNav}
        >
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default MobileNav;

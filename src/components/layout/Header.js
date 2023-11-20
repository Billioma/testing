import { Link } from "react-scroll";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useEffect, useState } from "react";
import MobileNav from "./MobileNav";

export default function Header() {
  const [activeSection, setActiveSection] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const handleScroll = () => {
    const sections = document.querySelectorAll("section");
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition <= sectionTop + sectionHeight
      ) {
        currentSection = section.id;
      }
    });

    setActiveSection(currentSection);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-neutral-900 text-white top-0 left-0 right-0 z-10 h-[75px] flex justify-center items-center fixed bg-opacity-70 backdrop-filter backdrop-blur">
      <div className="w-[1296px] md:px-0 px-4 items-center flex justify-between">
        <img
          src="/assets/ezpark-light.svg"
          alt="ezpark-logo"
          className="md:w-[170px] w-[146px]"
        />

        <div className="w-full flex justify-end lg:hidden">
          <HiOutlineMenuAlt3 size="30px" onClick={toggleNav} />
        </div>

        <div className="md:flex gap-9 hidden items-center">
          <Link
            to="aboutus"
            className={`hover-underline-animation cursor-pointer border-b-2 pb-1 transition-all duration-700 ${
              activeSection === "aboutus"
                ? "border-[#fff]"
                : " border-transparent"
            }`}
            smooth={true}
            duration={500}
          >
            About Us
          </Link>
          <Link
            to="services"
            className={`hover-underline-animation cursor-pointer border-b-2 pb-1 transition-all duration-700 ${
              activeSection === "services"
                ? "border-[#fff]"
                : " border-transparent"
            }`}
            smooth={true}
            duration={500}
          >
            Services
          </Link>

          <Link
            to="clients"
            className={`hover-underline-animation cursor-pointer border-b-2 pb-1 transition-all duration-700 ${
              activeSection === "clients"
                ? "border-[#fff]"
                : " border-transparent"
            }`}
            smooth={true}
            duration={500}
          >
            Clients
          </Link>
          <Link
            to="parkinspace"
            className={`hover-underline-animation cursor-pointer border-b-2 pb-1 transition-all duration-700 ${
              activeSection === "parkinspace"
                ? "border-[#fff]"
                : " border-transparent"
            }`}
            smooth={true}
            duration={500}
          >
            ParkinSpace
          </Link>
          <Link
            to="contact"
            className={`hover-underline-animation cursor-pointer border-b-2 pb-1 transition-all duration-700 ${
              activeSection === "contact"
                ? "border-[#fff]"
                : " border-transparent"
            }`}
            smooth={true}
            duration={500}
          >
            Contact
          </Link>
        </div>
      </div>

      <MobileNav
        isOpen={isOpen}
        toggleNav={toggleNav}
        activeSection={activeSection}
      />
    </div>
  );
}

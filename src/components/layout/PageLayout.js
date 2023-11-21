import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";
import { Link } from "react-scroll";
import OperatorHeader from "./OperatorHeader";

const PageLayout = ({ children }) => {
  const location = useLocation();

  const handleScroll = () => {
    const divs = document.querySelectorAll("div");
    let currentSection = "";

    divs.forEach((div) => {
      const divTop = div.offsetTop;
      const divHeight = div.clientHeight;
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      if (scrollPosition >= divTop && scrollPosition <= divTop + divHeight) {
        currentSection = div.id;
      }
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="font-[Sailec] overflow-hidden w-full flex flex-col min-h-screen">
      {location.pathname === "/operators" ? <OperatorHeader /> : <Header />}
      <div className="flex justify-center items-center">
        <div className="w-full lg:w-[1326px] px-[20px]">{children}</div>
      </div>
      <div className="mt-auto">
        <Link to="top" smooth={true} duration={500}>
          <div className="flex justify-center cursor-pointer items-center w-full mb-[48px]">
            <div className="flex items-center gap-2 justify-end w-full lg:w-[1326px] px-[20px]">
              <div className="text-[#646668] text-sm font-medium leading-[100%]">
                Back to Top
              </div>
              <img src="/assets/up-arrow.svg" className="w-[16px] h-[16px]" />
            </div>
          </div>
        </Link>
        <Footer />
      </div>
    </div>
  );
};

export default PageLayout;

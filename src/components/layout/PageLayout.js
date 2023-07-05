import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";
import OperatorHeader from "./OperatorHeader";

const PageLayout = ({ children }) => {
  const location = useLocation();
  return (
    <div className="font-[Sailec] overflow-hidden w-full flex flex-col min-h-screen">
      {location.pathname === "/" ? <Header /> : <OperatorHeader />}
      <div className="flex justify-center items-center">
        <div className="w-full lg:w-[1296px] min-h-screen px-[20px]">
          {children}
        </div>
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default PageLayout;

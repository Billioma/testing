import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const PageLayout = ({ children }) => {
  return (
    <div className="font-[Sailec] lg:overflow-auto sm:overflow-hidden w-full flex flex-col min-h-screen">
      <Header />
      <div className="flex justify-center items-center">
        <div className="w-full lg:w-[1296px] min-h-screen px-[20px]">
          {" "}
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

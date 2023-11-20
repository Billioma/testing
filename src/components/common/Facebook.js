import React from "react";

const Facebook = () => {
  return (
    <div className="w-full justify-center text-sm flex flex-col items-center relative">
      <img
        className="cursor-pointer w-[280px] md:w-[unset]"
        src="/assets/facebook.png"
      />

      <img src="/assets/shadow.png" className="absolute bottom-0 z-[-3]" />
    </div>
  );
};

export default Facebook;

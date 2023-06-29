import React from "react";

const Instagram = () => {
  return (
    <div className="w-full justify-center text-sm flex flex-col items-center relative">
      <img
        className="cursor-pointer w-[280px] md:w-[unset]"
        src="/assets/instagram.svg"
      />

      <img src="/assets/shadow.svg" className="absolute bottom-0 z-[-3]" />
    </div>
  );
};

export default Instagram;

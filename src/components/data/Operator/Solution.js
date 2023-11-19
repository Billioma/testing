import React from "react";
import { benefits } from "../../common/constants";

const Solution = () => {
  return (
    <div className="full_width">
      <div className="flex w-full bg-[#E4E6E8] flex-col items-center justify-center px-[20px] lg:px-[120px] py-[56px] lg:py-[120px]">
        <div className="flex flex-col lg:flex-row w-full lg:w-[1326px] justify-between items-center">
          <div className="w-full">
            <img src="/assets/soln.png" />
          </div>
          <div className="w-full">
            <div className="text-[#242424] text-[32px] md:text-[64px] font-[900] font-[Cooper]">
              Our solution offers these benefits
            </div>

            <div className="grid gap-y-[24px] grid-cols-1 md:grid-cols-2 mt-[36px]">
              {benefits.map((dat, i) => (
                <div key={i} className="flex gap-[8px] items-center">
                  <img src={dat.img} />
                  <div className="lg:text-[20px]">{dat.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Solution;

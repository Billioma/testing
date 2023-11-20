import React from "react";
import { plus } from "../../common/constants";

export const Divider = ({ color }) => {
  return <div className={`bg-${color} h-[40px] rounded-full w-[4px]`}></div>;
};

const Plus = () => {
  return (
    <div className="full_width" id="plus">
      <div className="bg-[#F4F6F8] px-[20px] lg:px-[120px] py-[56px] lg:py-[80px] flex flex-col justify-center items-center">
        <div className="w-full lg:w-[54%]">
          <div className="text-[#242424] text-center text-[32px] lg:text-[54px] leading-[128%] font-[Cooper]">
            <span className="text-red">Parkin</span>Space Plus
          </div>

          <div className="flex flex-col justify-center items-center w-full">
            <div className="mt-[15px] w-[100%] text-center text-[#444] text-sm lg:text-base leading-[150%]">
              Enjoy an upgraded experience with great benefits when you
              subscribe to a monthly plan for a fee
            </div>
          </div>
        </div>

        <div className="mt-[30px] lg:mt-[40px]">
          <div className="flex text-sm lg:text-base flex-col lg:flex-row w-full items-start gap-[20px] lg:gap-[42px]">
            {plus.map((data, index) => (
              <div key={index}>
                <div>
                  {index === 0 ? (
                    <div className="flex flex-col gap-[15px]">
                      <div className="text-red font-bold">{data?.title}</div>
                      {data?.subs?.map((dat, i) => (
                        <div key={i} className="text-[#444] text-sm mb-[12px]">
                          {dat}
                        </div>
                      ))}
                    </div>
                  ) : index === 1 ? (
                    <div className="hidden lg:flex flex-col gap-[15px] justify-center items-center">
                      <div className="font-bold font-[Cooper]">
                        <span className="text-red">Parkin</span>Space
                      </div>
                      {plus[0]?.subs?.map((dat, i) => (
                        <div key={i} className="mb-[20px]">
                          {i < 3 && <img src="/assets/check.png" />}
                        </div>
                      ))}
                    </div>
                  ) : (
                    index === 2 && (
                      <div className="hidden lg:flex flex-col gap-[15px] justify-center items-center">
                        <div className="font-bold font-[Cooper]">
                          <span className="text-red">Parkin</span>
                          Space Plus
                        </div>
                        {plus[0]?.subs?.map((i) => (
                          <div key={i} className="mb-[20px]">
                            <img src="/assets/check.png" />
                          </div>
                        ))}
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-[30px] flex lg:hidden w-full">
          <div className="flex text-sm w-full gap-[50px] items-start justify-start">
            {plus.map((data, index) => (
              <div key={index}>
                <div>
                  {index === 1 ? (
                    <div className="flex  w-full flex-col gap-[15px] justify-center items-center">
                      <div className="font-bold font-[Cooper]">
                        <span className="text-red">Parkin</span>Space
                      </div>
                      {plus[0]?.subs?.map((dat, i) => (
                        <div key={i} className="mb-[20px]">
                          {i < 3 && <img src="/assets/check.png" />}
                        </div>
                      ))}
                    </div>
                  ) : (
                    index === 2 && (
                      <div className="flex  w-full flex-col gap-[15px] justify-center items-center">
                        <div className="font-bold font-[Cooper]">
                          <span className="text-red">Parkin</span>
                          Space Plus
                        </div>
                        {plus[0]?.subs?.map((i) => (
                          <div key={i} className="mb-[20px]">
                            <img src="/assets/check.png" />
                          </div>
                        ))}
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-red rounded-[4px] px-[34px] py-[10px] text-white mt-[34px]">
          <a
            target="_blank"
            rel="noreferrer"
            href="https://parkinspace-webapp.netlify.app/customer/auth/signup"
          >
            <button>Subscribe Now</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Plus;

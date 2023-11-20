import React, { useState } from "react";
import { motion } from "framer-motion";

const Connect = () => {
  const [tab, setTab] = useState("Valet Parking");

  const tabs = [
    "Valet Parking",
    "Parking Facility Management",
    "Event Parking Management",
  ];
  return (
    <div className="full_width flex justify-center bg-[#F4F6F8]">
      <section
        className="px-3 md:px-[70px] mb-0 py-[56px] w-[1296px]"
        id="services"
      >
        <div className="text-center font-[Cooper] text-[#242628] mb-4 text-[32px] md:text-[54px] font-[900] leading-[100%]">
          Services
        </div>

        <div className="flex mt-[20px] md:mt-[30px] mb-[40px] justify-center items-center w-full">
          <div className="flex flex-wrap justify-center gap-y-[10px] text-[10px] md:text-base items-center w-fit border border-[#C4C6C8] rounded-[21px] p-[4px]">
            {tabs.map((data, i) => (
              <button
                onClick={() => setTab(data)}
                key={i}
                className={`${
                  tab === data
                    ? "bg-[#242628] rounded-[40px] text-white"
                    : "text-[#646668]"
                }  font-medium md:px-[24px] py-[12px] leading-[100%] cursor-pointer w-[50%] md:w-fit `}
              >
                {data}
              </button>
            ))}
          </div>
        </div>

        <div className="md:w-[95%] flex mx-auto justify-center">
          {tab === "Valet Parking" && (
            <motion.div
              initial={{ x: -1000 }}
              animate={{ x: 0 }}
              exit={{ x: -1000 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex md:flex-row flex-col lg:gap-[4rem] gap-[3rem] w-full items-center">
                <div className="md:w-1/2">
                  <h5 className="lg:text-[45px] leading-[100%] text-[32px] font-[Cooper] mb-5">
                    Valet Parking
                  </h5>
                  <p className="text-[#646668] text-sm md:text-[18px] leading-[150%]">
                    EZPark valets serve as effective brand ambassadors for
                    businesses and events. Our licensed, vetted, uniformed and
                    professionally-trained valets receive, park and retrieve
                    guests' vehicles. This added convenience improves customers'
                    satisfaction upon arrival and departure from your business
                    to event.
                  </p>
                </div>
                <img
                  src={"/assets/Slider3.png"}
                  alt=""
                  className="md:order-first lg:h-[400px]"
                />
              </div>
            </motion.div>
          )}

          {tab === "Parking Facility Management" && (
            <motion.div
              initial={{ x: 1000 }}
              animate={{ x: 0 }}
              exit={{ x: 1000 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex md:flex-row flex-col lg:gap-[5rem] gap-[3rem] w-full items-center">
                <div className="md:w-1/2">
                  <h5 className="lg:text-[45px] leading-[100%] text-[32px] font-[Cooper] mb-5">
                    Parking Facility Management
                  </h5>
                  <p className="text-[#646668] text-sm md:text-[18px] leading-[150%]">
                    EZPark operates parking facilities, on behalf of our
                    clients, using advanced technologies and data-driven
                    insights to develop and implement comprehensive, operational
                    plans. These plans include, but are not limited to, space
                    optimization, ideal traffic flow, capacity management,
                    community outreach and more. Our expertise is rooted in
                    local industry knowledge and international best practices.
                  </p>
                </div>
                <img
                  src={"/assets/slider2.png"}
                  className="lg:h-[400px]"
                  alt=""
                />
              </div>
            </motion.div>
          )}

          {tab === "Event Parking Management" && (
            <motion.div
              initial={{ x: 1000 }}
              animate={{ x: 0 }}
              exit={{ x: 1000 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex md:flex-row flex-col lg:gap-[5rem] gap-[3rem] w-full items-center">
                <div className="md:w-1/2">
                  <h5 className="lg:text-[45px] leading-[100%] text-[32px] font-[Cooper] mb-5">
                    Event Parking Management
                  </h5>
                  <p className="text-[#646668] text-sm md:text-[18px] leading-[150%]">
                    We leverage our proven expertise to develop and implement a
                    coordinated plan for pre, during and post event date. Using
                    our people, services and technology, we aim to enhance the
                    overall experience of event goers by addressing critical
                    needs with traffic flow, community outreach, parking
                    optimization, access control and more
                  </p>
                </div>
                <img
                  src={"/assets/Slider1.png"}
                  alt=""
                  className="md:order-first lg:h-[400px]"
                />
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Connect;

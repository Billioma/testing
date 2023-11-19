import React from "react";

const Membership = () => {
  return (
    <section
      className="py-[56px] lg:py-[100px] flex flex-col justify-center items-center"
      id="parkinspace"
    >
      <div className="w-full px-3 lg:w-[48%]">
        <div className="flex flex-col justify-center items-center">
          <div className="text-[#242424] text-center leading-[150%] md:text-[54px] text-[40px] font-[Cooper]">
            <span className="text-red ">Parkin</span>Space <br />
          </div>
        </div>

        <div className="mt-[10px] text-sm md:text-base text-center text-[#101410] flex flex-col gap-5 leading-[150%]">
          <span>
            ParkinSpace is EZPark's proprietary and pioneering technology
            solution for our esteemed customers and clients.
          </span>
          <span>
            Customers can find, reserve and pay for parking services in an easy,
            fast and stress-free way via mobile or web. They also subscribe for
            services, access discounts and earn rewards to use across multiple
            locations.
          </span>
          <span>
            Clients benefit too as they can better operate their business,
            enhance their customers' experience and maximize value.
          </span>
        </div>
      </div>

      <div className="mt-[20px] flex items-center font-semibold text-sm gap-[24px]">
        <button className="bg-red rounded-[4px] px-[40px] py-[15px] text-white ">
          Learn More
        </button>
      </div>

      <div className="mt-[40px] lg:mt-[50px]">
        <img src="/assets/devices.png" alt="" data-aos="fade-up" />
      </div>
    </section>
  );
};

export default Membership;

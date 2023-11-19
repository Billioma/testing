export default function Contact() {
  return (
    <section className="full_width relative flex justify-center" id="aboutus">
      <div className="w-[1296px] pb-[8rem] bg-white">
        <div className="flex justify-center items-center md:pt-[110px] pt-[80px]">
          <div className="md:w-[90%] md:px-0 px-5 md:flex-row flex-col flex md:gap-[68px] gap-10 items-center">
            <div className="md:w-[43%]">
              <h5 className="font-bold text-neutral-800 leading-[100%] md:text-[54px] text-[40px] font-[Cooper]">
                About Us
              </h5>
              <div className="mt-[35px] flex flex-col gap-5 leading-[150%] text-[#101410]">
                <p>
                  EZPark Limited (EZPark) is a premier parking management
                  company.
                </p>

                <p>
                  Our mission is to deliver comprehensive solutions that address
                  the varying parking needs of our distinguished clients and
                  their esteemed guests.
                </p>

                <p>
                  Established in January 2016, EZPark has been a pioneering
                  industry-leader and trusted service provider to various
                  homegrown and internationally recognized establishments in
                  Nigeria.
                </p>

                <p>
                  Our culture of operational excellence is influenced by
                  world-class best practices, local industry expertise,
                  innovative technologies, risk mitigation strategies and
                  competent management.
                </p>
              </div>
            </div>

            <div className="md:w-[45%]">
              <img
                src={"/assets/Rectangle 72 (1).png"}
                alt=""
                data-aos="flip-right"
              />
            </div>
          </div>
        </div>

        {/* <div className="flex justify-center items-center md:mt-[4rem] mt-[3rem]">
          <div className="md:w-[80%] md:px-0 px-5 md:flex-row flex-col flex md:gap-[4rem] gap-10 items-center">
            <div className="relative h-auto" data-aos="fade-right">
              <img
                src={"/assets/mission.png"}
                alt=""
                className="md:h-full h-64 object-cover"
              />
              <div className="absolute inset-0 flex flex-col justify-center lg:px-6 px-4 text-white">
                <div className="font-[Cooper] md:text-[50px] text-[24px] mb-[10px]">
                  Our Mission
                </div>
                <div className="text-white md:text-[18px]">
                  is to deliver comprehensive solutions that address the varying
                  parking needs of our distinguished clients and their esteemed
                  guests..
                </div>
              </div>
            </div>

            <div className="relative h-auto" data-aos="fade-left">
              <img
                src="/assets/culture.png"
                alt=""
                className="md:h-full h-64 object-cover"
              />
              <div className="absolute inset-0 flex flex-col justify-center lg:px-6 px-4">
                <div className="font-[Cooper] md:text-4xl text-xl mb-2">
                  Our Culture
                </div>
                <div className="md:text-lg font-normal">
                  Our operational excellence is influenced by world-class best
                  practices, local industry expertise, innovative technologies,
                  risk mitigation strategies, and competent management.
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}

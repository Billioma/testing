const Connect = () => {
  return (
    <div className="full_width bg-[#131618]">
      <section className="py-[56px] md:py-[100px] text-white" id="clients">
        <div className="flex flex-col text-center justify-between items-center md:w-[80%] mx-auto px-3">
          <h5 className="font-[Cooper] text-[32px] md:text-[64px] font-[900]">
            Clients
          </h5>

          <p className="text-[12px] md:text-[20px] md:mt-[unset] mt-[20px] w-[70%] md:w-[60%] leading-[150%]">
            Trusted by the best homegrown and internationally recognized
            establishments in Nigeria
          </p>
        </div>

        <hr className="mt-[4rem]" />
        <section className="my-[2rem]">
          <div className="grid grid-cols-1/15 overflow-x-hidden mt-8 mb-4">
            <div className="flex justify-center w-max-content review-card__anim1">
              {images.map((image) => (
                <div
                  key={image.path}
                  className={`h-[200px] w-[200px] mx-3 flex justify-center items-center ${
                    image.theme === "dark" ? "bg-black" : "bg-white"
                  }`}
                >
                  <img src={image.path} alt="" />
                </div>
              ))}
            </div>
          </div>
        </section>
        <hr />

        <div className="flex justify-center mt-12">
          <button className="bg-white rounded-[4px] py-[17px] px-[26px] text-[#242424] text-sm leading-[100%] font-normal">
            Become a Client
          </button>
        </div>
      </section>
    </div>
  );
};

export default Connect;

const images = [
  {
    path: "/assets/image 15.svg",
    theme: "white",
  },
  {
    path: "/assets/Cafeteria 1.svg",
    theme: "white",
  },
  {
    path: "/assets/image 3.svg",
    theme: "white",
  },
  {
    path: "/assets/Coronation 1.svg",
    theme: "white",
  },
  {
    path: "/assets/Cilantro 1.svg",
    theme: "dark",
  },
  {
    path: "/assets/image 1.svg",
    theme: "light",
  },
  {
    path: "/assets/image 6.svg",
    theme: "light",
  },
  {
    path: "/assets/Godaif Village 1.svg",
    theme: "light",
  },
  {
    path: "/assets/Gusto Restaurant 1.svg",
    theme: "light",
  },
  {
    path: "/assets/Vertigo 1.svg",
    theme: "dark",
  },
  {
    path: "/assets/Gras 1.svg",
    theme: "light",
  },

  {
    path: "/assets/image 12.svg",
    theme: "light",
  },
  {
    path: "/assets/Kaly Restaurant 1.svg",
    theme: "light",
  },
  {
    path: "/assets/image 22.svg",
    theme: "light",
  },
  {
    path: "/assets/image 14.svg",
    theme: "light",
  },
  {
    path: "/assets/image 5.svg",
    theme: "light",
  },
  {
    path: "/assets/image 4.svg",
    theme: "light",
  },
  {
    path: "/assets/Ona Restaurant 1.svg",
    theme: "light",
  },
  {
    path: "/assets/Orchid Bistro 1.svg",
    theme: "light",
  },
  {
    path: "/assets/The Library 1.svg",
    theme: "dark",
  },
  {
    path: "/assets/image 10.svg",
    theme: "light",
  },
  {
    path: "/assets/Sol Oniru by BoxMall 1.svg",
    theme: "light",
  },
  {
    path: "/assets/image 19.svg",
    theme: "light",
  },
  {
    path: "/assets/centralpark.jpeg",
    theme: "light",
  },
  {
    path: "/assets/The Good Beach 1.svg",
    theme: "dark",
  },

  {
    path: "/assets/image 2.svg",
    theme: "light",
  },
  {
    path: "/assets/Zaza 1.svg",
    theme: "light",
  },
  {
    path: "/assets/Ziya 1.svg",
    theme: "light",
  },
];

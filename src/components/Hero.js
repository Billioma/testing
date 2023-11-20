import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const tabs = [
  {
    id: 1,
    imageSrc: "/assets/Rectangle 96.png",
    text: "Improving customer satisfaction through pleasant parking experiences",
  },
  {
    id: 2,
    imageSrc: "/assets/Rectangle 96 (1).png",
    text: "Quality & efficient execution, driven by our process, people and technology",
  },
  {
    id: 3,
    imageSrc: "/assets/Rectangle 96 (2).png",
    text: "Trusted by reputable homegrown and internationally recognized establishments in Nigeria",
  },
];

export default function Home() {
  const [tab, setTab] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setTab((prevTab) => (prevTab < 3 ? prevTab + 1 : 1));
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  console.log(tab);
  return (
    <div className="full_width bg-neutral-900">
      <div className="flex justify-center lg:h-[42rem] h-[25rem]  pt-[6rem]">
        <section className="w-[1296px] pb-[10rem] relative">
          <div className="flex justify-center lg:flex-col absolute lg:right-[-30px] lg:bottom-[17rem]  md:gap-4 gap-3 bottom-[30px] right-0 lg:left-[unset] left-0">
            {tabs.map((t) => (
              <motion.div
                key={t.id}
                initial={{ backgroundColor: "white" }}
                animate={{ backgroundColor: tab === t.id ? "gray" : "white" }}
                transition={{ duration: tab === t.id ? 0.5 : 1 }}
                className="md:w-1 md:h-[40px] rounded h-1 w-[30px]"
              ></motion.div>
            ))}
          </div>

          <div className="flex w-100">
            {tabs.map((t) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: tab === t.id ? 1 : 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="lg:left-0 lg:right-0 left-[1rem] right-[1rem] top-0 lg:bottom-0 bottom-[4rem] absolute lg:h-fill rounded-lg overflow-hidden"
              >
                <div className="relative w-full h-full">
                  <img
                    src={t.imageSrc}
                    alt=""
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center lg:px-[4rem] px-4">
                    <h2 className="text-white text-center font-[Cooper] lg:text-[56px] text-[24px] leading-[128%]">
                      {t.text}
                    </h2>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      <div className="py-[20px] gap-[10px] lg:gap-[30px] flex items-center justify-center w-full">
        <div
          className={`${
            tab === 1 ? "opacity-[0.5]" : "cursor-pointer"
          } text-white text-center`}
          onClick={() => (tab === 1 ? "" : setTab(tab - 1))}
        >
          <img src="/assets/left-arrow.svg" alt="" />
        </div>

        <div
          className={`${
            tab === 3 ? "opacity-[0.5]" : "cursor-pointer"
          } text-white text-center`}
          onClick={() => (tab === 3 ? "" : setTab(tab + 1))}
        >
          <img src="/assets/right-arrow.svg" alt="" />
        </div>
      </div>
    </div>
  );
}

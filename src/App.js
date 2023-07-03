import React, { useEffect } from "react";
import Pages from "./routes";

const App = () => {
  const imagesToPreload = [
    "/assets/hero.svg",
    "/assets/alert.svg",
    "/assets/app-mini.svg",
    "/assets/app-store.svg",
    "/assets/arrive.svg",
    "/assets/arrow-right.svg",
    "/assets/bus.svg",
    "/assets/contact-one.svg",
    "/assets/contact-two.svg",
    "/assets/devices.svg",
    "/assets/event-parking.svg",
    "assets/facebook.png",
    "assets/instagram.png",
    "/assets/instruction.svg",
    "/assets/iphone-mini.svg",
    "/assets/iphone.svg",
    "/assets/logo.png",
    "/assets/parked-car.svg",
    "/assets/parked-right-mini.svg",
    "/assets/parked-right.svg",
    "/assets/pay-to-park.svg",
    "/assets/play-mini.svg",
    "/assets/play-store.svg",
    "/assets/reserve-parking.png",
    "/assets/scan.svg",
    "/assets/search.svg",
    "/assets/shadow.svg",
    "/assets/spot.svg",
    "/assets/time.svg",
    "assets/twitter.png",
    "/assets/wallet.svg",
  ];

  const preloadImages = () => {
    imagesToPreload.forEach((imagePath) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.href = imagePath;
      link.as = "image";
      document.head.appendChild(link);
    });
  };
  useEffect(() => {
    preloadImages();
  }, []);

  return <Pages />;
};

export default App;

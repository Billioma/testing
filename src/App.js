import React, { useEffect } from "react";
import Pages from "./routes";

const App = () => {
  const imagesToPreload = [
    "/assets/hero.png",
    "/assets/alerts.png",
    "/assets/app-mini.png",
    "/assets/app-store.png",
    "/assets/arrive.png",
    "/assets/ben1.png",
    "/assets/ben2.png",
    "/assets/ben3.png",
    "/assets/alt-logo.png",
    "/assets/ben4.png",
    "/assets/ben5.png",
    "/assets/ben6.png",
    "/assets/soln.png",
    "/assets/arrow-right.png",
    "/assets/bus.png",
    "/assets/contact-one.png",
    "/assets/contact-two.png",
    "/assets/devices.png",
    "/assets/event-parking.png",
    "assets/facebook.png",
    "assets/instagram.png",
    "/assets/instruction.png",
    "/assets/logo.png",
    "/assets/logo.svg",
    "/assets/parked-car.png",
    "/assets/parked-right-mini.png",
    "/assets/parked-right.png",
    "/assets/pay-to-park.png",
    "/assets/play-mini.png",
    "/assets/play-store.png",
    "/assets/reserve-parking.png",
    "/assets/scan.png",
    "/assets/search.png",
    "/assets/shadow.png",
    "/assets/spot.png",
    "/assets/time.png",
    "assets/twitter.png",
    "/assets/wallet.png",
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

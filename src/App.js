import React, { useEffect } from "react";
import Pages from "./routes";

const App = () => {
  const imagesToPreload = [
    "/assets/logo.svg",
    "/assets/calendar.png",
    "/assets/car.png",
    "/assets/card.png",
    "/assets/cards.png",
    "/assets/location.svg",
    "/assets/ezlogo.ong",
    "/assets/park-right.png",
    "/assets/park-left.png",
    "/assets/park-spot.png",
    "/assets/park.png",
    "/assets/service.png",
    "/assets/user.png",
    "/assets/cal.png",
    "/assets/sub.png",
    "/assets/event.png",
    "/assets/wallet.png",
    "/assets/add-icon.svg",
    "/assets/car-icon.svg",
    "/assets/edit.svg",
    "/assets/tow.png",
    "/assets/wash.png",
    "/assets/purse.png",
    "/assets/visa.svg",
    "/assets/verve.svg",
    "/assets/mastercard.svg",
    "/assets/fuel.png",
    "/assets/gauge.png",
    "/assets/bin.svg",
    "/assets/cam.svg",
    "/assets/park-confirm.png",
    "/assets/zone_pic.png",
    "/assets/clock-icon.svg",
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

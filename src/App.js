import React, { useEffect } from "react";
import Pages from "./routes";

const App = () => {
  const imagesToPreload = [
    "/assets/logo.svg",
    "/assets/ezlogo.ong",
    "/assets/park-right.png",
    "/assets/park-left.png",
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

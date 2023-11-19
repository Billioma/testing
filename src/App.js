import React from "react";
import Pages from "./routes";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const App = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return <Pages />;
};

export default App;

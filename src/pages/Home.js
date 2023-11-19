import Contact from "../components/Contact";
import AboutUs from "../components/AboutUs";
import Services from "../components/Services";
import Clients from "../components/Clients";
import ParkinSpace from "../components/ParkinSpace";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <div>
      <Hero />
      <AboutUs />
      <Services />
      <Clients />
      <ParkinSpace />
      <Contact />
    </div>
  );
}

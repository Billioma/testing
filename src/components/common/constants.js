import { FaRegComment } from "react-icons/fa";
import { AiOutlineRetweet } from "react-icons/ai";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { GoUpload } from "react-icons/go";
import { BsTwitter, BsLinkedin } from "react-icons/bs";
import { RiInstagramFill, RiFacebookFill } from "react-icons/ri";

export const headers = [
  {
    id: 1,
    name: "Park Now",
    path: "https://parkinspace-webapp.netlify.app/customer/auth/login/redirect_pay-to-park",
  },
  {
    id: 2,
    name: "Reserve & Park Later",
    path: "https://parkinspace-webapp.netlify.app/customer/auth/login/redirect_reserve-parking",
  },
  {
    id: 3,
    name: "Reserve Event Parking",
    path: "https://parkinspace-webapp.netlify.app/customer/auth/login/redirect_event-parking",
  },
  {
    id: 5,
    name: "Solutions for Businesses",
    path: "/operators",
  },
];

export const plus = [
  {
    id: 1,
    title: "Benefits",
    subs: [
      "Free Account Sign Up",
      "Access all ParkinSpace Services",
      "Fund & Pay with Wallet",
      "Discounted Parking Fees",
      "Priority Access to reserved parking spaces",
      "Reward Points redeemable at select vendors",
      "Exclusive Deals on vehicle maintenance services",
      "Expedited Entry to major events",
    ],
  },
  {
    id: 2,
    title: "",
  },
  {
    id: 3,
    title: "",
  },
];

export const services = [
  {
    id: 1,
    title: "Pay-to-Park",
    desc: "Search, find and pay for valet or self parking services on demand",
    pic: "/assets/pay-to-park.png",
    button: "Park Now",
    path: "https://parkinspace-webapp.netlify.app/customer/auth/login/redirect_pay-to-park",
  },
  {
    id: 2,
    title: "Reserve Parking",
    desc: "Reserve a parkins space in advance and avoid any delays when you arrive",
    pic: "/assets/reserve-parking.png",
    button: "Reserve and Park Later",
    path: "https://parkinspace-webapp.netlify.app/customer/auth/login/redirect_reserve-parking",
  },
  {
    id: 3,
    title: "Event Parking",
    desc: "Arrive an event and drive to your reserved parking space",
    pic: "/assets/event-parking.png",
    button: "Reserve Event Parking",
    path: "https://parkinspace-webapp.netlify.app/customer/auth/login/redirect_event-parking",
  },
  {
    id: 4,
    title: "Car Services",
    desc: "Access vehicle maintenance services with ease",
    pic: "/assets/car-service.png",
    button: "Book a Car Service",
    path: "https://parkinspace-webapp.netlify.app/customer/auth/login/redirect_car-service",
  },
];

export const plusGrid = [
  {
    id: 1,
    title: "Priority Access",
    text1: "Membership benefits redeemable on up to 2 vehicles",
    text2: "AccessReserved Parking Spaces at select locations & events ",
  },
  {
    id: 2,
    title: "Exclusive Discounts",
    text1: "Discounted Parking Fees every time you park with EZPark",
    text2: "Discounted Transaction Fees at select locations",
  },
  {
    id: 3,
    title: "Special Offers",
    text1: "Discounted Car Wash & Auto Detailing services ",
    text2:
      "Discounted Vehicle Maintenance services (i.e.oil change & tire replacement)",
  },
];

export const howTabs = [
  "Pay-to-Park",
  "Reserve Parking",
  "Event Parking",
  "Car Services",
];
export const connectTabs = ["Twitter", "Facebook", "Instagram"];

export const twitterActions = [
  <FaRegComment size="20px" />,
  <AiOutlineRetweet size="20px" />,
  <MdOutlineFavoriteBorder size="20px" />,
  <GoUpload size="20px" />,
];

export const mobileTwitterActions = [
  <FaRegComment size="10px" />,
  <AiOutlineRetweet size="10px" />,
  <MdOutlineFavoriteBorder size="10px" />,
  <GoUpload size="10px" />,
];

export const company = ["Lagos", "Abuja"];
export const companies = [
  {
    name: "About ParkinSpace",
    id: "about",
  },
  {
    name: "Services",
    id: "services",
  },
  {
    name: "ParkinSpace PLUS",
    id: "plus",
  },
  {
    name: "Getting Started",
    id: "start",
  },
  {
    name: "How it Work",
    id: "how",
  },
];

export const connect = [
  {
    id: 1,
    name: "Facebook",
    link: "https://web.facebook.com/EZParkLimited/?_rdc=1&_rdr",
    icon: "/assets/facebook_icon.png",
    img: <RiFacebookFill color="white" size={20} />,
  },
  {
    id: 2,
    name: "Twitter",
    link: "https://twitter.com/EZParkLimited",
    icon: "/assets/twitter_icon.png",
    img: <BsTwitter color="white" size={20} />,
  },
  {
    id: 3,
    name: "Instagram",
    link: "https://www.instagram.com/ezparklimited/",
    icon: "/assets/instagram_icon.png",
    img: <RiInstagramFill color="white" size={20} />,
  },
  {
    id: 4,
    name: "LinkedIn",
    link: "https://www.linkedin.com/company/ezpark-limited/",
    icon: "/assets/linkedin_icon.png",
    img: <BsLinkedin color="white" size={20} />,
  },
];

export const information = [
  { name: "Contact Us", link: "/contact-us" },
  { name: "Terms & Conditions", link: "" },
  { name: "Frequently Asked Questions", link: "" },
  { name: "Careers", link: "" },
];

export const operatorMenu = [
  "About Us",
  "Services",
  "ParkinSpace",
  "Clients",
  "Contact",
];

export const started = [
  {
    id: 1,
    img: "/assets/download.png",
    text: "Download app or visit our website",
  },
  {
    id: 2,
    img: "/assets/sign.png",
    text: "Sign Up for a free account",
  },
  {
    id: 3,
    img: "/assets/car.png",
    text: "Enter your Vehicle details",
  },
  {
    id: 4,
    img: "/assets/wallet.png",
    text: "Start parking",
  },
];

export const benefits = [
  { id: 1, name: "Grow Revenue", img: "/assets/ben1.png" },
  { id: 2, name: "Decrease Costs", img: "/assets/ben2.png" },
  { id: 3, name: "Attract More Customers", img: "/assets/ben3.png" },
  { id: 4, name: "Improve Operational Efficiency", img: "/assets/ben4.png" },
  { id: 5, name: "Solve Multiple Parking Needs", img: "/assets/ben5.png" },
  { id: 6, name: "Enhance Customer Experience", img: "/assets/ben6.png" },
];

export const payPark = [
  {
    id: 1,
    pic: "/assets/scan.png",
    text: "Scan the QR code or enter the zone number",
  },
  {
    id: 2,
    pic: "/assets/time.png",
    text: "Select time",
  },
  {
    id: 3,
    pic: "/assets/wallet.png",
    text: "Confirm payment",
  },
  {
    id: 4,
    pic: "/assets/alerts.png",
    text: "Get alerts on your parking status",
  },
];

export const reservePark = [
  {
    id: 1,
    pic: "/assets/search.png",
    text: "Search parking options at your planned destination",
  },
  {
    id: 2,
    pic: "/assets/bus.png",
    text: "Choose parking facility of your preference",
  },
  {
    id: 3,
    pic: "/assets/spot.png",
    text: "Book and pay to reserve your parking spot",
  },
  {
    id: 4,
    pic: "/assets/instruction.png",
    text: "Receive confirmation of your reservation",
  },
];

export const carService = [
  {
    id: 1,
    pic: "/assets/bus.png",
    text: "Select Car Services",
  },
  {
    id: 2,
    pic: "/assets/message.png",
    text: "Choose a car service",
  },
  {
    id: 3,
    pic: "/assets/wallet.png",
    text: "Book and pay for car service",
  },
  {
    id: 4,
    pic: "/assets/notification.png",
    text: "Receive confirmation",
  },
];

export const eventPark = [
  {
    id: 1,
    pic: "/assets/search.png",
    text: "Browse or Search for Event",
  },
  {
    id: 2,
    pic: "/assets/message.png",
    text: "Choose from available parking options",
  },
  {
    id: 3,
    pic: "/assets/arrive.png",
    text: "Confirm selection and make payment",
  },
  {
    id: 4,
    pic: "/assets/instruction.png",
    text: "Receive e-mail confirmation",
  },
];

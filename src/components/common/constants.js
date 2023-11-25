import { FaRegComment } from "react-icons/fa";
import { AiOutlineRetweet } from "react-icons/ai";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { GoUpload } from "react-icons/go";
import { BsLinkedin } from "react-icons/bs";
import {
  RiInstagramFill,
  RiFacebookFill,
  RiTwitterXLine,
} from "react-icons/ri";

export const BusinessIcon = ({ fill }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.2"
        d="M12 14.25C8.83955 14.2582 5.73363 13.4267 3 11.8406V19.5C3 19.6989 3.07902 19.8896 3.21967 20.0303C3.36032 20.1709 3.55109 20.25 3.75 20.25H20.25C20.4489 20.25 20.6397 20.1709 20.7803 20.0303C20.921 19.8896 21 19.6989 21 19.5V11.8406C18.2646 13.4225 15.1599 14.2537 12 14.25Z"
        fill={fill}
      />
      <path
        d="M20.25 6.75H3.75C3.33579 6.75 3 7.08579 3 7.5V19.5C3 19.9142 3.33579 20.25 3.75 20.25H20.25C20.6642 20.25 21 19.9142 21 19.5V7.5C21 7.08579 20.6642 6.75 20.25 6.75Z"
        stroke={fill}
        strokeWidth="1.2"
      />
      <path
        d="M15.75 6.75V5.25C15.75 4.85218 15.592 4.47064 15.3107 4.18934C15.0294 3.90804 14.6478 3.75 14.25 3.75H9.75C9.35218 3.75 8.97064 3.90804 8.68934 4.18934C8.40804 4.47064 8.25 4.85218 8.25 5.25V6.75"
        stroke={fill}
        strokeWidth="1.2"
      />
      <path
        d="M21 11.8406C18.2646 13.4225 15.1599 14.2537 12 14.25C8.83955 14.2582 5.73363 13.4267 3 11.8406"
        stroke={fill}
        strokeWidth="1.2"
      />
      <path d="M10.875 11.25H13.125" stroke={fill} strokeWidth="1.2" />
    </svg>
  );
};

export const CustomerIcon = ({ fill }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 19C18 16.7909 15.3137 15 12 15C8.68629 15 6 16.7909 6 19M12 12C9.79086 12 8 10.2091 8 8C8 5.79086 9.79086 4 12 4C14.2091 4 16 5.79086 16 8C16 10.2091 14.2091 12 12 12Z"
        stroke={fill}
        strokeWidth="1.2"
      />
    </svg>
  );
};

export const OperatorIcon = ({ fill }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.40002 13.6999H3.23641M3.23641 13.6999H15.9636M3.23641 13.6999C3.24531 13.6587 3.25584 13.6179 3.26799 13.5776C3.297 13.4814 3.33796 13.3888 3.42034 13.2035L4.65735 10.4202C4.90192 9.86993 5.02441 9.59462 5.2177 9.39287C5.38856 9.21453 5.59813 9.07831 5.83049 8.9946C6.09336 8.8999 6.39471 8.8999 6.9969 8.8999H12.2029C12.8051 8.8999 13.1067 8.8999 13.3696 8.9946C13.6019 9.07831 13.8112 9.21453 13.9821 9.39287C14.1752 9.59449 14.2975 9.86957 14.5417 10.4191L15.7837 13.2136C15.8631 13.3922 15.9035 13.4831 15.932 13.5776C15.9441 13.6179 15.9547 13.6587 15.9636 13.6999M3.23641 13.6999C3.22644 13.746 3.2185 13.7926 3.2126 13.8394C3.20002 13.9391 3.20002 14.0404 3.20002 14.2433V18.4999M15.9636 13.6999H16.8M15.9636 13.6999C15.9736 13.746 15.9816 13.7926 15.9875 13.8394C16 13.9385 16 14.0392 16 14.2396V18.5M16 18.5L12.8 18.5M16 18.5V19.2998C16 20.1835 15.2837 20.8999 14.4 20.8999C13.5164 20.8999 12.8 20.1836 12.8 19.2999V18.5M12.8 18.5L6.40002 18.4999M6.40002 18.4999H3.20002M6.40002 18.4999V19.2999C6.40002 20.1836 5.68368 20.8999 4.80002 20.8999C3.91637 20.8999 3.20002 20.1836 3.20002 19.2999V18.4999"
        stroke={fill}
        strokeWidth="1.2"
      />
      <path
        d="M19.8 20.4001V5.7914M19.8 5.7914H19C18.4477 5.7914 18 5.34369 18 4.7914V4.6001C18 4.04781 18.4477 3.6001 19 3.6001H20.6C21.1523 3.6001 21.6 4.04781 21.6 4.6001V4.7914C21.6 5.34369 21.1523 5.7914 20.6 5.7914H19.8Z"
        stroke={fill}
        strokeWidth="1.2"
      />
    </svg>
  );
};

export const ArrowIcon = ({ fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="12"
      viewBox="0 0 16 12"
      fill="none"
    >
      <path
        d="M3 6H13M13 6L10.2881 3M13 6L10.2881 9"
        stroke={fill}
        strokeWidth="1.33333"
      />
    </svg>
  );
};

export const loginAs = [
  {
    id: 1,
    title: "Customer",
    img: <CustomerIcon fill="#444648" />,
    hover: <CustomerIcon fill={"#EE383A"} />,
    path: "https://parkinspace-webapp.netlify.app/customer/auth/login",
  },
  {
    id: 2,
    title: "Business",
    img: <BusinessIcon fill="#444648" />,
    hover: <BusinessIcon fill={"#EE383A"} />,
    path: "https://parkinspace-webapp.netlify.app/client/auth/login",
  },
  {
    id: 3,
    title: "Operator",
    img: <OperatorIcon fill="#444648" />,
    hover: <OperatorIcon fill={"#EE383A"} />,
    path: "https://parkinspace-webapp.netlify.app/operator/auth/login",
  },
];

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
    name: "How it Works",
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
    img: <RiTwitterXLine color="white" size={20} />,
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

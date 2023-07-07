import { FaFacebookF, FaRegComment } from "react-icons/fa";
import { AiOutlineRetweet, AiOutlineTwitter } from "react-icons/ai";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { BsLinkedin, BsTwitter } from "react-icons/bs";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { GoUpload } from "react-icons/go";

export const headers = [
  {
    id: 1,
    name: "Park now",
  },
  {
    id: 2,
    name: "Reserve & Park Later",
  },
  {
    id: 3,
    name: "Reserve Event Parking",
  },
  {
    id: 5,
    name: "Solutions",
    sub: [
      {
        title: "Company",
        subs: [
          {
            name: "About ParkinSpace",
          },
          {
            name: "Services",
          },
          {
            name: "Getting Started",
          },
          {
            name: "How it Works",
          },
          {
            name: "Contact Us",
          },
        ],
      },
      {
        title: "Our Solutions",
        subs: [
          {
            name: "Parking Providers",
            route: "/operators",
          },
          {
            name: "Businesses",
          },
          {
            name: "Event Organisers",
          },
        ],
      },
    ],
  },
];

export const services = [
  {
    id: 1,
    title: "Pay-to-Park",
    desc: "Looking for or found a parking space? Want to valet your car? Search and pay for parking on-the-go in just a few taps.",
    pic: "/assets/pay-to-park.png",
    button: "Park Now",
  },
  {
    id: 2,
    title: "Reserve Parking",
    desc: "Heading to a busy part of town? Avoid delays upon arrival by making a parking reservation ahead of time to save a spot.",
    pic: "/assets/reserve-parking.png",
    button: "Reserve and Park Later",
  },
  {
    id: 3,
    title: "Event Parking",
    desc: "Attending an upcoming concert or festival? Save a parking spot in advance at the event and don’t miss any part of the show.",
    pic: "/assets/event-parking.png",
    button: "Reserve Event Parking",
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

export const howTabs = ["Pay-to-Park", "Reserve Parking", "Event Parking"];
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

export const connect = [
  {
    id: 1,
    name: "Facebook",
    icon: "/assets/facebook_icon.png",
  },
  {
    id: 2,
    name: "Twitter",
    icon: "/assets/twitter_icon.png",
  },
  {
    id: 3,
    name: "Instagram",
    icon: "/assets/instagram_icon.png",
  },
  {
    id: 4,
    name: "LinkedIn",
    icon: "/assets/linkedin_icon.png",
  },
];

export const information = ["Frequently Asked Questions", "Terms & Conditions"];

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
    text: "Download the ParkinSpace app or visit our website",
  },
  {
    id: 2,
    img: "/assets/sign.png",
    text: "Sign Up using your name, e-mail address and phone number",
  },
  {
    id: 3,
    img: "/assets/car.png",
    text: "Enter your Vehicle details (Make, Model & License Plate Number)",
  },
  {
    id: 4,
    img: "/assets/wallet.png",
    text: "Add your preferred Payment Method onto your account",
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
    text: "Scan the QR code or enter the zone number on display using the   Parkin Space app",
  },
  {
    id: 2,
    pic: "/assets/time.png",
    text: "Select the amount of time you want to park",
  },
  {
    id: 3,
    pic: "/assets/wallet.png",
    text: "Confirm payment to start your parking session",
  },
  {
    id: 4,
    pic: "/assets/alerts.png",
    text: "Get alerts when your time is about to expire and extend your parking session via the app.",
  },
];

export const reservePark = [
  {
    id: 1,
    pic: "/assets/search.png",
    text: "Search where you are heading on the ParkinSpace app or website.",
  },
  {
    id: 2,
    pic: "/assets/bus.png",
    text: "Choose a parking facility based on preferences such as valet parking, gated parking, onsite security, re-entry and more.",
  },
  {
    id: 3,
    pic: "/assets/spot.png",
    text: "Book a parking spot and confirm reservation.",
  },
  {
    id: 4,
    pic: "/assets/instruction.png",
    text: "Receive e-mail instructions on how to redeem parking upon arrival",
  },
];

export const eventPark = [
  {
    id: 1,
    pic: "/assets/search.png",
    text: "Search for your event venue using the ParkinSpace app or website.",
  },
  {
    id: 2,
    pic: "/assets/bus.png",
    text: "Review our available parking options based on preferences such as valet parking, self parking and more.",
  },
  {
    id: 3,
    pic: "/assets/arrive.png",
    text: "Choose arrival date/time and confirm reservation.",
  },
  {
    id: 4,
    pic: "/assets/instruction.png",
    text: "Receive e-mail instructions on how to redeem parking at the event",
  },
];

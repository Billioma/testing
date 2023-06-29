import { FaRegComment } from "react-icons/fa";
import { AiOutlineRetweet } from "react-icons/ai";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { GoUpload } from "react-icons/go";

export const headers = [
  {
    id: 1,
    name: "Park now",
  },
  {
    id: 2,
    name: "Reserve Parking",
  },
  {
    id: 3,
    name: "Event Parking",
  },
  {
    id: 4,
    name: "Parking Providers",
  },
  {
    id: 5,
    name: "ParkinSpace Plus",
  },
];

export const services = [
  {
    id: 1,
    title: "Pay-to-Park",
    desc: "Looking for or found a parking space? Want to valet your car? Search and pay for parking on-the-go in just a few taps.",
    pic: "/assets/pay-to-park.svg",
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
    title: "Pay-to-Park",
    desc: "Attending an upcoming concert or festival? Save a parking spot in advance at the event and don’t miss any part of the show.",
    pic: "/assets/event-parking.svg",
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

export const company = [
  "ParkinSpace",
  "ParkinSpace Operator",
  "Clients",
  "Terms & Conditions",
];

export const information = ["Call us", "Blog", "FAQ", "Locations"];

export const payPark = [
  {
    id: 1,
    pic: "/assets/scan.svg",
    text: "Scan the QR code or enter the zone number on display using the   Parkin Space app",
  },
  {
    id: 2,
    pic: "/assets/time.svg",
    text: "Select the amount of time you want to park",
  },
  {
    id: 3,
    pic: "/assets/wallet.svg",
    text: "Confirm payment to start your parking session",
  },
  {
    id: 4,
    pic: "/assets/alert.svg",
    text: "Get alerts when your time is about to expire and extend your parking session via the app.",
  },
];

export const reservePark = [
  {
    id: 1,
    pic: "/assets/search.svg",
    text: "Search where you are heading on the ParkinSpace app or website.",
  },
  {
    id: 2,
    pic: "/assets/bus.svg",
    text: "Choose a parking facility based on preferences such as valet parking, gated parking, onsite security, re-entry and more.",
  },
  {
    id: 3,
    pic: "/assets/spot.svg",
    text: "Book a parking spot and confirm reservation.",
  },
  {
    id: 4,
    pic: "/assets/instruction.svg",
    text: "Receive e-mail instructions on how to redeem parking upon arrival",
  },
];

export const eventPark = [
  {
    id: 1,
    pic: "/assets/search.svg",
    text: "Search for your event venue using the ParkinSpace app or website.",
  },
  {
    id: 2,
    pic: "/assets/bus.svg",
    text: "Review our available parking options based on preferences such as valet parking, self parking and more.",
  },
  {
    id: 3,
    pic: "/assets/arrive.svg",
    text: "Choose arrival date/time and confirm reservation.",
  },
  {
    id: 4,
    pic: "/assets/instruction.svg",
    text: "Receive e-mail instructions on how to redeem parking at the event",
  },
];

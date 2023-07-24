import {
  DashboardIcon,
  HelpIcon,
  HistoryIcon,
  ServiceIcon,
  SubscriptionIcon,
  VehicleIcon,
} from "./images";

export const general = [
  {
    id: 1,
    name: "Dashboard",
    path: "/customer/dashboard",
    icon: <DashboardIcon fill="#242628" />,
    sec: <DashboardIcon fill="#EE383A" />,
  },
  {
    id: 2,
    name: "Services",
    path: "/customer/services",
    icon: <ServiceIcon fill="#242628" />,
    sec: <ServiceIcon fill="#EE383A" />,
  },
  // {
  //   id: 3,
  //   name: "Vehicles",
  //   path: "/customer/vehicles",
  //   icon: <VehicleIcon fill="#242628" />,
  //   sec: <VehicleIcon fill="#EE383A" />,
  // },
  {
    id: 4,
    name: "Subscriptions",
    path: "/customer/subscriptions",
    icon: <SubscriptionIcon fill="#242628" />,
    sec: <SubscriptionIcon fill="#EE383A" />,
  },
  {
    id: 5,
    name: "History",
    path: "/customer/history",
    icon: <HistoryIcon fill="#242628" />,
    sec: <HistoryIcon fill="#EE383A" />,
  },
  {
    id: 6,
    name: "Help Center",
    path: "/customer/help-center",
    icon: <HelpIcon fill="#242628" />,
    sec: <HelpIcon fill="#EE383A" />,
  },
];

export const colors = [
  "White",
  "Black",
  "Red",
  "Silver",
  "Gray",
  "Gold",
  "Orange",
  "Yellow",
  "Green",
  "Blue",
  "Indigo",
  "Violet",
  "Purple",

];

export const activeStyle = {
  background: "#FDE8E8",
  alignItems: "center",
  display: "flex",
  color: "#EE383A",
  fontWeight: 500,
  borderRadius: "4px",
  fontSize: "12px",
  lineHeight: "100%",
  margin: "0 -20px 12px",
  padding: "5px 2px 5px 16px",
};

export const dashServices = [
  {
    img: "/assets/park.png",
    title: "Park Now",
  },
  {
    img: "/assets/calendar.png",
    title: "Reserve & Park Later",
  },
  {
    img: "/assets/park-spot.png",
    title: "Reserve Event Parking",
  },
  {
    img: "/assets/service.png",
    title: "Car Services",
  },
];

import {
  DashboardIcon,
  HelpIcon,
  HistoryIcon,
  ServiceIcon,
  SubscriptionIcon,
} from "./images";

export const general = [
  {
    id: 1,
    name: "Dashboard",
    path: "/customer/dashboard",
    icon: <DashboardIcon fill="#646668" />,
    hover: <DashboardIcon fill="#EE383A" />,
    sec: <DashboardIcon fill="#fff" />,
  },
  {
    id: 2,
    name: "Services",
    path: "/customer/services",
    icon: <ServiceIcon fill="#646668" />,
    hover: <ServiceIcon fill="#EE383A" />,
    sec: <ServiceIcon fill="#fff" />,
  },
  {
    id: 3,
    name: "Subscriptions",
    path: "/customer/subscriptions",
    icon: <SubscriptionIcon fill="#646668" />,
    hover: <SubscriptionIcon fill="#EE383A" />,
    sec: <SubscriptionIcon fill="#fff" />,
  },
  {
    id: 4,
    name: "History",
    path: "/customer/history",
    icon: <HistoryIcon fill="#646668" />,
    hover: <HistoryIcon fill="#EE383A" />,
    sec: <HistoryIcon fill="#fff" />,
  },
  {
    id: 5,
    name: "Help Center",
    path: "/customer/help-center",
    icon: <HelpIcon fill="#646668" />,
    hover: <HelpIcon fill="#EE383A" />,
    sec: <HelpIcon fill="#fff" />,
  },
];

export const activeStyle = {
  background: "linear-gradient(179deg, #C00 0%, #F00 100%)",
  alignItems: "center",
  display: "flex",
  color: "#DDD",
  fontWeight: 500,
  borderRadius: "16px",
  fontSize: "14px",
  lineHeight: "100%",
  margin: "0 -20px 8px",
  padding: "12px 13px",
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

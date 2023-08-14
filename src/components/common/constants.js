import {
  ClientEventIcon,
  ClientUserIcon,
  DashboardIcon,
  HelpIcon,
  HistoryIcon,
  ServiceIcon,
  SubscriptionIcon,
  VehicleIcon,
} from "./images";

import {
  AdminDashboardIcon,
  ServicesIcon,
  UserIcon,
  CustomerIcon,
  LocationIcon,
  AdminVehicleIcon,
  MembershipsIcon,
  ClientsIcon,
  LogsIcon,
  ReportsIcon,
  ConfigIcon,
} from "./images";

export const sidebarItems = [
  {
    id: 1,
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: <AdminDashboardIcon />,
    hover: <AdminDashboardIcon fill="#fff" stroke="black" />,
  },

  {
    id: 7,
    title: "Clients",
    path: "/admin/clients",
    icon: <ClientsIcon />,
    hover: <ClientsIcon fill="#fff" stroke="black" />,
    subItems: [
      {
        title: "Client Lists",
        path: "/admin/client-lists",
      },
      {
        title: "Client Invoices",
        path: "/admin/client-invoices",
      },
      {
        title: "Event",
        path: "/admin/event",
      },
    ],
  },

  {
    id: 3,
    title: "Users",
    icon: <UserIcon />,
    hover: <UserIcon fill="#fff" stroke="black" />,
    path: "users",
    subItems: [
      {
        title: "Customers",
        path: "/admin/users/customers",
      },
      {
        title: "Attendants",
        path: "/admin/users/attendants",
      },
      {
        title: "Administrators",
        path: "/admin/users/administrators",
      },
      {
        title: "Operators",
        path: "/admin/users/operatrs",
      },
    ],
  },

  {
    id: 5,
    title: "Locations",
    path: "/locations",
    icon: <LocationIcon />,
    hover: <LocationIcon fill="#fff" stroke="black" />,
    subItems: [
      {
        title: "Locations",
        path: "/admin/locations",
      },
      {
        title: "Zones",
        path: "/admin/zones",
      },
      {
        title: "Rates",
        path: "/admin/rates",
      },
      {
        title: "Amenities",
        path: "/admin/amenities",
      },
      {
        title: "Policies",
        path: "/admin/policies",
      },
    ],
  },

  {
    id: 2,
    title: "Services",
    path: "/admin/services",
    icon: <ServicesIcon />,
    hover: <ServicesIcon fill="#fff" stroke="black" />,
  },

  {
    id: 6,
    title: "Vehicles",
    path: "/admin/vehicles",
    icon: <AdminVehicleIcon />,
    hover: <AdminVehicleIcon fill="#fff" stroke="black" />,
  },

  {
    id: 8,
    title: "Memberships",
    path: "/admin/memberships",
    icon: <MembershipsIcon />,
    hover: <MembershipsIcon fill="#fff" stroke="black" />,
    subItems: [
      {
        title: "Membership Plans",
        path: "/admin/membership-plans",
      },
      {
        title: "Membership Features",
        path: "/admin/membership-features",
      },
      {
        title: "Customer Subscriptions",
        path: "/admin/customer-subscriptions",
      },
      {
        title: "Corporate Subscriptions",
        path: "/admin/corporate-subscriptions",
      },
    ],
  },

  {
    id: 4,
    title: "Transactions",
    path: "/transactions",
    icon: <CustomerIcon />,
    hover: <CustomerIcon fill="#fff" stroke="black" />,
    subItems: [
      {
        title: "Pay-To-Park",
        path: "/admin/pay-to-pack",
      },
      {
        title: "Reserved Parking",
        path: "/admin/reserved-parking",
      },
      {
        title: "Vallet Parking",
        path: "/admin/vallet",
      },
      {
        title: "Car Services",
        path: "/admin/car-services",
      },
    ],
  },

  {
    id: 12,
    title: "Administrator",
  },

  {
    id: 9,
    title: "Logs",
    path: "/admin/logs",
    icon: <LogsIcon />,
    hover: <LogsIcon fill="#fff" stroke="black" />,
    subItems: [
      {
        title: "Valeted Vehicles",
        path: "/admin/valeted-vehicles",
      },
      {
        title: "Parked Vehicles",
        path: "/admin/parked-vehicles",
      },
      {
        title: "Serviced Vehicles",
        path: "/admin/serviced-vehicles",
      },
    ],
  },
  {
    id: 10,
    title: "Reports",
    path: "/admin/reports",
    icon: <ReportsIcon />,
    hover: <ReportsIcon fill="#fff" stroke="black" />,
  },
  {
    id: 11,
    title: "Configurations",
    path: "/admin/configurations",
    icon: <ConfigIcon />,
    hover: <ConfigIcon fill="#fff" stroke="black" />,
  },
];

export const general = [
  {
    id: 0,
    name: "Dashboard",
    path: "/customer/dashboard",
    icon: <DashboardIcon fill="#242628" />,
    sec: <DashboardIcon fill="#EE383A" />,
  },
  {
    id: 1,
    name: "Services",
    path: "/customer/services",
    icon: <ServiceIcon fill="#242628" />,
    sec: <ServiceIcon fill="#EE383A" />,
  },
  {
    id: 2,
    name: "Vehicles",
    path: "/customer/vehicles",
    icon: <VehicleIcon fill="#242628" />,
    sec: <VehicleIcon fill="#EE383A" />,
  },
  {
    id: 3,
    name: "Subscriptions",
    path: "/customer/subscriptions",
    icon: <SubscriptionIcon fill="#242628" />,
    sec: <SubscriptionIcon fill="#EE383A" />,
  },
  {
    id: 4,
    name: "History",
    path: "/customer/history",
    icon: <HistoryIcon fill="#242628" />,
    sec: <HistoryIcon fill="#EE383A" />,
  },
  {
    id: 5,
    name: "Help Center",
    path: "/customer/help-center",
    icon: <HelpIcon fill="#242628" />,
    sec: <HelpIcon fill="#EE383A" />,
  },
];

export const clientEventHeader = [
  "Name",
  "Website",
  "Event Start Date",
  "Event End Date",
  "Status",
  "Date",
  "Actions",
];

export const clientUserHeader = [
  "Full Name",
  "Phone",
  "Company Name",
  "Email Address",
  "Status",
  "Date Created",
  "Actions",
];

export const clientSidebar = [
  {
    id: 0,
    name: "Dashboard",
    path: "/client/dashboard",
    icon: <DashboardIcon fill="#444648" />,
    sec: <DashboardIcon fill="#fff" />,
    hover: <DashboardIcon fill="#ee383a" />,
  },
  {
    id: 1,
    name: "Users",
    path: "/client/users",
    icon: <ClientUserIcon fill="#444648" />,
    sec: <ClientUserIcon fill="#fff" />,
    hover: <ClientUserIcon fill="#ee383a" />,
  },
  {
    id: 2,
    name: "Events",
    path: "/client/events",
    icon: <ClientEventIcon fill="#444648" />,
    sec: <ClientEventIcon fill="#fff" />,
    hover: <ClientEventIcon fill="#ee383a" />,
  },
  {
    id: 3,
    name: "Subscriptions",
    path: "/client/subscriptions",
    icon: <SubscriptionIcon fill="#444648" />,
    sec: <SubscriptionIcon fill="#fff" />,
    hover: <SubscriptionIcon fill="#ee383a" />,
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

export const clientStyle = {
  background: "#EE383A",
  alignItems: "center",
  display: "flex",
  color: "#fff",
  fontWeight: 500,
  borderRadius: "4px",
  fontSize: "12px",
  lineHeight: "100%",
  margin: "0 -20px 12px",
  padding: "5px 2px 5px 16px",
};

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
    link: "/customer/services/park",
  },
  {
    img: "/assets/calendar.png",
    title: "Reserve & Park Later",
    link: "/customer/services/reserve-parking",
  },
  {
    img: "/assets/park-spot.png",
    title: "Reserve Event Parking",
    link: "/customer/services/event-parking",
  },
  {
    img: "/assets/service.png",
    title: "Car Services",
    link: "/customer/services/car-service",
  },
];

export const carServiceIcon = [
  "/assets/wash.png",
  "/assets/fuel.png",
  "/assets/gauge.png",
  "/assets/tow.png",
];

export const carServiceDesc = [
  "Car Wash",
  "Car Fueling",
  "Tyre gauge",
  "Car Tow",
];

export const RateTypes = ["ADHOC", "COMPLEMENTARY", "SUBSCRIPTION", "EVENT"];

export const BillingTypes = ["ADHOC", "COMPLEMENTARY", "SUBSCRIPTION", "EVENT"];

export const BookingTypes = ["ONETIME", "SUBSCRIPTION"];

export const TransactionTypes = [
  "FUND_WALLET",
  "SERVICE_PAYMENT",
  "RESERVE_PARKING",
  "EVENT_PARKING",
  "PAY_TO_PARK",
  "TOKENIZATION",
  "TOKENIZATION_REFUND",
  "MEMBERSHIP_SUBSCRIPTION",
  "MEMBERSHIP_SUBSCRIPTION_RENEWAL",
];

export const PaymentMethods = [
  "CASH",
  "TRANSFER",
  "WALLET",
  "POS",
  "UNPAID",
  "SUBSCRIPTION",
  "CARD",
];

export const cardImg = [
  { img: "/assets/mastercard.svg", name: "mastercard" },
  { img: "/assets/visa.svg", name: "visa" },
  { img: "/assets/verve.svg", name: "verve" },
];

export const SecStatus = [
  { color: "#F9A11E", name: "Pending", bg: "#FDF6E7" },
  { color: "#008000", name: "Active", bg: "#E5FFE5" },
  { color: "#E81313", name: "Inactive", bg: "#F9D0CD" },
];

export const Status = [
  { color: "#F9A11E", name: "Pending", bg: "#FDF6E7" },
  { color: "#008000", name: "Completed", bg: "#E5FFE5" },
  { color: "#E81313", name: "Cancelled", bg: "#F9D0CD" },
];

export const AppointmentDateTypes = ["Date", "WeekDay"];

export const BookingSlots = [
  "7:00 - 8:30",
  "8:30 - 10:00",
  "10:00 - 11:30",
  "11:30 - 13:00",
  "13:00 - 14:30",
  "14:30 - 16:00",
  "16:00 - 17:30",
  "17:30 - 19:00",
];

export const subOptions = ["Renew Subscription", "Cancel Subscription"];
export const eventOptions = ["Edit Event", "Delete Event"];

export const accountDrop = [
  {
    name: "Profile",
    link: "/customer/account/profile",
  },
  {
    name: "Payments",
    link: "/customer/account/payment",
  },
  {
    name: "Settings",
    link: "/customer/account/settings",
  },
  {
    name: "Logout",
  },
];

export const servicesHeader = [
  "TICKET NUMBER",
  "ZONE",
  "VEHICLE",
  "SERVICE TYPE",
  "STATUS",
  "DATE",
  "ACTIONS",
];

export const payToParkHeader = [
  "TICKET NUMBER",
  "VEHICLE",
  "SERVICE TYPE",
  "STATUS",
  "DATE",
  "ACTIONS",
];

export const clientDahboard = [
  {
    title: "Subscription",
  }
]
export const reserveHeader = [
  "AMOUNT",
  "VEHICLE",
  "ARRIVAL",
  "DEPARTURE",
  "DATE CREATED",
  "STATUS",
  "ACTIONS",
];

export const eventHeader = [
  "TICKET NUMBER",
  "AMOUNT",
  "VEHICLE",
  "SERVICE TYPE",
  "EVENT",
  "STATUS",
  "DATE",
  "ACTIONS",
];

export const carHeader = [
  "SERVICE TYPE",
  "AMOUNT",
  "APPOINTMENT SLOT",
  "APPOINTMENT DATE",
  "DATE CREATED",
  "STATUS",
  "ACTIONS",
];

export const subHeader = [
  "PLAN",
  "AMOUNT",
  "DURATION",
  "NEXT PAYMENT DATE",
  "STATUS",
  "DATE CREATED",
  "ACTIONS",
];

export const paymentHeader = [
  "TRANSACTION ID",
  "AMOUNT",
  "PAYMENT METHOD",
  "TRANSACTION TYPE",
  "STATUS",
  "DATE",
  "ACTIONS",
];

export const intervals = [
  { 0: "Hourly" }, // 60 minutes
  { 1: "Daily" }, // 1 Day
  { 2: "Weekly" }, // 7 Days
  { 3: "Monthly" }, // 30 Days
  { 4: "Quarterly" }, // 3 Months
  { 5: "Biannually" }, // 6 Months
  { 6: "Annually" }, // 12 Months
];

export const serviceTabs = [
  "Pay-To-Park",
  "Reserve Parking",
  "Event Parking",
  "Car Services",
];

export const customStyles = {
  control: (provided) => ({
    ...provided,
    width: "100%",
    minHeight: "44px",
    color: "#646668",
    fontSize: "14px",
    cursor: "pointer",
    borderRadius: "4px",
    border: "1px solid #D4D6D8",
    background: "unset",
  }),
  menu: (provided) => ({
    ...provided,
    fontSize: "13px",
  }),
};

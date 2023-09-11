import { MdAutorenew } from "react-icons/md";
import {
  ClientEventIcon,
  ClientLogIcon,
  ClientTranIcon,
  ClientUserIcon,
  DashboardIcon,
  HelpIcon,
  HistoryIcon,
  LocateIcon,
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
import { FcCancel } from "react-icons/fc";
import { BsTrash } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";

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

export const operatorUsersHeader = [
  "NAME",
  "USER ID",
  "ACCOUNT TYPE",
  "DATE CREATED",
  "ACTIONS",
];

export const operatorPoliciesHeader = [
  "TITLE",
  "LOCATION",
  "DATE CREATED",
  "ACTIONS",
];

export const operatorLogHeader = [
  "TICKET NUMBER",
  "LOCATION",
  "ZONE",
  "ATTENDANT",
  "DATE CREATED",
  "ACTIONS",
];

export const operatorRepLocationHeader = [
  "NAME",
  "STATE",
  "ZONES",
  "LOCATION TYPE",
  "DATE CREATED",
];

export const operatorRepZoneHeader = [
  "NAME",
  "LOCATION",
  "CAPACITY",
  "RESERVABLE",
  "RESERVABLE SPACE",
  "SERVICE",
  "DATE CREATED",
];

export const operatorPayGrid = [
  "Total Amount Due",
  "Total Amount Received",
  "Total Payments",
];

export const operatorRepPaymentHeader = [
  "LOCATION",
  "ZONE",
  "ATTENDANT",
  "AMOUNT",
  "AMOUNT PAID",
  "SERVICE",
  "DATE CREATED",
];

export const operatorRepLogHeader = [
  "TICKET NO",
  "SERVICE",
  "LOCATION",
  "ZONE",
  "AMOUNT PAID",
  "STATUS",
  "DATE CREATED",
];

export const operatorLocationsHeader = [
  "NAME",
  "OPERATOR",
  "STATE",
  "DATE CREATED",
  "ACTIONS",
];

export const operatorRatesHeader = [
  "NAME",
  "DURATION TYPE",
  "DURATION START",
  "DURATION LIMIT",
  "AMOUNT",
  "DATE CREATED",
  "ACTIONS",
];

export const operatorZonesHeader = [
  "NAME",
  "LOCATION",
  "CAPACITY",
  "MIN DURATION",
  "DURATION TYPE",
  "DATE CREATED",
  "ACTIONS",
];

export const LocationTypes = [
  "RESTAURANT_CAFE",
  "BAR_LOUNGE_NIGHTCLUB",
  "OFFICE_BUILDING",
  "RESORT_LEISURE_CENTER",
  "EVENT_CENTER",
  "SPORTING_CENTER",
  "HOTEL_CONFERENCE_CENTER",
  "HALL_SHOPPING_CENTER",
  "GARAGE_PARKING_LOT",
];

export const allStates = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
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

export const operatorDashboardFilter = ["All Time", "Year", "Month", "Week"];

export const businessSidebar = [
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
    name: "Logs",
    path: "/client/logs",
    icon: <ClientLogIcon fill="#444648" />,
    sec: <ClientLogIcon fill="#fff" />,
    hover: <ClientLogIcon fill="#ee383a" />,
    sub: [
      {
        id: 1,
        name: "Pay-To-Park",
        path: "/client/logs/pay-to-park",
      },
      {
        id: 2,
        name: "Valet Parking",
        path: "/client/logs/valet-park",
      },
    ],
  },
  {
    id: 2,
    name: "Transactions",
    path: "/client/transactions",
    icon: <ClientTranIcon fill="#444648" />,
    sec: <ClientTranIcon fill="#fff" />,
    hover: <ClientTranIcon fill="#ee383a" />,
  },
];

export const corpSidebar = [
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
    name: "Subscriptions",
    path: "/client/subscriptions",
    icon: <SubscriptionIcon fill="#444648" />,
    sec: <SubscriptionIcon fill="#fff" />,
    hover: <SubscriptionIcon fill="#ee383a" />,
  },
];

export const eventSidebar = [
  {
    id: 0,
    name: "Dashboard",
    path: "/client/dashboard",
    icon: <DashboardIcon fill="#444648" />,
    sec: <DashboardIcon fill="#fff" />,
    hover: <DashboardIcon fill="#ee383a" />,
  },
  {
    id: 3,
    name: "Transactions",
    path: "/client/transactions",
    icon: <ClientTranIcon fill="#444648" />,
    sec: <ClientTranIcon fill="#fff" />,
    hover: <ClientTranIcon fill="#ee383a" />,
  },
  {
    id: 4,
    name: "Events",
    path: "/client/events",
    icon: <ClientEventIcon fill="#444648" />,
    sec: <ClientEventIcon fill="#fff" />,
    hover: <ClientEventIcon fill="#ee383a" />,
  },
];

export const operatorSidebar = [
  {
    id: 0,
    name: "Dashboard",
    path: "/operator/dashboard",
    icon: <DashboardIcon fill="#444648" />,
    sec: <DashboardIcon fill="#fff" />,
    hover: <DashboardIcon fill="#ee383a" />,
  },
  {
    id: 1,
    name: "Users",
    path: "/operator/users",
    icon: <ClientUserIcon fill="#444648" />,
    sec: <ClientUserIcon fill="#fff" />,
    hover: <ClientUserIcon fill="#ee383a" />,
    sub: [
      {
        id: 1,
        name: "Attendants",
        path: "/operator/users/attendants",
      },
    ],
  },
  {
    id: 2,
    name: "Locations",
    path: "/operator/location",
    icon: <LocateIcon fill="#444648" />,
    sec: <LocateIcon fill="#fff" />,
    hover: <LocateIcon fill="#ee383a" />,
    sub: [
      {
        id: 1,
        name: "Locations",
        path: "/operator/locations/all",
      },
      {
        id: 2,
        name: "Zones",
        path: "/operator/locations/zones",
      },
      {
        id: 3,
        name: "Rates",
        path: "/operator/locations/rates",
      },
      {
        id: 4,
        name: "Policies",
        path: "/operator/locations/policies",
      },
    ],
  },
  {
    id: 3,
    name: "Logs",
    path: "/operator/logs",
    icon: <ClientLogIcon fill="#444648" />,
    sec: <ClientLogIcon fill="#fff" />,
    hover: <ClientLogIcon fill="#ee383a" />,
    sub: [
      {
        id: 1,
        name: "Valeted Vehicles",
        path: "/operator/logs/valeted-vehicles",
      },
      {
        id: 2,
        name: "Parked Vehicles",
        path: "/operator/logs/parked-vehicles",
      },
      {
        id: 3,
        name: "Serviced Vehicles",
        path: "/operator/logs/serviced-vehicles",
      },
    ],
  },
  {
    id: 4,
    name: "Reports",
    path: "/operator/reports",
    icon: <ClientLogIcon fill="#444648" />,
    sec: <ClientLogIcon fill="#fff" />,
    hover: <ClientLogIcon fill="#ee383a" />,
    sub: [
      {
        id: 1,
        name: "Payments",
        path: "/operator/reports/payments",
      },
      {
        id: 2,
        name: "Locations",
        path: "/operator/reports/locations",
      },
      {
        id: 3,
        name: "Zones",
        path: "/operator/reports/zones",
      },
      {
        id: 3,
        name: "Logs",
        path: "/operator/reports/logs",
      },
    ],
  },
];

export const clientTranHeader = [
  "TICKET NUMBER",
  "FULL NAME",
  "AMOUNT",
  "ZONE",
  "VEHICLE",
  "SERVICE",
  "STATUS",
  "DATE",
  "ACTIONS",
];

export const clientLogPayHeader = [
  "TICKET NUMBER",
  "LICENSE PLATE",
  "CUSTOMER",
  "LOCATION",
  "ZONE",
  "ATTENDANT",
  "AMOUNT",
  "STATUS",
  "DATE",
  "ACTIONS",
];

export const clientTranBody = [
  {
    ticket: "003832",
    fullName: "Bilal Omari",
    amount: "3000",
    zone: "V10098",
    plate: "ABJD833H",
    type: "Pay-To-Park",
    status: 1,
    date: "24-07-2023 7:00 AM",
  },
];

export const clientLogPayBody = [
  {
    ticket: "003832",
    plate: "ABJD833H",
    customer: "Bilal Omari",
    location: "Regno Sei / EZPark Car Park",
    zone: "V10098",
    attendant: "Bilal Omari",
    amount: "3000",
    status: 1,
    date: "24-07-2023 7:00 AM",
  },
];

export const colorTypes = [
  { value: "Blue", label: "Blue", color: "#00629F", fontColor: "#FFFFFF" },
  {
    value: "Maroon",
    label: "Maroon",
    color: "#6D191B",
    fontColor: "#FFFFFF",
  },
  {
    value: "Yellow",
    label: "Yellow",
    color: "#FFEE36",
    fontColor: "#000000",
  },
  {
    value: "Silver",
    label: "Silver",
    color: "#D1D2D1",
    fontColor: "#000000",
  },
  {
    value: "Purple",
    label: "Purple",
    color: "#683276",
    fontColor: "#FFFFFF",
  },
  {
    value: "Orange",
    label: "Orange",
    color: "#E86D34",
    fontColor: "#FFFFFF",
  },
  { value: "Green", label: "Green", color: "#00744E", fontColor: "#FFFFFF" },
  { value: "Gray", label: "Gray", color: "#7C7C7C", fontColor: "#FFFFFF" },
  { value: "Pink", label: "Pink", color: "#EA7B88", fontColor: "#000000" },
  { value: "Tan", label: "Tan", color: "#BE9A6D", fontColor: "#000000" },
  { value: "Brown", label: "Brown", color: "#3C271C", fontColor: "#FFFFFF" },
  { value: "Black", label: "Black", color: "#000000", fontColor: "#FFFFFF" },
  { value: "Red", label: "Red", color: "#AB1A30", fontColor: "#FFFFFF" },
  { value: "Gold", label: "Gold", color: "#D1A631", fontColor: "#000000" },
  { value: "Beige", label: "Beige", color: "#EADBBA", fontColor: "#000000" },
  { value: "White", label: "White", color: "#FFFFFF", fontColor: "#000000" },
  {
    value: "Claret",
    label: "Claret",
    color: "#7f1734",
    fontColor: "#FFFFFF",
  },
  {
    value: "Copper",
    label: "Copper",
    color: "#b87333",
    fontColor: "#FFFFFF",
  },
  { value: "Cream", label: "Cream", color: "#fffdd0", fontColor: "#000000" },
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

export const clientSubStyle = {
  alignItems: "center",
  display: "flex",
  color: "#444648",
  fontWeight: 700,
  borderRadius: "4px",
  fontSize: "10px",
  lineHeight: "100%",
  margin: "0 -20px 12px",
  padding: "5px 2px 5px 16px",
};

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

export const subOption = [
  {
    name: "Renew Subscription",
    icon: MdAutorenew,
  },
  {
    name: "Cancel Subscription",
    icon: FcCancel,
  },
];

export const eventOption = [
  {
    name: "Edit Event",
    icon: AiOutlineEdit,
  },
  {
    name: "Delete Event",
    icon: BsTrash,
  },
];

export const accountType = ["VALET", "PARKING", "GENERAL", "SERVICE"];

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
];

export const payToParkHeader = [
  "TICKET NUMBER",
  "VEHICLE",
  "SERVICE TYPE",
  "STATUS",
  "DATE",
];

export const operatorDashCards = [
  {
    title: "Locations",
    img: "/assets/locationn.jpg",
  },
  {
    title: "Zones",
    img: "/assets/zones.jpg",
  },
  {
    title: "Attendants",
    img: "/assets/attendant.jpg",
  },
  {
    title: "Transactions",
    img: "/assets/trans.jpg",
  },
];

export const operatorDahboard = [
  {
    title: "Valeted Vehicles",
    color: "#EE383A",
    img: "/assets/valeted.jpg",
  },
  {
    title: "Parked Vehicles",
    color: "#0B841D",
    img: "/assets/park-confirm.png",
  },
  {
    title: "Serviced Vehicles",
    color: "#242628",
    img: "/assets/service.png",
  },
];

export const clientDahboard = [
  {
    title: "Subscriptions",
    opt: "In Service",
    color: "#EE383A",
    secOpt: "Completed",
    img: "/assets/subs.jpg",
  },
  {
    title: "Users",
    opt: "Inactive",
    color: "#0B841D",
    secOpt: "Active",
    img: "/assets/users.jpg",
  },
  {
    title: "Events",
    color: "#242628",
    opt: "Upcoming",
    secOpt: "Past",
    img: "/assets/events.jpg",
  },
];

export const customerHelp = [
  {
    title: "Frequently Asked Questions",
    img: "/assets/faq.jpg",
    link: "/customer/help-center/FAQs",
  },
  {
    title: "Send us an email",
    img: "/assets/help.jpg",
    link: "/customer/help-center/contact-us",
  },
];

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
};

import { MdAutorenew, MdSend } from "react-icons/md";
import {
  ClientEventIcon,
  ClientLogIcon,
  ClientTranIcon,
  ClientUserIcon,
  DashboardIcon,
  FeedbackIcon,
  HelpIcon,
  HistoryIcon,
  LeaveMgtIcon,
  LoanIcon,
  LocateIcon,
  MedicalIcon,
  StaffProfileIcon,
  StaffScheduleIcon,
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
import { TbListDetails, TbCalendarEvent } from "react-icons/tb";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { FiEdit } from "react-icons/fi";

export const staffSidebar = [
  {
    id: 0,
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <AdminDashboardIcon fill={"#fff"} stroke="#000" />,
    hover: <AdminDashboardIcon fill="#fff" stroke="#EE383A" />,
    sec: <AdminDashboardIcon fill="#EE383A" stroke="#fff" />,
  },
  {
    id: 1,
    name: "Profiles",
    path: "/admin/staff-profiles",
    icon: <StaffProfileIcon fill={"#000"} />,
    hover: <StaffProfileIcon fill="#EE383A" />,
    sec: <StaffProfileIcon fill="#fff" />,
  },
  {
    id: 2,
    name: "Loans",
    path: "/admin/loans",
    icon: <LoanIcon fill={"#000"} />,
    hover: <LoanIcon fill="#EE383A" />,
    sec: <LoanIcon fill="#fff" />,
  },
  {
    id: 3,
    name: "Leave",
    path: "/admin/leave-mgt",
    icon: <LeaveMgtIcon fill={"#000"} />,
    hover: <LeaveMgtIcon fill="#EE383A" />,
    sec: <LeaveMgtIcon fill="#fff" />,
  },
  {
    id: 4,
    name: "Medical",
    path: "/admin/medical-assistance",
    icon: <MedicalIcon fill={"#000"} />,
    hover: <MedicalIcon fill="#EE383A" />,
    sec: <MedicalIcon fill="#fff" />,
  },
  {
    id: 5,
    name: "Schedule",
    path: "/admin/staff-schedule",
    icon: <StaffScheduleIcon fill={"#000"} />,
    hover: <StaffScheduleIcon fill="#EE383A" />,
    sec: <StaffScheduleIcon fill="#fff" />,
  },
];

export const sidebarItems = [
  {
    id: 0,
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <AdminDashboardIcon fill={"#fff"} stroke="#000" />,
    hover: <AdminDashboardIcon fill="#fff" stroke="#EE383A" />,
    sec: <AdminDashboardIcon fill="#EE383A" stroke="#fff" />,
  },

  {
    id: 1,
    name: "Clients",
    path: "/admin/clients",
    icon: <ClientsIcon fill={"#fff"} stroke="#000" />,
    hover: <ClientsIcon fill="#fff" stroke="#EE383A" />,
    sec: <ClientsIcon fill="#EE383A" stroke="#fff" />,
    subItems: [
      {
        name: "Client Lists",
        path: "/admin/clients/all",
      },
      {
        name: "Client Invoices",
        path: "/admin/clients/invoices",
      },
    ],
  },
  {
    id: 2,
    name: "Users",
    icon: <UserIcon fill={"#fff"} stroke="#000" />,
    hover: <UserIcon fill="#fff" stroke="#EE383A" />,
    sec: <UserIcon fill="#EE383A" stroke="#fff" />,
    path: "/admin/users",
    subItems: [
      {
        name: "Customers",
        path: "/admin/users/customers",
      },
      {
        name: "Attendants",
        path: "/admin/users/attendants",
      },
      {
        name: "Administrators",
        path: "/admin/users/administrators",
      },
      {
        name: "Operators",
        path: "/admin/users/operators",
      },
    ],
  },

  {
    id: 3,
    name: "Events",
    icon: <TbCalendarEvent fill={"#fff"} stroke="#000" />,
    hover: <TbCalendarEvent fill="#fff" stroke="#EE383A" />,
    sec: <TbCalendarEvent fill="#EE383A" stroke="#fff" />,
    path: "/admin/events",
  },

  {
    id: 4,
    name: "Locations",
    path: "/admin/locations",
    icon: <LocationIcon fill={"#fff"} stroke="#000" />,
    hover: <LocationIcon fill="#fff" stroke="#EE383A" />,
    sec: <LocationIcon fill="#EE383A" stroke="#fff" />,
    subItems: [
      {
        name: "Locations",
        path: "admin/locations/all",
      },
      {
        name: "Zones",
        path: "admin/locations/zones",
      },
      {
        name: "Rates",
        path: "admin/locations/rates",
      },
      {
        name: "Amenities",
        path: "admin/locations/amenities",
      },
      {
        name: "Policies",
        path: "admin/locations/policies",
      },
    ],
  },

  {
    id: 5,
    name: "Services",
    path: "/admin/services",
    icon: <ServicesIcon fill={"#fff"} stroke="#000" />,
    hover: <ServicesIcon fill="#fff" stroke="#EE383A" />,
    sec: <ServicesIcon fill="#EE383A" stroke="#fff" />,
  },

  {
    id: 6,
    name: "Vehicles",
    path: "/admin/vehicles",
    icon: <AdminVehicleIcon fill={"#fff"} stroke="#000" />,
    hover: <AdminVehicleIcon fill="#fff" stroke="#EE383A" />,
    sec: <AdminVehicleIcon fill="#EE383A" stroke="#fff" />,
  },

  {
    id: 7,
    name: "Memberships",
    path: "/admin/memberships",
    icon: <MembershipsIcon fill={"#fff"} stroke="#000" />,
    hover: <MembershipsIcon fill="#fff" stroke="#EE383A" />,
    sec: <MembershipsIcon fill="#EE383A" stroke="#fff" />,
    subItems: [
      {
        name: "Membership Plans",
        path: "/admin/memberships/plans",
      },
      {
        name: "Membership Features",
        path: "/admin/memberships/features",
      },
      {
        name: "Customer Subscriptions",
        path: "/admin/memberships/customer-subscriptions",
      },
      {
        name: "Corporate Subscriptions",
        path: "/admin/memberships/corporate-subscriptions",
      },
    ],
  },

  {
    id: 8,
    name: "Transactions",
    path: "/admin/transactions",
    icon: <CustomerIcon fill={"#fff"} stroke="#000" />,
    hover: <CustomerIcon fill="#fff" stroke="#EE383A" />,
    sec: <CustomerIcon fill="#EE383A" stroke="#fff" />,
    subItems: [
      {
        name: "Pay-To-Park",
        path: "/admin/transactions/pay-to-park",
      },
      {
        name: "Reserved Parking",
        path: "/admin/transactions/reserved-parking",
      },

      {
        name: "Event Parking",
        path: "/admin/transactions/event-parking",
      },
      {
        name: "Car Services",
        path: "/admin/transactions/car-services",
      },
      {
        name: "Tips",
        path: "/admin/transactions/tips",
      },
      {
        name: "Points",
        path: "/admin/transactions/points",
      },
    ],
  },

  {
    id: 9,
    name: "Logs",
    path: "/admin/logs",
    icon: <LogsIcon fill={"#fff"} stroke="#000" />,
    hover: <LogsIcon fill="#fff" stroke="#EE383A" />,
    sec: <LogsIcon fill="#EE383A" stroke="#fff" />,
    subItems: [
      {
        name: "Valeted Vehicles",
        path: "/admin/logs/valeted-vehicles",
      },
      {
        name: "Parked Vehicles",
        path: "/admin/logs/parked-vehicles",
      },
      {
        name: "Serviced Vehicles",
        path: "/admin/logs/serviced-vehicles",
      },
    ],
  },
  {
    id: 10,
    name: "Reports",
    path: "/admin/reports",
    icon: <ReportsIcon fill={"#fff"} stroke="#000" />,
    hover: <ReportsIcon fill="#fff" stroke="#EE383A" />,
    sec: <ReportsIcon fill="#EE383A" stroke="#fff" />,
    subItems: [
      {
        name: "Payments",
        path: "/admin/reports/payments",
      },
      {
        name: "Locations",
        path: "/admin/reports/locations",
      },
      {
        name: "Zones",
        path: "/admin/reports/zones",
      },
      {
        name: "Vehicles",
        path: "/admin/reports/vehicles",
      },
      {
        name: "Customers",
        path: "/admin/reports/customers",
      },
      {
        name: "Invoices",
        path: "/admin/reports/invoices",
      },
      {
        name: "Subscriptions",
        path: "/admin/reports/subscriptions",
      },
      {
        name: "Logs",
        path: "/admin/reports/logs",
      },
      {
        name: "Payment History",
        path: "/admin/reports/payment-history",
      },
      {
        name: "Tips",
        path: "/admin/reports/tips",
      },
    ],
  },
  {
    id: 11,
    name: "Support",
    path: "/admin/support",
    icon: <FeedbackIcon fill={"#fff"} stroke="#000" />,
    hover: <FeedbackIcon fill="#EE383A" stroke="#EE383A" />,
    sec: <FeedbackIcon fill="#EE383A" stroke="#fff" />,
    subItems: [
      {
        name: "Feedbacks",
        path: "/admin/support/feedback",
      },
      {
        name: "Ratings",
        path: "/admin/support/ratings",
      },
    ],
  },
  {
    id: 12,
    name: "Configurations",
    path: "/admin/configurations",
    icon: <ConfigIcon fill={"#fff"} stroke="#000" />,
    hover: <ConfigIcon fill="#fff" stroke="#EE383A" />,
    sec: <ConfigIcon fill="#EE383A" stroke="#fff" />,
    subItems: [
      {
        name: "Roles",
        path: "/admin/configurations/roles",
      },
      {
        name: "Permissions",
        path: "/admin/configurations/permissions",
      },
      {
        name: "Vehicle Makes",
        path: "/admin/configurations/vehicle-makes",
      },
      {
        name: "Vehicle Models",
        path: "/admin/configurations/vehicle-models",
      },
      {
        name: "FAQs",
        path: "/admin/configurations/faqs",
      },
      {
        name: "Bank Details",
        path: "/admin/configurations/bank-details",
      },
      {
        name: "Create QR Code",
        path: "/admin/configurations/qr-code/create",
      },
    ],
  },
];

export const adminHeaderOptions = [
  {
    name: "Profile",
    link: "/admin/profile",
  },

  {
    name: "Logout",
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
    name: "History",
    path: "/customer/history",
    icon: <HistoryIcon fill="#242628" />,
    sec: <HistoryIcon fill="#EE383A" />,
    subItems: [
      {
        name: "Created by You",
        path: "/customer/history/user",
      },
      {
        name: "Created by Us",
        path: "/customer/history/company",
      },
    ],
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
  "STATUS",
  "DATE CREATED",
  "ACTIONS",
];

export const operatorPoliciesHeader = [
  "TITLE",
  "LOCATION",
  "STATUS",
  "DATE CREATED",
  "ACTIONS",
];

export const operatorLogHeader = [
  "TICKET NUMBER",
  "AMOUNT",
  "LOCATION",
  "ZONE",
  "ATTENDANT",
  "DATE CREATED",
  "STATUS",
  "ACTIONS",
];

export const operatorPtpHeader = [
  "TICKET NUMBER",
  "LOCATION",
  "ZONE",
  "PAYMENT METHOD",
  "DATE CREATED",
  "STATUS",
  "ACTIONS",
];

export const operatorRpHeader = [
  "BOOKING ID",
  "LOCATION",
  "ZONE",
  "PAYMENT METHOD",
  "DATE CREATED",
  "STATUS",
  "ACTIONS",
];

export const adminTipsHeader = [
  "TICKET NUMBER",
  "CUSTOMER",
  "ATTENDANT",
  "AMOUNT",
  "LOCATION",
  "LICENSE PLATE",
  "DATE",
];

export const adminRepLocationHeader = [
  "NAME",
  "STATE",
  "ZONES",
  "LOCATION TYPE",
  "STATUS",
  "DATE CREATED",
];

export const operatorRepLocationHeader = [
  "NAME",
  "STATE",
  "ZONES",
  "LOCATION TYPE",
  "DATE CREATED",
];

export const adminRepZoneHeader = [
  "NAME",
  "LOCATION",
  "CAPACITY",
  "RESERVABLE",
  "RESERVABLE SPACE",
  "SERVICE",
  "STATUS",
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

export const adminRepVehicleHeader = [
  "CUSTOMER",
  "LICENSE PLATE",
  "MAKE",
  "MODEL",
  "COLOR",
  "STATE",
  "DATE CREATED",
];

export const adminRepInvoiceeHeader = [
  "CLIENT",
  "CREATED BY",
  "CONFIRMED BY",
  "TAX (%)",
  "AMOUNT PAYABLE",
  "AMOUNT PAID",
  "DATE PAID",
  "STATUS",
  "DATE CREATED",
];

export const adminRepTranHeader = [
  "TRANSACTION ID",
  "AMOUNT",
  "PAYMENT METHOD",
  "TRANSACTION TYPE",
  "CUSTOMER EMAIL",
  "DATE",
  "STATUS",
];

export const adminRepCustomerHeader = [
  "FIRST NAME",
  "LAST NAME",
  "EMAIL",
  "PHONE",
  "DATE CREATED",
];

export const adminRepSubHeader = [
  "CUSTOMER",
  "PLAN",
  "START DATE",
  "NEXT RENEWAL",
  "AUTORENEW",
  "CANCELLED",
  "STATUS",
  "DATE CREATED",
];

export const operatorPayGrid = [
  "Total Amount Due",
  "Total Amount Received",
  "Total Payments",
];

export const ratingGrid = [
  "Pay-To-Park Rating",
  "Event Parking Rating",
  "Reserved Parking Rating",
  "Service Bookings Rating",
];

export const adminInvoiceGrid = [
  "Total Invoices",
  "Total Amount Payable",
  "Total Amount Paid",
];

export const adminRepPaymentHeader = [
  "LOCATION",
  "ZONE",
  "ATTENDANT",
  "AMOUNT",
  "AMOUNT PAID",
  "CUSTOMER",
  "VEHICLE",
  "SERVICE",
  "PAYMENT METHOD",
  "DATE CREATED",
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

export const adminRepLogHeader = [
  "TICKET NO",
  "CUSTOMER",
  "VEHICLE",
  "SERVICE",
  "BILLING TYPE",
  "AMOUNT",
  "AMOUNT PAID",
  "LOCATION",
  "STATUS",
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
  "STATUS",
  "DATE CREATED",
  "ACTIONS",
];

export const operatorRatesHeader = [
  "NAME",
  "DURATION TYPE",
  "DURATION START",
  "DURATION LIMIT",
  "AMOUNT",
  "STATUS",
  "DATE CREATED",
  "ACTIONS",
];

export const operatorZonesHeader = [
  "NAME",
  "LOCATION",
  "CAPACITY",
  "MIN DURATION",
  "DURATION TYPE",
  "STATUS",
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

export const types = [
  { label: "Paid", value: true },
  { label: "Unpaid", value: false },
];

export const cities = ["Ikoyi", "VI", "Ikeja", "Lekki", "Wuse", "Maitama"];

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

export const clientSubHeader = [
  "Plan",
  "Amount",
  "Duration",
  "Next Payment Date",
  "Status",
  "Date Created",
];

export const operatorDashboardFilter = ["All Time", "Year", "Month", "Week"];

export const submits = [
  { name: "Submitted", value: true },
  { name: "Unsubmitted", value: false },
];

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
    subItems: [
      {
        id: 1,
        name: "Valeted Vehicles",
        path: "/client/logs/valeted-vehicles",
      },
      {
        id: 2,
        name: "Parked Vehicles",
        path: "/client/logs/parked-vehicles",
      },
      {
        id: 2,
        name: "Serviced Vehicles",
        path: "/client/logs/serviced-vehicles",
      },
    ],
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
    name: "Transactions",
    path: "/operator/transactions",
    icon: <CustomerIcon fill="#444648" />,
    sec: <CustomerIcon fill="#fff" />,
    hover: <CustomerIcon fill="#ee383a" />,
    sub: [
      {
        id: 1,
        name: "Pay To Park",
        path: "/operator/transactions/pay-to-park",
      },
      {
        id: 2,
        name: "Reserve Parking",
        path: "/operator/transactions/reservations",
      },
      {
        id: 3,
        name: "Event Parking",
        path: "/operator/transactions/event-parking",
      },
      {
        id: 4,
        name: "Car Services",
        path: "/operator/transactions/car-services",
      },
    ],
  },
  {
    id: 5,
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

export const optTranHeader = [
  "TICKET NUMBER",
  "AMOUNT",
  "ZONE",
  "VEHICLE",
  "SERVICE",
  "STATUS",
  "DATE",
  "ACTIONS",
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
  "AMOUNT",
  "LOCATION",
  "ZONE",
  "ATTENDANT",
  "STATUS",
  "DATE",
  "ACTIONS",
];

export const clientTranBody = [
  {
    ticket: "003832",
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
  fontSize: "13px",
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
  fontSize: "13px",
  lineHeight: "100%",
  margin: "0 -20px 12px",
  padding: "5px 2px 5px 16px",
};

export const dashServices = [
  {
    img: "/assets/park.png",
    title: "Park Now",
    link: "/customer/services/pay-to-park",
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

export const DurationTypes = ["MINUTE", "HOUR", "DAY", "MONTH", "YEAR"];

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
  "SERVICE_TIP",
  "GUEST_PAY_TO_PARK",
  "FUND_POINTS",
];

export const FeatureType = [
  "Vehicle Limit",
  "Parking Limit",
  "Valet Limit",
  "Location Limit",
  "Car Service Limit",
  "Applicable Locations",
  "User Limit",
];

export const PaymentMethods = [
  "CASH",
  "TRANSFER",
  "WALLET",
  "POS",
  "UNPAID",
  "SUBSCRIPTION",
  "CARD",
  "POINTS",
];

export const FundMethods = [
  {
    id: 0,
    name: "CASH",
  },
  {
    id: 1,
    name: "TRANSFER",
  },
  {
    id: 3,
    name: "POS",
  },
];

export const OnlinePaymentMethods = ["CARD", "WALLET", "TRANSFER", "POINTS"];

export const cardImg = [
  { img: "/assets/mastercard.svg", name: "mastercard" },
  { img: "/assets/visa.svg", name: "visa" },
  { img: "/assets/verve.svg", name: "verve" },
];

export const NewStatus = [
  { color: "#E81313", name: "Denied", bg: "#F9D0CD" },
  { color: "#008000", name: "Active", bg: "#E5FFE5" },
  { color: "#F9A11E", name: "Pending", bg: "#FDF6E7" },
];

export const SecStatus = [
  { color: "#E81313", name: "Inactive", bg: "#F9D0CD" },
  { color: "#008000", name: "Active", bg: "#E5FFE5" },
  { color: "#F9A11E", name: "Pending", bg: "#FDF6E7" },
];

export const LeaveStatus = [
  { color: "#DB0101", name: "Rejected", bg: "#F09898", border: "#DB0101" },
  { color: "#0B841D", name: "Approved", bg: "#E5FFE5", border: "#BAE0D9" },
  { color: "#0B841D", name: "Completed", bg: "#E5FFE5", border: "#BAE0D9" },
  { color: "#0B841D", name: "Active", bg: "#E5FFE5", border: "#BAE0D9" },
  { color: "#F9A11E", name: "Pending", bg: "#FCF2C4", border: "#F6DC52" },
];

export const ratings = [
  { img: "/assets/1.jpg", label: "Poor!" },
  { img: "/assets/2.jpg", label: "Fair!" },
  { img: "/assets/3.jpg", label: "Okay!" },
  { img: "/assets/4.jpg", label: "Good!" },
  { img: "/assets/5.jpg", label: "Excellent!" },
];

export const ReservedStatus = ["Pending", "Completed", "Cancelled"];
export const LogsStatus = ["In Service", "Completed", "Cancelled"];
export const ServicesStatus = ["In Progress", "Completed", "Cancelled"];

export const Status = [
  { color: "#F9A11E", name: "Pending", bg: "#FDF6E7" },
  { color: "#008000", name: "Completed", bg: "#E5FFE5" },
  { color: "#E81313", name: "Cancelled", bg: "#F9D0CD" },
];

export const LogStatus = [
  { color: "#F9A11E", name: "In Service", bg: "#FDF6E7" },
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

export const rateOption = [
  {
    name: "View Rate",
    icon: TbListDetails,
  },
  {
    name: "Edit Rate",
    icon: AiOutlineEdit,
  },
];

export const zoneOption = [
  {
    name: "View Zone",
    icon: TbListDetails,
  },
  {
    name: "Edit Zone",
    icon: AiOutlineEdit,
  },
];

export const clientListOption = [
  {
    name: "View",
    icon: HiOutlineInformationCircle,
  },
  {
    name: "Edit",
    icon: FiEdit,
  },
  {
    name: "Delete",
    icon: BsTrash,
  },
];

export const clientInvoiceListOption = [
  {
    name: "Send",
    id: 0,
    icon: MdSend,
  },
  {
    name: "View",
    id: 1,
    icon: HiOutlineInformationCircle,
  },
  {
    name: "Edit",
    id: 2,
    icon: FiEdit,
  },
  {
    name: "Delete",
    id: 3,
    icon: BsTrash,
  },
];

export const staffDetailsTab = [
  "General Information",
  "Employee Documents",
  "Schedule",
  "Loan History",
  "Leave History",
  "Medical Assistance",
];

export const viewDeleteOption = [
  {
    name: "View",
    icon: HiOutlineInformationCircle,
  },
  {
    name: "Delete",
    icon: BsTrash,
  },
];

export const viewClaimOption = [
  {
    name: "View",
    icon: HiOutlineInformationCircle,
  },
  {
    name: "Delete",
    icon: BsTrash,
  },
  {
    name: "Claim",
    icon: FiEdit,
  },
];

export const accountType = ["VALET", "PARKING", "GENERAL", "SERVICE"];
export const statusType = ["Inactive", "Active"];
export const newStatusType = ["Inactive", "Active", "Pending"];
export const invoiceStatusType = ["Unpaid", "Paid", "Pending"];
export const leaveStatusType = [
  { name: "Declined", value: "REJECTED" },
  { name: "Approved", value: "APPROVED" },
  { name: "Completed", value: "COMPLETED" },
  { name: "Active", value: "ACTIVE" },
  { name: "Pending", value: "PENDING" },
];

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

export const sideAccountDrop = [
  {
    name: "Profile",
    link: "/customer/account/profile",
    icon: <UserIcon fill={"#fff"} stroke="#000" />,
    hover: <UserIcon fill="#EE383A" stroke="#EE383A" />,
    sec: <UserIcon fill="#EE383A" stroke="#EE383A" />,
  },
  {
    name: "Payments",
    link: "/customer/account/payment",
    icon: <CustomerIcon fill={"#fff"} stroke="#000" />,
    hover: <CustomerIcon fill="#EE383A" stroke="#EE383A" />,
    sec: <CustomerIcon fill="#EE383A" stroke="#EE383A" />,
  },
  {
    name: "Settings",
    link: "/customer/account/settings",
    icon: <ConfigIcon fill={"#fff"} stroke="#000" />,
    hover: <ConfigIcon fill="#EE383A" stroke="#EE383A" />,
    sec: <ConfigIcon fill="#EE383A" stroke="#EE383A" />,
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
  "AMOUNT",
  "LOCATION",
  "VEHICLE",
  "SERVICE TYPE",
  "STATUS",
  "DATE",
  "",
];

export const companyPayToParkHeader = [
  "TICKET NUMBER",
  "LOCATION",
  "ATTENDANT",
  "VEHICLE",
  "SERVICE TYPE",
  "STATUS",
  "DATE",
  "ACTIONS",
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
    opt: "Inactive",
    color: "#EE383A",
    secOpt: "Active",
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

export const eventClientDahboard = [
  {
    title: "Transactions",
    opt: "Inactive",
    color: "#EE383A",
    secOpt: "Active",
    img: "/assets/subs.jpg",
  },
  // {
  //   title: "Users",
  //   opt: "Inactive",
  //   color: "#0B841D",
  //   secOpt: "Active",
  //   img: "/assets/users.jpg",
  // },
  {
    title: "Events",
    color: "#242628",
    opt: "Upcoming",
    secOpt: "Past",
    img: "/assets/events.jpg",
  },
];

export const busClientDashboard = [
  {
    title: "Valet Logs",
    color: "#EE383A",
    opt: "Upcoming",
    secOpt: "Past",
    img: "/assets/events.jpg",
  },
  {
    title: "Parking Logs",
    color: "#0B841D",
    opt: "Upcoming",
    secOpt: "Past",
    img: "/assets/events.jpg",
  },
  {
    title: "Serviced Logs",
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
  "LOCATION",
  "VEHICLE",
  "ARRIVAL",
  "DEPARTURE",
  "DATE CREATED",
  "STATUS",
  "ACTIONS",
];

export const companyReserveHeader = [
  "TICKET NUMBER",
  "ATTENDANT",
  "AMOUNT",
  "VEHICLE",
  "ARRIVAL",
  "DEPARTURE",
  "STATUS",
  "ACTIONS",
];

export const eventHeader = [
  "TICKET NUMBER",
  "LOCATION",
  "AMOUNT",
  "VEHICLE",
  "SERVICE TYPE",
  "EVENT",
  "STATUS",
  "RESERVED DATE",
  "",
];

export const companyEventHeader = [
  "TICKET NUMBER",
  "ATTENDANT",
  "AMOUNT",
  "VEHICLE",
  "SERVICE TYPE",
  "STATUS",
  "DATE",
  "ACTIONS",
];

export const carHeader = [
  "SERVICE TYPE",
  "LOCATION",
  "AMOUNT",
  "APPOINTMENT SLOT",
  "APPOINTMENT DATE",
  "DATE CREATED",
  "STATUS",
  "ACTIONS",
];

export const companyCarHeader = [
  "TICKET NUMBER",
  "LOCATION",
  "AMOUNT",
  "ATTENDANT",
  "VEHICLE",
  "SERVICE TYPE",
  "STATUS",
  "DATE",
  "ACTIONS",
];

export const searchOption = [
  { label: "Contains", value: "cont" },
  { label: "Equals to", value: "eq" },
];

export const subFieldOption = [
  { label: "Plan", value: "membershipPlan.name" },
  { label: "Amount", value: "membershipPlan.amount" },
  { label: "Duration", value: "membershipPlan.interval" },
  { label: "Next Payment", value: "nextPaymentDate" },
  { label: "Status", value: "status" },
  { label: "Created At", value: "createdAt" },
];

export const clientUserFieldOption = [
  { label: "First Name", value: "profile.name" },
  { label: "Last Name", value: "profile.lastName" },
  { label: "Email", value: "email" },
  { label: "Company", value: "profile.companyName" },
  { label: "Status", value: "status" },
  { label: "Created At", value: "createdAt" },
];

export const opUserFieldOption = [
  { label: "Full Name", value: "name" },
  { label: "User ID", value: "userId" },
  { label: "Account Type", value: "accountType" },
  { label: "Status", value: "status" },
  { label: "Created At", value: "createdAt" },
];

export const opLocFieldOption = [
  { label: "Name", value: "name" },
  { label: "Operator", value: "operator.name" },
  { label: "State", value: "state" },
  { label: "Status", value: "status" },
  { label: "Created At", value: "createdAt" },
];

export const opLogServiceFieldOption = [
  { label: "Ticket", value: "ticketNumber" },
  { label: "Location", value: "location.name" },
  { label: "Zone", value: "zone.name" },
  { label: "Attendant", value: "attendant.name" },
  { label: "Created At", value: "createdAt" },
];

export const opRepPayFieldOption = [
  { label: "Location", value: "serviceLog.location.name" },
  { label: "Zone", value: "serviceLog.zone.name" },
  { label: "Attendant", value: "attendant.name" },
  { label: "Amount", value: "amount" },
  { label: "Amount Paid", value: "amountPaid" },
  { label: "Service", value: "serviceLog.service.name" },
  { label: "Created At", value: "createdAt" },
];

export const opRepLocFieldOption = [
  { label: "Name", value: "name" },
  { label: "State", value: "state" },
  { label: "Zones", value: "zones" },
  { label: "Location Type", value: "locationType" },
  { label: "Created At", value: "createdAt" },
];

export const opRepZoneFieldOption = [
  { label: "Name", value: "name" },
  { label: "Location", value: "location" },
  { label: "Capacity", value: "capacity" },
  { label: "Reservable", value: "reservable" },
  { label: "Reservable Space", value: "reservableSpace" },
  { label: "Service", value: "service.name" },
  { label: "Created At", value: "createdAt" },
];

export const opRepLogFieldOption = [
  { label: "Ticket", value: "ticketNumber" },
  { label: "Service", value: "service.name" },
  { label: "Location", value: "location.name" },
  { label: "Zone", value: "zone.name" },
  { label: "Created At", value: "createdAt" },
];

export const opZoneFieldOption = [
  { label: "Name", value: "name" },
  { label: "Location", value: "location.name" },
  { label: "Capacity", value: "capacity" },
  { label: "Minimum Duration", value: "minimumDuration" },
  { label: "Duration Type", value: "durationType" },
  { label: "Status", value: "status" },
  { label: "Created At", value: "createdAt" },
];

export const opRateFieldOption = [
  { label: "Name", value: "name" },
  { label: "Duration Type", value: "durationType" },
  { label: "Duration Start", value: "durationStart" },
  { label: "Duration Limit", value: "durationLimit" },
  { label: "Amount", value: "amount" },
  { label: "Status", value: "status" },
  { label: "Created At", value: "createdAt" },
];

export const opPolicyFieldOption = [
  { label: "Title", value: "title" },
  { label: "Location", value: "location.name" },
  { label: "Status", value: "status" },
  { label: "Created At", value: "createdAt" },
];

export const clientEventFieldOption = [
  { label: "Name", value: "name" },
  { label: "Website", value: "website" },
  { label: "Start Date", value: "eventStartDateTime" },
  { label: "End Date", value: "eventEndDateTime" },
  { label: "Status", value: "status" },
  { label: "Created At", value: "createdAt" },
];

export const custPayFieldOption = [
  { label: "Transaction ID", value: "transactionId" },
  { label: "Amount", value: "amount" },
  { label: "Payment Type", value: "paymentMethod" },
  { label: "Transaction Type", value: "transactionType" },
  { label: "Created At", value: "createdAt" },
];

export const custTipFieldOption = [
  { label: "Transaction ID", value: "serviceLog.id" },
  { label: "Amount", value: "amount" },
  { label: "Created At", value: "createdAt" },
];

export const subHeader = [
  "Plan",
  "Amount",
  "Duration",
  "Next Payment Date",
  "Status",
  "Date Created",
  "Actions",
];

export const paymentHeader = [
  "TRANSACTION ID",
  "AMOUNT",
  "PAYMENT METHOD",
  "TRANSACTION TYPE",
  "STATUS",
  "DATE",
];

export const tipsHeader = [
  "TRANSACTION ID",
  "TIP AMOUNT",
  "PAYMENT METHOD",
  "STATUS",
  "DATE",
];

export const IntervalType = [
  "Hourly",
  "Daily",
  "Weekly",
  "Monthly",
  "Quarterly",
  "Biannually",
  "Annually",
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
  "Valet Parking",
  "Pay-To-Park",
  "Reserve Parking",
  "Event Parking",
  "Car Services",
];

export const usServiceTabs = ["Valet Parking", "Pay-To-Park", "Car Services"];

export const customStyles = {
  control: (provided, state) => ({
    ...provided,
    width: "100%",
    minHeight: "44px",
    color: "#646668",
    fontSize: "16px",
    cursor: "pointer",
    borderRadius: "4px",
    border: state.hasValue ? "none" : "1px solid #D4D6D8",
    paddingRight: "16px",
    background: state.hasValue ? "#f4f6f8" : "unset",
  }),
  menu: (provided) => ({
    ...provided,
    fontSize: "15px",
    backgroundColor: "#fff",
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isFocused ? "" : "",
    backgroundColor: state.isFocused ? "#f4f6f8" : "",
  }),
};

export const errorCustomStyles = {
  control: (provided) => ({
    ...provided,
    width: "100%",
    minHeight: "44px",
    color: "red",
    fontSize: "16px",
    cursor: "pointer",
    borderRadius: "4px",
    border: "1px solid red",
    paddingRight: "16px",
    background: "#FDE8E8",
  }),
  menu: (provided) => ({
    ...provided,
    fontSize: "15px",
    backgroundColor: "#fff",
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isFocused ? "" : "",
    backgroundColor: state.isFocused ? "#f4f6f8" : "",
  }),
};

export const clientListOptions = [
  { label: "Name", value: "name" },
  { label: "Contact Person", value: "contactPerson" },
  { label: "Phone", value: "phone" },
  { label: "State", value: "state" },
  { label: "Account Type", value: "accountType" },
  { label: "Status", value: "status" },
  { label: "Created At", value: "createdAt" },
];

export const opPtpOptions = [
  { label: "Ticket Number", value: "ticketNumber" },
  { label: "Location", value: "zone.location.name" },
  { label: "Zone", value: "zone.name" },
  { label: "Payment Type", value: "transaction.paymentMethod" },
  { label: "Status", value: "status" },
  { label: "Created At", value: "createdAt" },
];

export const opCarServiceOptions = [
  { label: "Booking ID", value: "bookingId" },
  { label: "Location", value: "zone.location.name" },
  { label: "Zone", value: "zone.name" },
  { label: "Payment Type", value: "paymentMethod" },
  { label: "Status", value: "status" },
  { label: "Created At", value: "createdAt" },
];

export const opRpOptions = [
  { label: "Reservation ID", value: "reservationId" },
  { label: "Location", value: "zone.location.name" },
  { label: "Zone", value: "zone.name" },
  { label: "Payment Type", value: "paymentMethod" },
  { label: "Status", value: "status" },
  { label: "Created At", value: "createdAt" },
];

export const clientInvoiceOptions = [
  { label: "Client", value: "client.name" },
  { label: "Amount Payable", value: "amount" },
  { label: "Created By", value: "createdBy" },
  { label: "Paid At", value: "paidAt" },
  { label: "Payment Status", value: "paymentStatus" },
  { label: "Created At", value: "createdAt" },
];

export const customersOptions = [
  { label: "First Name", value: "profile.firstName" },
  { label: "Last Name", value: "profile.lastName" },
  { label: "Phone", value: "profile.phone" },
  { label: "Company Name", value: "profile.companyName" },
  { label: "Email", value: "email" },
  { label: "Status", value: "status" },
  { label: "Created At", value: "createdAt" },
];

export const attendantsOptions = [
  { label: "Name", value: "name" },
  { label: "User ID", value: "userId" },
  { label: "Account Type", value: "accountType" },
  { label: "Status", value: "status" },
  { label: "Created At", value: "createdAt" },
];

export const administratorsOptions = [
  { label: "First Name", value: "firstName" },
  { label: "Last Name", value: "lastName" },
  { label: "Email", value: "email" },
  { label: "Role", value: "role.displayName" },
  { label: "Status", value: "status" },
  { label: "Created At", value: "createdAt" },
];

export const operatorOptions = [
  { label: "Name", value: "name" },
  { label: "Email", value: "email" },
  { label: "Contact Person", value: "contactPerson" },
  { label: "Phone", value: "phone" },
  { label: "State", value: "state" },
  { label: "Status", value: "status" },
  { label: "Created At", value: "createdAt" },
];

export const eventsOptions = [
  { label: "Name", value: "name" },
  { label: "Client", value: "client.name" },
  { label: "Website", value: "website" },
  { label: "Start Date", value: "eventStartDateTime" },
  { label: "End Date", value: "eventEndDateTime" },
  { label: "Status", value: "status" },
  { label: "Created At", value: "createdAt" },
];

export const locationsOptions = [
  { label: "Name", value: "name" },
  { label: "Operator", value: "operator.name" },
  { label: "State", value: "state" },
  { label: "Status", value: "status" },
  { label: "Created At", value: "createdAt" },
];

export const staffOptions = [
  { label: "Staff ID", value: "staffId" },
  { label: "Full Name", value: "fullName" },
  { label: "Created At", value: "createdAt" },
];

export const leaveOptions = [
  { label: "Staff ID", value: "staff.id" },
  { label: "Staff Name", value: "staff.fullName" },
  { label: "Start Date", value: "startDate" },
  { label: "End Date", value: "endDate" },
  { label: "Leave Status", value: "status" },
  { label: "Created At", value: "createdAt" },
];

export const valetedVehiclesOptions = [
  { label: "Ticket Number", value: "ticketNumber" },
  { label: "License Plate", value: "vehicle.licensePlate" },
  { label: "Customer Name", value: "vehicle.customerName" },
  { label: "Location", value: "location.name" },
  { label: "Zone", value: "zone.name" },
  { label: "Attendant", value: "attendant.name" },
  { label: "Amount", value: "amount" },
  { label: "Status", value: "status" },
  { label: "Created At", value: "createdAt" },
];

export const clientLogsOptions = [
  { label: "Ticket Number", value: "ticketNumber" },
  { label: "Amount", value: "amount" },
  { label: "Location", value: "location.name" },
  { label: "Zone", value: "zone.name" },
  { label: "Attendant", value: "attendant.name" },
  { label: "Status", value: "status" },
  { label: "Created At", value: "createdAt" },
];

export const opValetedVehiclesOptions = [
  { label: "Ticket Number", value: "ticketNumber" },
  { label: "Location", value: "location.name" },
  { label: "Zone", value: "zone.name" },
  { label: "Attendant", value: "attendant.name" },
  { label: "Amount", value: "amount" },
  { label: "Status", value: "status" },
  { label: "Created At", value: "createdAt" },
];

export const zonesOptions = [
  { label: "Name", value: "name" },
  { label: "Code", value: "code" },
  { label: "Location", value: "location.name" },
  { label: "Description", value: "description" },
  { label: "Capacity", value: "capacity" },
  { label: "Status", value: "status" },
  { label: "Created At", value: "createdAt" },
];

export const ratesOptions = [
  { label: "Name", value: "name" },
  { label: "Duration Type", value: "durationType" },
  { label: "Duration Start", value: "durationStart" },
  { label: "Duration Limit", value: "durationLimit" },
  { label: "Amount", value: "amount" },
  { label: "Status", value: "status" },
  { label: "Created At", value: "createdAt" },
];

export const amenitiesOptions = [
  { label: "Name", value: "name" },
  { label: "Description", value: "description" },
  { label: "Created At", value: "createdAt" },
];

export const policiesOptions = [
  { label: "Title", value: "title" },
  { label: "Location", value: "location.name" },
  { label: "Created At", value: "createdAt" },
];

export const servicesOptions = [
  { label: "Name", value: "name" },
  { label: "Description", value: "description" },
  { label: "Service Type", value: "serviceType" },
  { label: "Created At", value: "createdAt" },
];

export const vehiclesOptions = [
  { label: "Customer Name", value: "customerName" },
  { label: "License Plate", value: "licensePlate" },
  { label: "Color", value: "color" },
  { label: "Make", value: "make.name" },
  { label: "Model", value: "model.name" },
  { label: "Created By", value: "createdBy" },
  { label: "Created At", value: "createdAt" },
];

export const rating = [
  "Good",
  "Bad",
  "Fast",
  "Slow",
  "Convenient",
  "Satisfactory",
  "Impressive",
  "Easy to Navigate",
  "Great Service",
  "Difficult to Navigate",
  "Terrible Service",
  "Encountered Some Difficulty",
];

export const feedbackOptions = [
  { label: "Name", value: "senderName" },
  { label: "Email", value: "senderEmail" },
];

export const supportType = [
  { name: "FEEDBACK", value: "FEEDBACK" },
  { name: "ISSUES", value: "COMPLAINT" },
  { name: "ENQUIRIES", value: "ENQUIRY" },
];

export const ratingType = [
  { name: "Pay-To-Park", value: "pay-to-park" },
  { name: "Event Parking", value: "event-parking" },
  { name: "Reserved Parking", value: "reservations" },
  { name: "Car Services", value: "service-bookings" },
];

export const membershipPlansOptions = [
  { label: "Name", value: "name" },
  { label: "Amount (₦)", value: "amount" },
  { label: "Interval", value: "interval" },
  { label: "Corporate", value: "isCorporate" },
  { label: "Upgradeable", value: "isUpgradable" },
  { label: "Status", value: "status" },
  { label: "Created At", value: "createdAt" },
];

export const membershipFeaturesOptions = [
  { label: "Name", value: "name" },
  { label: "Plan", value: "membershipPlan.name" },
  { label: "Feature Type", value: "featureType" },
  { label: "Created At", value: "createdAt" },
];

export const customerSubOptions = [
  { label: "Customer First Name", value: "customer.profile.firstName" },
  { label: "Customer Last Name", value: "customer.profile.lastName" },
  { label: "Plan", value: "membershipPlan.name" },
  { label: "Start Date", value: "startDate" },
  { label: "Next Payment", value: "nextPaymentDate" },
  { label: "Amount (₦)", value: "membershipPlan.amount" },
  { label: "Duration", value: "membershipPlan.interval" },
  { label: "Status", value: "status" },
  { label: "Created At", value: "createdAt" },
];

export const corporateSubOptions = [
  { label: "Client", value: "client.name" },
  { label: "Plan", value: "membershipPlan.name" },
  { label: "Amount (₦)", value: "membershipPlan.amount" },
  { label: "Duration", value: "membershipPlan.interval" },
  { label: "Status", value: "status" },
  { label: "Created At", value: "createdAt" },
];

export const payToParkOptions = [
  { label: "Ticket Number", value: "ticketNumber" },
  { label: "Amount (₦)", value: "amount" },
  { label: "Zone", value: "zone.code" },
  { label: "Vehicle", value: "vehicle.licensePlate" },
  { label: "Customer First Name", value: "customer.profile.firstName" },
  { label: "Customer Last Name", value: "customer.profile.lastName" },
  { label: "Status", value: "status" },
  { label: "Created At", value: "createdAt" },
];

export const clientEventParkingOptions = [
  { label: "Ticket Number", value: "ticketNumber" },
  { label: "Event Name", value: "event.name" },
  { label: "Location", value: "zone.location.name" },
  { label: "Amount (₦)", value: "amount" },
  { label: "Status", value: "status" },
  { label: "Created At", value: "createdAt" },
];

export const eventParkingOptions = [
  { label: "Ticket Number", value: "ticketNumber" },
  { label: "Event Name", value: "event.name" },
  { label: "License Plate", value: "vehicle.licensePlate" },
  { label: "Location", value: "zone.location.name" },
  { label: "Amount (₦)", value: "amount" },
  { label: "Status", value: "status" },
  { label: "Created At", value: "createdAt" },
];

export const carServiceOptions = [
  { label: "Booking ID", value: "bookingId" },
  { label: "Booking Type", value: "bookingType" },
  { label: "Service-Type", value: "serviceType" },
  { label: "Amount (₦)", value: "amount" },
  { label: "Customer First Name", value: "customer.profile.firstName" },
  { label: "Customer Last Name", value: "customer.profile.lastName" },
  { label: "Status", value: "status" },
  { label: "Created At", value: "createdAt" },
];

export const tipsOptions = [
  { label: "Ticket Number", value: "serviceLog.ticketNumber" },
  { label: "Amount (₦)", value: "amount" },
  {
    label: "Customer First Name",
    value: "serviceLog.customer.profile.firstName",
  },
  {
    label: "Customer Last Name",
    value: "serviceLog.customer.profile.lastName",
  },
  { label: "Attendant", value: "serviceLog.attendant.name" },
  { label: "Payment_Method", value: "paymentMethod" },
  { label: "Status", value: "status" },
  { label: "Created At", value: "createdAt" },
];
export const pointsOptions = [
  { label: "Ticket ID", value: "id" },
  { label: "Amount", value: "amount" },
  {
    label: "Customer",
    value: "customer.email",
  },
  { label: "Status", value: "status" },
  { label: "Created At", value: "createdAt" },
];

export const reservedParkingOptions = [
  { label: "Reservation ID", value: "reservationId" },
  { label: "Amount (₦)", value: "amount" },
  { label: "Zone", value: "zone.code" },
  { label: "Vehicle", value: "vehicle.licensePlate" },
  { label: "Arrival", value: "arrival" },
  { label: "Customer First Name", value: "customer.profile.firstName" },
  { label: "Customer Last Name", value: "customer.profile.lastName" },
  { label: "Status", value: "status" },
  { label: "Created At", value: "createdAt" },
];

export const rolesOptions = [
  { label: "Name", value: "name" },
  { label: "Display Name", value: "displayName" },
  { label: "Created At", value: "createdAt" },
];

export const makesOptions = [
  { label: "Name", value: "name" },
  { label: "Created At", value: "createdAt" },
];

export const modelsOptions = [
  { label: "Name", value: "name" },
  { label: "Make", value: "make.name" },
  { label: "Created At", value: "createdAt" },
];

export const faqsOptions = [
  { label: "Title", value: "title" },
  { label: "Status", value: "status" },
  { label: "Created At", value: "createdAt" },
];

export const serviceType = ["BASIC", "PREMIUM"];

export const bankDetailsOptions = [
  { label: "Bank Name", value: "bankName" },
  { label: "Account Name", value: "accountName" },
  { label: "Account Number", value: "accountNumber" },
  { label: "Sort Code", value: "sortCode" },
  { label: "Service", value: "service.name" },
  { label: "Created At", value: "createdAt" },
];

export const paymentsOptions = [
  { label: "Location", value: "serviceLog.location.name" },
  { label: "Zone", value: "serviceLog.zone.name" },
  { label: "Attendant", value: "attendant.name" },
  { label: "Amount", value: "amount" },
  { label: "Amount Paid", value: "amountPaid" },
  { label: "Customer", value: "serviceLog.vehicle.customerName" },
  { label: "Vehicle", value: "serviceLog.vehicle.licensePlate" },
  { label: "Service", value: "serviceLog.service.name" },
  { label: "Payment Type", value: "paymentMethod" },
  { label: "Created At", value: "createdAt" },
];

export const adminLocationsReportOptions = [
  { label: "Name", value: "name" },
  { label: "State", value: "state" },
  { label: "Location Type", value: "locationType" },
  { label: "Status", value: "status" },
  { label: "Created At", value: "createdAt" },
];

export const locationsReportOptions = [
  { label: "Name", value: "name" },
  { label: "State", value: "state" },
  { label: "Zone", value: "zone.name" },
  { label: "Location Type", value: "locationType" },
];

export const adminTipReportOptions = [
  { label: "Customer First Name", value: "customer.profile.firstName" },
  { label: "Customer Last Name", value: "customer.profile.lastName" },
  { label: "Attendant", value: "attendant.name" },
  { label: "License Plate", value: "serviceLog.vehicle.licensePlate" },
  { label: "Location", value: "serviceLog.location.name" },
  { label: "Ticket Number", value: "serviceLog.ticketNumber" },
  { label: "Created At", value: "createdAt" },
];

export const zonesReportOptions = [
  { label: "Name", value: "name" },
  { label: "Location", value: "location.name" },
  { label: "Service", value: "service" },
];

export const adminZonesReportOptions = [
  { label: "Name", value: "name" },
  { label: "Location", value: "location.name" },
  { label: "Status", value: "status" },
  { label: "Created At", value: "createdAt" },
];

export const vehiclesReportOptions = [
  { label: "Customer", value: "customerName" },
  { label: "License Plate", value: "licensePlate" },
  { label: "Make", value: "make.name" },
  { label: "Model", value: "model.name" },
  { label: "Color", value: "color" },
  { label: "State", value: "state" },
  { label: "Created At", value: "createdAt" },
];

export const customersReportOptions = [
  { label: "First Name", value: "profile.firstName" },
  { label: "Last Name", value: "profile.lastName" },
  { label: "Email", value: "email" },
  { label: "Phone", value: "profile.phone" },
  { label: "Created At", value: "createdAt" },
];

export const invoicesReportOptions = [
  { label: "Client", value: "client" },
  { label: "Created By", value: "createdBy" },
  { label: "Confirmed By", value: "confirmedBy" },
  { label: "Created At", value: "createdAt" },
];

export const subsReportOptions = [
  { label: "Customer", value: "customer" },
  { label: "Plan", value: "membershipPlan" },
  { label: "Start Date", value: "startDate" },
  { label: "Next Renewal", value: "nextRenewal" },
];

export const adminSubsReportOptions = [
  { label: "Customer First Name", value: "customer.profile.firstName" },
  { label: "Customer Last Name", value: "customer.profile.lastName" },
  { label: "Plan", value: "membershipPlan.name" },
  { label: "Created At", value: "createdAt" },
];

export const logsReportOptions = [
  { label: "Ticket Number", value: "ticketNumber" },
  { label: "Customer", value: "customer" },
  { label: "Vehicle", value: "vehicle" },
  { label: "Service", value: "service" },
  { label: "Location", value: "location" },
  { label: "Created At", value: "createdAt" },
];

export const paymentHistoryReportOptions = [
  { label: "Transaction ID", value: "transactionId" },
  { label: "Amount (₦)", value: "amount" },
  { label: "Payment Type", value: "paymentMethod" },
  { label: "Transaction Type", value: "transactionType" },
  { label: "Customer Email", value: "customer.email" },
  { label: "Created At", value: "createdAt" },
];

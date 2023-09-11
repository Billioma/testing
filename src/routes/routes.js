import { lazy } from "react";
import WithSuspense from "../components/loaders/WithSuspense";
import { PUBLIC_PATHS, PRIVATE_PATHS } from "./constants";
import { Navigate } from "react-router-dom";

const {
  // CUSTOMER ROUTES
  CUST_LOGIN,
  CUST_SIGNUP,
  CUST_RESET_PASS,
  CUST_RESET_SENT,
  CUST_CHANGE_PASS,
  CUST_PARK,
  CUST_SCAN_PARK,
  CUST_CHANGE_SUCCESS,

  // CLIENT ROUTES
  CLIENT_LOGIN,
  CLIENT_RESET_PASS,
  CLIENT_RESET_SENT,
  CLIENT_CHANGE_PASS,
  CLIENT_CHANGE_SUCCESS,

  // OPERATOR ROUTES
  OP_LOGIN,
  OPERATOR_RESET_PASSWORD,
  OPERATOR_RESET_SENT,
  OPERATOR_CHANGE_PASS,
  OPERATOR_CHANGE_SUCCESS,

  // ADMIN routes
  ADMIN_RESET_PASSWORD_LINK,
  ADMIN_RESET_PASSWORD,
  ADMIN_LOGIN,
} = PUBLIC_PATHS;

const {
  // CUSTOMER ROUTES
  CUST_DASHBOARD,
  CUST_SERVICES,
  CUST_SERVICES_PARK,
  CUST_SERVICES_RESERVE_PARK,
  CUST_SERVICES_EVENT_PARK,
  CUST_SUBSCRIPTION,
  CUST_ADD_SUBSCRIPTION,
  CUST_VEHICLES,
  CUST_HELP_CENTER,
  CUST_HELP_CENTER_MAIL,
  CUST_HELP_CENTER_FAQ,
  CUST_HISTORY,
  CUST_SETTINGS,
  CUST_SERVICES_CAR_SERVICE,
  CUST_PAYMENT,
  CUST_PROFILE,
  CUST_EDIT_PROFILE,

  // CLIENt ROUTES
  CLIENT_DASHBOARD,
  CLIENT_USERS,
  CLIENT_ADD_USER,
  CLIENT_EVENTS,
  CLIENT_LOGS,
  CLIENT_TRAN,
  CLIENT_LOGS_VALET,
  CLIENT_LOGS_DETAILS,
  CLIENT_LOGS_VALET_DETAILS,
  CLIENT_TRAN_DETAILS,
  CLIENT_ADD_EVENT,
  CLIENT_EDIT_EVENT,
  CLIENT_ADD_SUB,
  CLIENT_VIEW_SUB,
  CLIENT_PROFILE,

  // OPERATOR ROUTES
  OP_DASHBOARD,
  OP_ADD_ATTENDANT,
  OP_ATTENDANT,
  OP_ATTENDANT_DETAILS,
  OP_LOCATIONS,
  OP_ADD_LOCATION,
  OP_LOCATION_DETAILS,
  OP_POLICIES,
  OP_POLICY_DETAILS,
  OP_RATES,
  OP_ZONES,
  OP_ZONE_DETAILS,
  OP_ADD_ZONE,
  OP_ADD_POLICY,
  OP_VALETED,
  OP_VALETED_DETAILS,
  OP_PARKED,
  OP_PARKED_DETAILS,
  OP_SERVICED,
  OP_SERVICED_DETAILS,
  OP_REP_PAYMENTS,
  OP_REP_LOCATIONS,
  OP_REP_ZONES,
  OP_REP_LOGS,

  ADMIN_CUSTOMERS,
  ADMIN_DASHBOARD,
  ADMIN_SERVICES,
  ADMIN_ATTENDANTS,
  ADMIN_ADD_ATTENDANT,
  ADMIN_VIEW_ATTENDANT,
  ADMIN_ADD_CUSTOMER,
  ADMIN_VIEW_CUSTOMER,
  ADMIN_ADMINISTRATORS,
  ADMIN_ADD_ADMINISTRATOR,
  ADMIN_VIEW_ADMINISTRATOR,
  ADMIN_OPERATORS,
  ADMIN_ADD_OPERATOR,
  ADMIN_VIEW_OPERATOR,
  ADMIN_ADD_VEHICLE,
  ADMIN_VEHICLES,
  ADMIN_VIEW_VEHICLE,
} = PRIVATE_PATHS;

//CUSTOMER PAGES
const CustLogin = WithSuspense(
  lazy(() => import("../pages/Customer/Authentication/Login"))
);

const CustResetPassword = WithSuspense(
  lazy(() => import("../pages/Customer/Authentication/ResetPassword"))
);

const CustResetSent = WithSuspense(
  lazy(() => import("../pages/Customer/Authentication/ResetSent"))
);

const CustChangePassword = WithSuspense(
  lazy(() => import("../pages/Customer/Authentication/ChangePassword"))
);
const CustChangeSuccess = WithSuspense(
  lazy(() => import("../pages/Customer/Authentication/ChangeSuccess"))
);

const CustScan = WithSuspense(
  lazy(() => import("../pages/Customer/Authentication/ScanPark"))
);
const CustPark = WithSuspense(
  lazy(() => import("../pages/Customer/Authentication/PayToPark"))
);
const CustSignup = WithSuspense(
  lazy(() => import("../pages/Customer/Authentication/Signup"))
);
const CustSettings = WithSuspense(
  lazy(() => import("../pages/Customer/Account/Settings"))
);
const CustProfile = WithSuspense(
  lazy(() => import("../pages/Customer/Account/Profile"))
);
const CustPayment = WithSuspense(
  lazy(() => import("../pages/Customer/Account/Payment"))
);
const CustEditProfile = WithSuspense(
  lazy(() => import("../pages/Customer/Account/EditProfile"))
);

const CustDashboard = WithSuspense(
  lazy(() => import("../pages/Customer/Dashboard/Dashboard"))
);

const CustServices = WithSuspense(
  lazy(() => import("../pages/Customer/Services/Services"))
);
const CustServicesPark = WithSuspense(
  lazy(() => import("../pages/Customer/Services/Park"))
);
const CustServicesCar = WithSuspense(
  lazy(() => import("../pages/Customer/Services/CarServices"))
);
const CustServicesReservePark = WithSuspense(
  lazy(() => import("../pages/Customer/Services/ReserveParking"))
);
const CustServicesEventPark = WithSuspense(
  lazy(() => import("../pages/Customer/Services/EventParking"))
);
const CustHelp = WithSuspense(
  lazy(() => import("../pages/Customer/Help/Help"))
);
const CustFaq = WithSuspense(lazy(() => import("../pages/Customer/Help/Faq")));
const CustMail = WithSuspense(
  lazy(() => import("../pages/Customer/Help/ContactUs"))
);
const CustHistory = WithSuspense(
  lazy(() => import("../pages/Customer/History/History"))
);
const CustSubscriptions = WithSuspense(
  lazy(() => import("../pages/Customer/Subscriptions/Subscriptions"))
);
const CustAddSubscriptions = WithSuspense(
  lazy(() => import("../pages/Customer/Subscriptions/AddSubscription"))
);
const CustVehicles = WithSuspense(
  lazy(() => import("../pages/Customer/Vehicles/Vehicles"))
);

//CUSTOMER PAGES
const ClientLogin = WithSuspense(
  lazy(() => import("../pages/Client/Authentication/Login"))
);

const ClientResetPassword = WithSuspense(
  lazy(() => import("../pages/Client/Authentication/ResetPassword"))
);

const ClientResetSent = WithSuspense(
  lazy(() => import("../pages/Client/Authentication/ResetSent"))
);

const ClientChangePassword = WithSuspense(
  lazy(() => import("../pages/Client/Authentication/ChangePassword"))
);
const ClientChangeSuccess = WithSuspense(
  lazy(() => import("../pages/Client/Authentication/ChangeSuccess"))
);
const ClientProfile = WithSuspense(
  lazy(() => import("../pages/Client/Account/Profile"))
);
const ClientDashboard = WithSuspense(
  lazy(() => import("../pages/Client/Dashboard/Dashboard"))
);
const ClientAddSub = WithSuspense(
  lazy(() => import("../pages/Client/Subscriptions/AddSub"))
);
const ClientViewSub = WithSuspense(
  lazy(() => import("../pages/Client/Subscriptions/ViewSub"))
);
const ClientEvents = WithSuspense(
  lazy(() => import("../pages/Client/Events/Events"))
);
const ClientLogs = WithSuspense(
  lazy(() => import("../pages/Client/Logs/Logs"))
);
const ClientLogsValet = WithSuspense(
  lazy(() => import("../pages/Client/Logs/Valet"))
);
const ClientLogsDetails = WithSuspense(
  lazy(() => import("../pages/Client/Logs/ParkDetails"))
);

const ClientLogsValetDetails = WithSuspense(
  lazy(() => import("../pages/Client/Logs/ValetDetails"))
);
const ClientTran = WithSuspense(
  lazy(() => import("../pages/Client/Transactions/Transactions"))
);
const ClientTranDetails = WithSuspense(
  lazy(() => import("../pages/Client/Transactions/TransactionDetails"))
);
const ClientAddEvent = WithSuspense(
  lazy(() => import("../pages/Client/Events/AddEvent"))
);
const ClientEditEvent = WithSuspense(
  lazy(() => import("../pages/Client/Events/EditEvent"))
);
const ClientAddUser = WithSuspense(
  lazy(() => import("../pages/Client/Users/AddUser"))
);
const ClientUsers = WithSuspense(
  lazy(() => import("../pages/Client/Users/Users"))
);

//OPERATOR PAGES
const OperatorLogin = WithSuspense(
  lazy(() => import("../pages/Operator/Authentication/Login"))
);
const OperatorResetPassword = WithSuspense(
  lazy(() => import("../pages/Operator/Authentication/ResetPassword"))
);
const OperatorResetSent = WithSuspense(
  lazy(() => import("../pages/Operator/Authentication/ResetSent"))
);

const OperatorChangePassword = WithSuspense(
  lazy(() => import("../pages/Operator/Authentication/ChangePassword"))
);
const OperatorChangeSuccess = WithSuspense(
  lazy(() => import("../pages/Operator/Authentication/ChangeSuccess"))
);
const OpDashboard = WithSuspense(
  lazy(() => import("../pages/Operator/Dashboard/Dashboard"))
);
const OpAttendant = WithSuspense(
  lazy(() => import("../pages/Operator/Users/Attendants"))
);
const OpAddAttendant = WithSuspense(
  lazy(() => import("../pages/Operator/Users/AddAttendant"))
);
const OpAttendantDetails = WithSuspense(
  lazy(() => import("../pages/Operator/Users/AttendantDetails"))
);
const OpLocation = WithSuspense(
  lazy(() => import("../pages/Operator/Locations/Locations/Locations"))
);
const OpLocationDetails = WithSuspense(
  lazy(() => import("../pages/Operator/Locations/Locations/LocationDetails"))
);
const OpAddLocation = WithSuspense(
  lazy(() => import("../pages/Operator/Locations/Locations/AddLocation"))
);
const OpZone = WithSuspense(
  lazy(() => import("../pages/Operator/Locations/Zones/Zones"))
);
const OpZoneDetails = WithSuspense(
  lazy(() => import("../pages/Operator/Locations/Zones/ZoneDetails"))
);
const OpAddZone = WithSuspense(
  lazy(() => import("../pages/Operator/Locations/Zones/AddZone"))
);
const OpRate = WithSuspense(
  lazy(() => import("../pages/Operator/Locations/Rates/Rates"))
);
const OpPolicies = WithSuspense(
  lazy(() => import("../pages/Operator/Locations/Policies/Policies"))
);
const OpAddPolicy = WithSuspense(
  lazy(() => import("../pages/Operator/Locations/Policies/AddPolicy"))
);
const OpPolicyDetails = WithSuspense(
  lazy(() => import("../pages/Operator/Locations/Policies/PolicyDetails"))
);
const OpValeted = WithSuspense(
  lazy(() => import("../pages/Operator/Logs/Valet/Vehicles"))
);
const OpValetedDetails = WithSuspense(
  lazy(() => import("../pages/Operator/Logs/Valet/Details"))
);
const OpParked = WithSuspense(
  lazy(() => import("../pages/Operator/Logs/Parked/Vehicles"))
);
const OpParkedDetails = WithSuspense(
  lazy(() => import("../pages/Operator/Logs/Parked/Details"))
);
const OpServiced = WithSuspense(
  lazy(() => import("../pages/Operator/Logs/Serviced/Vehicles"))
);
const OpServicedDetails = WithSuspense(
  lazy(() => import("../pages/Operator/Logs/Serviced/Details"))
);
const OpRepPayment = WithSuspense(
  lazy(() => import("../pages/Operator/Reports/Payment"))
);
const OpRepLocation = WithSuspense(
  lazy(() => import("../pages/Operator/Reports/Locations"))
);
const OpRepZone = WithSuspense(
  lazy(() => import("../pages/Operator/Reports/Zones"))
);
const OpRepLog = WithSuspense(
  lazy(() => import("../pages/Operator/Reports/Logs"))
);

// ADMIN PAGES
const AdminDashboard = WithSuspense(
  lazy(() => import("../pages/Admin/Dashboard/Dashboard"))
);

const AdminLogin = WithSuspense(
  lazy(() => import("../pages/Admin/Auth/Login"))
);

const AdminResetPassword = WithSuspense(
  lazy(() => import("../pages/Admin/Auth/ResetPassword"))
);

const AdminResetPasswordLink = WithSuspense(
  lazy(() => import("../pages/Admin/Auth/ResetPasswordLinkConfirmation"))
);

const AdminServices = WithSuspense(
  lazy(() => import("../pages/Admin/Services/Services"))
);

const AdminAttendants = WithSuspense(
  lazy(() => import("../pages/Admin/Users/Attendants"))
);

const AdminCustomers = WithSuspense(
  lazy(() => import("../pages/Admin/Users/Customers"))
);

const AdminAddAttendant = WithSuspense(
  lazy(() => import("../pages/Admin/Users/AddAttendant"))
);

const AdminViewAttendant = WithSuspense(
  lazy(() => import("../pages/Admin/Users/ViewAttendant"))
);

const AdminAddCustomer = WithSuspense(
  lazy(() => import("../pages/Admin/Users/AddCustomer"))
);

const AdminViewCustomer = WithSuspense(
  lazy(() => import("../pages/Admin/Users/ViewCustomer"))
);

const AdminOperators = WithSuspense(
  lazy(() => import("../pages/Admin/Users/Operators"))
);

const AdminAddOperator = WithSuspense(
  lazy(() => import("../pages/Admin/Users/AddOperator"))
);

const AdminViewOperator = WithSuspense(
  lazy(() => import("../pages/Admin/Users/ViewOperator"))
);

const AdminAdministrators = WithSuspense(
  lazy(() => import("../pages/Admin/Users/Administrators"))
);

const AdminAddAdministrator = WithSuspense(
  lazy(() => import("../pages/Admin/Users/AddAdministrator"))
);

const AdminViewAdministrator = WithSuspense(
  lazy(() => import("../pages/Admin/Users/ViewAdministrator"))
);

const AdminVehicles = WithSuspense(
  lazy(() => import("../pages/Admin/Vehicles/Vehicles"))
);

const AdminAddVehicle = WithSuspense(
  lazy(() => import("../pages/Admin/Vehicles/AddVehicle"))
);
const AdminViewVehicle = WithSuspense(
  lazy(() => import("../pages/Admin/Vehicles/ViewVehicle"))
);

export const PUBLIC_ROUTES = [
  //CUSTOMER ROUTES
  { path: CUST_LOGIN, element: <CustLogin /> },
  { path: CUST_RESET_PASS, element: <CustResetPassword /> },
  { path: CUST_CHANGE_PASS, element: <CustChangePassword /> },
  { path: CUST_CHANGE_SUCCESS, element: <CustChangeSuccess /> },
  { path: CUST_SIGNUP, element: <CustSignup /> },
  { path: CUST_RESET_SENT, element: <CustResetSent /> },
  { path: CUST_PARK, element: <CustPark /> },
  { path: CUST_SCAN_PARK, element: <CustScan /> },

  //CLIENT ROUTES
  { path: CLIENT_LOGIN, element: <ClientLogin /> },
  { path: CLIENT_RESET_PASS, element: <ClientResetPassword /> },
  { path: CLIENT_CHANGE_PASS, element: <ClientChangePassword /> },
  { path: CLIENT_CHANGE_SUCCESS, element: <ClientChangeSuccess /> },
  { path: CLIENT_RESET_SENT, element: <ClientResetSent /> },

  // OPERATOR ROUTES
  { path: OP_LOGIN, element: <OperatorLogin /> },
  { path: OPERATOR_RESET_PASSWORD, element: <OperatorResetPassword /> },
  { path: OPERATOR_CHANGE_PASS, element: <OperatorChangePassword /> },
  { path: OPERATOR_CHANGE_SUCCESS, element: <OperatorChangeSuccess /> },
  { path: OPERATOR_RESET_SENT, element: <OperatorResetSent /> },

  // ADMIN ROUTES
  { path: ADMIN_LOGIN, element: <AdminLogin /> },
  { path: ADMIN_RESET_PASSWORD, element: <AdminResetPassword /> },
  { path: ADMIN_RESET_PASSWORD_LINK, element: <AdminResetPasswordLink /> },

  {
    path: "*",
    element: (
      <Navigate
        to={
          location.pathname.includes("operator")
            ? "/operator/auth/login"
            : location.pathname.includes("admin")
            ? "/admin/auth/login"
            : location.pathname.includes("client")
            ? "/client/auth/login"
            : "/customer/auth/login"
        }
        replace
      />
    ),
  },
];

export const PRIVATE_ROUTES = [
  // CUSTOMER ROUTES
  { path: CUST_DASHBOARD, element: <CustDashboard /> },
  { path: CUST_SERVICES, element: <CustServices /> },
  { path: CUST_SERVICES_PARK, element: <CustServicesPark /> },
  { path: CUST_SERVICES_RESERVE_PARK, element: <CustServicesReservePark /> },
  { path: CUST_SERVICES_EVENT_PARK, element: <CustServicesEventPark /> },
  { path: CUST_SUBSCRIPTION, element: <CustSubscriptions /> },
  { path: CUST_ADD_SUBSCRIPTION, element: <CustAddSubscriptions /> },
  { path: CUST_HELP_CENTER, element: <CustHelp /> },
  { path: CUST_HELP_CENTER_MAIL, element: <CustMail /> },
  { path: CUST_HELP_CENTER_FAQ, element: <CustFaq /> },
  { path: CUST_VEHICLES, element: <CustVehicles /> },
  { path: CUST_HISTORY, element: <CustHistory /> },
  { path: CUST_SETTINGS, element: <CustSettings /> },
  { path: CUST_PAYMENT, element: <CustPayment /> },
  { path: CUST_PROFILE, element: <CustProfile /> },
  { path: CUST_SERVICES_CAR_SERVICE, element: <CustServicesCar /> },
  { path: CUST_EDIT_PROFILE, element: <CustEditProfile /> },

  // CLIENT ROUTES
  { path: CLIENT_DASHBOARD, element: <ClientDashboard /> },
  { path: CLIENT_USERS, element: <ClientUsers /> },
  { path: CLIENT_ADD_USER, element: <ClientAddUser /> },
  { path: CLIENT_EVENTS, element: <ClientEvents /> },
  { path: CLIENT_EVENTS, element: <ClientEvents /> },
  { path: CLIENT_EVENTS, element: <ClientEvents /> },
  { path: CLIENT_TRAN, element: <ClientTran /> },
  { path: CLIENT_TRAN_DETAILS, element: <ClientTranDetails /> },
  { path: CLIENT_LOGS, element: <ClientLogs /> },
  { path: CLIENT_LOGS_DETAILS, element: <ClientLogsDetails /> },
  { path: CLIENT_LOGS_VALET, element: <ClientLogsValet /> },
  { path: CLIENT_LOGS_VALET_DETAILS, element: <ClientLogsValetDetails /> },
  { path: CLIENT_ADD_EVENT, element: <ClientAddEvent /> },
  { path: CLIENT_EDIT_EVENT, element: <ClientEditEvent /> },
  { path: CLIENT_ADD_SUB, element: <ClientAddSub /> },
  { path: CLIENT_VIEW_SUB, element: <ClientViewSub /> },
  { path: CLIENT_PROFILE, element: <ClientProfile /> },

  // OPERATOR ROUTES
  { path: OP_DASHBOARD, element: <OpDashboard /> },
  { path: OP_ATTENDANT, element: <OpAttendant /> },
  { path: OP_ADD_ATTENDANT, element: <OpAddAttendant /> },
  { path: OP_ATTENDANT_DETAILS, element: <OpAttendantDetails /> },
  { path: OP_LOCATIONS, element: <OpLocation /> },
  { path: OP_LOCATION_DETAILS, element: <OpLocationDetails /> },
  { path: OP_ADD_LOCATION, element: <OpAddLocation /> },
  { path: OP_RATES, element: <OpRate /> },
  { path: OP_ZONES, element: <OpZone /> },
  { path: OP_ZONE_DETAILS, element: <OpZoneDetails /> },
  { path: OP_ADD_ZONE, element: <OpAddZone /> },
  { path: OP_POLICIES, element: <OpPolicies /> },
  { path: OP_POLICY_DETAILS, element: <OpPolicyDetails /> },
  { path: OP_ADD_POLICY, element: <OpAddPolicy /> },
  { path: OP_VALETED, element: <OpValeted /> },
  { path: OP_VALETED_DETAILS, element: <OpValetedDetails /> },
  { path: OP_PARKED, element: <OpParked /> },
  { path: OP_PARKED_DETAILS, element: <OpParkedDetails /> },
  { path: OP_SERVICED, element: <OpServiced /> },
  { path: OP_SERVICED_DETAILS, element: <OpServicedDetails /> },
  { path: OP_REP_PAYMENTS, element: <OpRepPayment /> },
  { path: OP_REP_LOCATIONS, element: <OpRepLocation /> },
  { path: OP_REP_ZONES, element: <OpRepZone /> },
  { path: OP_REP_LOGS, element: <OpRepLog /> },

  // ADMIN ROUTES
  { path: ADMIN_DASHBOARD, element: <AdminDashboard /> },
  { path: ADMIN_CUSTOMERS, element: <AdminCustomers /> },
  { path: ADMIN_SERVICES, element: <AdminServices /> },
  { path: ADMIN_ADMINISTRATORS, element: <AdminAdministrators /> },
  { path: ADMIN_OPERATORS, element: <AdminOperators /> },
  { path: ADMIN_ATTENDANTS, element: <AdminAttendants /> },
  { path: ADMIN_ADD_ATTENDANT, element: <AdminAddAttendant /> },
  { path: ADMIN_VIEW_ATTENDANT, element: <AdminViewAttendant /> },
  { path: ADMIN_ADD_CUSTOMER, element: <AdminAddCustomer /> },
  { path: ADMIN_VIEW_CUSTOMER, element: <AdminViewCustomer /> },
  { path: ADMIN_ADD_ADMINISTRATOR, element: <AdminAddAdministrator /> },
  { path: ADMIN_VIEW_ADMINISTRATOR, element: <AdminViewAdministrator /> },
  { path: ADMIN_ADD_OPERATOR, element: <AdminAddOperator /> },
  { path: ADMIN_VIEW_OPERATOR, element: <AdminViewOperator /> },
  { path: ADMIN_VEHICLES, element: <AdminVehicles /> },
  { path: ADMIN_ADD_VEHICLE, element: <AdminAddVehicle /> },
  { path: ADMIN_VIEW_VEHICLE, element: <AdminViewVehicle /> },

  {
    path: "*",
    element: (
      <Navigate
        to={
          location.pathname.includes("operator")
            ? "/operator/dashboard"
            : location.pathname.includes("client")
            ? "/client/dashboard"
            : location.pathname.includes("admin")
            ? "/admin/dashboard"
            : "/customer/dashboard"
        }
        replace
      />
    ),
  },
];

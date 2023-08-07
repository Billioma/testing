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
  CUST_CHANGE_SUCCESS,

  // OPERATOR ROUTES
  OP_LOGIN,
  OP_SIGNUP,
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
  CUST_HISTORY,
  CUST_SETTINGS,
  CUST_SERVICES_CAR_SERVICE,
  CUST_PAYMENT,
  CUST_PROFILE,
  CUST_EDIT_PROFILE,

  // OPERATOR ROUTES
  OP_DASHBOARD,

  ADMIN_CUSTOMERS,
  ADMIN_DASHBOARD,
  ADMIN_SERVICES,
  ADMIN_ATTENDANTS,
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
const OpSignup = WithSuspense(
  lazy(() => import("../pages/Operator/Authentication/Signup"))
);
const OpDashboard = WithSuspense(
  lazy(() => import("../pages/Operator/Dashboard/Dashboard"))
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
  lazy(() => import("../pages/Admin/Dashboard/Services"))
);

const AdminAttendants = WithSuspense(
  lazy(() => import("../pages/Admin/Dashboard/Attendants"))
);

const AdminCustomers = WithSuspense(
  lazy(() => import("../pages/Admin/Dashboard/Customers"))
);

export const PUBLIC_ROUTES = [
  //CUSTOMER ROUTES
  { path: CUST_LOGIN, element: <CustLogin /> },
  { path: CUST_RESET_PASS, element: <CustResetPassword /> },
  { path: CUST_CHANGE_PASS, element: <CustChangePassword /> },
  { path: CUST_CHANGE_SUCCESS, element: <CustChangeSuccess /> },
  { path: CUST_SIGNUP, element: <CustSignup /> },
  { path: CUST_RESET_SENT, element: <CustResetSent /> },

  // OPERATOR ROUTES
  { path: OP_LOGIN, element: <OperatorLogin /> },
  { path: OPERATOR_RESET_PASSWORD, element: <OperatorResetPassword /> },
  { path: OPERATOR_CHANGE_PASS, element: <OperatorChangePassword /> },
  { path: OPERATOR_CHANGE_SUCCESS, element: <OperatorChangeSuccess /> },
  { path: OP_SIGNUP, element: <OpSignup /> },
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
  { path: CUST_VEHICLES, element: <CustVehicles /> },
  { path: CUST_HISTORY, element: <CustHistory /> },
  { path: CUST_SETTINGS, element: <CustSettings /> },
  { path: CUST_PAYMENT, element: <CustPayment /> },
  { path: CUST_PROFILE, element: <CustProfile /> },
  { path: CUST_SERVICES_CAR_SERVICE, element: <CustServicesCar /> },
  { path: CUST_EDIT_PROFILE, element: <CustEditProfile /> },

  // OPERATOR ROUTES
  { path: OP_DASHBOARD, element: <OpDashboard /> },

  // ADMIN ROUTES
  { path: ADMIN_DASHBOARD, element: <AdminDashboard /> },
  { path: ADMIN_CUSTOMERS, element: <AdminCustomers /> },
  { path: ADMIN_SERVICES, element: <AdminServices /> },
  { path: ADMIN_ATTENDANTS, element: <AdminAttendants /> },

  {
    path: "*",
    element: (
      <Navigate
        to={
          location.pathname.includes("operator")
            ? "/operator/dashboard"
            : location.pathname.includes("admin")
            ? "/admin/dashboard"
            : "/customer/dashboard"
        }
        replace
      />
    ),
  },
];

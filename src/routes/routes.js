import { lazy } from "react";
import WithSuspense from "../components/loaders/WithSuspense";
import { PUBLIC_PATHS, PRIVATE_PATHS } from "./constants";
import { Navigate } from "react-router-dom";

const {
  CUST_LOGIN,
  OP_LOGIN,
  CUST_SIGNUP,
  OP_SIGNUP,
  CUST_RESET_PASS,
  CUST_RESET_SENT,
  CUST_CHANGE_PASS,
  CUST_CHANGE_SUCCESS,

  OPERATOR_RESET_PASSWORD,
  OPERATOR_RESET_SENT,
  OPERATOR_CHANGE_PASS,
  OPERATOR_CHANGE_SUCCESS,
} = PUBLIC_PATHS;

const {
  CUST_DASHBOARD,
  CUST_SERVICES,
  CUST_SUBSCRIPTION,
  CUST_HELP_CENTER,
  CUST_HISTORY,
} = PRIVATE_PATHS;

const CustLogin = WithSuspense(
  lazy(() => import("../pages/Customer/Authentication/Login"))
);
const OperatorLogin = WithSuspense(
  lazy(() => import("../pages/Operator/Authentication/Login"))
);
const CustResetPassword = WithSuspense(
  lazy(() => import("../pages/Customer/Authentication/ResetPassword"))
);

const OperatorResetPassword = WithSuspense(
  lazy(() => import("../pages/Operator/Authentication/ResetPassword"))
);

const CustResetSent = WithSuspense(
  lazy(() => import("../pages/Customer/Authentication/ResetSent"))
);

const OperatorResetSent = WithSuspense(
  lazy(() => import("../pages/Operator/Authentication/ResetSent"))
);

const CustChangePassword = WithSuspense(
  lazy(() => import("../pages/Customer/Authentication/ChangePassword"))
);
const CustChangeSuccess = WithSuspense(
  lazy(() => import("../pages/Customer/Authentication/ChangeSuccess"))
);

const OperatorChangePassword = WithSuspense(
  lazy(() => import("../pages/Operator/Authentication/ChangePassword"))
);
const OperatorChangeSuccess = WithSuspense(
  lazy(() => import("../pages/Operator/Authentication/ChangeSuccess"))
);

const CustSignup = WithSuspense(
  lazy(() => import("../pages/Customer/Authentication/Signup"))
);
const OpSignup = WithSuspense(
  lazy(() => import("../pages/Operator/Authentication/Signup"))
);
const CustDashboard = WithSuspense(
  lazy(() => import("../pages/Customer/Dashboard/Dashboard"))
);
const CustServices = WithSuspense(
  lazy(() => import("../pages/Customer/Services/Services"))
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

export const PUBLIC_ROUTES = [
  { path: CUST_LOGIN, element: <CustLogin /> },
  { path: OP_LOGIN, element: <OperatorLogin /> },
  { path: CUST_RESET_PASS, element: <CustResetPassword /> },

  { path: OPERATOR_RESET_PASSWORD, element: <OperatorResetPassword /> },

  { path: CUST_CHANGE_PASS, element: <CustChangePassword /> },
  { path: CUST_CHANGE_SUCCESS, element: <CustChangeSuccess /> },

  { path: OPERATOR_CHANGE_PASS, element: <OperatorChangePassword /> },
  { path: OPERATOR_CHANGE_SUCCESS, element: <OperatorChangeSuccess /> },

  { path: CUST_SIGNUP, element: <CustSignup /> },
  { path: OP_SIGNUP, element: <OpSignup /> },
  { path: CUST_RESET_SENT, element: <CustResetSent /> },
  { path: OPERATOR_RESET_SENT, element: <OperatorResetSent /> },
  {
    path: "*",
    element: (
      <Navigate
        to={
          location.pathname.includes("customer")
            ? "/customer/auth/login"
            : "/operator/auth/login"
        }
        replace
      />
    ),
  },
];

export const PRIVATE_ROUTES = [
  { path: CUST_DASHBOARD, element: <CustDashboard /> },
  { path: CUST_SERVICES, element: <CustServices /> },
  { path: CUST_SUBSCRIPTION, element: <CustSubscriptions /> },
  { path: CUST_HELP_CENTER, element: <CustHelp /> },
  { path: CUST_HISTORY, element: <CustHistory /> },
  {
    path: "*",
    element: (
      <Navigate
        to={
          location.pathname.includes("customer")
            ? "/customer/dashboard"
            : "/operator/dashboard"
        }
        replace
      />
    ),
  },
];

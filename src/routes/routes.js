import { lazy } from "react";
import WithSuspense from "../components/loaders/WithSuspense";
import { PUBLIC_PATHS, PRIVATE_PATHS } from "./constants";
import { Navigate } from "react-router-dom";

const { LOGIN, SIGNUP, RESET_PASS, RESET_SENT, CHANGE_PASS, CHANGE_SUCCESS } =
  PUBLIC_PATHS;

const { DASHBOARD, SERVICES, SUBSCRIPTION, HELP_CENTER, HISTORY } =
  PRIVATE_PATHS;

const Login = WithSuspense(lazy(() => import("../pages/Authentication/Login")));
const ResetPassword = WithSuspense(
  lazy(() => import("../pages/Authentication/ResetPassword"))
);
const ResetSent = WithSuspense(
  lazy(() => import("../pages/Authentication/ResetSent"))
);
const ChangePassword = WithSuspense(
  lazy(() => import("../pages/Authentication/ChangePassword"))
);
const ChangeSuccess = WithSuspense(
  lazy(() => import("../pages/Authentication/ChangeSuccess"))
);
const Signup = WithSuspense(
  lazy(() => import("../pages/Authentication/Signup"))
);
const Dashboard = WithSuspense(
  lazy(() => import("../pages/Dashboard/Dashboard"))
);
const Services = WithSuspense(lazy(() => import("../pages/Services/Services")));
const Help = WithSuspense(lazy(() => import("../pages/Help/Help")));
const History = WithSuspense(lazy(() => import("../pages/History/History")));
const Subscriptions = WithSuspense(
  lazy(() => import("../pages/Subscriptions/Subscriptions"))
);

export const PUBLIC_ROUTES = [
  { path: LOGIN, element: <Login /> },
  { path: RESET_PASS, element: <ResetPassword /> },
  { path: CHANGE_PASS, element: <ChangePassword /> },
  { path: CHANGE_SUCCESS, element: <ChangeSuccess /> },
  { path: SIGNUP, element: <Signup /> },
  { path: RESET_SENT, element: <ResetSent /> },
  { path: "*", element: <Navigate to="/customer/auth/login" replace /> },
];
export const PRIVATE_ROUTES = [
  { path: DASHBOARD, element: <Dashboard /> },
  { path: SERVICES, element: <Services /> },
  { path: SUBSCRIPTION, element: <Subscriptions /> },
  { path: HELP_CENTER, element: <Help /> },
  { path: HISTORY, element: <History /> },
  { path: "*", element: <Navigate to="/customer/dashboard" replace /> },
];

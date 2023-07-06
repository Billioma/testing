import { lazy } from "react";
import WithSuspense from "../components/loaders/WithSuspense";
import { PUBLIC_PATHS, PRIVATE_PATHS } from "./constants";
import { Navigate } from "react-router-dom";

const { LOGIN, SIGNUP, RESET_PASS } = PUBLIC_PATHS;

const { DASHBOARD } = PRIVATE_PATHS;

const Login = WithSuspense(lazy(() => import("../pages/Authentication/Login")));
const ResetPassword = WithSuspense(
  lazy(() => import("../pages/Authentication/ResetPassword"))
);
const Signup = WithSuspense(
  lazy(() => import("../pages/Authentication/Signup"))
);
const Dashboard = WithSuspense(
  lazy(() => import("../pages/Dashboard/Dashboard"))
);

export const PUBLIC_ROUTES = [
  { path: LOGIN, element: <Login /> },
  { path: RESET_PASS, element: <ResetPassword /> },
  { path: SIGNUP, element: <Signup /> },
  { path: "*", element: <Navigate to="/login" replace /> },
];
export const PRIVATE_ROUTES = [
  { path: DASHBOARD, element: <Dashboard /> },
  { path: "*", element: <Navigate to="/overview" replace /> },
];

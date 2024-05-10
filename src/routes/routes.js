import { lazy } from "react";
import WithSuspense from "../components/Loaders/WithSuspense";
import { PUBLIC_PATHS, PRIVATE_PATHS } from "./constants";
import { Navigate } from "react-router-dom";

const {
  LOGIN,
  NEW_PASS,
  NEW_LOGIN,
  FORGOT_PASS,
  CODE_VERIFICATION,
  RESET_PASS,
} = PUBLIC_PATHS;

const {
  DASHBOARD,
  PROFILE,
  SCHEDULE,
  LOANS,
  LEAVE,
  REQUEST_LEAVE,
  LEAVE_DETAILS,
  MEDICAL,
} = PRIVATE_PATHS;

const Login = WithSuspense(lazy(() => import("../pages/Authentication/Login")));
const FirstLogin = WithSuspense(
  lazy(() => import("../pages/Authentication/FirstLogin")),
);
const ForgotPassword = WithSuspense(
  lazy(() => import("../pages/Authentication/ForgotPassword")),
);
const CodeVerification = WithSuspense(
  lazy(() => import("../pages/Authentication/CodeVerification")),
);
const CreateNewPassword = WithSuspense(
  lazy(() => import("../pages/Authentication/CreateNewPassword")),
);
const Dashboard = WithSuspense(
  lazy(() => import("../pages/Dashboard/Dashboard")),
);
const Profile = WithSuspense(lazy(() => import("../pages/Profile/Profile")));
const Schedule = WithSuspense(lazy(() => import("../pages/Schedule/Schedule")));
const Loans = WithSuspense(lazy(() => import("../pages/Loans/Loans")));
const Leave = WithSuspense(lazy(() => import("../pages/Leave/Leave")));
const RequestLeave = WithSuspense(
  lazy(() => import("../pages/Leave/RequestLeave")),
);
const LeaveDetails = WithSuspense(
  lazy(() => import("../pages/Leave/LeaveDetails")),
);
const Medical = WithSuspense(lazy(() => import("../pages/Medical/Medical")));

export const PUBLIC_ROUTES = [
  { path: LOGIN, element: <Login /> },
  { path: NEW_LOGIN, element: <FirstLogin /> },
  { path: FORGOT_PASS, element: <ForgotPassword /> },
  { path: CODE_VERIFICATION, element: <CodeVerification /> },
  { path: RESET_PASS, element: <CreateNewPassword /> },
  { path: NEW_PASS, element: <CreateNewPassword /> },
  { path: "*", element: <Navigate to="/login" replace /> },
];

export const PRIVATE_ROUTES = [
  { path: DASHBOARD, element: <Dashboard /> },
  { path: PROFILE, element: <Profile /> },
  { path: SCHEDULE, element: <Schedule /> },
  { path: LOANS, element: <Loans /> },
  { path: LEAVE, element: <Leave /> },
  { path: MEDICAL, element: <Medical /> },
  { path: REQUEST_LEAVE, element: <RequestLeave /> },
  { path: LEAVE_DETAILS, element: <LeaveDetails /> },
  { path: "*", element: <Navigate to="/dashboard" replace /> },
];

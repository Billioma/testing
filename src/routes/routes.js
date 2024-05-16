import { lazy } from "react";
import WithSuspense from "../components/loader/WithSuspense";
import { PUBLIC_PATHS, PRIVATE_PATHS } from "./constants";
import { Navigate } from "react-router-dom";

const {
  //STAFF
  LOGIN,
  NEW_PASS,
  NEW_LOGIN,
  NEW_USER,
  FORGOT_PASS,
  CODE_VERIFICATION,
  RESET_PASS,

  // ADMIN routes
  ADMIN_RESET_PASSWORD_LINK,
  ADMIN_RESET_PASSWORD,
  ADMIN_LOGIN,
} = PUBLIC_PATHS;

const {
  //STAFF
  DASHBOARD,
  PROFILE,
  SCHEDULE,
  LOANS,
  LEAVE,
  REQUEST_LEAVE,
  LEAVE_DETAILS,
  MEDICAL,
  REQUEST_MEDICAL,
  MEDICAL_DETAILS,

  // ADMIN

  ADMIN_DASHBOARD,
  ADMIN_PROFILE,
  ADMIN_EDIT_PROFILE,
  ADMIN_STAFF_PROFILE,
  ADMIN_LOAN,
  ADMIN_LOAN_DETAILS,
  ADMIN_LEAVE_MGT,
  ADMIN_MEDICAL_ASSISTANCE,
  ADMIN_MEDICAL_ASSISTANCE_DETAILS,
  ADMIN_STAFF_SCHEDULE,
} = PRIVATE_PATHS;

// STAFF PAGES
const Login = WithSuspense(
  lazy(() => import("../pages/Staff/Authentication/Login"))
);
const FirstLogin = WithSuspense(
  lazy(() => import("../pages/Staff/Authentication/FirstLogin"))
);
const NewUser = WithSuspense(
  lazy(() => import("../pages/Staff/Authentication/NewUser"))
);
const ForgotPassword = WithSuspense(
  lazy(() => import("../pages/Staff/Authentication/ForgotPassword"))
);
const CodeVerification = WithSuspense(
  lazy(() => import("../pages/Staff/Authentication/CodeVerification"))
);
const CreateNewPassword = WithSuspense(
  lazy(() => import("../pages/Staff/Authentication/CreateNewPassword"))
);
const Dashboard = WithSuspense(
  lazy(() => import("../pages/Staff/Dashboard/Dashboard"))
);
const Profile = WithSuspense(
  lazy(() => import("../pages/Staff/Profile/Profile"))
);
const Schedule = WithSuspense(
  lazy(() => import("../pages/Staff/Schedule/Schedule"))
);
const Loans = WithSuspense(lazy(() => import("../pages/Staff/Loans/Loans")));
const Leave = WithSuspense(lazy(() => import("../pages/Staff/Leave/Leave")));
const RequestLeave = WithSuspense(
  lazy(() => import("../pages/Staff/Leave/RequestLeave"))
);
const LeaveDetails = WithSuspense(
  lazy(() => import("../pages/Staff/Leave/LeaveDetails"))
);
const Medical = WithSuspense(
  lazy(() => import("../pages/Staff/Medical/Medical"))
);
const RequestMedical = WithSuspense(
  lazy(() => import("../pages/Staff/Medical/RequestMedical"))
);
const MedicalDetails = WithSuspense(
  lazy(() => import("../pages/Staff/Medical/MedicalDetails"))
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

const AdminProfile = WithSuspense(
  lazy(() => import("../pages/Admin/Profile/Profile"))
);

const AdminUpdateProfile = WithSuspense(
  lazy(() => import("../pages/Admin/Profile/EditProfile"))
);

const AdminStaffProfile = WithSuspense(
  lazy(() => import("../pages/Admin/StaffProfile/StaffProfile"))
);

const AdminAddStaffProfile = WithSuspense(
  lazy(() => import("../pages/Admin/StaffProfile/AddStaff"))
);

const AdminAddStaffProfileDetails = WithSuspense(
  lazy(() => import("../pages/Admin/StaffProfile/StaffProfileDetails"))
);

const AdminLoan = WithSuspense(
  lazy(() => import("../pages/Admin/Loans/Loans"))
);

const AdminLoanDetails = WithSuspense(
  lazy(() => import("../pages/Admin/Loans/LoanDetails"))
);

const AdminLeaveMgt = WithSuspense(
  lazy(() => import("../pages/Admin/LeaveMgt/LeaveMgt"))
);

const AdminLeaveMgtDetails = WithSuspense(
  lazy(() => import("../pages/Admin/LeaveMgt/LeaveMgtDetails"))
);

const AdminMedicalAssistance = WithSuspense(
  lazy(() => import("../pages/Admin/MedicalAssistance/MedicalAssistance"))
);

const AdminMedicalAssistanceDetails = WithSuspense(
  lazy(() => import("../pages/Admin/MedicalAssistance/MedDetails"))
);

const AdminStaffSchedule = WithSuspense(
  lazy(() => import("../pages/Admin/StaffSchedule/StaffSchedule"))
);

export const PUBLIC_ROUTES = [
  // STAFF ROUTES
  { path: LOGIN, element: <Login /> },
  { path: NEW_LOGIN, element: <FirstLogin /> },
  { path: NEW_USER, element: <NewUser /> },
  { path: FORGOT_PASS, element: <ForgotPassword /> },
  { path: CODE_VERIFICATION, element: <CodeVerification /> },
  { path: RESET_PASS, element: <CreateNewPassword /> },
  { path: NEW_PASS, element: <CreateNewPassword /> },

  // ADMIN ROUTES
  { path: ADMIN_LOGIN, element: <AdminLogin /> },
  { path: ADMIN_RESET_PASSWORD, element: <AdminResetPassword /> },
  { path: ADMIN_RESET_PASSWORD_LINK, element: <AdminResetPasswordLink /> },

  {
    path: "*",
    element: (
      <Navigate
        to={
          location.pathname.includes("admin")
            ? "/admin/auth/login"
            : "/staff/auth/login"
        }
        replace
      />
    ),
  },
];

export const PRIVATE_ROUTES = [
  // STAFF
  { path: DASHBOARD, element: <Dashboard /> },
  { path: PROFILE, element: <Profile /> },
  { path: SCHEDULE, element: <Schedule /> },
  { path: LOANS, element: <Loans /> },
  { path: LEAVE, element: <Leave /> },
  { path: MEDICAL, element: <Medical /> },
  { path: REQUEST_LEAVE, element: <RequestLeave /> },
  { path: LEAVE_DETAILS, element: <LeaveDetails /> },
  { path: REQUEST_MEDICAL, element: <RequestMedical /> },
  { path: MEDICAL_DETAILS, element: <MedicalDetails /> },

  // ADMIN
  {
    path: ADMIN_STAFF_PROFILE,
    element: <AdminStaffProfile />,
  },

  {
    path: PRIVATE_PATHS.ADMIN_ADD_STAFF,
    element: <AdminAddStaffProfile />,
  },

  {
    path: PRIVATE_PATHS.ADMIN_STAFF_PROFILE_DETAILS,
    element: <AdminAddStaffProfileDetails />,
  },

  {
    path: ADMIN_DASHBOARD,
    element: <AdminDashboard />,
  },

  {
    path: ADMIN_PROFILE,
    element: <AdminProfile />,
  },

  {
    path: ADMIN_EDIT_PROFILE,
    element: <AdminUpdateProfile />,
  },

  {
    path: ADMIN_LEAVE_MGT,
    element: <AdminLeaveMgt />,
  },

  {
    path: PRIVATE_PATHS.ADMIN_LEAVE_MGT_DEETAILS,
    element: <AdminLeaveMgtDetails />,
  },

  {
    path: ADMIN_LOAN,
    element: <AdminLoan />,
  },

  {
    path: ADMIN_LOAN_DETAILS,
    element: <AdminLoanDetails />,
  },

  {
    path: ADMIN_MEDICAL_ASSISTANCE,
    element: <AdminMedicalAssistance />,
  },

  {
    path: ADMIN_MEDICAL_ASSISTANCE_DETAILS,
    element: <AdminMedicalAssistanceDetails />,
  },

  {
    path: ADMIN_STAFF_SCHEDULE,
    element: <AdminStaffSchedule />,
  },
  {
    path: "*",
    element: (
      <Navigate
        to={
          location.pathname.includes("admin")
            ? "/admin/dashboard"
            : "/staff/dashboard"
        }
        replace
      />
    ),
  },
];

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
  REQUEST_LOAN,
  LOAN_DETAILS,
  UPDATE_LOAN,
  LEAVE,
  REQUEST_LEAVE,
  LEAVE_DETAILS,
  UPDATE_LEAVE,
  MEDICAL,
  REQUEST_MEDICAL,
  MEDICAL_DETAILS,
  UPDATE_MED,

  // ADMIN

  ADMIN_DASHBOARD,
  ADMIN_PROFILE,
  ADMIN_EDIT_PROFILE,
  ADMIN_STAFF_PROFILE,
  ADMIN_LOAN,
  ADMIN_LOAN_DETAILS,
  ADMIN_LEAVE_MGT,
  ADMIN_ADD_LEAVE_MGT,
  ADMIN_MEDICAL_ASSISTANCE,
  ADMIN_MEDICAL_ASSISTANCE_DETAILS,
  ADMIN_ADD_MEDICAL_ASSISTANCE,
  ADMIN_STAFF_SCHEDULE,
  ADMIN_ADD_STAFF_SCHEDULE_LOCATION,
  ADMIN_ADD_STAFF_SCHEDULE_STAFF,
  ADMIN_SETTINGS,
  ADMIN_ADD_DEPT,
  ADMIN_ADD_JOB,
  ADMIN_VIEW_DEPT,
  ADMIN_VIEW_JOB,
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
const RequestLoan = WithSuspense(
  lazy(() => import("../pages/Staff/Loans/RequestLoan"))
);
const UpdateLoan = WithSuspense(
  lazy(() => import("../pages/Staff/Loans/UpdateLoan"))
);
const LoanDetails = WithSuspense(
  lazy(() => import("../pages/Staff/Loans/LoanDetails"))
);
const Leave = WithSuspense(lazy(() => import("../pages/Staff/Leave/Leave")));
const RequestLeave = WithSuspense(
  lazy(() => import("../pages/Staff/Leave/RequestLeave"))
);
const UpdateLeave = WithSuspense(
  lazy(() => import("../pages/Staff/Leave/UpdateLeave"))
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
const UpdateMed = WithSuspense(
  lazy(() => import("../pages/Staff/Medical/UpdateMed"))
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

const AdminAddLoan = WithSuspense(
  lazy(() => import("../pages/Admin/Loans/AddLoan"))
);

const AdminAddLeaveMgt = WithSuspense(
  lazy(() => import("../pages/Admin/LeaveMgt/AddLeave"))
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

const AdminAddMed = WithSuspense(
  lazy(() => import("../pages/Admin/MedicalAssistance/AddMed"))
);

const AdminStaffSchedule = WithSuspense(
  lazy(() => import("../pages/Admin/StaffSchedule/StaffSchedule"))
);

const AdminAddStaffScheduleLocation = WithSuspense(
  lazy(() => import("../pages/Admin/StaffSchedule/AddScheduleLocation"))
);

const AdminAddStaffScheduleStaff = WithSuspense(
  lazy(() => import("../pages/Admin/StaffSchedule/AddScheduleStaff"))
);

const AdminSettings = WithSuspense(
  lazy(() => import("../pages/Admin/Settings/Settings"))
);

const AdminAddJob = WithSuspense(
  lazy(() => import("../pages/Admin/Settings/AddJob"))
);
const AdminAddDept = WithSuspense(
  lazy(() => import("../pages/Admin/Settings/AddDept"))
);
const AdminViewDept = WithSuspense(
  lazy(() => import("../pages/Admin/Settings/ViewDept"))
);
const AdminViewJob = WithSuspense(
  lazy(() => import("../pages/Admin/Settings/ViewJob"))
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
  { path: REQUEST_LOAN, element: <RequestLoan /> },
  { path: LOAN_DETAILS, element: <LoanDetails /> },
  { path: LEAVE, element: <Leave /> },
  { path: MEDICAL, element: <Medical /> },
  { path: REQUEST_LEAVE, element: <RequestLeave /> },
  { path: LEAVE_DETAILS, element: <LeaveDetails /> },
  { path: REQUEST_MEDICAL, element: <RequestMedical /> },
  { path: MEDICAL_DETAILS, element: <MedicalDetails /> },
  { path: UPDATE_LEAVE, element: <UpdateLeave /> },
  { path: UPDATE_LOAN, element: <UpdateLoan /> },
  { path: UPDATE_MED, element: <UpdateMed /> },

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
    path: ADMIN_SETTINGS,
    element: <AdminSettings />,
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
    path: ADMIN_ADD_LEAVE_MGT,
    element: <AdminAddLeaveMgt />,
  },

  {
    path: PRIVATE_PATHS.ADMIN_ADD_LOAN,
    element: <AdminAddLoan />,
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
    path: ADMIN_ADD_DEPT,
    element: <AdminAddDept />,
  },

  {
    path: ADMIN_VIEW_DEPT,
    element: <AdminViewDept />,
  },

  {
    path: ADMIN_VIEW_JOB,
    element: <AdminViewJob />,
  },

  {
    path: ADMIN_ADD_JOB,
    element: <AdminAddJob />,
  },

  {
    path: ADMIN_MEDICAL_ASSISTANCE_DETAILS,
    element: <AdminMedicalAssistanceDetails />,
  },

  {
    path: ADMIN_ADD_MEDICAL_ASSISTANCE,
    element: <AdminAddMed />,
  },

  {
    path: ADMIN_STAFF_SCHEDULE,
    element: <AdminStaffSchedule />,
  },

  {
    path: ADMIN_ADD_STAFF_SCHEDULE_LOCATION,
    element: <AdminAddStaffScheduleLocation />,
  },

  {
    path: ADMIN_ADD_STAFF_SCHEDULE_STAFF,
    element: <AdminAddStaffScheduleStaff />,
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

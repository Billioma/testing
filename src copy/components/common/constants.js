import { HiOutlineInformationCircle } from "react-icons/hi";
import { TiCancel } from "react-icons/ti";
import {
  AdminDashboardIcon,
  AdminLoanIcon,
  AdminMedicalIcon,
  DashboardIcon,
  LeaveIcon,
  LeaveMgtIcon,
  LoanIcon,
  MedicalIcon,
  ProfileIcon,
  ScheduleIcon,
  StaffProfileIcon,
  StaffScheduleIcon,
} from "./images";
import { BsTrash } from "react-icons/bs";

export const DayOfWeekEnum = [
  { name: "Monday", value: "monday" },
  { name: "Tuesday", value: "tuesday" },
  { name: "Wednesday", value: "wednesday" },
  { name: "Thursday", value: "thursday" },
  { name: "Friday", value: "friday" },
  { name: "Saturday", value: "saturday" },
  { name: "Sunday", value: "sunday" },
];

export const searchOption = [
  { label: "Contains", value: "cont" },
  { label: "Equals to", value: "eq" },
];

export const newStatusType = ["Inactive", "Active", "Pending"];

export const leaveStatusType = [
  { name: "Declined", value: "REJECTED" },
  { name: "Approved", value: "APPROVED" },
  { name: "Completed", value: "COMPLETED" },
  { name: "Active", value: "ACTIVE" },
  { name: "Cancelled", value: "CANCELLED" },
  { name: "Withdrawn", value: "WITHDRAWN" },
  { name: "Pending", value: "PENDING" },
];

export const submits = [
  { name: "Submitted", value: true },
  { name: "Unsubmitted", value: false },
];

export const loanSubmit = [
  { name: "Paid", value: true },
  { name: "Pending", value: false },
];

export const NewStatus = [
  { color: "#E81313", name: "Denied", bg: "#F9D0CD" },
  { color: "#008000", name: "Active", bg: "#E5FFE5" },
  { color: "#F9A11E", name: "Pending", bg: "#FDF6E7" },
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

export const viewCancelDeleteOption = [
  {
    name: "View",
    icon: HiOutlineInformationCircle,
  },
  {
    name: "Cancel",
    icon: TiCancel,
  },
  {
    name: "Delete",
    icon: BsTrash,
  },
];

export const staffSidebar = [
  {
    id: 0,
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <AdminDashboardIcon fill={"#fff"} stroke="#000" />,
    hover: <AdminDashboardIcon fill="#fff" stroke="#086375" />,
    sec: <AdminDashboardIcon fill="#086375" stroke="#fff" />,
  },
  {
    id: 1,
    name: "Profiles",
    path: "/admin/staff-profiles",
    icon: <StaffProfileIcon fill={"#000"} />,
    hover: <StaffProfileIcon fill="#086375" />,
    sec: <StaffProfileIcon fill="#fff" />,
  },
  {
    id: 2,
    name: "Loans",
    path: "/admin/loans",
    icon: <AdminLoanIcon fill={"#000"} />,
    hover: <AdminLoanIcon fill="#086375" />,
    sec: <AdminLoanIcon fill="#fff" />,
  },
  {
    id: 3,
    name: "Leave",
    path: "/admin/leave-mgt",
    icon: <LeaveMgtIcon fill={"#000"} />,
    hover: <LeaveMgtIcon fill="#086375" />,
    sec: <LeaveMgtIcon fill="#fff" />,
  },
  {
    id: 4,
    name: "Medical",
    path: "/admin/medical-assistance",
    icon: <AdminMedicalIcon fill={"#000"} />,
    hover: <AdminMedicalIcon fill="#086375" />,
    sec: <AdminMedicalIcon fill="#fff" />,
  },
  {
    id: 5,
    name: "Schedule",
    path: "/admin/staff-schedule",
    icon: <StaffScheduleIcon fill={"#000"} />,
    hover: <StaffScheduleIcon fill="#086375" />,
    sec: <StaffScheduleIcon fill="#fff" />,
  },
  // {
  //   id: 5,
  //   name: "Settings",
  //   path: "/admin/settings",
  //   icon: <ConfigIcon fill={"#000"} />,
  //   hover: <ConfigIcon fill="#086375" />,
  //   sec: <ConfigIcon fill="#fff" />,
  // },
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

export const staffDetailsTab = [
  "General Information",
  "Employee Documents",
  "Schedule",
  "Loan History",
  "Leave History",
  "Medical Assistance",
];

export const staffOptions = [
  { label: "Staff ID", value: "staffId" },
  { label: "Full Name", value: "fullName" },
  { label: "Created At", value: "createdAt" },
];

export const leaveOptions = [
  { label: "Staff ID", value: "staff.staffId" },
  { label: "Staff Name", value: "staff.fullName" },
  { label: "Start Date", value: "startDate" },
  { label: "End Date", value: "endDate" },
  { label: "Leave Status", value: "status" },
  { label: "Created At", value: "createdAt" },
];

export const medOptions = [
  { label: "Staff ID", value: "staff.staffId" },
  { label: "Staff Name", value: "staff.fullName" },
  { label: "Amount", value: "amount" },
  { label: "Request Date", value: "createdAt" },
  { label: "Request Status", value: "status" },
  { label: "Created At", value: "createdAt" },
];

export const loanOptions = [
  { label: "Staff ID", value: "staff.staffId" },
  { label: "Staff Name", value: "staff.fullName" },
  { label: "Amount Requested", value: "amountRequested" },
  { label: "Approved By", value: "approvedBy" },
  { label: "Request Date", value: "createdAt" },
];

export const general = [
  {
    id: 0,
    name: "Dashboard",
    path: "/staff/dashboard",
    icon: <DashboardIcon fill="#fff" />,
    sec: <DashboardIcon fill="#086375" />,
  },
  {
    id: 1,
    name: "Profile",
    path: "/staff/profile",
    icon: <ProfileIcon fill="#fff" />,
    sec: <ProfileIcon fill="#086375" />,
  },
  {
    id: 2,
    name: "Schedule",
    path: "/staff/schedule",
    icon: <ScheduleIcon fill="#fff" />,
    sec: <ScheduleIcon fill="#086375" />,
  },
  {
    id: 3,
    name: "Loans",
    path: "/staff/loans",
    icon: <LoanIcon fill="#fff" />,
    sec: <LoanIcon fill="#086375" />,
  },

  {
    id: 4,
    name: "Leave",
    path: "/staff/leave",
    icon: <LeaveIcon fill="#fff" />,
    sec: <LeaveIcon fill="#086375" />,
  },
  {
    id: 5,
    name: "Medical",
    path: "/staff/medical-assistance",
    icon: <MedicalIcon fill="#fff" />,
    sec: <MedicalIcon fill="#086375" />,
  },
];

export const SecStatus = [
  { color: "#DB0101", name: "Inactive", bg: "#F09898" },
  { color: "#01765F", name: "Active", bg: "#E8FBF7" },
  { color: "#F9A11E", name: "Pending", bg: "#FCF2C4" },
];

export const LeaveStatus = [
  { color: "#DB0101", name: "Rejected", bg: "#F09898", border: "#DB0101" },
  { color: "#A11212", name: "Cancelled", bg: "#FCE8E8", border: "#DB0101" },
  { color: "#A11212", name: "Withdrawn", bg: "#FCE8E8", border: "#DB0101" },
  { color: "#01765F", name: "Approved", bg: "#E8FBF7", border: "#BAE0D9" },
  { color: "#0B841D", name: "Completed", bg: "#E5FFE5", border: "#BAE0D9" },
  { color: "#0B841D", name: "Active", bg: "#E5FFE5", border: "#BAE0D9" },
  { color: "#F9A11E", name: "Pending", bg: "#FCF2C4", border: "#F6DC52" },
];

export const LoanStatus = [
  { color: "#DB0101", name: "Declined", bg: "#F09898", border: "#DB0101" },
  { color: "#DB0101", name: "Cancelled", bg: "#F09898", border: "#DB0101" },
  { color: "#DB0101", name: "Withdrawn", bg: "#F09898", border: "#DB0101" },
  { color: "#01765F", name: "Approved", bg: "#E8FBF7", border: "#BAE0D9" },
  { color: "#0B841D", name: "Paid", bg: "#E5FFE5", border: "#BAE0D9" },
  { color: "#0B841D", name: "Active", bg: "#E5FFE5", border: "#BAE0D9" },
  { color: "#F9A11E", name: "Pending", bg: "#FCF2C4", border: "#F6DC52" },
  {
    color: "#F9A11E",
    name: "Repayment_In_Progress",
    bg: "#FCF2C4",
    border: "#F6DC52",
  },
];

export const types = [
  { label: "Paid", value: true },
  { label: "Unpaid", value: false },
];

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

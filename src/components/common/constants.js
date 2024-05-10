import {
  DashboardIcon,
  LeaveIcon,
  LoanIcon,
  MedicalIcon,
  ProfileIcon,
  ScheduleIcon,
} from "./images";

export const general = [
  {
    id: 0,
    name: "Dashboard",
    path: "/dashboard",
    icon: <DashboardIcon fill="#fff" />,
    sec: <DashboardIcon fill="#086375" />,
  },
  {
    id: 1,
    name: "Profile",
    path: "/profile",
    icon: <ProfileIcon fill="#fff" />,
    sec: <ProfileIcon fill="#086375" />,
  },
  {
    id: 2,
    name: "Schedule",
    path: "/schedule",
    icon: <ScheduleIcon fill="#fff" />,
    sec: <ScheduleIcon fill="#086375" />,
  },
  {
    id: 3,
    name: "Loans",
    path: "/loans",
    icon: <LoanIcon fill="#fff" />,
    sec: <LoanIcon fill="#086375" />,
  },

  {
    id: 4,
    name: "Leave",
    path: "/leave",
    icon: <LeaveIcon fill="#fff" />,
    sec: <LeaveIcon fill="#086375" />,
  },
  {
    id: 5,
    name: "Medical",
    path: "/medical",
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
  { color: "#01765F", name: "Approved", bg: "#E8FBF7", border: "#BAE0D9" },
  { color: "#F9A11E", name: "Pending", bg: "#FCF2C4", border: "#F9A11E" },
];

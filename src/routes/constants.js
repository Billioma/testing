export const PUBLIC_PATHS = {
  //STAFF
  NEW_LOGIN: "/staff/auth/new-login",
  LOGIN: "/staff/auth/login",
  NEW_PASS: "/staff/auth/new-password",
  FORGOT_PASS: "/staff/auth/forgot-password",
  CODE_VERIFICATION: "/staff/auth/code-verification",
  RESET_PASS: "/staff/auth/reset-password",

  // ADMIN ROUTES
  ADMIN_LOGIN: "/admin/auth/login",
  ADMIN_RESET_PASSWORD: "/admin/auth/reset-password",
  ADMIN_RESET_PASSWORD_LINK: "/admin/auth/reset-password-link",
};

export const PRIVATE_PATHS = {
  // STAFF
  DASHBOARD: "/staff/dashboard",
  PROFILE: "/staff/profile",
  SCHEDULE: "/staff/schedule",
  LOANS: "/staff/loans",
  LEAVE: "/staff/leave",
  REQUEST_LEAVE: "/staff/leave/request",
  LEAVE_DETAILS: "/staff/leave-request/:id",
  MEDICAL: "/staff/medical",

  // ADMIN ROUTES
  ADMIN_DASHBOARD: "/admin/dashboard",
  ADMIN_PROFILE: "/admin/profile",
  ADMIN_EDIT_PROFILE: "/admin/update-profile",

  ADMIN_STAFF_PROFILE: "/admin/staff-profiles",
  ADMIN_STAFF_PROFILE_DETAILS: "/admin/staff-profiles/:id",
  ADMIN_ADD_STAFF: "/admin/staff-profiles/create",
  ADMIN_LOAN: "/admin/loans",
  ADMIN_LOAN_DETAILS: "/admin/loans/:id",
  ADMIN_LEAVE_MGT: "/admin/leave-mgt",
  ADMIN_LEAVE_MGT_DEETAILS: "/admin/leave-mgt/:id",
  ADMIN_MEDICAL_ASSISTANCE: "/admin/medical-assistance",
  ADMIN_MEDICAL_ASSISTANCE_DETAILS: "/admin/medical-assistance/:id",
  ADMIN_STAFF_SCHEDULE: "/admin/staff-schedule",
};

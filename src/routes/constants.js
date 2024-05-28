export const PUBLIC_PATHS = {
  //STAFF
  NEW_LOGIN: "/staff/auth/new-login",
  NEW_USER: "/staff/auth/new-user",
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
  REQUEST_LOAN: "/staff/loans/request",
  LOAN_DETAILS: "/staff/loans/:id",
  UPDATE_LOAN: "/staff/loans/:id/update",
  LEAVE: "/staff/leave",
  REQUEST_LEAVE: "/staff/leave/request",
  LEAVE_DETAILS: "/staff/leave-request/:id",
  UPDATE_LEAVE: "/staff/leave-request/:id/update",
  MEDICAL: "/staff/medical-assistance",
  REQUEST_MEDICAL: "/staff/medical-assistance/request",
  MEDICAL_DETAILS: "/staff/medical-assistance/:id",
  UPDATE_MED: "/staff/medical-assistance/:id/update",

  // ADMIN ROUTES
  ADMIN_DASHBOARD: "/admin/dashboard",
  ADMIN_PROFILE: "/admin/profile",
  ADMIN_EDIT_PROFILE: "/admin/update-profile",

  ADMIN_STAFF_PROFILE: "/admin/staff-profiles",
  ADMIN_STAFF_PROFILE_DETAILS: "/admin/staff-profiles/:id",
  ADMIN_ADD_STAFF: "/admin/staff-profiles/create",
  ADMIN_LOAN: "/admin/loans",
  ADMIN_LOAN_DETAILS: "/admin/loans/:id",
  ADMIN_ADD_LOAN: "/admin/loans/create",
  ADMIN_LEAVE_MGT: "/admin/leave-mgt",
  ADMIN_ADD_LEAVE_MGT: "/admin/leave-mgt/create",
  ADMIN_LEAVE_MGT_DEETAILS: "/admin/leave-mgt/:id",
  ADMIN_MEDICAL_ASSISTANCE: "/admin/medical-assistance",
  ADMIN_ADD_MEDICAL_ASSISTANCE: "/admin/medical-assistance/create",
  ADMIN_MEDICAL_ASSISTANCE_DETAILS: "/admin/medical-assistance/:id",
  ADMIN_STAFF_SCHEDULE: "/admin/staff-schedule",
  ADMIN_SETTINGS: "/admin/settings",
  ADMIN_ADD_DEPT: "/admin/settings/department/create",
  ADMIN_VIEW_DEPT: "/admin/settings/department/:id",
  ADMIN_ADD_JOB: "/admin/settings/jobs/create",
  ADMIN_VIEW_JOB: "/admin/settings/jobs/:id",
};

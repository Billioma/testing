import * as Yup from "yup";

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

export const initValues = {
  staffId: "",
  password: "",
};

export const initOpPassValues = {
  currentPassword: "",
  password: "",
  passwordConfirmation: "",
};

export const opPassSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .required("Old Password is required")
    .matches(
      passwordRegex,
      "Minimum of 8 characters, and must contain at least one uppercase, one lowercase and one number",
    ),
  password: Yup.string()
    .required("Password is required")
    .matches(
      passwordRegex,
      "Minimum of 8 characters, and must contain at least one uppercase, one lowercase and one number",
    ),
  passwordConfirmation: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});

export const initAdminStaffValues = {
  fullName: "",
  phoneNumber: "",
  email: "",
  staffId: "",
  department: "",
  dateOfBirth: new Date(),
  nextOfKin: "",
  guarantor1: "",
  guarantor1Address: "",
  guarantor1Phone: "",
  guarantor2: "",
  guarantor2Address: "",
  guarantor2Phone: "",
  employmentLetter: false,
  guarantorForm: false,
  guarantorForm2: false,
  role: "",
  confidentialityAgreement: false,
  nonSolicitationAgreement: false,
  exclusivity: false,
  identificationDocument: false,
  nextOfKinAddress: "",
  residentialAddress: "",
  nextOfKinPhone: "",
  secondaryPhoneNumber: "",
  jobTitle: "",
  secondaryResidentialAddress: "",
  driverLicenseNumber: "",
  startDate: new Date(),
  monthlySalary: "",
  issueDate: new Date(),
  expiryDate: new Date(),
};

export const initAdminLeaveValues = {
  staff: "",
  startDate: new Date(),
  endDate: new Date(),
  isPaid: false,
  purpose: "",
  additionalComments: "",
};

export const initAdminLoanValues = {
  staff: "",
  amountRequested: "",
  purpose: "",
  additionalComments: "",
};

export const initAdminMedValues = {
  staffId: "",
  amount: "",
  purpose: "",
  additionalComments: "",
};

export const validateAdminLeaveSchema = Yup.object().shape({
  staff: Yup.object().required("Staff is required"),
  startDate: Yup.string().required("Start Date is required"),
  endDate: Yup.string().required("End Date is required"),
  purpose: Yup.object().required("Purpose is required"),
});

export const validateAdminMedSchema = Yup.object().shape({
  staffId: Yup.object().required("Staff is required"),
  amount: Yup.string().required("Amount is required"),
  purpose: Yup.object().required("Purpose is required"),
});

export const validateAdminLoanSchema = Yup.object().shape({
  staff: Yup.object().required("Staff is required"),
  amountRequested: Yup.string().required("Amount is required"),
  purpose: Yup.object().required("Purpose is required"),
});

export const validateAdminStaffSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  phoneNumber: Yup.string().required("Phone Number is required"),
  email: Yup.string().email().required("Email is required"),
  dateOfBirth: Yup.string().required("Date of Birth is required"),
  residentialAddress: Yup.string().required("Residential Address is required"),
  guarantor1: Yup.string().required("Guarantor 1 is required"),
  guarantor1Phone: Yup.string().required(
    "Guarantor 1 Phone Number is required",
  ),
  guarantor1Address: Yup.string().required("Guarantor 1 Address is required"),
  guarantor2: Yup.string().required("Guarantor 2 is required"),
  guarantor2Phone: Yup.string().required(
    "Guarantor 2 Phone Number is required",
  ),
  guarantor2Address: Yup.string().required("Guarantor 2 Address is required"),

  nextOfKin: Yup.string().required("Next of kin is required"),
  jobTitle: Yup.object().required("Job Title is required"),
  nextOfKinPhone: Yup.string().required("Next Of Kin Phone is required"),
  nextOfKinAddress: Yup.string().required("Next Of Kin Address is required"),

  staffId: Yup.string().required("Staff ID is required"),
  department: Yup.object().required("Department is required"),
  role: Yup.object().required("Role is required"),

  employmentLetter: Yup.string().required("Employment Letter is required"),
  guarantorForm: Yup.string().required("Guarantor Form is required"),
  guarantorForm2: Yup.string().required("Guarantor Form 2 is required"),
  confidentialityAgreement: Yup.string().required(
    "Confidentiality Agreement is required",
  ),
  nonSolicitationAgreement: Yup.string().required(
    "Non-Solicitation Agreement is required",
  ),
  exclusivity: Yup.string().required("exclusivity Agreement is required"),
  identificationDocument: Yup.string().required(
    "Identification Document is required",
  ),
});

export const initValue = {
  username: "",
  password: "",
};

export const initResetValues = {
  staffId: "",
};

export const initPassValues = {
  password: "",
  passwordConfirmation: "",
};

export const validateSchema = Yup.object().shape({
  staffId: Yup.string().required("Email is required"),
  password: Yup.string().required("Password required"),
});

export const validateSchemas = Yup.object().shape({
  username: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .required("Password required")
    .matches(
      passwordRegex,
      "Minimum of 8 characters, and must contain at least one uppercase, one lowercase and one number",
    ),
});

export const passwordSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .matches(
      passwordRegex,
      "Minimum of 8 characters, and must contain at least one uppercase, one lowercase and one number",
    ),
  passwordConfirmation: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});

export const validateResetSchema = Yup.object().shape({
  staffId: Yup.string().required("Email is required"),
});

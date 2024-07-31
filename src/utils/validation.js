import * as Yup from "yup";

export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

export const initOpPassValues = {
  currentPassword: "",
  password: "",
  passwordConfirmation: "",
};

export const initAdminStaffValues = {
  manager: "",
  dateOfIncident: new Date(),
  summary: "",
  staffInvolved: [""],
};

export const validateAdminStaffSchema = Yup.object().shape({
  manager: Yup.object().required("Manager on Duty is required"),
  summary: Yup.string().required("Summary is required"),
  staffInvolved: Yup.array().required("Staff is required"),
});

export const initClientPassValues = {
  password: "",
  passwordConfirmation: "",
};

export const initValues = {
  username: "",
  password: "",
};

export const initPolicyValues = {
  body: "",
  location: "",
  title: "",
  status: "",
};

export const initLocationValues = {
  address: "",
  amenities: "",
  description: "",
  geoLocation: "",
  locationType: "",
  state: "",
  status: "",
};

export const initZoneValues = {
  location: "",
  name: "",
  description: "",
  capacity: "",
  reservable: "",
  reservableSpace: "",
  geoLocation: "",
  minimumDuration: "",
  status: "",
  service: "",
  amenities: "",
};

export const initRateValues = {
  name: "",
  status: "",
  serviceType: "",
  durationType: "",
  durationStart: "",
  durationLimit: "",
  rateType: "",
  amount: "",
  zones: "",
};

export const validatePolicychema = Yup.object().shape({
  body: Yup.string().required("Body is required"),
  location: Yup.object().required("Location is required"),
  status: Yup.object().required("Status is required"),
  title: Yup.string().required("Title is required"),
});

export const validateLocationSchema = Yup.object().shape({
  address: Yup.string().required("Address is required"),
  amenities: Yup.array().required("Amenities is required"),
  description: Yup.string().required("Description is required"),
  locationType: Yup.object().required("Location Type is required"),
  status: Yup.object().required("Status is required"),
  state: Yup.object().required("State is required"),
});

export const validateZoneSchema = Yup.object().shape({
  location: Yup.object().required("Zone Location is required"),
  status: Yup.object().required("Status is required"),
  name: Yup.string().required("Zone Name is required"),
  description: Yup.string().required("Zone Description is required"),
  capacity: Yup.string().required("Zone Capacity is required"),
  minimumDuration: Yup.string().required("Minimum Duration is required"),
  service: Yup.object().required("Service is required"),
  amenities: Yup.array().required("Amenities is required"),
});

export const validateRateLimitSchema = Yup.object().shape({
  name: Yup.string().required("Rate Name is required"),
  status: Yup.object().required("Status is required"),
  serviceType: Yup.object().required("Service is required"),
  durationType: Yup.object().required("Duration Type is required"),
  durationStart: Yup.string().required("Duration Start is required"),
  durationLimit: Yup.string().required("Duration Limit is required"),
  rateType: Yup.object().required("Rate Type is required"),
  amount: Yup.string().required("Amount is required"),
  zones: Yup.array().required("Zone is required"),
});

export const validateRateSchema = Yup.object().shape({
  name: Yup.string().required("Rate Name is required"),
  serviceType: Yup.object().required("Service is required"),
  rateType: Yup.object().required("Rate Type is required"),
  status: Yup.object().required("Status is required"),
  amount: Yup.string().required("Amount is required"),
  zones: Yup.array().required("Zone is required"),
});

export const validateZoneSpaceSchema = Yup.object().shape({
  location: Yup.object().required("Zone Location is required"),
  status: Yup.object().required("Status is required"),
  name: Yup.string().required("Zone Name is required"),
  description: Yup.string().required("Zone Description is required"),
  capacity: Yup.string().required("Zone Capacity is required"),
  reservableSpace: Yup.string().required("Reservable Space is required"),
  minimumDuration: Yup.string().required("Minimum Duration is required"),
  service: Yup.object().required("Service is required"),
  amenities: Yup.array().required("Amenities is required"),
});

export const initAttendantValues = {
  accountType: "",
  location: "",
  name: "",
  password: "",
  passwordConfirmation: "",
  status: 0,
  userId: "",
};

export const initClientValues = {
  name: "",
  email: "",
  billingEmail: "",
  contactPerson: "",
  phone: "",
  address: "",
  state: "",
  password: "",
  passwordConfirmation: "",
  accountType: "",
  managers: "",
  status: "",
};

export const initPermisisonValues = {
  name: "",
  displayName: "",
  tableName: "",
};

export const initAttendantsValues = {
  name: "",
  userId: "",
  operator: "",
  accountType: "",
  locations: "",
  status: "",
};

export const initAdminLocationValues = {
  name: "",
  description: "",
  geoLocation: "",
  address: "",
  state: "",
  operator: "",
  client: "",
  locationType: "",
  amenities: "",
  managers: "",
  enableTips: 0,
  isSubApplicable: 0,
  status: "",
};

export const initAdminZoneValues = {
  name: "",
  description: "",
  capacity: "",
  location: "",
  minimumDuration: "",
  service: "",
  amenities: "",
  reservable: 0,
  reservableSpace: "",
  showBillingType: "",
  billingType: null,
  status: "",
};

export const initAdminRateValues = {
  name: "",
  operator: "",
  service: "",
  rateType: "",
  amount: "",
  noLimit: 0,
  durationStart: "",
  durationLimit: "",
  flatRate: 0,
  showCarServiceType: 0,
  carServiceType: "",
  status: "",
  zones: "",
};

export const initAdminAmenitiesValues = {
  name: "",
  description: "",
  status: "",
};

export const initAdminPoliciesValues = {
  title: "",
  body: "",
  location: "",
  status: "",
};

export const initEventValues = {
  name: "",
  description: "",
  address: "",
  website: "",
  eventStartDateTime: new Date(),
  eventEndDateTime: new Date(),
  client: "",
  status: "",
  paymentRequired: 0,
  price: "",
  zones: "",
};

export const initAdminValues = {
  firstName: "",
  lastName: "",
  email: "",
  isManager: 0,
  role: "",
  password: "",
  passwordConfirmation: "",
  status: "",
  attendant: "",
};

export const initVehicleValues = {
  licensePlate: "",
  customer: "",
  color: "",
  state: "",
  make: "",
  model: "",
  status: 1,
};

export const initOperatorValues = {
  name: "",
  email: "",
  phone: "",
  enableTips: 0,
  address: "",
  contactPerson: "",
  state: "",
  password: "",
  passwordConfirmation: "",
  status: "",
};

export const initClientInvoiceValues = {
  client: "",
  taxRate: "",
  invoiceDate: "",
  dueDate: "",
  serviceDate: "",
};

export const passValues = {
  password: "",
  passwordConfirmation: "",
};

export const passwordValues = {
  currentPassword: "",
  password: "",
  passwordConfirmation: "",
};

export const emailValue = {
  email: "",
  password: "",
};

export const signValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  passwordConfirmation: "",
};

export const opSignValues = {
  businessName: "",
  email: "",
  phone: "",
  password: "",
  passwordConfirmation: "",
};

export const validateAttendantSchema = Yup.object().shape({
  accountType: Yup.object().required("Account Type is required"),
  location: Yup.array().required("Location is required"),
  name: Yup.string().required("Full Name is required"),
  password: Yup.string()
    .required("Password required")
    .matches(
      passwordRegex,
      "Minimum of 8 characters, and must contain at least one uppercase, one lowercase and one number"
    ),
  passwordConfirmation: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
  userId: Yup.string().required("User Id is required"),
});

export const initCustomerValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  companyName: "",
  status: "",
  password: "",
  passwordConfirmation: "",
};

export const validateClientSchema = Yup.object().shape({
  name: Yup.string().required("Full Name is required"),
  email: Yup.string().email().required("Email is required"),
  billingEmail: Yup.string().required("Email is required"),
  contactPerson: Yup.string().required("Contact is required"),
  phone: Yup.string().required("Phone Numnber is required"),
  address: Yup.string().required("Address is required"),
  state: Yup.object().required("State is required"),
  password: Yup.string()
    .required("Password required")
    .matches(
      passwordRegex,
      "Minimum of 8 characters, and must contain at least one uppercase, one lowercase and one number"
    ),
  passwordConfirmation: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
  accountType: Yup.object().required("Account Type is required"),
  managers: Yup.array().required("A Manager is required"),
  status: Yup.object().required("Status is required"),
});

export const validatePermissionSchema = Yup.object().shape({
  name: Yup.string().required("Permission Name is required"),
  displayName: Yup.string().required("Display Name is required"),
  tableName: Yup.string().required("Group Name is required"),
});

export const validateCustomerSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Contact is required"),
  phone: Yup.string().required("Phone Numnber is required"),
  password: Yup.string()
    .required("Password required")
    .matches(
      passwordRegex,
      "Minimum of 8 characters, and must contain at least one uppercase, one lowercase and one number"
    ),
  passwordConfirmation: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
  status: Yup.object().required("Status is required"),
});

export const validateAttendantsSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  userId: Yup.string().required("User ID is required"),
  password: Yup.string()
    .required("Password required")
    .matches(
      passwordRegex,
      "Minimum of 8 characters, and must contain at least one uppercase, one lowercase and one number"
    ),
  passwordConfirmation: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
  operator: Yup.object().required("Operator is required"),
  accountType: Yup.object().required("Account type is required"),
  status: Yup.object().required("Status is required"),
  locations: Yup.array().required("Locations is required"),
});

export const validateAdminLocationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  address: Yup.string().required("Address is required"),
  state: Yup.object().required("State is required"),
  operator: Yup.object().required("Operator is required"),
  client: Yup.object().required("Client is required"),
  locationType: Yup.object().required("Location type is required"),
  amenities: Yup.array().required("Amenities is required"),
  managers: Yup.array().required("Manager is required"),
  status: Yup.object().required("Status is required"),
});

export const validateAdminZoneSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  capacity: Yup.string().required("Capacity is required"),
  location: Yup.object().required("Location is required"),
  minimumDuration: Yup.string().required("Minimum Duration is required"),
  service: Yup.object().required("Service is required"),
  amenities: Yup.array().required("Amenities is required"),
  status: Yup.object().required("Status is required"),
});

export const validateAdminRateSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  zones: Yup.array().required("Zone is required"),
  operator: Yup.object().required("Operator is required"),
  service: Yup.object().required("Service is required"),
  rateType: Yup.object().required("Rate Type is required"),
  amount: Yup.string().required("Amount is required"),
  durationStart: Yup.string().required("Duration Start is required"),
  durationLimit: Yup.string().required("Duration Limit is required"),
  status: Yup.object().required("Status is required"),
});

export const validateAdminAmenitiesSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  status: Yup.object().required("Status is required"),
});

export const validateAdminPoliciesSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  body: Yup.string().required("Description is required"),
  location: Yup.object().required("Location is required"),
  status: Yup.object().required("Status is required"),
});

export const validateEventSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  address: Yup.string().required("Address is required"),
  eventStartDateTime: Yup.string().required("Start Date is required"),
  eventEndDateTime: Yup.string().required("End Date is required"),
  client: Yup.object().required("Client is required"),
  status: Yup.object().required("Status is required"),
  zones: Yup.array().required("Zone is required"),
});

export const validateEventPriceSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  address: Yup.string().required("Address is required"),
  eventStartDateTime: Yup.string().required("Start Date is required"),
  eventEndDateTime: Yup.string().required("End Date is required"),
  price: Yup.string().required("Price is required"),
  client: Yup.object().required("Client is required"),
  status: Yup.object().required("Status is required"),
});

export const validateAdminSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Email is required"),
  password: Yup.string()
    .required("Password required")
    .matches(
      passwordRegex,
      "Minimum of 8 characters, and must contain at least one uppercase, one lowercase and one number"
    ),
  passwordConfirmation: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
  role: Yup.object().required("Role is required"),
  status: Yup.object().required("Status is required"),
  attendant: Yup.object().required("Attendant is required"),
});

export const validateVehicleSchema = Yup.object().shape({
  licensePlate: Yup.string().required("License Plate is required"),
  customer: Yup.object().required("Customer is required"),
  color: Yup.object().required("Color is required"),
  state: Yup.object().required("State is required"),
  make: Yup.object().required("Make is required"),
  model: Yup.object().required("Model is required"),
});

export const validateOperatorSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Email is required"),
  phone: Yup.string().required("Phone is required"),
  address: Yup.string().required("Address is required"),
  contactPerson: Yup.string().required("Contact Person is required"),
  password: Yup.string()
    .required("Password required")
    .matches(
      passwordRegex,
      "Minimum of 8 characters, and must contain at least one uppercase, one lowercase and one number"
    ),
  passwordConfirmation: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
  state: Yup.object().required("State is required"),
  status: Yup.object().required("Status is required"),
});

export const validateClientInvoiceSchema = Yup.object().shape({
  client: Yup.object().required("Client is required"),
  taxRate: Yup.string().required().required("Tax Rate is required"),
  invoiceDate: Yup.string().required().required("Invoice Date is required"),
  dueDate: Yup.string().required("Due Date is required"),
});

export const validateSchema = Yup.object().shape({
  username: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .required("Password required")
    .matches(
      passwordRegex,
      "Minimum of 8 characters, and must contain at least one uppercase, one lowercase and one number"
    ),
});

export const opPassSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .required("Old Password is required")
    .matches(
      passwordRegex,
      "Minimum of 8 characters, and must contain at least one uppercase, one lowercase and one number"
    ),
  password: Yup.string()
    .required("Password is required")
    .matches(
      passwordRegex,
      "Minimum of 8 characters, and must contain at least one uppercase, one lowercase and one number"
    ),
  passwordConfirmation: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});

export const clientPassSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .matches(
      passwordRegex,
      "Minimum of 8 characters, and must contain at least one uppercase, one lowercase and one number"
    ),
  passwordConfirmation: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});

export const passSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .matches(
      passwordRegex,
      "Minimum of 8 characters, and must contain at least one uppercase, one lowercase and one number"
    ),
  passwordConfirmation: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});

export const passwordSchema = Yup.object().shape({
  currentPassword: Yup.string().required("Password is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      passwordRegex,
      "Minimum of 8 characters, and must contain at least one uppercase, one lowercase and one number"
    ),
  passwordConfirmation: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});

export const signSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  phone: Yup.string().required("Phone Number is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      passwordRegex,
      "Minimum of 8 characters, and must contain at least one uppercase, one lowercase and one number"
    ),
  passwordConfirmation: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});

export const opSignSchema = Yup.object().shape({
  businessName: Yup.string().required("Business Name is required"),
  email: Yup.string().email().required("Email is required"),
  phone: Yup.string().required("Phone Number is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      passwordRegex,
      "Minimum of 8 characters, and must contain at least one uppercase, one lowercase and one number"
    ),
  passwordConfirmation: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});

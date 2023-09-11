import * as Yup from "yup";

export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

export const initValues = {
  username: "",
  password: "",
};

export const initPolicyValues = {
  body: "",
  location: "",
  title: "",
  status: 1,
};

export const initLocationValues = {
  address: "",
  amenities: "",
  description: "",
  geoLocation: "",
  locationType: "",
  state: "",
  status: 1,
};

export const validatePolicychema = Yup.object().shape({
  body: Yup.string().required("Body is required"),
  location: Yup.object().required("Location is required"),
  title: Yup.string().required("Title is required"),
});

export const validateLocationSchema = Yup.object().shape({
  address: Yup.string().required("Address is required"),
  amenities: Yup.array().required("Amenities is required"),
  description: Yup.string().required("Description is required"),
  geoLocation: Yup.string().required("Geo Location is required"),
  locationType: Yup.object().required("Location Type is required"),
  state: Yup.object().required("State is required"),
});

export const initAttendantValues = {
  accountType: "",
  location: "",
  name: "",
  password: "",
  passwordConfirmation: "",
  status: 1,
  userId: "",
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

export const validateSchema = Yup.object().shape({
  username: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .required("Password required")
    .matches(
      passwordRegex,
      "Minimum of 8 characters, and must contain at least one uppercase, one lowercase and one number"
    ),
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

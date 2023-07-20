import * as Yup from "yup";

export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

export const initValues = {
  username: "",
  password: "",
};

export const passValues = {
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

export const validateSchema = Yup.object().shape({
  username: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .required("Password required")
    .matches(
      passwordRegex,
      "Minimum of 8 characters, and must contain at least one uppercase, one lowercase, one number and one special  character"
    ),
});

export const passSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .matches(
      passwordRegex,
      "Minimum of 8 characters, and must contain at least one uppercase, one lowercase, one number and one special  character"
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
      "Minimum of 8 characters, and must contain at least one uppercase, one lowercase, one number and one special  character"
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
      "Minimum of 8 characters, and must contain at least one uppercase, one lowercase, one number and one special  character"
    ),
  passwordConfirmation: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});

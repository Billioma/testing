import * as Yup from "yup";

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

export const initValues = {
  staffId: "",
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

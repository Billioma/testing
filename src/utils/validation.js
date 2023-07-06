import * as Yup from "yup";

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;

export const initValues = {
  email: "",
  password: "",
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
  confirmPassword: "",
};

export const validateSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .required("Password required")
    .matches(
      passwordRegex,
      "Must Be More Than 8 Digits And Must Contain One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
});

export const signSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  phone: Yup.string().required("Phone Number is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be more than 8 characters")
    .matches(
      passwordRegex,
      "Must Be More Than 8 Digits And Must Contain One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});

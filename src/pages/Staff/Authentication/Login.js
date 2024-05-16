import React, { useState } from "react";
import { Box, Button, Checkbox, Flex, Text } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import { Form, Formik } from "formik";
import { initValues, validateSchema } from "../../../utils/validation";
import ReCAPTCHA from "react-google-recaptcha";
import { useLogin } from "../../../services/staff/query/auth";
import useCustomToast from "../../../utils/notifications";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [show, setShow] = useState(false);

  const { errorToast } = useCustomToast();
  const navigate = useNavigate();
  const { mutate, isLoading } = useLogin({
    onSuccess: (res) => {
      localStorage.setItem("staff", JSON.stringify(res));
      navigate("/staff/dashboard");
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred"
      );
    },
  });

  const [checked, setChecked] = useState("");

  const handleSubmit = (values = "") => {
    if (isLoading) {
      return null;
    } else if (checked) {
      mutate(values);
    } else {
      errorToast("Please check the box");
    }
  };

  function onChange() {
    setChecked(true);
  }

  return (
    <Box>
      <Flex align="center" fontFamily="Cooper" gap="4px">
        <Text color="#0C133B" fontSize="20px" fontWeight={900}>
          Managr
        </Text>

        <Flex
          border="1px solid #0C133B"
          w="13px"
          h="13px"
          fontSize="8px"
          fontWeight={900}
          rounded="full"
          justifyContent="center"
          alignContent="center"
        >
          R
        </Flex>
      </Flex>

      <Text mt="40px" fontSize="40px" color="#090c02" fontWeight={700}>
        Welcome Back!
      </Text>

      <Text opacity={0.5} color="#090c02" fontWeight={500}>
        Access and manage your account seamlessly.
      </Text>

      <Box color="#090c02" mt="32px">
        <Formik
          onSubmit={handleSubmit}
          initialValues={initValues}
          validationSchema={validateSchema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isValid,
            dirty,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Box>
                <Text fontWeight={700} mb="9px" fontSize="10px">
                  EMPLOYEE ID
                </Text>
                <CustomInput
                  holder="Employee ID"
                  opt
                  mb
                  value={values?.staffId}
                  onChange={handleChange}
                  name="staffId"
                  onBlur={handleBlur}
                  error={errors?.staffId && touched?.staffId && errors?.staffId}
                />
              </Box>

              <Box mt="20px">
                <Text fontWeight={700} mb="9px" fontSize="10px">
                  PASSWORD
                </Text>
                <CustomInput
                  holder="Password"
                  mb
                  show
                  onClick={() => setShow((prev) => !prev)}
                  password={show ? false : true}
                  type={show ? "text" : "password"}
                  opt
                  value={values?.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="password"
                  error={
                    errors?.password && touched?.password && errors?.password
                  }
                />
              </Box>

              <Flex
                display={isLoading ? "flex" : "none"}
                mt="9px"
                align="center"
                gap="5px"
              >
                <Box className="loader" />
                <Text color="#086375" fontSize="14px">
                  Verifying...
                </Text>
              </Flex>

              <Flex
                fontSize="12px"
                mt="9px"
                w="full"
                align="center"
                justifyContent="space-between"
              >
                <Flex gap="7px" align="center">
                  <Checkbox />
                  <Text color="#090c02" fontWeight={500}>
                    Remember me
                  </Text>
                </Flex>

                <Text
                  onClick={() => navigate("/forgot-password")}
                  cursor="pointer"
                  fontWeight={500}
                  color="#086375"
                >
                  Forgot Password?
                </Text>
              </Flex>

              <Box mt="24px">
                <ReCAPTCHA
                  sitekey="6LdN7d4UAAAAAGGTI0wkD2ZlpJLfm6PbpFOQnFx9"
                  onChange={onChange}
                />
              </Box>

              <Button
                my="42px"
                cursor={isLoading ? "text" : "pointer"}
                type="submit"
                isDisabled={!isValid || !dirty || !checked}
                opacity={isLoading ? 0.7 : 1}
                w="full"
                h="60px"
                fontSize="18px"
              >
                Sign In
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default Login;

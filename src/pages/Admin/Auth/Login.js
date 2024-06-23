import React, { useState } from "react";
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import AdminCustomInput from "../../../components/common/AdminCustomInput";
import { Form, Formik } from "formik";
import { useLogin } from "../../../services/admin/query/auth";
import { useNavigate } from "react-router-dom";
import useCustomToast from "../../../utils/notifications";
import ReCAPTCHA from "react-google-recaptcha";
import { initValue, validateSchemas } from "../../../utils/validation";

const Login = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { errorToast } = useCustomToast();

  const { mutate, isLoading } = useLogin({
    onSuccess: (data) => {
      localStorage.setItem("admin", JSON.stringify(data));
      navigate("/admin/dashboard");
    },

    onError: (error) => {
      errorToast(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to login. Try again.",
      );
    },
  });

  const [checked, setChecked] = useState("");

  const handleSubmit = (values = "") => {
    if (checked) {
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
      <Flex
        flexDir="column"
        boxShadow="0px 0px 15px 0px #0863751A"
        py={{ base: "30px", md: "70px" }}
        bg="#fff"
        borderRadius="40px"
        pos="relative"
        px={{ base: "20px", md: "64px" }}
      >
        <Image
          pos="absolute"
          right="-12"
          src="/assets/cal.svg"
          w="131px"
          h="131px"
          display={{ base: "none", md: "flex" }}
          objectFit="contain"
        />

        <Flex flexDir="column" justifyContent="center" align="center">
          <Text textAlign="center" fontWeight={700} fontSize="40px">
            Admin Login
          </Text>

          <Text textAlign="center" opacity={0.5} mt="14px">
            Welcome back! Login to manage employee records and streamline
            processes
          </Text>
        </Flex>

        <Box mt="42px">
          <Formik
            onSubmit={handleSubmit}
            initialValues={initValue}
            validationSchema={validateSchemas}
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
                <Box w="full">
                  <AdminCustomInput
                    name="username"
                    curve
                    mb
                    opt
                    value={values?.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors?.username && touched?.username}
                    holder="Email"
                  />
                </Box>

                <Box mt="32px" mb="24px" w="full">
                  <AdminCustomInput
                    name="password"
                    curve
                    mb
                    opt
                    value={values?.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors?.password && touched?.password}
                    holder="Password"
                    onClick={() => setShow((prev) => !prev)}
                    password={show ? false : true}
                    show
                    type={show ? "text" : "password"}
                  />
                </Box>

                <ReCAPTCHA
                  sitekey="6LdN7d4UAAAAAGGTI0wkD2ZlpJLfm6PbpFOQnFx9"
                  onChange={onChange}
                />

                <Button
                  isDisabled={!isValid || !dirty || !checked}
                  isLoading={isLoading}
                  type="submit"
                  w="full"
                  mt="80px"
                  h="60px"
                  bg="#086375"
                >
                  Sign In
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
        <Image
          pos="absolute"
          bottom="24%"
          left="-12"
          src="/assets/note.svg"
          display={{ base: "none", md: "flex" }}
          w="120px"
          h="120px"
          objectFit="contain"
        />
      </Flex>

      <Box
        pos="absolute"
        left="0"
        zIndex={-1}
        w="60%"
        align="center"
        bottom="20%"
        transform="translateX(33%)"
        h="0.5px"
        bg="#000"
      ></Box>
    </Box>
  );
};

export default Login;

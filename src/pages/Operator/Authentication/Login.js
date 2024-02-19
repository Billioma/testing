import React, { useState } from "react";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import CustomInput from "../../../components/common/CustomInput";
import { Checkbox } from "@chakra-ui/checkbox";
import { Button } from "@chakra-ui/button";
import { initValues, validateSchema } from "../../../utils/validation";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router";
import useCustomToast from "../../../utils/notifications";
import { useOperatorLogin } from "../../../services/operator/query/auth";
import ReCAPTCHA from "react-google-recaptcha";

const Login = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const { errorToast } = useCustomToast();
  const { mutate, isLoading } = useOperatorLogin({
    onSuccess: (res) => {
      localStorage.setItem("operator", JSON.stringify(res));
      navigate("/operator/dashboard");
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred"
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
    <Flex
      justifyContent="center"
      w="full"
      align="center"
      h={{ base: "90vh", md: "90vh" }}
      flexDir="column"
    >
      <Flex
        justifyContent="center"
        w={{ base: "full", md: "50%", lg: "35%" }}
        flexDir="column"
      >
        <Flex justifyContent="center" align="center" flexDir="column">
          <Image src="/assets/logo.svg" w="312px" h="48px" />
        </Flex>
        <Text textAlign="center" fontSize="24px" mt="56px" fontWeight={700}>
          Operator Login
        </Text>

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
              <Box mt="32px">
                <Text
                  mb="10px"
                  fontWeight={500}
                  color="#444648"
                  fontSize="10px"
                >
                  Email Address
                </Text>
                <CustomInput
                  name="username"
                  mb
                  value={values?.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    errors?.username && touched?.username && errors?.username
                  }
                  holder="Enter Email address"
                />
              </Box>
              <Box mt="24px">
                <Text
                  mb="10px"
                  fontWeight={500}
                  color="#444648"
                  fontSize="10px"
                >
                  Password
                </Text>
                <CustomInput
                  mb
                  holder="Enter Password"
                  value={values?.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="password"
                  error={
                    errors?.password && touched?.password && errors?.password
                  }
                  onClick={() => setShow((prev) => !prev)}
                  password={show ? false : true}
                  show
                  type={show ? "text" : "password"}
                />
              </Box>
              <Flex
                fontSize="12px"
                my="24px"
                w="full"
                align="center"
                justifyContent="space-between"
              >
                <Flex gap="8px" align="center">
                  <Checkbox />
                  <Text color="#646668">Remember me</Text>
                </Flex>

                <Text
                  onClick={() => navigate("/operator/auth/forgot-password")}
                  cursor="pointer"
                  fontWeight={700}
                  color="red"
                >
                  Forgot Password
                </Text>
              </Flex>

              <ReCAPTCHA
                sitekey="6LdN7d4UAAAAAGGTI0wkD2ZlpJLfm6PbpFOQnFx9"
                onChange={onChange}
              />

              <Button
              mt="20px"
                isLoading={isLoading}
                isDisabled={!isValid || !dirty || !checked}
                type="submit"
                w="full"
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Flex>
    </Flex>
  );
};

export default Login;

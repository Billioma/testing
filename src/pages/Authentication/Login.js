import React, { useState } from "react";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import CustomInput from "../../components/common/CustomInput";
import { Checkbox } from "@chakra-ui/checkbox";
import { Button } from "@chakra-ui/button";
import { initValues, validateSchema } from "../../utils/validation";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router";
import useCustomToast from "../../utils/notifications";
import { useLogin } from "../../services/query/auth";

const Login = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const { successToast, errorToast } = useCustomToast();
  const { mutate, isLoading } = useLogin({
    onSuccess: (res) => {
      sessionStorage.setItem("user", JSON.stringify(res));
      successToast("Logged In");
      setTimeout(() => {
        navigate("/dashboard");
      }, 200);
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occured"
      );
    },
  });
  const handleSubmit = (values = "") => {
    mutate(values);
  };

  return (
    <Flex
      justifyContent="center"
      w="full"
      align="center"
      h={{ base: "90vh", md: "100vh" }}
      flexDir="column"
    >
      <Flex
        justifyContent="center"
        w={{ base: "full", md: "50%", lg: "35%" }}
        flexDir="column"
      >
        <Flex justifyContent="center" align="center" flexDir="column">
          <Image src="/assets/logo.svg" w="364px" h="56px" />
        </Flex>
        <Text textAlign="center" fontSize="24px" mt="56px" fontWeight={700}>
          Login
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
                  error={errors?.username && touched?.username && errors?.username}
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
                  onClick={() => navigate("/reset-password")}
                  cursor="pointer"
                  fontWeight={700}
                  color="red"
                >
                  Forgot Password
                </Text>
              </Flex>

              <Button
                isLoading={isLoading}
                isDisabled={!isValid || !dirty}
                type="submit"
                w="full"
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>

        <Text textAlign="center" mt="32px" color="#646668" fontSize="14px">
          Don't have an account ?{" "}
          <span
            onClick={() => navigate("/signup")}
            style={{ color: "red", fontWeight: 500, cursor: "pointer" }}
          >
            Sign Up
          </span>
        </Text>
      </Flex>
    </Flex>
  );
};

export default Login;

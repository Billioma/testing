import React, { useEffect, useRef, useState } from "react";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import CustomInput from "../../../components/common/CustomInput";
import { Checkbox } from "@chakra-ui/checkbox";
import { Button } from "@chakra-ui/button";
import { initValues, validateSchema } from "../../../utils/validation";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import useCustomToast from "../../../utils/notifications";
import { useCustomerLogin } from "../../../services/customer/query/auth";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";

const Login = () => {
  const { redirect } = useParams();
  const userCaptchaInputRef = useRef(null);
  const [captcha, setCaptcha] = useState("");

  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const { errorToast } = useCustomToast();
  const { mutate, isLoading } = useCustomerLogin({
    onSuccess: (res) => {
      setCaptcha("");
      setCaptcha("");
      localStorage.setItem("customer", JSON.stringify(res));
      localStorage.setItem("login", "login");
      if (redirect?.includes("pay-to-park")) {
        navigate("/customer/services/pay-to-park");
      } else if (redirect?.includes("reserve")) {
        navigate("/customer/services/reserve-parking");
      } else if (redirect?.includes("event")) {
        navigate("/customer/services/event-parking");
      } else if (redirect?.includes("car")) {
        navigate("/customer/services/car-service");
      } else {
        navigate("/customer/dashboard");
      }
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred"
      );
    },
  });

  const handleSubmit = (values = "") => {
    if (validateCaptcha(captcha)) {
      mutate(values);
    } else {
      errorToast("Captcha Does Not Match");
      setCaptcha("");
    }
  };

  const [showCanvas, setShowCanvas] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (password) {
      setShowCanvas(true);
      setTimeout(() => {
        loadCaptchaEnginge(6);
      }, 2000);
    }
  }, [password]);

  return (
    <Flex justifyContent="center" w="full" align="center" flexDir="column">
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
                  onChange={(e) => {
                    handleChange(e);
                    setPassword(e);
                  }}
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
                  onClick={() => navigate("/customer/auth/forgot-password")}
                  cursor="pointer"
                  fontWeight={700}
                  color="red"
                >
                  Forgot Password
                </Text>
              </Flex>

              {showCanvas ? (
                <>
                  <LoadCanvasTemplate />{" "}
                  <CustomInput
                    onChange={(e) => setCaptcha(e.target.value)}
                    value={captcha}
                    holder="Enter Captcha Value"
                    id="user_captcha_input"
                    name="user_captcha_input"
                    ref={userCaptchaInputRef}
                  />
                </>
              ) : (
                ""
              )}

              <Button
                isLoading={isLoading}
                isDisabled={!isValid || !dirty || !captcha}
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
            onClick={() => {
              navigate("/customer/auth/signup");
              sessionStorage.setItem("redirect", redirect);
            }}
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

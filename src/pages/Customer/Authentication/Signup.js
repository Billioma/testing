import React, { useState } from "react";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import CustomInput from "../../../components/common/CustomInput";
import { Checkbox } from "@chakra-ui/checkbox";
import { Button } from "@chakra-ui/button";
import { signValues, signSchema } from "../../../utils/validation";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router";
import { useCustomerRegister } from "../../../services/query/auth";
import useCustomToast from "../../../utils/notifications";

const Signup = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const { successToast, errorToast } = useCustomToast();
  const { mutate, isLoading } = useCustomerRegister({
    onSuccess: () => {
      successToast("User created");
      setTimeout(() => {
        navigate("/customer/auth/login");
      }, 200);
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occured"
      );
    },
  });
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = (values = "") => {
    const phoneNumber = `+234${values.phone}`;
    mutate({ ...values, phone: phoneNumber });
  };

  return (
    <Flex
      justifyContent="center"
      w="full"
      align="center"
      overflowY="scroll"
      // h={{ base: "90vh", md: "100vh" }}
      py={{ base: "40px", md: "0" }}
      flexDir="column"
    >
      <Flex
        justifyContent="center"
        w={{ base: "full", md: "50%", lg: "35%" }}
        flexDir="column"
      >
        <Flex justifyContent="center" align="center" flexDir="column">
          <Image src="/assets/logo.svg" w="314px" h="45px" />
        </Flex>

        <Text textAlign="center" fontSize="24px" mt="10px" fontWeight={700}>
          Sign Up
        </Text>

        <Formik
          onSubmit={handleSubmit}
          initialValues={signValues}
          validationSchema={signSchema}
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
              <Flex
                mt="10px"
                w="full"
                flexDir={{ base: "column", md: "row" }}
                align="center"
                gap="20px"
              >
                <Box w="full">
                  <Text
                    mb="8px"
                    fontWeight={500}
                    color="#444648"
                    fontSize="10px"
                  >
                    First Name
                  </Text>
                  <CustomInput
                    mb
                    name="firstName"
                    value={values?.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      errors?.firstName &&
                      touched?.firstName &&
                      errors?.firstName
                    }
                    holder="Enter First Name"
                  />
                </Box>
                <Box w="full">
                  <Text
                    mb="8px"
                    fontWeight={500}
                    color="#444648"
                    fontSize="10px"
                  >
                    Last Name
                  </Text>
                  <CustomInput
                    mb
                    name="lastName"
                    value={values?.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      errors?.lastName && touched?.lastName && errors?.lastName
                    }
                    holder="Enter Last Name"
                  />
                </Box>
              </Flex>
              <Box mt="10px">
                <Text mb="8px" fontWeight={500} color="#444648" fontSize="10px">
                  Email Address
                </Text>
                <CustomInput
                  mb
                  name="email"
                  value={values?.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors?.email && touched?.email && errors?.email}
                  holder="Enter Email address"
                />
              </Box>
              <Box mt="10px">
                <Text mb="8px" fontWeight={500} color="#444648" fontSize="10px">
                  Phone Number
                </Text>
                <CustomInput
                  mb
                  ngn
                  name="phone"
                  value={`${values?.phone}`}
                  onChange={(e) => {
                    const inputPhone = e.target.value
                      .replace(/\D/g, "")
                      .slice(0, 10);
                    handleChange({
                      target: {
                        name: "phone",
                        value: `${inputPhone}`,
                      },
                    });
                  }}
                  onBlur={handleBlur}
                  error={errors?.phone && touched?.phone && errors?.phone}
                  holder="Enter Phone Number"
                />
              </Box>
              <Box mt="10px">
                <Text mb="8px" fontWeight={500} color="#444648" fontSize="10px">
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
              <Box mt="10px">
                <Text mb="8px" fontWeight={500} color="#444648" fontSize="10px">
                  Confirm Password
                </Text>
                <CustomInput
                  mb
                  holder="Confirm Password"
                  value={values?.passwordConfirmation}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="passwordConfirmation"
                  error={
                    errors?.passwordConfirmation &&
                    touched?.passwordConfirmation &&
                    errors?.passwordConfirmation
                  }
                  onClick={() => setShow((prev) => !prev)}
                  password={show ? false : true}
                  show
                  type={show ? "text" : "password"}
                />
                <Text
                  mt="8px"
                  fontSize="10px"
                  cursor="pointer"
                  color="#1C0203"
                  textAlign="end"
                >
                  Same password as above
                </Text>
              </Box>
              <Flex fontSize="12px" my="10px" w="full" gap="8px" align="center">
                <Checkbox
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                />
                <Text color="#646668">
                  Accept{" "}
                  <span style={{ color: "#EE383A" }}>terms and condition</span>{" "}
                </Text>
              </Flex>

              <Button
                isLoading={isLoading}
                isDisabled={!isValid || !dirty || !isChecked}
                type="submit"
                w="full"
              >
                Create Account
              </Button>
            </Form>
          )}
        </Formik>

        <Text textAlign="center" mt="20px" color="#646668" fontSize="14px">
          Already have an account ?{" "}
          <span
            onClick={() => navigate("/customer/auth/login")}
            style={{ color: "red", fontWeight: 500, cursor: "pointer" }}
          >
            Login
          </span>
        </Text>
      </Flex>
    </Flex>
  );
};

export default Signup;

import React, { useState } from "react";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import CustomInput from "../../components/common/CustomInput";
import { Checkbox } from "@chakra-ui/checkbox";
import { Button } from "@chakra-ui/button";
import { signValues, signSchema } from "../../utils/validation";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router";

const Signup = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (values = "") => {
    console.log(values);
  };

  return (
    <Flex
      justifyContent="center"
      w="full"
      align="center"
      py={{ base: "40px", md: "30px" }}
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

        <Text textAlign="center" fontSize="24px" mt="20px" fontWeight={700}>
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
                mt="20px"
                w="full"
                flexDir={{ base: "column", md: "row" }}
                align="center"
                gap="20px"
              >
                <Box w="full">
                  <Text fontWeight={500} color="#444648" fontSize="10px">
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
                    placeholder="Enter First Name"
                  />
                </Box>
                <Box w="full">
                  <Text fontWeight={500} color="#444648" fontSize="10px">
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
                    placeholder="Enter Last Name"
                  />
                </Box>
              </Flex>
              <Box mt="20px">
                <Text fontWeight={500} color="#444648" fontSize="10px">
                  Email Address
                </Text>
                <CustomInput
                  mb
                  name="email"
                  value={values?.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors?.email && touched?.email && errors?.email}
                  placeholder="Enter Email address"
                />
              </Box>
              <Box mt="20px">
                <Text fontWeight={500} color="#444648" fontSize="10px">
                  Phone Number
                </Text>
                <CustomInput
                  mb
                  ngn
                  name="phone"
                  value={values?.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors?.phone && touched?.phone && errors?.phone}
                  placeholder="Enter Email address"
                />
              </Box>
              <Box mt="20px">
                <Text fontWeight={500} color="#444648" fontSize="10px">
                  Password
                </Text>
                <CustomInput
                  mb
                  placeholder="Enter Password"
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
              <Box mt="20px">
                <Text fontWeight={500} color="#444648" fontSize="10px">
                  Confirm Password
                </Text>
                <CustomInput
                  mb
                  placeholder="Confirm Password"
                  value={values?.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="confirmPassword"
                  error={
                    errors?.confirmPassword &&
                    touched?.confirmPassword &&
                    errors?.confirmPassword
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
              <Flex fontSize="12px" my="24px" w="full" gap="8px" align="center">
                <Checkbox />
                <Text color="#646668">Accept terms and condition</Text>
              </Flex>

              <Button isDisabled={!isValid || !dirty} type="submit" w="full">
                Create Account
              </Button>
            </Form>
          )}
        </Formik>

        <Text textAlign="center" mt="32px" color="#646668" fontSize="14px">
          Already have an account ?{" "}
          <span
            onClick={() => navigate("/login")}
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

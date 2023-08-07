import React from "react";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import CustomInput from "../../../components/common/CustomInput";
import { Button } from "@chakra-ui/button";
import { Form, Formik } from "formik";
import * as Yup from "yup";

const Reset = () => {
  const handleSubmit = (values = "") => {
    console.log(values);
  };

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

        <Flex justifyContent="center" align="center" flexDir="column">
          <Text textAlign="center" fontSize="24px" mt="80px" fontWeight={700}>
            Reset Password?
          </Text>
          <Text
            fontSize="14px"
            w={{ md: "70%" }}
            textAlign="center"
            mt="12px"
            color="#646668"
            lineHeight="150%"
          >
            Enter your registered email to receive a password reset link
          </Text>
        </Flex>

        <Formik
          onSubmit={handleSubmit}
          initialValues={{ email: "" }}
          validationSchema={Yup.object().shape({
            email: Yup.string().email().required("Email is required"),
          })}
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
                  name="email"
                  width
                  value={values?.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors?.email && touched?.email && errors?.email}
                  placeholder="Enter Email address"
                />
              </Box>

              <Button
                isDisabled={!isValid || !dirty}
                type="submit"
                w="full"
                variant="adminPrimary"
              >
                Send Reset Link
              </Button>
            </Form>
          )}
        </Formik>
      </Flex>
    </Flex>
  );
};

export default Reset;

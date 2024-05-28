import React from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import { Form, Formik } from "formik";
import {
  initResetValues,
  validateResetSchema,
} from "../../../utils/validation";
import { useSendPassOtp } from "../../../services/staff/query/auth";
import useCustomToast from "../../../utils/notifications";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const ForgotPassword = () => {
  const { errorToast } = useCustomToast();
  const navigate = useNavigate();
  const { mutate, isLoading } = useSendPassOtp({
    onSuccess: (res) => {
      sessionStorage.setItem("phone", res?.data?.phone);
      navigate("/staff/auth/code-verification");
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred",
      );
    },
  });

  const handleSubmit = (values = "") => {
    if (isLoading) {
      return null;
    } else {
      sessionStorage.setItem("staffId", values?.staffId);
      setTimeout(() => {
        mutate(values);
      }, 100);
    }
  };

  return (
    <Box>
      <Flex
        mb="64px"
        justifyContent="space-between"
        onClick={() => navigate(-1)}
        cursor="pointer"
        w="12rem"
        align="center"
        color="#086375"
      >
        <IoIosArrowBack size="20px" />

        <Text fontWeight={500} fontSize="18px">
          Forgot Password
        </Text>
      </Flex>

      <Text mt="40px" fontSize="40px" color="#090c02" fontWeight={700}>
        Enter Employee ID
      </Text>

      <Text
        opacity={0.5}
        color="#090c02"
        w={{ base: "", md: "70%" }}
        fontWeight={500}
      >
        Enter your Employee ID to receive a verification code sent to the
        associated phone number.
      </Text>

      <Box color="#090c02" mt="32px">
        <Formik
          onSubmit={handleSubmit}
          initialValues={initResetValues}
          validationSchema={validateResetSchema}
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
                  holder="Enter Employee ID"
                  opt
                  mb
                  value={values?.staffId}
                  onChange={handleChange}
                  name="staffId"
                  onBlur={handleBlur}
                  error={errors?.staffId && touched?.staffId && errors?.staffId}
                />
              </Box>

              <Flex
                mt="12px"
                fontSize="14px"
                fontWeight={500}
                align="center"
                gap="4px"
              >
                <Text color="#090c02">Try another way?</Text>
                <Text color="#086375" cursor="pointer">
                  Contact Administrator
                </Text>
              </Flex>

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

              <Button
                my="42px"
                cursor={isLoading ? "text" : "pointer"}
                type="submit"
                isDisabled={!isValid || !dirty}
                opacity={isLoading ? 0.7 : 1}
                w="full"
                h="60px"
                fontSize="18px"
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default ForgotPassword;

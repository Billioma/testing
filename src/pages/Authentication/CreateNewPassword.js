import React, { useState } from "react";
import { Box, Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import CustomInput from "../../components/common/CustomInput";
import { IoIosArrowBack } from "react-icons/io";
import { useUpdatePassword } from "../../services/query/auth";
import { Form, Formik } from "formik";
import { initPassValues, passwordSchema } from "../../utils/validation";
import useCustomToast from "../../utils/notifications";
import SuccessReset from "../../components/modals/SuccessReset";
import { useNavigate } from "react-router";

const CreateNewPassword = () => {
  const { errorToast } = useCustomToast();
  const id = sessionStorage.getItem("id");
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { mutate, isLoading } = useUpdatePassword({
    onSuccess: () => {
      if (id) {
        localStorage.setItem("managr", id);
        navigate("/dashboard");
        setTimeout(() => {
          sessionStorage.removeItem("id");
        }, 200);
      } else {
        onOpen();
        sessionStorage.removeItem("new_token");
      }
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred",
      );
    },
  });

  const handleSubmit = (values = "") => {
    mutate(values);
  };

  return (
    <Box>
      <Flex
        mb="64px"
        onClick={() => navigate(-1)}
        cursor="pointer"
        w="fit-content"
      >
        <IoIosArrowBack color="#086375" size="20px" />
      </Flex>
      <Text color="#090c02" fontSize="40px" fontWeight={700}>
        Create New Password
      </Text>

      <Text mt="40px" color="#090c02" w={{ base: "", md: "75%" }}>
        To ensure the security of your employee account. Choose a strong
        password that includes{" "}
        <i style={{ color: "#086375" }}>
          a mix of letters, numbers, and symbols
        </i>{" "}
        for added protection.
      </Text>

      <Box color="#090c02" mt="32px">
        <Formik
          onSubmit={handleSubmit}
          initialValues={initPassValues}
          validationSchema={passwordSchema}
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
              <Box mt="20px">
                <Text fontWeight={700} mb="9px" fontSize="10px">
                  NEW PASSWORD
                </Text>
                <CustomInput
                  holder="New Password"
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

              <Box mt="20px">
                <Text fontWeight={700} mb="9px" fontSize="10px">
                  CONFIRM PASSWORD
                </Text>
                <CustomInput
                  holder="Confirm Password"
                  mb
                  show
                  onClick={() => setShowConfirm((prev) => !prev)}
                  password={showConfirm ? false : true}
                  type={showConfirm ? "text" : "password"}
                  opt
                  value={values?.passwordConfirmation}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="passwordConfirmation"
                  error={
                    errors?.passwordConfirmation &&
                    touched?.passwordConfirmation &&
                    errors?.passwordConfirmation
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
                Save
              </Button>
            </Form>
          )}
        </Formik>
      </Box>

      <SuccessReset isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default CreateNewPassword;

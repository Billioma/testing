import React, { useState } from "react";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import CustomInput from "../../../components/common/CustomInput";
import { Button } from "@chakra-ui/button";
import { Form, Formik } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import { passValues, passSchema } from "../../../utils/validation";
import useCustomToast from "../../../utils/notifications";
import { useOperatorUpdatePassword } from "../../../services/query/auth";

const ChangePassword = () => {
  const [show, setShow] = useState(false);
  const { id, hash } = useParams();
  const navigate = useNavigate();

  const { successToast, errorToast } = useCustomToast();
  const { mutate, isLoading } = useOperatorUpdatePassword({
    onSuccess: () => {
      navigate("/operator/auth/password-success");
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occured"
      );
    },
  });

  const handleSubmit = (values) => {
    mutate({
      query: { id, hash },
      body: values,
    });
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
          <Text textAlign="center" fontSize="24px" mt="56px" fontWeight={700}>
            Operator Change Password
          </Text>
          <Text
            fontSize="14px"
            w="80%"
            textAlign="center"
            mt="12px"
            color="#646668"
            lineHeight="150%"
          >
            Enter a new password to continue
          </Text>
        </Flex>

        <Formik
          onSubmit={handleSubmit}
          initialValues={passValues}
          validationSchema={passSchema}
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
                  Enter New Password
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
              <Box mt="24px">
                <Text
                  mb="10px"
                  fontWeight={500}
                  color="#444648"
                  fontSize="10px"
                >
                  Confirm New Password
                </Text>
                <CustomInput
                  mb
                  holder="Enter Password"
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
                <Text textAlign="end" mt="8px" color="#1C0203" fontSize="10px">
                  Same password as above
                </Text>
              </Box>

              <Button
                mt="24px"
                isDisabled={!isValid || !dirty}
                type="submit"
                w="full"
                isLoading={isLoading}
              >
                Change Password
              </Button>
              <Flex
                flexDirection="column"
                justifyContent="center"
                align="center"
                mt="32px"
              >
                <Text
                  fontSize="14px"
                  cursor="pointer"
                  color="3646668"
                  onClick={() => navigate("/operator/auth/login")}
                >
                  Back to <span style={{ color: "red" }}>Login</span>
                </Text>
              </Flex>
            </Form>
          )}
        </Formik>
      </Flex>
    </Flex>
  );
};

export default ChangePassword;

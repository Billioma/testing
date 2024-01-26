import React, { useState } from "react";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import CustomInput from "../../../components/common/CustomInput";
import { Button } from "@chakra-ui/button";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router";
import { useCustomerUpdatePassword } from "../../../services/customer/query/auth";
import useCustomToast from "../../../utils/notifications";
import { passValues, passSchema } from "../../../utils/validation";

const ChangePassword = () => {
  const id = new URLSearchParams(location.search).get("id");
  const hash = new URLSearchParams(location.search).get("hash");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const { errorToast } = useCustomToast();
  const { mutate, isLoading } = useCustomerUpdatePassword({
    onSuccess: () => {
      navigate("/client/auth/password-success");
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred"
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
    <Flex justifyContent="center" w="full" align="center" flexDir="column">
      <Flex
        justifyContent="center"
        w={{ base: "full", md: "50%", lg: "35%" }}
        flexDir="column"
      >
        <Flex justifyContent="center" align="center" flexDir="column">
          <Image src="/assets/logo.svg" w="364px" h="56px" />
        </Flex>

        <Flex justifyContent="center" align="center" flexDir="column">
          <Text textAlign="center" fontSize="24px" mt="56px" fontWeight={700}>
            Change Password
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
                <Text mb="6px" fontWeight={500} color="#444648" fontSize="10px">
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
              <Box mt="20px">
                <Text mb="6px" fontWeight={500} color="#444648" fontSize="10px">
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
                isLoading={isLoading}
                isDisabled={!isValid || !dirty}
                type="submit"
                bg="#000"
                w="full"
              >
                Change Password
              </Button>
            </Form>
          )}
        </Formik>
      </Flex>
    </Flex>
  );
};

export default ChangePassword;

import React, { useState } from "react";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import CustomInput from "../../../components/common/CustomInput";
import { Checkbox } from "@chakra-ui/checkbox";
import { Button } from "@chakra-ui/button";
import { initValues, validateSchema } from "../../../utils/validation";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router";
import { useLogin } from "../../../services/admin/query/auth";

const Login = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const { mutate, isLoading } = useLogin({
    onSuccess: (data) => {
      sessionStorage.setItem("user", JSON.stringify(data));
      navigate("/admin/dashboard");
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Unable to login. Try again."
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
        <Text textAlign="center" fontSize="24px" mt="80px" fontWeight={700}>
          Admin Login
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
                  Username
                </Text>
                <CustomInput
                  name="username"
                  mb
                  value={values?.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors?.username && touched?.username}
                  placeholder="Enter Username"
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
              <Flex
                fontSize="12px"
                my="24px"
                w="full"
                align="center"
                justifyContent="space-between"
              >
                <Flex gap="8px" align="center">
                  <Checkbox colorScheme="blackAlpha" iconColor="blackAlpha" />
                  <Text color="#646668">Remember me</Text>
                </Flex>

                <Text
                  onClick={() => navigate("/reset-password")}
                  cursor="pointer"
                  fontWeight={700}
                  color="black"
                >
                  Forgot Password
                </Text>
              </Flex>

              <Button
                isDisabled={!isValid || !dirty}
                type="submit"
                w="full"
                isLoading={isLoading}
                variant="adminPrimary"
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

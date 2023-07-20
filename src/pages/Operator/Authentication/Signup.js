import React, { useState } from "react";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import CustomInput from "../../../components/common/CustomInput";
import { Checkbox } from "@chakra-ui/checkbox";
import { Button } from "@chakra-ui/button";
import { opSignValues, opSignSchema } from "../../../utils/validation";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router";

const Signup = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = (values = "") => {
    console.log(values);
  };

  return (
    <Flex
      justifyContent="center"
      w="full"
      align="center"
      h={{ base: "fit", md: "fit" }}
      py={{ base: "100px", md: "100px" }}
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

        <Text textAlign="center" fontSize="24px" mt="64px" fontWeight={700}>
          Operator Sign Up
        </Text>

        <Formik
          onSubmit={handleSubmit}
          initialValues={opSignValues}
          validationSchema={opSignSchema}
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
              <Box w="full" mt="30px">
                <Text mb="8px" fontWeight={500} color="#444648" fontSize="10px">
                  Business / Operator Name
                </Text>
                <CustomInput
                  mb
                  name="businessName"
                  value={values?.businessName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    errors?.businessName &&
                    touched?.businessName &&
                    errors?.businessName
                  }
                  holder="Enter Business Name"
                />
              </Box>

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
            onClick={() => navigate("/operator/auth/login")}
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

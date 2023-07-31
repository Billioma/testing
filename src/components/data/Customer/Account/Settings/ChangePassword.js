import React, { useState } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import useCustomToast from "../../../../../utils/notifications";
import { useCustomerUpdatePassword } from "../../../../../services/query/user";
import CustomInput from "../../../../common/CustomInput";
import { Form, Formik } from "formik";
import {
  passwordSchema,
  passwordValues,
} from "../../../../../utils/validation";
import { useLogOut } from "../../../../../utils/helpers";

const ChangePassword = () => {
  const logOut = useLogOut();
  const { errorToast, successToast } = useCustomToast();
  const [show, setShow] = useState(false);
  const { mutate, isLoading } = useCustomerUpdatePassword({
    onSuccess: (res) => {
      successToast(res?.message);
      logOut();
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occured"
      );
    },
  });

  const handleSubmit = (values) => {
    mutate(values);
  };

  return (
    <Box>
      <Formik
        onSubmit={handleSubmit}
        initialValues={passwordValues}
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
            <Box>
              <Text mb="8px" fontWeight={500} color="#444648" fontSize="10px">
                Enter Old Password
              </Text>
              <CustomInput
                mb
                holder="Enter Current Password"
                value={values?.currentPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                name="currentPassword"
                error={
                  errors?.currentPassword &&
                  touched?.currentPassword &&
                  errors?.currentPassword
                }
                onClick={() => setShow((prev) => !prev)}
                password={show ? false : true}
                show
                type={show ? "text" : "password"}
              />
            </Box>
            <Box my="24px">
              <Text mb="8px" fontWeight={500} color="#444648" fontSize="10px">
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
            <Box>
              <Text mb="8px" fontWeight={500} color="#444648" fontSize="10px">
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
              w="full"
            >
              Change Password
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default ChangePassword;

import { useState } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import useCustomToast from "../../../utils/notifications";
import CustomInput from "../../../components/common/CustomInput";
import { Form, Formik } from "formik";
import { passwordSchema, passwordValues } from "../../../utils/validation";
import { useLogOut } from "../../../utils/helpers";
import { useUpdateAttPass } from "../../../services/attendant/query/user";

const Settings = () => {
  const logOut = useLogOut();
  const { errorToast, successToast } = useCustomToast();
  const [show, setShow] = useState(false);
  const { mutate, isLoading } = useUpdateAttPass({
    onSuccess: (res) => {
      successToast(res?.message);
      logOut();
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred",
      );
    },
  });

  const handleSubmit = (values) => {
    mutate(values);
  };

  return (
    <Box>
      <Text color="#000" fontSize="20px" fontWeight={700} mb="20px">
        Reset Password
      </Text>

      <Box bg="#fff" p="24px" border="1px solid #E4E6E8" borderRadius="12px">
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
                <Text mb="8px" fontWeight={500} color="#444648" fontSize="12px">
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
                <Text mb="8px" fontWeight={500} color="#444648" fontSize="12px">
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
                <Text mb="8px" fontWeight={500} color="#444648" fontSize="12px">
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
                <Text textAlign="end" mt="8px" color="#1C0203" fontSize="12px">
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
    </Box>
  );
};

export default Settings;

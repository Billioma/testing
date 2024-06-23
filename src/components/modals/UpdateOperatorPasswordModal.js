import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Flex,
  Text,
  Box,
  Button,
} from "@chakra-ui/react";
import AdminCustomInput from "../common/AdminCustomInput";
import useCustomToast from "../../utils/notifications";
import { useLogOut } from "../../utils/helpers";
import { initOpPassValues, opPassSchema } from "../../utils/validation";
import { Form, Formik } from "formik";
import { useUpdateAdminPassword } from "../../services/admin/query/auth";

const UpdateOperatorPasswordModal = ({ isOpen, onClose }) => {
  const [show, setShow] = useState(false);

  const { errorToast, successToast } = useCustomToast();
  const logout = useLogOut();

  const { mutate: mainAdminMutate, isLoading: isMainAdmin } =
    useUpdateAdminPassword({
      onSuccess: (res) => {
        successToast(res?.message);
        logout();
      },
      onError: (err) => {
        errorToast(
          err?.response?.data?.message || err?.message || "An Error occurred",
        );
      },
    });

  const handleSubmit = (values = "") => {
    mainAdminMutate(values);
  };

  return (
    <Modal isCentered trapFocus={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay backdropFilter="auto" backdropBlur="2px" />
      <ModalContent
        py="32px"
        px="24px"
        overflowY="auto"
        borderRadius="12px"
        bg="#fff"
        color="#000"
      >
        <ModalBody px="0">
          <Text
            color="#242628"
            fontWeight={700}
            mb="32px"
            textAlign="center"
            fontSize="24px"
            lineHeight="100%"
          >
            Change Password?
          </Text>
          <Formik
            onSubmit={handleSubmit}
            initialValues={initOpPassValues}
            validationSchema={opPassSchema}
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
                <Box mb="24px">
                  <Text
                    color="#444648"
                    lineHeight="100%"
                    fontSize="10px"
                    mb="8px"
                    fontWeight={500}
                  >
                    Enter Old Password
                  </Text>
                  <AdminCustomInput
                    mb
                    name="currentPassword"
                    value={values?.currentPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
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

                <Box mb="24px">
                  <Text
                    color="#444648"
                    lineHeight="100%"
                    fontSize="10px"
                    mb="8px"
                    fontWeight={500}
                  >
                    Enter New Password
                  </Text>
                  <AdminCustomInput
                    auth
                    name="password"
                    value={values?.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      errors?.password && touched?.password && errors?.password
                    }
                    onClick={() => setShow((prev) => !prev)}
                    password={show ? false : true}
                    show
                    type={show ? "text" : "password"}
                  />
                </Box>

                <Box mb="24px">
                  <Text
                    color="#444648"
                    lineHeight="100%"
                    fontSize="10px"
                    mb="8px"
                    fontWeight={500}
                  >
                    Confirm New Password
                  </Text>
                  <AdminCustomInput
                    auth
                    name="passwordConfirmation"
                    value={values?.passwordConfirmation}
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                </Box>

                <Flex align="center" gap="15px">
                  <Button
                    bg="transparent"
                    color="#0D0718"
                    fontSize="14px"
                    onClick={onClose}
                    w="full"
                    border="1px solid #0D0718"
                    py="17px"
                  >
                    Cancel
                  </Button>

                  <Button
                    fontSize="14px"
                    fontWeight={500}
                    bg="red"
                    type="submit"
                    isLoading={isMainAdmin}
                    isDisabled={!isValid || !dirty}
                    lineHeight="100%"
                    w="full"
                    py="17px"
                  >
                    Save
                  </Button>
                </Flex>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UpdateOperatorPasswordModal;

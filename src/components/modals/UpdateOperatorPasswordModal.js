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
import CustomInput from "../common/CustomInput";
import { useUpdateOpPassword } from "../../services/operator/query/user";
import useCustomToast from "../../utils/notifications";
import { useLogOut } from "../../utils/helpers";
import {
  clientPassSchema,
  initClientPassValues,
  initOpPassValues,
  opPassSchema,
} from "../../utils/validation";
import { Form, Formik } from "formik";
import { useEditClient } from "../../services/admin/query/clients";
import {
  useEditAdmin,
  useEditAdminOperator,
  useEditAttendant,
  useEditCustomer,
} from "../../services/admin/query/users";
import { useUpdateAdminPassword } from "../../services/admin/query/auth";

const UpdateOperatorPasswordModal = ({
  clientValues,
  id,
  isOpen,
  onClose,
  adminUser,
  admin,
  mainAdmin,
  operator,
  attendant,
  customer,
}) => {
  const [show, setShow] = useState(false);

  const { errorToast, successToast } = useCustomToast();
  const logout = useLogOut();
  const { mutate, isLoading } = useUpdateOpPassword({
    onSuccess: (res) => {
      successToast(res?.message);
      logout();
      onClose();
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred"
      );
    },
  });
  const { mutate: clientMutate, isLoading: isClient } = useEditClient({
    onSuccess: (res) => {
      successToast(res?.message);
      onClose();
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred"
      );
    },
  });
  const { mutate: operatorMutate, isLoading: isOperator } =
    useEditAdminOperator({
      onSuccess: (res) => {
        successToast(res?.message);
        onClose();
      },
      onError: (err) => {
        errorToast(
          err?.response?.data?.message || err?.message || "An Error occurred"
        );
      },
    });
  const { mutate: customerMutate, isLoading: isCustomer } = useEditCustomer({
    onSuccess: (res) => {
      successToast(res?.message);
      onClose();
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred"
      );
    },
  });
  const { mutate: attendantMutate, isLoading: isAttendant } = useEditAttendant({
    onSuccess: (res) => {
      successToast(res?.message);
      onClose();
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred"
      );
    },
  });
  const { mutate: adminMutate, isLoading: isAdmin } = useEditAdmin({
    onSuccess: (res) => {
      successToast(res?.message);
      onClose();
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred"
      );
    },
  });
  const { mutate: mainAdminMutate, isLoading: isMainAdmin } =
    useUpdateAdminPassword({
      onSuccess: (res) => {
        successToast(res?.message);
        logout();
      },
      onError: (err) => {
        errorToast(
          err?.response?.data?.message || err?.message || "An Error occurred"
        );
      },
    });

  const handleSubmit = (values = "") => {
    const { currentPassword, ...rest } = values;

    admin
      ? clientMutate({
          query: id,
          body: {
            ...rest,
            ...clientValues,
            accountType: clientValues?.accountType?.value,
            status: clientValues?.status?.value,
            state: clientValues?.state?.value,
            managers: clientValues.managers?.map((item) => item?.value),
          },
        })
      : customer
      ? customerMutate({
          query: id,
          body: {
            ...rest,
          },
        })
      : attendant
      ? attendantMutate({
          query: id,
          body: {
            ...rest,
          },
        })
      : operator
      ? operatorMutate({
          query: id,
          body: {
            ...rest,
          },
        })
      : adminUser
      ? adminMutate({
          query: id,
          body: {
            ...rest,
          },
        })
      : mainAdmin
      ? mainAdminMutate(values)
      : mutate(values);
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
            initialValues={
              admin || customer || attendant || adminUser || operator
                ? initClientPassValues
                : initOpPassValues
            }
            validationSchema={
              admin || customer || attendant || adminUser || operator
                ? clientPassSchema
                : opPassSchema
            }
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
                {admin || customer || attendant || adminUser || operator ? (
                  ""
                ) : (
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
                    <CustomInput
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
                )}

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
                  <CustomInput
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
                  <CustomInput
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
                    bg={admin ? "#000" : "red"}
                    type="submit"
                    isLoading={
                      isLoading ||
                      isClient ||
                      isCustomer ||
                      isAttendant ||
                      isAdmin ||
                      isOperator ||
                      isMainAdmin
                    }
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

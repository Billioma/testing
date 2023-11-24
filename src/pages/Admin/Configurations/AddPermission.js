import React, { useState } from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import { useNavigate } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import { Form, Formik } from "formik";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import {
  initPermisisonValues,
  validatePermissionSchema,
} from "../../../utils/validation";
import { useAddPermission } from "../../../services/admin/query/configurations";

export default function AddPermissions() {
  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { mutate, isLoading } = useAddPermission({
    onSuccess: () => {
      successToast("Permission added successfully!");
      navigate(PRIVATE_PATHS.ADMIN_CONFIG_PERMISSIONS);
      sessionStorage.removeItem("edit");
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const handleSubmit = (values = "") => {
    const { accountType, state, status, phone, managers, ...rest } = values;
    mutate({
      ...rest,
      accountType: accountType?.value,
      status: status?.value,
      phone: `+234${Number(phone)}`,
      state: state?.value,
      managers: managers?.map((dat) => dat?.value),
    });
  };

  return (
    <Box minH="75vh">
      <Flex align="flex-start" flexDir={{ md: "row", base: "column" }}>
        <GoBackTab />
        <Flex justifyContent="center" align="center" w="full" flexDir="column">
          <Flex
            bg="#fff"
            borderRadius="12px"
            py="32px"
            px="28px"
            justifyContent="center"
            w={{ md: "30rem", base: "100%", "3xl": "35rem" }}
            flexDir="column"
            border="1px solid #D4D6D8"
          >
            <Formik
              onSubmit={handleSubmit}
              initialValues={initPermisisonValues}
              validationSchema={validatePermissionSchema}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setFormSubmitted(true);
                    handleSubmit(e);
                  }}
                >
                  <Box w="full" mb="16px">
                    <Text
                      mb="8px"
                      fontSize="10px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Name{" "}
                      <span
                        style={{
                          color: "tomato",
                          fontSize: "13px",
                        }}
                      >
                        *
                      </span>
                    </Text>
                    <CustomInput
                      mb
                      holder="Enter Permission Name"
                      name="name"
                      value={values?.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={(formSubmitted || touched?.name) && errors?.name}
                    />
                  </Box>
                  <Box w="full" mb="16px">
                    <Text
                      mb="8px"
                      fontSize="10px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Display Name{" "}
                      <span
                        style={{
                          color: "tomato",
                          fontSize: "13px",
                        }}
                      >
                        *
                      </span>
                    </Text>
                    <CustomInput
                      mb
                      holder="Enter Display name"
                      name="displayName"
                      value={values?.displayName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        (formSubmitted || touched?.displayName) &&
                        errors?.displayName
                      }
                    />
                  </Box>
                  <Box w="full" mb="16px">
                    <Text
                      mb="8px"
                      fontSize="10px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Group Name{" "}
                      <span
                        style={{
                          color: "tomato",
                          fontSize: "13px",
                        }}
                      >
                        *
                      </span>
                    </Text>
                    <CustomInput
                      mb
                      holder="Enter Group Name"
                      name="tableName"
                      value={values?.tableName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        (formSubmitted || touched?.tableName) &&
                        errors?.tableName
                      }
                    />
                  </Box>

                  <Flex gap="24px" mt="24px">
                    <Button
                      variant="adminSecondary"
                      w="100%"
                      onClick={() =>
                        navigate(PRIVATE_PATHS.ADMIN_CONFIG_PERMISSIONS)
                      }
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="adminPrimary"
                      w="100%"
                      isLoading={isLoading}
                      type="submit"
                    >
                      Save
                    </Button>
                  </Flex>
                </Form>
              )}
            </Formik>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

import React, { useState } from "react";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import { useNavigate } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import {
  customStyles,
  errorCustomStyles,
  statusType,
} from "../../../components/common/constants";
import {
  useAddPolicy,
  useGetLocations,
} from "../../../services/admin/query/locations";
import Select from "react-select";
import { Form, Formik } from "formik";
import { IoIosArrowDown } from "react-icons/io";
import {
  initAdminPoliciesValues,
  validateAdminPoliciesSchema,
} from "../../../utils/validation";

export default function AddPolicy() {
  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();
  const { mutate, isLoading } = useAddPolicy({
    onSuccess: () => {
      successToast("Policy added successfully!");
      navigate(PRIVATE_PATHS.ADMIN_POLICIES);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const { data: locations } = useGetLocations({}, 1, 1000);

  const locationOptions = locations?.data?.map((location) => ({
    label: location?.name,
    value: parseInt(location?.id),
  }));

  const statusOptions = statusType?.map((status, i) => ({
    value: i,
    label: status,
  }));

  const handleSubmit = (values = "") => {
    const { status, location, ...rest } = values;
    mutate({
      ...rest,
      status: status?.value,
      location: location?.value,
    });
  };

  return (
    <Box minH="75vh">
      {" "}
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
            border="1px solid #E4E6E8"
          >
            <Formik
              onSubmit={handleSubmit}
              initialValues={initAdminPoliciesValues}
              validationSchema={validateAdminPoliciesSchema}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                setValues,
              }) => (
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setFormSubmitted(true);
                    handleSubmit(e);
                  }}
                >
                  <Box w="full" mb={4}>
                    <Text
                      mb="8px"
                      fontSize="12px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Title{" "}
                      <span
                        style={{
                          color: "tomato",
                          fontSize: "15px",
                        }}
                      >
                        *
                      </span>
                    </Text>
                    <CustomInput
                      auth
                      mb
                      holder="Enter policy title"
                      name="title"
                      value={values?.title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={(formSubmitted || touched?.title) && errors?.title}
                    />
                  </Box>

                  <Box w="full" mb={4}>
                    <Text
                      mb="8px"
                      fontSize="12px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Description{" "}
                      <span
                        style={{
                          color: "tomato",
                          fontSize: "15px",
                        }}
                      >
                        *
                      </span>
                    </Text>
                    <CustomInput
                      auth
                      mb
                      holder="Enter policy description"
                      name="body"
                      value={values?.body}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={(formSubmitted || touched?.body) && errors?.body}
                    />
                  </Box>

                  <Box w="full" mb={4}>
                    <Text
                      mb="8px"
                      fontSize="12px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Location{" "}
                      <span
                        style={{
                          color: "tomato",
                          fontSize: "15px",
                        }}
                      >
                        *
                      </span>
                    </Text>
                    <Select
                      styles={
                        formSubmitted && !values?.location
                          ? errorCustomStyles
                          : customStyles
                      }
                      placeholder="Select location"
                      options={locationOptions}
                      name="location"
                      onChange={(selectedOption) =>
                        setValues({
                          ...values,
                          location: selectedOption,
                        })
                      }
                      onBlur={handleBlur}
                      components={{
                        IndicatorSeparator: () => (
                          <div style={{ display: "none" }}></div>
                        ),
                        DropdownIndicator: () => (
                          <div>
                            <IoIosArrowDown size="15px" color="#646668" />
                          </div>
                        ),
                      }}
                    />
                    {formSubmitted && !values?.location && (
                      <Text mt="8px" fontSize="12px" color="tomato">
                        Location is required
                      </Text>
                    )}
                  </Box>
                  <Box w="full" mb={4}>
                    <Text
                      mb="8px"
                      fontSize="12px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Status{" "}
                      <span
                        style={{
                          color: "tomato",
                          fontSize: "15px",
                        }}
                      >
                        *
                      </span>
                    </Text>
                    <Select
                      styles={
                        formSubmitted && !values?.status
                          ? errorCustomStyles
                          : customStyles
                      }
                      options={statusOptions}
                      name="status"
                      onChange={(selectedOption) =>
                        setValues({
                          ...values,
                          status: selectedOption,
                        })
                      }
                      onBlur={handleBlur}
                      components={{
                        IndicatorSeparator: () => (
                          <div style={{ display: "none" }}></div>
                        ),
                        DropdownIndicator: () => (
                          <div>
                            <IoIosArrowDown size="15px" color="#646668" />
                          </div>
                        ),
                      }}
                    />
                    {formSubmitted && !values?.status && (
                      <Text mt="8px" fontSize="12px" color="tomato">
                        Status is required
                      </Text>
                    )}
                  </Box>

                  <Flex gap="24px" mt="24px">
                    <Button
                      variant="adminSecondary"
                      w="100%"
                      onClick={() => navigate(PRIVATE_PATHS.ADMIN_AMENITIES)}
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

import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Image,
  Spinner,
  Input,
} from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import { useNavigate } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import { useCreateCustomer } from "../../../services/admin/query/users";
import { Form, Formik } from "formik";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import {
  initCustomerValues,
  validateCustomerSchema,
} from "../../../utils/validation";
import { IoIosArrowDown } from "react-icons/io";
import { statusType } from "../../../components/common/constants";
import { useCustomerUploadPic } from "../../../services/customer/query/user";
import Select from "react-select";

export default function AddCustomer() {
  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();
  const { mutate, isLoading } = useCreateCustomer({
    onSuccess: () => {
      successToast("Customer added successfully!");
      navigate(PRIVATE_PATHS.ADMIN_CUSTOMERS);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const [fileType, setFileType] = useState("");
  const {
    mutate: uploadMutate,
    isLoading: isUploading,
    data: profilePicData,
  } = useCustomerUploadPic({
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred"
      );
    },
  });

  const handleUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
      return;
    }

    setFileType(URL.createObjectURL(selectedFile));
    const formData = new FormData();
    formData.append("file", selectedFile);
    uploadMutate({
      fileType: "image",
      entityType: "client",
      file: formData.get("file"),
    });
  };

  const [show, setShow] = useState(false);

  const handleSubmit = (values = "") => {
    const { status, phone, ...rest } = values;
    mutate({
      ...rest,
      status: status?.value,
      profilePicture: profilePicData?.path,
      phone: `+234${Number(phone)}`,
    });
  };

  const statusOptions = statusType?.map((status, i) => ({
    value: i,
    label: status,
  }));
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "100%",
      minHeight: "44px",
      color: "#646668",
      fontSize: "14px",
      cursor: "pointer",
      borderRadius: "4px",
      border: state.hasValue ? "none" : "1px solid #D4D6D8",
      paddingRight: "16px",
      background: state.hasValue ? "#f4f6f8" : "unset",
    }),
    menu: (provided) => ({
      ...provided,
      fontSize: "13px",
      backgroundColor: "#fff",
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isFocused ? "" : "",
      backgroundColor: state.isFocused ? "#f4f6f8" : "",
    }),
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
            border="1px solid #E4E6E8"
          >
            <Box alignSelf={"center"} mb={5}>
              <Text
                fontSize="10px"
                fontWeight={500}
                color="#444648"
                textAlign="center"
              >
                Avatar
              </Text>
              <Input
                id="image_upload"
                onChange={handleUpload}
                type="file"
                display="none"
              />
              <label htmlFor="image_upload">
                <Flex
                  flexDir="column"
                  cursor="pointer"
                  justifyContent="center"
                  align="center"
                  w="full"
                >
                  {isUploading ? (
                    <Spinner />
                  ) : (
                    <Image
                      rounded="full"
                      objectFit="cover"
                      w="120px"
                      border={fileType ? "4px solid #0D0718" : ""}
                      h="120px"
                      borderRadius="12px"
                      src={fileType || "/assets/prof-avatar.jpg"}
                    />
                  )}
                </Flex>
              </label>
            </Box>

            <Formik
              onSubmit={handleSubmit}
              initialValues={initCustomerValues}
              validationSchema={validateCustomerSchema}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                setValues,
                isValid,
                dirty,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Box w="full" mb={4}>
                    <Text
                      mb="8px"
                      fontSize="10px"
                      fontWeight={500}
                      color="#444648"
                    >
                      First Name
                    </Text>
                    <CustomInput
                      auth
                      mb
                      holder="Enter first name"
                      name="firstName"
                      value={values?.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        errors?.firstName &&
                        touched?.firstName &&
                        errors?.firstName
                      }
                    />
                  </Box>

                  <Box w="full" mb={4}>
                    <Text
                      mb="8px"
                      fontSize="10px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Last Name
                    </Text>
                    <CustomInput
                      auth
                      mb
                      holder="Enter last name"
                      name="lastName"
                      value={values?.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        errors?.lastName &&
                        touched?.lastName &&
                        errors?.lastName
                      }
                    />
                  </Box>

                  <Box w="full" mb={4}>
                    <Text
                      mb="8px"
                      fontSize="10px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Email Address
                    </Text>
                    <CustomInput
                      auth
                      mb
                      holder="Enter email address"
                      name="email"
                      value={values?.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors?.email && touched?.email && errors?.email}
                    />
                  </Box>

                  <Box mb={4}>
                    <Text
                      mb="8px"
                      fontWeight={500}
                      color="#444648"
                      fontSize="10px"
                    >
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

                  <Box w="full" mb={4}>
                    <Text
                      mb="8px"
                      fontSize="10px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Company Name
                    </Text>
                    <CustomInput
                      auth
                      mb
                      holder="Enter your company name"
                      name="companyName"
                      value={values?.companyName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        errors?.companyName &&
                        touched?.companyName &&
                        errors?.companyName
                      }
                    />
                  </Box>

                  <Box w="full" mb={4}>
                    <Text
                      mb="8px"
                      fontSize="10px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Password
                    </Text>
                    <CustomInput
                      mb
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        errors?.password &&
                        touched?.password &&
                        errors?.password
                      }
                      holder="Enter Password"
                      onClick={() => setShow((prev) => !prev)}
                      password={show ? false : true}
                      show
                      type={show ? "text" : "password"}
                    />
                  </Box>

                  <Box mb={4}>
                    <Text
                      mb="8px"
                      fontSize="10px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Comfirm Password
                    </Text>
                    <CustomInput
                      mb
                      name="passwordConfirmation"
                      value={values.passwordConfirmation}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        errors?.passwordConfirmation &&
                        touched?.passwordConfirmation &&
                        errors?.passwordConfirmation
                      }
                      holder="Confirm Password"
                      onClick={() => setShow((prev) => !prev)}
                      password={show ? false : true}
                      show
                      type={show ? "text" : "password"}
                    />
                  </Box>

                  <Box>
                    <Text
                      mb="8px"
                      fontSize="10px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Status
                    </Text>
                    <Select
                      styles={customStyles}
                      options={statusOptions}
                      value={values.status}
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
                      name="status"
                      onChange={(selectedOption) =>
                        setValues({
                          ...values,
                          status: selectedOption,
                        })
                      }
                      onBlur={handleBlur}
                    />
                  </Box>

                  <Flex gap="24px" mt="24px">
                    <Button
                      variant="adminSecondary"
                      w="100%"
                      onClick={() => navigate(PRIVATE_PATHS.ADMIN_CUSTOMERS)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="adminPrimary"
                      w="100%"
                      isDisabled={!isValid || !dirty}
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

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
import Select from "react-select";
import { useGetAllOperators } from "../../../services/admin/query/operators";
import { useNavigate } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import { useCreateAttendant } from "../../../services/admin/query/users";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import { Form, Formik } from "formik";
import {
  initAttendantsValues,
  validateAttendantsSchema,
} from "../../../utils/validation";
import { useCustomerUploadPic } from "../../../services/customer/query/user";
import { accountType, statusType } from "../../../components/common/constants";
import { useGetAllLocations } from "../../../services/admin/query/locations";
import { IoIosArrowDown } from "react-icons/io";

export default function AddAttendants() {
  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();
  const { mutate, isLoading } = useCreateAttendant({
    onSuccess: () => {
      successToast("Attendant added successfully!");
      navigate(PRIVATE_PATHS.ADMIN_ATTENDANTS);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });
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


  const { data: operators } = useGetAllOperators();

  const { data: locationsData } = useGetAllLocations();
  const locationOptions = locationsData?.data?.map((location) => ({
    label: location?.name,
    value: location?.id,
  }));

  const operatorOptions = operators?.data?.map((operator) => ({
    label: operator?.name,
    value: operator?.id,
  }));

  const statusOptions = statusType?.map((status, i) => ({
    value: i,
    label: status,
  }));
  const accountOptions = accountType?.map((account) => ({
    value: account,
    label: account,
  }));

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
      fileType: "avatar",
      entityType: "client",
      file: formData.get("file"),
    });
  };

  const [show, setShow] = useState(false);

  const handleSubmit = (values = "") => {
    const { status, accountType, userId, locations, operator, ...rest } =
      values;
    mutate({
      ...rest,
      status: status?.value,
      userId: String(userId),
      accountType: accountType?.value,
      operator: Number(operator?.value),
      avatar: profilePicData?.path,
      locations: locations?.map((item) => Number(item?.value)),
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
              initialValues={initAttendantsValues}
              validationSchema={validateAttendantsSchema}
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
                      Full Name
                    </Text>
                    <CustomInput
                      auth
                      mb
                      name="name"
                      holder="Enter Full Name"
                      value={values?.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors?.name && touched?.name && errors?.name}
                    />
                  </Box>

                  <Box w="full" mb={4}>
                    <Text
                      mb="8px"
                      fontSize="10px"
                      fontWeight={500}
                      color="#444648"
                    >
                      User ID
                    </Text>
                    <CustomInput
                      auth
                      mb
                      type="number"
                      holder="Enter user ID"
                      name="userId"
                      value={values?.userId}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        errors?.userId && touched?.userId && errors?.userId
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

                  <Box mb={4}>
                    <Text
                      mb="8px"
                      fontSize="10px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Select Account Type
                    </Text>
                    <Select
                      styles={customStyles}
                      options={accountOptions}
                      placeholder="Select account type"
                      name="accountType"
                      onChange={(selectedOption) =>
                        setValues({
                          ...values,
                          accountType: selectedOption,
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
                  </Box>

                  <Box mb={4}>
                    <Text
                      mb="8px"
                      fontSize="10px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Assign Operator
                    </Text>
                    <Select
                      styles={customStyles}
                      options={operatorOptions}
                      placeholder="Select an operator"
                      name="operator"
                      onChange={(selectedOption) =>
                        setValues({
                          ...values,
                          operator: selectedOption,
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
                  </Box>

                  <Box mb={4}>
                    <Text
                      mb="8px"
                      fontSize="10px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Select Locations
                    </Text>
                    <Select
                      styles={customStyles}
                      options={locationOptions}
                      placeholder="Select locations"
                      name="locations"
                      onChange={(selectedOption) =>
                        setValues({
                          ...values,
                          locations: selectedOption,
                        })
                      }
                      value={values.locations}
                      isMulti
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
                  </Box>

                  <Flex gap="24px" mt="24px">
                    <Button
                      variant="adminSecondary"
                      w="100%"
                      onClick={() => navigate(PRIVATE_PATHS.ADMIN_ATTENDANTS)}
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

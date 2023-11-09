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
import { useAddClient } from "../../../services/admin/query/clients";
import { Form, Formik } from "formik";
import useCustomToast from "../../../utils/notifications";
import Select from "react-select";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import { useGetManagers } from "../../../services/admin/query/users";
import { useCustomerUploadPic } from "../../../services/customer/query/user";
import {
  initClientValues,
  validateClientSchema,
} from "../../../utils/validation";
import { IoIosArrowDown } from "react-icons/io";
import { allStates, statusType } from "../../../components/common/constants";

export default function AddClient() {
  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();
  const [show, setShow] = useState(false);

  const { mutate, isLoading } = useAddClient({
    onSuccess: () => {
      successToast("Client added successfully!");
      navigate(PRIVATE_PATHS.ADMIN_CLIENTS);
      sessionStorage.removeItem("edit");
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

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

  const [fileType, setFileType] = useState("");

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

  const { data: managers } = useGetManagers();

  const managerOptions = managers?.map((manager) => ({
    label: `${manager.firstName} ${manager.lastName}`,
    value: manager.id,
  }));

  const accountTypes = ["BUSINESS", "EVENT_PLANNER", "CORPORATE", "OTHERS"].map(
    (type, index) => ({ label: type, value: index })
  );

  const stateOptions = allStates?.map((state) => ({
    value: state,
    label: state,
  }));
  const statusOptions = statusType?.map((status, i) => ({
    value: i,
    label: status,
  }));

  const handleSubmit = (values = "") => {
    const { accountType, state, status, managers, ...rest } = values;
    mutate({
      ...rest,
      accountType: accountType?.value,
      status: status?.value,
      state: state?.value,
      managers: managers?.map((dat) => dat?.value),
      logo: profilePicData?.path,
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
            w={{ md: "30rem", base: "100%" }}
            flexDir="column"
            border="1px solid #D4D6D8"
          >
            <Box alignSelf={"center"} w="full" mb={5}>
              <Text
                fontSize="10px"
                fontWeight={500}
                color="#444648"
                textAlign="center"
                mb={2}
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
              initialValues={initClientValues}
              validationSchema={validateClientSchema}
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
                  <Box w="full" mb="16px">
                    <Text
                      mb="8px"
                      fontSize="10px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Name
                    </Text>
                    <CustomInput
                      mb
                      holder="Enter Client Name"
                      name="name"
                      value={values?.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors?.name && touched?.name && errors?.name}
                    />
                  </Box>
                  <Box w="full" mb="16px">
                    <Text
                      mb="8px"
                      fontSize="10px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Email Address
                    </Text>
                    <CustomInput
                      mb
                      holder="Enter Email Address"
                      name="email"
                      value={values?.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors?.email && touched?.email && errors?.email}
                    />
                  </Box>
                  <Box w="full" mb="16px">
                    <Text
                      mb="8px"
                      fontSize="10px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Billing Email(s)
                    </Text>
                    <CustomInput
                      mb
                      holder="Enter billing email address"
                      name="billingEmail"
                      value={values?.billingEmail}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        errors?.billingEmail &&
                        touched?.billingEmail &&
                        errors?.billingEmail
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
                      Contact Person
                    </Text>
                    <CustomInput
                      mb
                      holder="Enter contact person"
                      name="contactPerson"
                      value={values?.contactPerson}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        errors?.contactPerson &&
                        touched?.contactPerson &&
                        errors?.contactPerson
                      }
                    />
                  </Box>
                  <Box mb="16px">
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

                  <Box w="full" mb="16px">
                    <Text
                      mb="8px"
                      fontSize="10px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Address
                    </Text>
                    <CustomInput
                      mb
                      name="address"
                      holder="Enter Address"
                      value={values?.address}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        errors?.address && touched?.address && errors?.address
                      }
                    />
                  </Box>

                  <Box mb="16px">
                    <Text
                      mb="8px"
                      fontSize="10px"
                      fontWeight={500}
                      color="#444648"
                    >
                      State
                    </Text>
                    <Select
                      styles={customStyles}
                      placeholder="Select state"
                      options={stateOptions}
                      value={values.state}
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
                      name="state"
                      onChange={(selectedOption) =>
                        setValues({
                          ...values,
                          state: selectedOption,
                        })
                      }
                      onBlur={handleBlur}
                    />
                  </Box>

                  <Box w="full" mb="16px">
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

                  <Box mb="16px">
                    <Text
                      mb="8px"
                      fontSize="10px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Confirm Password
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

                  <Box mb="16px">
                    <Text
                      mb="8px"
                      fontSize="10px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Account Type
                    </Text>
                    <Select
                      styles={customStyles}
                      placeholder="Select account type"
                      options={accountTypes}
                      value={values.accountType}
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
                      name="accountType"
                      onChange={(selectedOption) =>
                        setValues({
                          ...values,
                          accountType: selectedOption,
                        })
                      }
                      onBlur={handleBlur}
                    />
                  </Box>

                  <Box mb="16px">
                    <Text
                      mb="8px"
                      fontSize="10px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Managers
                    </Text>
                    <Select
                      isMulti
                      styles={customStyles}
                      placeholder="Select managers"
                      options={managerOptions}
                      value={values.managers}
                      defaultValue={values.managers}
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
                      name="managers"
                      onChange={(selectedOption) =>
                        setValues({ ...values, managers: selectedOption })
                      }
                      onBlur={handleBlur}
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
                      onClick={() => navigate(PRIVATE_PATHS.ADMIN_CLIENTS)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="adminPrimary"
                      w="100%"
                      isDisabled={!isValid || !dirty || !values.managers.length}
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
    background: state.hasValue ? "#f4f6f8" : "unset",
    paddingRight: "16px",
  }),
  menu: (provided) => ({
    ...provided,
    fontSize: "13px",
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isFocused ? "" : "",
    backgroundColor: state.isFocused ? "#d4d6d8" : "",
  }),
};

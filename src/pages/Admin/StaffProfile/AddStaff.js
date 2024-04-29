import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { Form, Formik } from "formik";
import {
  initAdminStaffValues,
  validateAdminStaffSchema,
} from "../../../utils/validation";
import CustomInput from "../../../components/common/CustomInput";
import DateTimePicker from "../../../components/data/Admin/DateTimePicker";
import {
  customStyles,
  errorCustomStyles,
} from "../../../components/common/constants";
import Select from "react-select";
import { trim } from "../../../utils/helpers";
import { PRIVATE_PATHS } from "../../../routes/constants";
import { useCustomerUploadPic } from "../../../services/customer/query/user";
import useCustomToast from "../../../utils/notifications";

import { useAddStaff, useGetStaffs } from "../../../services/admin/query/staff";
import { useNavigate } from "react-router-dom";
import { useGetRoles } from "../../../services/admin/query/configurations";

const AddStaff = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [steps, setSteps] = useState({
    step1: true,
    step2: false,
    step3: false,
    step4: false,
  });
  const { data: roles } = useGetRoles({}, 1, 1000);
  const { data: staffs } = useGetStaffs({}, 1, 1000);

  const { errorToast, successToast } = useCustomToast();
  const [files, setFiles] = useState({
    id: "",
    employmentLetter: "",
    guarantorForm: "",
    guarantorForm2: "",
    confidentialityAgreement: "",
    nonSolicitationAgreement: "",
    exclusivity: "",
    identificationDocument: "",
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

  const navigate = useNavigate();
  const { mutate, isLoading } = useAddStaff({
    onSuccess: () => {
      successToast("Staff added successfully!");
      navigate(PRIVATE_PATHS.ADMIN_STAFF_PROFILE);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const handleSubmit = (values = "") => {
    const {
      employmentLetter,
      confidentialityAgreement,
      nonSolicitationAgreement,
      exclusivity,
      guarantorForm,
      guarantorForm2,
      lineManager,
      identificationDocument,
      phoneNumber,
      secondaryPhoneNumber,
      nextOfKinPhone,
      role,
      ...rest
    } = values;
    mutate({
      ...rest,
      employmentLetter: files?.employmentLetter,
      role: role?.value,
      lineManager: lineManager?.value,
      confidentialityAgreement: files?.confidentialityAgreement,
      nonSolicitationAgreement: files?.nonSolicitationAgreement,
      exclusivity: files?.exclusivity,
      guarantorForm: files?.guarantorForm,
      guarantorForm2: files?.guarantorForm2,
      identificationDocument: files?.identificationDocument,
      phoneNumber: `+234${Number(phoneNumber)}`,
      nextOfKinPhone: `+234${Number(nextOfKinPhone)}`,
      secondaryPhoneNumber: secondaryPhoneNumber
        ? `+234${Number(secondaryPhoneNumber)}`
        : "",
    });
  };

  useEffect(() => {
    if (files?.id === "employmentLetter") {
      setFiles({ ...files, employmentLetter: profilePicData?.path });
    } else if (files?.id === "guarantorForm") {
      setFiles({ ...files, guarantorForm: profilePicData?.path }, "kkl");
    } else if (files?.id === "guarantorForm2") {
      setFiles({ ...files, guarantorForm2: profilePicData?.path }, "kkl");
    } else if (files?.id === "confidentialityAgreement") {
      setFiles(
        { ...files, confidentialityAgreement: profilePicData?.path },
        "sa"
      );
    } else if (files?.id === "nonSolicitationAgreement") {
      setFiles({ ...files, nonSolicitationAgreement: profilePicData?.path });
    } else if (files?.id === "exclusivity") {
      setFiles({ ...files, exclusivity: profilePicData?.path });
    } else if (files?.id === "identificationDocument") {
      setFiles({ ...files, identificationDocument: profilePicData?.path });
    }
  }, [profilePicData]);

  const rolesToMap = roles?.data?.filter((item) => item?.isStaffRole);
  const roleOptions = rolesToMap?.map((role) => ({
    label: role?.displayName,
    value: Number(role?.id),
  }));
  const staffOptions = staffs?.data?.map((role) => ({
    label: role?.fullName,
    value: Number(role?.id),
  }));

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
            <Text
              borderBottom="1px solid #E4E6E8"
              pb="10px"
              color="#090C02"
              fontWeight={500}
              fontSize="20px"
            >
              Add New Staff
            </Text>

            <Box mt="24px">
              <Formik
                onSubmit={handleSubmit}
                initialValues={initAdminStaffValues}
                validationSchema={validateAdminStaffSchema}
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
                    <Flex
                      justifyContent="space-between"
                      color={
                        values?.fullName &&
                        values?.phoneNumber &&
                        values?.email &&
                        values?.dateOfBirth &&
                        values?.residentialAddress &&
                        values?.guarantor1 &&
                        values?.guarantor2
                          ? "#0B841D"
                          : "#090C02"
                      }
                      cursor="pointer"
                      pb={steps?.step1 ? "" : "24px"}
                      borderBottom={steps?.step1 ? "none" : "1px solid #E4E6E8"}
                      align="center"
                      w="full"
                      onClick={() =>
                        setSteps({
                          step1: !steps.step1,
                          step2: false,
                          step3: false,
                          step4: false,
                        })
                      }
                    >
                      <Flex align="center" gap="12px">
                        <Flex
                          justifyContent="center"
                          align="center"
                          border="1px solid"
                          rounded="full"
                          w="23px"
                          fontWeight={500}
                          fontSize="14px"
                          h="23px"
                        >
                          <Text>1</Text>
                        </Flex>

                        <Text fontWeight={500}>Personal Information</Text>
                      </Flex>

                      {steps?.step1 ? (
                        <IoIosArrowDown size="20px" />
                      ) : (
                        <IoIosArrowForward size="20px" />
                      )}
                    </Flex>

                    {steps?.step1 && (
                      <Box>
                        <Box mt="24px" w="full" mb={4}>
                          <Text
                            mb="8px"
                            fontSize="12px"
                            fontWeight={500}
                            color="#444648"
                          >
                            Full Name{" "}
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
                            holder="Enter Full Name"
                            name="fullName"
                            value={values?.fullName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              (formSubmitted || touched?.fullName) &&
                              errors?.fullName
                            }
                          />
                        </Box>

                        <Box w="full" mb={4}>
                          <Text
                            mb="8px"
                            fontSize="12px"
                            fontWeight={500}
                            color="#444648"
                          >
                            Line Manager{" "}
                          </Text>
                          <Select
                            styles={customStyles}
                            placeholder="Select Line Manager"
                            options={staffOptions}
                            name="lineManager"
                            onChange={(selectedOption) =>
                              setValues({
                                ...values,
                                lineManager: selectedOption,
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

                        <Box w="full" mb={4}>
                          <Text
                            mb="8px"
                            fontSize="12px"
                            fontWeight={500}
                            color="#444648"
                          >
                            Phone Number 1 (Primary){" "}
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
                            mb
                            auth
                            ngn
                            name="phoneNumber"
                            value={`${values?.phoneNumber}`}
                            onChange={(e) => {
                              const inputPhone = e.target.value
                                .replace(/\D/g, "")
                                .slice(0, 11);
                              handleChange({
                                target: {
                                  name: "phoneNumber",
                                  value: `${inputPhone}`,
                                },
                              });
                            }}
                            onBlur={handleBlur}
                            error={
                              (formSubmitted || touched?.phoneNumber) &&
                              errors?.phoneNumber
                            }
                            holder="Enter Phone Number 1 (Primary)"
                          />
                        </Box>

                        <Box w="full" mb={4}>
                          <Text
                            mb="8px"
                            fontSize="12px"
                            fontWeight={500}
                            color="#444648"
                          >
                            Phone Number 2 (Secondary){" "}
                          </Text>
                          <CustomInput
                            mb
                            auth
                            ngn
                            name="secondaryPhoneNumber"
                            value={`${values?.secondaryPhoneNumber}`}
                            onChange={(e) => {
                              const inputPhone = e.target.value
                                .replace(/\D/g, "")
                                .slice(0, 11);
                              handleChange({
                                target: {
                                  name: "secondaryPhoneNumber",
                                  value: `${inputPhone}`,
                                },
                              });
                            }}
                            onBlur={handleBlur}
                            error={
                              (formSubmitted ||
                                touched?.secondaryPhoneNumber) &&
                              errors?.secondaryPhoneNumber
                            }
                            holder="Enter Phone Number 2 (Secondary)"
                          />
                        </Box>

                        <Box w="full" mb={4}>
                          <Text
                            mb="8px"
                            fontSize="12px"
                            fontWeight={500}
                            color="#444648"
                          >
                            Email Address{" "}
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
                            holder="Enter Email"
                            name="email"
                            value={values?.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              (formSubmitted || touched?.email) && errors?.email
                            }
                          />
                        </Box>

                        <Box w="full" mb={4}>
                          <Text
                            mb="8px"
                            fontSize="12px"
                            fontWeight={500}
                            color="#444648"
                          >
                            Date of Birth{" "}
                            <span
                              style={{
                                color: "tomato",
                                fontSize: "15px",
                              }}
                            >
                              *
                            </span>
                          </Text>
                          <DateTimePicker
                            selectedDate={values?.dateOfBirth}
                            onChange={(date) => {
                              setValues({ ...values, dateOfBirth: date });
                            }}
                          />

                          {formSubmitted && !values?.dateOfBirth && (
                            <Text mt="8px" fontSize="12px" color="tomato">
                              Date of birth is required
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
                            Residential Address 1 (Primary){" "}
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
                            holder="Enter Residential Address"
                            name="residentialAddress"
                            value={values?.residentialAddress}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              (formSubmitted || touched?.residentialAddress) &&
                              errors?.residentialAddress
                            }
                          />
                        </Box>

                        <Box w="full" mb={4}>
                          <Text
                            mb="8px"
                            fontSize="12px"
                            fontWeight={500}
                            color="#444648"
                          >
                            Residential Address 2 (Secondary){" "}
                          </Text>
                          <CustomInput
                            auth
                            mb
                            holder="Enter Secondary Residential Address"
                            name="secondaryResidentialAddress"
                            value={values?.secondaryResidentialAddress}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              (formSubmitted ||
                                touched?.secondaryResidentialAddress) &&
                              errors?.secondaryResidentialAddress
                            }
                          />
                        </Box>

                        <Box w="full" mb={4}>
                          <Text
                            mb="8px"
                            fontSize="12px"
                            fontWeight={500}
                            color="#444648"
                          >
                            Guarantor 1{" "}
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
                            holder="Enter Guarantor 1"
                            name="guarantor1"
                            value={values?.guarantor1}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              (formSubmitted || touched?.guarantor1) &&
                              errors?.guarantor1
                            }
                          />
                        </Box>

                        <Box
                          w="full"
                          mb={4}
                          pb="24px"
                          borderBottom="1px solid #E4E6E8"
                        >
                          <Text
                            mb="8px"
                            fontSize="12px"
                            fontWeight={500}
                            color="#444648"
                          >
                            Guarantor 2{" "}
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
                            holder="Enter Guarantor 2"
                            name="guarantor2"
                            value={values?.guarantor2}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              (formSubmitted || touched?.guarantor2) &&
                              errors?.guarantor2
                            }
                          />
                        </Box>
                      </Box>
                    )}

                    <Flex
                      justifyContent="space-between"
                      color={
                        values?.nextOfKin &&
                        values?.nextOfKinAddress &&
                        values?.nextOfKinPhone
                          ? "#0B841D"
                          : "#090C02"
                      }
                      mt="24px"
                      align="center"
                      w="full"
                      cursor="pointer"
                      pb={steps?.step2 ? "" : "24px"}
                      borderBottom={steps?.step2 ? "none" : "1px solid #E4E6E8"}
                      onClick={() =>
                        setSteps({
                          step1: false,
                          step2: !steps.step2,
                          step3: false,
                          step4: false,
                        })
                      }
                    >
                      <Flex align="center" gap="12px">
                        <Flex
                          justifyContent="center"
                          align="center"
                          border="1px solid"
                          rounded="full"
                          w="23px"
                          fontWeight={500}
                          fontSize="14px"
                          h="23px"
                        >
                          <Text>2</Text>
                        </Flex>

                        <Text fontWeight={500}>Next of Kin</Text>
                      </Flex>

                      {steps?.step2 ? (
                        <IoIosArrowDown size="20px" />
                      ) : (
                        <IoIosArrowForward size="20px" />
                      )}
                    </Flex>

                    {steps?.step2 && (
                      <>
                        <Box w="full" mb={4} mt="24px">
                          <Text
                            mb="8px"
                            fontSize="12px"
                            fontWeight={500}
                            color="#444648"
                          >
                            Full Name{" "}
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
                            holder="Enter Next of Kin name"
                            name="nextOfKin"
                            value={values?.nextOfKin}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              (formSubmitted || touched?.nextOfKin) &&
                              errors?.nextOfKin
                            }
                          />
                        </Box>

                        <Box w="full" mb={4} mt="24px">
                          <Text
                            mb="8px"
                            fontSize="12px"
                            fontWeight={500}
                            color="#444648"
                          >
                            Phone Number{" "}
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
                            mb
                            auth
                            ngn
                            name="nextOfKinPhone"
                            value={`${values?.nextOfKinPhone}`}
                            onChange={(e) => {
                              const inputPhone = e.target.value
                                .replace(/\D/g, "")
                                .slice(0, 11);
                              handleChange({
                                target: {
                                  name: "nextOfKinPhone",
                                  value: `${inputPhone}`,
                                },
                              });
                            }}
                            onBlur={handleBlur}
                            error={
                              (formSubmitted || touched?.nextOfKinPhone) &&
                              errors?.nextOfKinPhone
                            }
                            holder="Enter Next of Kin Phone"
                          />
                        </Box>

                        <Box
                          w="full"
                          mb={4}
                          pb="24px"
                          borderBottom="1px solid #E4E6E8"
                        >
                          <Text
                            mb="8px"
                            fontSize="12px"
                            fontWeight={500}
                            color="#444648"
                          >
                            Address{" "}
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
                            holder="Enter Next of Kin Address"
                            name="nextOfKinAddress"
                            value={values?.nextOfKinAddress}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              (formSubmitted || touched?.nextOfKinAddress) &&
                              errors?.nextOfKinAddress
                            }
                          />
                        </Box>
                      </>
                    )}

                    <Flex
                      justifyContent="space-between"
                      color={
                        values?.staffId && values?.role ? "#0B841D" : "#090C02"
                      }
                      mt="24px"
                      align="center"
                      w="full"
                      cursor="pointer"
                      pb={steps?.step3 ? "" : "24px"}
                      borderBottom={steps?.step3 ? "none" : "1px solid #E4E6E8"}
                      onClick={() =>
                        setSteps({
                          step1: false,
                          step2: false,
                          step3: !steps.step3,
                          step4: false,
                        })
                      }
                    >
                      <Flex align="center" gap="12px">
                        <Flex
                          justifyContent="center"
                          align="center"
                          border="1px solid"
                          rounded="full"
                          w="23px"
                          fontWeight={500}
                          fontSize="14px"
                          h="23px"
                        >
                          <Text>3</Text>
                        </Flex>

                        <Text fontWeight={500}>Company Information</Text>
                      </Flex>

                      {steps?.step3 ? (
                        <IoIosArrowDown size="20px" />
                      ) : (
                        <IoIosArrowForward size="20px" />
                      )}
                    </Flex>

                    {steps?.step3 && (
                      <>
                        <Box w="full" mb={4} mt="24px">
                          <Text
                            mb="8px"
                            fontSize="12px"
                            fontWeight={500}
                            color="#444648"
                          >
                            Staff ID{" "}
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
                            holder="Enter Staff ID"
                            name="staffId"
                            value={values?.staffId}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              (formSubmitted || touched?.staffId) &&
                              errors?.staffId
                            }
                          />
                        </Box>

                        <Box
                          w="full"
                          mb={4}
                          mt="24px"
                          pb="24px"
                          borderBottom="1px solid #E4E6E8"
                        >
                          <Text
                            mb="8px"
                            fontSize="12px"
                            fontWeight={500}
                            color="#444648"
                          >
                            Role{" "}
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
                              formSubmitted && !values?.role
                                ? errorCustomStyles
                                : customStyles
                            }
                            placeholder="Select role"
                            options={roleOptions}
                            name="role"
                            onChange={(selectedOption) =>
                              setValues({
                                ...values,
                                role: selectedOption,
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

                          {formSubmitted && !values?.role && (
                            <Text mt="8px" fontSize="13px" color="tomato">
                              Role is required
                            </Text>
                          )}
                        </Box>
                      </>
                    )}

                    <Flex
                      justifyContent="space-between"
                      color={
                        values?.guarantorForm &&
                        values?.employmentLetter &&
                        values?.guarantorForm2 &&
                        values?.confidentialityAgreement &&
                        values?.nonSolicitationAgreement &&
                        values?.exclusivity &&
                        values?.identificationDocument
                          ? "#0B841D"
                          : "#090C02"
                      }
                      mt="24px"
                      align="center"
                      w="full"
                      cursor="pointer"
                      pb={steps?.step4 ? "" : "24px"}
                      borderBottom={steps?.step4 ? "none" : "1px solid #E4E6E8"}
                      onClick={() =>
                        setSteps({
                          step1: false,
                          step2: false,
                          step3: false,
                          step4: !steps.step4,
                        })
                      }
                    >
                      <Flex align="center" gap="12px">
                        <Flex
                          justifyContent="center"
                          align="center"
                          border="1px solid"
                          rounded="full"
                          w="23px"
                          fontWeight={500}
                          fontSize="14px"
                          h="23px"
                        >
                          <Text>4</Text>
                        </Flex>

                        <Text fontWeight={500}>Employee Documents</Text>
                      </Flex>

                      {steps?.step4 ? (
                        <IoIosArrowDown size="20px" />
                      ) : (
                        <IoIosArrowForward size="20px" />
                      )}
                    </Flex>

                    {steps?.step4 && (
                      <>
                        <Box w="full" mb={4} mt="24px">
                          <Text
                            mb="8px"
                            fontSize="12px"
                            fontWeight={500}
                            color="#444648"
                          >
                            Employment Letter{" "}
                            <span
                              style={{
                                color: "tomato",
                                fontSize: "15px",
                              }}
                            >
                              *
                            </span>
                          </Text>

                          <Input
                            isDisabled={isUploading}
                            id="image_upload"
                            onChange={(e) => {
                              setValues({
                                ...values,
                                employmentLetter: e.target.files[0]
                                  ? e.target.files[0]
                                  : values?.employmentLetter,
                              });
                              setFiles({
                                ...files,
                                id: "employmentLetter",
                              });
                              const formData = new FormData();
                              formData.append("file", e.target.files[0]);
                              if (e.target.files[0]) {
                                {
                                  uploadMutate({
                                    fileType: "image",
                                    entityType: "staff",
                                    file: formData.get("file"),
                                  });
                                }
                              }
                            }}
                            type="file"
                            display="none"
                          />
                          <Flex
                            border={
                              formSubmitted && !values?.employmentLetter
                                ? "1px solid red"
                                : "1px solid #d4d6d8"
                            }
                            borderRadius="4px"
                            py="12px"
                            align="center"
                            px="16px"
                            justifyContent="space-between"
                            w="full"
                          >
                            <label htmlFor="image_upload">
                              <Flex
                                align="center"
                                gap="10px"
                                cursor={isUploading ? "" : "pointer"}
                              >
                                <Image
                                  src="/assets/folder.jpg"
                                  w="24px"
                                  h="24px"
                                />
                                <Box>
                                  <Text color="#646668">
                                    {trim(values?.employmentLetter?.name) ||
                                      "Employment Letter"}
                                  </Text>
                                  <Text
                                    fontSize="12px"
                                    fontWeight={500}
                                    color="#444648"
                                  >
                                    {values?.employmentLetter?.type ||
                                      "MetaData"}
                                  </Text>
                                </Box>
                              </Flex>
                            </label>

                            {isUploading && files?.id === "employmentLetter" ? (
                              <Spinner color="red" size="md" />
                            ) : values?.employmentLetter ? (
                              <Flex
                                border="1px solid #cccccc"
                                borderRadius="8px"
                                py="12px"
                                fontSize="12px"
                                cursor={isUploading ? "" : "pointer"}
                                fontWeight={500}
                                color="#090C02"
                                px="16px"
                                onClick={() => {
                                  isUploading
                                    ? ""
                                    : (setFiles({
                                        ...files,
                                        employmentLetter: "",
                                      }),
                                      setValues({
                                        ...values,
                                        employmentLetter: "",
                                      }));
                                }}
                              >
                                Delete
                              </Flex>
                            ) : (
                              ""
                            )}
                          </Flex>

                          {formSubmitted && !values?.employmentLetter && (
                            <Text mt="8px" fontSize="13px" color="tomato">
                              Employment Letter is required
                            </Text>
                          )}
                        </Box>

                        <Box w="full" mb={4} mt="24px">
                          <Text
                            mb="8px"
                            fontSize="12px"
                            fontWeight={500}
                            color="#444648"
                          >
                            Guarantor 1 Form{" "}
                            <span
                              style={{
                                color: "tomato",
                                fontSize: "15px",
                              }}
                            >
                              *
                            </span>
                          </Text>

                          <Input
                            isDisabled={isUploading}
                            id="guarantorForm"
                            onChange={(e) => {
                              setValues({
                                ...values,
                                guarantorForm: e.target.files[0]
                                  ? e.target.files[0]
                                  : values?.guarantorForm,
                              });
                              setFiles({
                                ...files,
                                id: "guarantorForm",
                              });
                              const formData = new FormData();
                              formData.append("file", e.target.files[0]);
                              if (e.target.files[0]) {
                                {
                                  uploadMutate({
                                    fileType: "image",
                                    entityType: "staff",
                                    file: formData.get("file"),
                                  });
                                }
                              }
                            }}
                            type="file"
                            display="none"
                          />
                          <Flex
                            border={
                              formSubmitted && !values?.guarantorForm
                                ? "1px solid red"
                                : "1px solid #d4d6d8"
                            }
                            borderRadius="4px"
                            py="12px"
                            align="center"
                            px="16px"
                            justifyContent="space-between"
                            w="full"
                          >
                            <label htmlFor="guarantorForm">
                              <Flex
                                align="center"
                                gap="10px"
                                cursor={isUploading ? "" : "pointer"}
                              >
                                <Image
                                  src="/assets/folder.jpg"
                                  w="24px"
                                  h="24px"
                                />
                                <Box>
                                  <Text color="#646668">
                                    {trim(values?.guarantorForm?.name) ||
                                      "Guarantor Form"}
                                  </Text>
                                  <Text
                                    fontSize="12px"
                                    fontWeight={500}
                                    color="#444648"
                                  >
                                    {values?.guarantorForm?.type || "MetaData"}
                                  </Text>
                                </Box>
                              </Flex>
                            </label>

                            {isUploading && files?.id === "guarantorForm" ? (
                              <Spinner color="red" size="md" />
                            ) : values?.guarantorForm ? (
                              <Flex
                                border="1px solid #cccccc"
                                borderRadius="8px"
                                py="12px"
                                fontSize="12px"
                                cursor={isUploading ? "" : "pointer"}
                                fontWeight={500}
                                color="#090C02"
                                px="16px"
                                onClick={() => {
                                  isUploading
                                    ? ""
                                    : (setFiles({
                                        ...files,
                                        guarantorForm: "",
                                      }),
                                      setValues({
                                        ...values,
                                        guarantorForm: "",
                                      }));
                                }}
                              >
                                Delete
                              </Flex>
                            ) : (
                              ""
                            )}
                          </Flex>

                          {formSubmitted && !values?.guarantorForm && (
                            <Text mt="8px" fontSize="13px" color="tomato">
                              Guarantor 1 Form is required
                            </Text>
                          )}
                        </Box>

                        <Box w="full" mb={4} mt="24px">
                          <Text
                            mb="8px"
                            fontSize="12px"
                            fontWeight={500}
                            color="#444648"
                          >
                            Guarantor 2 Form{" "}
                            <span
                              style={{
                                color: "tomato",
                                fontSize: "15px",
                              }}
                            >
                              *
                            </span>
                          </Text>

                          <Input
                            isDisabled={isUploading}
                            id="guarantorForm2"
                            onChange={(e) => {
                              setValues({
                                ...values,
                                guarantorForm2: e.target.files[0]
                                  ? e.target.files[0]
                                  : values?.guarantorForm2,
                              });
                              setFiles({
                                ...files,
                                id: "guarantorForm2",
                              });
                              const formData = new FormData();
                              formData.append("file", e.target.files[0]);
                              if (e.target.files[0]) {
                                {
                                  uploadMutate({
                                    fileType: "image",
                                    entityType: "staff",
                                    file: formData.get("file"),
                                  });
                                }
                              }
                            }}
                            type="file"
                            display="none"
                          />
                          <Flex
                            border={
                              formSubmitted && !values?.guarantorForm2
                                ? "1px solid red"
                                : "1px solid #d4d6d8"
                            }
                            borderRadius="4px"
                            py="12px"
                            align="center"
                            px="16px"
                            justifyContent="space-between"
                            w="full"
                          >
                            <label htmlFor="guarantorForm2">
                              <Flex
                                align="center"
                                gap="10px"
                                cursor={isUploading ? "" : "pointer"}
                              >
                                <Image
                                  src="/assets/folder.jpg"
                                  w="24px"
                                  h="24px"
                                />
                                <Box>
                                  <Text color="#646668">
                                    {trim(values?.guarantorForm2?.name) ||
                                      "Guarantor Form"}
                                  </Text>
                                  <Text
                                    fontSize="12px"
                                    fontWeight={500}
                                    color="#444648"
                                  >
                                    {values?.guarantorForm2?.type || "MetaData"}
                                  </Text>
                                </Box>
                              </Flex>
                            </label>

                            {isUploading && files?.id === "guarantorForm2" ? (
                              <Spinner color="red" size="md" />
                            ) : values?.guarantorForm2 ? (
                              <Flex
                                border="1px solid #cccccc"
                                borderRadius="8px"
                                py="12px"
                                fontSize="12px"
                                cursor={isUploading ? "" : "pointer"}
                                fontWeight={500}
                                color="#090C02"
                                px="16px"
                                onClick={() => {
                                  isUploading
                                    ? ""
                                    : (setFiles({
                                        ...files,
                                        guarantorForm2: "",
                                      }),
                                      setValues({
                                        ...values,
                                        guarantorForm2: "",
                                      }));
                                }}
                              >
                                Delete
                              </Flex>
                            ) : (
                              ""
                            )}
                          </Flex>

                          {formSubmitted && !values?.guarantorForm2 && (
                            <Text mt="8px" fontSize="13px" color="tomato">
                              Guarantor 2 Form is required
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
                            Confidentiality Agreement{" "}
                            <span
                              style={{
                                color: "tomato",
                                fontSize: "15px",
                              }}
                            >
                              *
                            </span>
                          </Text>

                          <Input
                            isDisabled={isUploading}
                            id="confidentialityAgreement"
                            onChange={(e) => {
                              setValues({
                                ...values,
                                confidentialityAgreement: e.target.files[0]
                                  ? e.target.files[0]
                                  : values?.confidentialityAgreement,
                              });
                              setFiles({
                                ...files,
                                id: "confidentialityAgreement",
                              });

                              const formData = new FormData();
                              formData.append("file", e.target.files[0]);
                              if (e.target.files[0]) {
                                {
                                  uploadMutate({
                                    fileType: "image",
                                    entityType: "staff",
                                    file: formData.get("file"),
                                  });
                                }
                              }
                            }}
                            type="file"
                            display="none"
                          />
                          <Flex
                            border={
                              formSubmitted && !values?.confidentialityAgreement
                                ? "1px solid red"
                                : "1px solid #d4d6d8"
                            }
                            borderRadius="4px"
                            py="12px"
                            align="center"
                            px="16px"
                            justifyContent="space-between"
                            w="full"
                          >
                            <label htmlFor="confidentialityAgreement">
                              <Flex
                                align="center"
                                gap="10px"
                                cursor={isUploading ? "" : "pointer"}
                              >
                                <Image
                                  src="/assets/folder.jpg"
                                  w="24px"
                                  h="24px"
                                />
                                <Box>
                                  <Text color="#646668">
                                    {trim(
                                      values?.confidentialityAgreement?.name
                                    ) || "Confidentiality Agreement"}
                                  </Text>
                                  <Text
                                    fontSize="12px"
                                    fontWeight={500}
                                    color="#444648"
                                  >
                                    {values?.confidentialityAgreement?.type ||
                                      "MetaData"}
                                  </Text>
                                </Box>
                              </Flex>
                            </label>

                            {isUploading &&
                            files?.id === "confidentialityAgreement" ? (
                              <Spinner color="red" size="md" />
                            ) : values?.confidentialityAgreement ? (
                              <Flex
                                border="1px solid #cccccc"
                                borderRadius="8px"
                                py="12px"
                                fontSize="12px"
                                cursor={isUploading ? "" : "pointer"}
                                fontWeight={500}
                                color="#090C02"
                                px="16px"
                                onClick={() => {
                                  isUploading
                                    ? ""
                                    : (setFiles({
                                        ...files,
                                        confidentialityAgreement: "",
                                      }),
                                      setValues({
                                        ...values,
                                        confidentialityAgreement: "",
                                      }));
                                }}
                              >
                                Delete
                              </Flex>
                            ) : (
                              ""
                            )}
                          </Flex>

                          {formSubmitted &&
                            !values?.confidentialityAgreement && (
                              <Text mt="8px" fontSize="13px" color="tomato">
                                Confidentiality Agreement is required
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
                            Non-Solicitation & Non-Competition Agreement{" "}
                            <span
                              style={{
                                color: "tomato",
                                fontSize: "15px",
                              }}
                            >
                              *
                            </span>
                          </Text>

                          <Input
                            isDisabled={isUploading}
                            id="nonSolicitationAgreement"
                            onChange={(e) => {
                              setValues({
                                ...values,
                                nonSolicitationAgreement: e.target.files[0]
                                  ? e.target.files[0]
                                  : values?.nonSolicitationAgreement,
                              });

                              setFiles({
                                ...files,
                                id: "nonSolicitationAgreement",
                              });
                              const formData = new FormData();
                              formData.append("file", e.target.files[0]);
                              if (e.target.files[0]) {
                                {
                                  uploadMutate({
                                    fileType: "image",
                                    entityType: "staff",
                                    file: formData.get("file"),
                                  });
                                }
                              }
                            }}
                            type="file"
                            display="none"
                          />
                          <Flex
                            border={
                              formSubmitted && !values?.nonSolicitationAgreement
                                ? "1px solid red"
                                : "1px solid #d4d6d8"
                            }
                            borderRadius="4px"
                            py="12px"
                            align="center"
                            px="16px"
                            justifyContent="space-between"
                            w="full"
                          >
                            <label htmlFor="nonSolicitationAgreement">
                              <Flex
                                align="center"
                                gap="10px"
                                cursor={isUploading ? "" : "pointer"}
                              >
                                <Image
                                  src="/assets/folder.jpg"
                                  w="24px"
                                  h="24px"
                                />
                                <Box>
                                  <Text color="#646668">
                                    {trim(
                                      values?.nonSolicitationAgreement?.name
                                    ) || "Non-Solicitation & Non-Comp..."}
                                  </Text>
                                  <Text
                                    fontSize="12px"
                                    fontWeight={500}
                                    color="#444648"
                                  >
                                    {values?.nonSolicitationAgreement?.type ||
                                      "MetaData"}
                                  </Text>
                                </Box>
                              </Flex>
                            </label>

                            {isUploading &&
                            files?.id === "nonSolicitationAgreement" ? (
                              <Spinner color="red" size="md" />
                            ) : values?.nonSolicitationAgreement ? (
                              <Flex
                                border="1px solid #cccccc"
                                borderRadius="8px"
                                py="12px"
                                fontSize="12px"
                                cursor={isUploading ? "" : "pointer"}
                                fontWeight={500}
                                color="#090C02"
                                px="16px"
                                onClick={() => {
                                  isUploading
                                    ? ""
                                    : (setFiles({
                                        ...files,
                                        nonSolicitationAgreement: "",
                                      }),
                                      setValues({
                                        ...values,
                                        nonSolicitationAgreement: "",
                                      }));
                                }}
                              >
                                Delete
                              </Flex>
                            ) : (
                              ""
                            )}
                          </Flex>

                          {formSubmitted &&
                            !values?.nonSolicitationAgreement && (
                              <Text mt="8px" fontSize="13px" color="tomato">
                                Non-Solicitation & Non-Competition Agreement is
                                required
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
                            Exclusivity & Non-Conflict of Interest Agreement{" "}
                            <span
                              style={{
                                color: "tomato",
                                fontSize: "15px",
                              }}
                            >
                              *
                            </span>
                          </Text>

                          <Input
                            isDisabled={isUploading}
                            id="exclusivity"
                            onChange={(e) => {
                              setValues({
                                ...values,
                                exclusivity: e.target.files[0]
                                  ? e.target.files[0]
                                  : values?.exclusivity,
                              });

                              setFiles({
                                ...files,
                                id: "exclusivity",
                              });
                              const formData = new FormData();
                              formData.append("file", e.target.files[0]);
                              if (e.target.files[0]) {
                                {
                                  uploadMutate({
                                    fileType: "image",
                                    entityType: "staff",
                                    file: formData.get("file"),
                                  });
                                }
                              }
                            }}
                            type="file"
                            display="none"
                          />
                          <Flex
                            border={
                              formSubmitted && !values?.exclusivity
                                ? "1px solid red"
                                : "1px solid #d4d6d8"
                            }
                            borderRadius="4px"
                            py="12px"
                            align="center"
                            px="16px"
                            justifyContent="space-between"
                            w="full"
                          >
                            <label htmlFor="exclusivity">
                              <Flex
                                align="center"
                                gap="10px"
                                cursor={isUploading ? "" : "pointer"}
                              >
                                <Image
                                  src="/assets/folder.jpg"
                                  w="24px"
                                  h="24px"
                                />
                                <Box>
                                  <Text color="#646668">
                                    {trim(values?.exclusivity?.name) ||
                                      "Exclusivity & Non-Conflict of Int..."}
                                  </Text>
                                  <Text
                                    fontSize="12px"
                                    fontWeight={500}
                                    color="#444648"
                                  >
                                    {values?.exclusivity?.type || "MetaData"}
                                  </Text>
                                </Box>
                              </Flex>
                            </label>
                            {isUploading && files?.id === "exclusivity" ? (
                              <Spinner color="red" size="md" />
                            ) : values?.exclusivity ? (
                              <Flex
                                border="1px solid #cccccc"
                                borderRadius="8px"
                                py="12px"
                                fontSize="12px"
                                cursor={isUploading ? "" : "pointer"}
                                fontWeight={500}
                                color="#090C02"
                                px="16px"
                                onClick={() => {
                                  isUploading
                                    ? ""
                                    : (setFiles({
                                        ...files,
                                        exclusivity: "",
                                      }),
                                      setValues({
                                        ...values,
                                        exclusivity: "",
                                      }));
                                }}
                              >
                                Delete
                              </Flex>
                            ) : (
                              ""
                            )}
                          </Flex>

                          {formSubmitted && !values?.exclusivity && (
                            <Text mt="8px" fontSize="13px" color="tomato">
                              Exclusivity & Non-Conflict of Interest Agreement
                              is required
                            </Text>
                          )}
                        </Box>

                        <Box
                          w="full"
                          mb={4}
                          pb="24px"
                          borderBottom="1px solid #E4E6E8"
                        >
                          <Flex align="flex-start" gap="8px" w="fit-content">
                            <Text
                              mb="8px"
                              fontSize="12px"
                              fontWeight={500}
                              color="#444648"
                            >
                              Identification Document
                            </Text>

                            <span
                              style={{
                                color: "tomato",
                                fontSize: "15px",
                              }}
                            >
                              *
                            </span>
                          </Flex>

                          <Input
                            isDisabled={isUploading}
                            id="identificationDocument"
                            onChange={(e) => {
                              setValues({
                                ...values,
                                identificationDocument: e.target.files[0]
                                  ? e.target.files[0]
                                  : values?.identificationDocument,
                              });
                              setFiles({
                                ...files,
                                id: "identificationDocument",
                              });
                              const formData = new FormData();
                              formData.append("file", e.target.files[0]);
                              if (e.target.files[0]) {
                                {
                                  uploadMutate({
                                    fileType: "image",
                                    entityType: "staff",
                                    file: formData.get("file"),
                                  });
                                }
                              }
                            }}
                            type="file"
                            display="none"
                          />
                          <Flex
                            border={
                              formSubmitted && !values?.identificationDocument
                                ? "1px solid red"
                                : "1px solid #d4d6d8"
                            }
                            borderRadius="4px"
                            py="12px"
                            align="center"
                            px="16px"
                            justifyContent="space-between"
                            w="full"
                          >
                            <label htmlFor="identificationDocument">
                              <Flex
                                align="center"
                                gap="10px"
                                cursor={isUploading ? "" : "pointer"}
                              >
                                <Image
                                  src="/assets/folder.jpg"
                                  w="24px"
                                  h="24px"
                                />
                                <Box>
                                  <Text color="#646668">
                                    {trim(
                                      values?.identificationDocument?.name
                                    ) || "Identification Document"}
                                  </Text>
                                  <Text
                                    fontSize="12px"
                                    fontWeight={500}
                                    color="#444648"
                                  >
                                    {values?.identificationDocument?.type ||
                                      "MetaData"}
                                  </Text>
                                </Box>
                              </Flex>
                            </label>

                            {isUploading &&
                            files?.id === "identificationDocument" ? (
                              <Spinner color="red" size="md" />
                            ) : values?.identificationDocument ? (
                              <Flex
                                border="1px solid #cccccc"
                                borderRadius="8px"
                                py="12px"
                                fontSize="12px"
                                cursor={isUploading ? "" : "pointer"}
                                fontWeight={500}
                                color="#090C02"
                                px="16px"
                                onClick={() => {
                                  isUploading
                                    ? ""
                                    : (setFiles({
                                        ...files,
                                        identificationDocument: "",
                                      }),
                                      setValues({
                                        ...values,
                                        identificationDocument: "",
                                      }));
                                }}
                              >
                                Delete
                              </Flex>
                            ) : (
                              ""
                            )}
                          </Flex>

                          {formSubmitted && !values?.identificationDocument && (
                            <Text mt="8px" fontSize="13px" color="tomato">
                              Identification Document is required
                            </Text>
                          )}
                        </Box>
                      </>
                    )}

                    <Flex gap="24px" mt="24px">
                      <Button
                        variant="adminSecondary"
                        w="45%"
                        onClick={() =>
                          navigate(PRIVATE_PATHS.ADMIN_STAFF_PROFILE)
                        }
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="adminPrimary"
                        w="55%"
                        isLoading={isLoading}
                        type="submit"
                      >
                        Save
                      </Button>
                    </Flex>
                  </Form>
                )}
              </Formik>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default AddStaff;

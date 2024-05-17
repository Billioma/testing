import React, { useState } from "react";
import { Box, Button, Checkbox, Flex, Text } from "@chakra-ui/react";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { Form, Formik } from "formik";
import {
  initAdminStaffValues,
  validateAdminStaffSchema,
} from "../../../utils/validation";
import AdminCustomInput from "../../../components/common/AdminCustomInput";
import DateTimePicker from "../../../components/data/Admin/DateTimePicker";
import {
  customStyles,
  errorCustomStyles,
} from "../../../components/common/constants";
import Select from "react-select";
import { PRIVATE_PATHS } from "../../../routes/constants";
import useCustomToast from "../../../utils/notifications";
import { useAddStaff } from "../../../services/admin/query/staff";
import { useNavigate } from "react-router-dom";
import {
  useGetDepts,
  useGetJobs,
} from "../../../services/admin/query/configurations";
import { useGetRoles } from "../../../services/admin/query/configurations";
import { formatDate, formatNewDate } from "../../../utils/helpers";

const AddStaff = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [steps, setSteps] = useState({
    step1: true,
    step2: false,
    step3: false,
    step4: false,
    step5: false,
    step6: false,
  });
  const { data: depts } = useGetDepts({}, 1, 1000);
  const { data: jobs } = useGetJobs({}, 1, 1000);
  const { data: roles } = useGetRoles({}, 1, 1000);

  const { errorToast, successToast } = useCustomToast();

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
      phoneNumber,
      guarantor1Phone,
      guarantor2Phone,
      role,
      department,
      jobTitle,
      secondaryPhoneNumber,
      nextOfKinPhone,
      ...rest
    } = values;
    mutate({
      ...rest,
      role: role?.value,
      department: department?.value,
      jobTitle: jobTitle?.value,
      phoneNumber: `+234${Number(phoneNumber)}`,
      guarantor1Phone: `+234${Number(guarantor1Phone)}`,
      guarantor2Phone: `+234${Number(guarantor2Phone)}`,
      nextOfKinPhone: `+234${Number(nextOfKinPhone)}`,
      secondaryPhoneNumber: secondaryPhoneNumber
        ? `+234${Number(secondaryPhoneNumber)}`
        : "",
    });
  };
  const [dept, setDept] = useState("");

  const rolesToMap = roles?.data?.filter((item) => item?.isStaffRole);
  const roleOptions = rolesToMap?.map((role) => ({
    label: role?.displayName,
    value: Number(role?.id),
  }));
  const deptsOptions = depts?.data?.map((dept) => ({
    label: dept?.name,
    value: Number(dept?.id),
  }));

  const jobsOptions = jobs?.data
    ?.filter((item) => Number(item?.department?.id) === Number(dept?.value))
    ?.map((job) => ({
      label: job?.name,
      value: Number(job?.id),
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
                        values?.residentialAddress
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
                          <AdminCustomInput
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
                          <AdminCustomInput
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
                          <AdminCustomInput
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
                          <AdminCustomInput
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
                          <AdminCustomInput
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
                            Residential Address 2 (Secondary){" "}
                          </Text>
                          <AdminCustomInput
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
                      </Box>
                    )}

                    <Flex
                      justifyContent="space-between"
                      color={
                        values?.staffId &&
                        values?.department &&
                        values?.role &&
                        values?.monthlySalary &&
                        values?.startDate &&
                        values?.jobTitle
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

                        <Text fontWeight={500}>Company Information</Text>
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
                          <AdminCustomInput
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

                        <Box w="full" mb={4}>
                          <Text
                            mb="8px"
                            fontSize="12px"
                            fontWeight={500}
                            color="#444648"
                          >
                            Start Date{" "}
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
                            selectedDate={values?.startDate}
                            onChange={(date) => {
                              setValues({ ...values, startDate: date });
                            }}
                          />

                          {formSubmitted && !values?.startDate && (
                            <Text mt="8px" fontSize="12px" color="tomato">
                              Start Date is required
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
                            Department{" "}
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
                              formSubmitted && !values?.department
                                ? errorCustomStyles
                                : customStyles
                            }
                            placeholder="Select department"
                            options={deptsOptions}
                            name="department"
                            onChange={(selectedOption) => {
                              setValues({
                                ...values,
                                department: selectedOption,
                              });
                              setDept(selectedOption);
                            }}
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

                          {formSubmitted && !values?.department && (
                            <Text mt="8px" fontSize="13px" color="tomato">
                              Department is required
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
                            Job Title{" "}
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
                              formSubmitted && !values?.jobTitle
                                ? errorCustomStyles
                                : customStyles
                            }
                            isDisabled={!dept}
                            placeholder="Select Job Title"
                            options={jobsOptions}
                            name="jobTitle"
                            onChange={(selectedOption) =>
                              setValues({
                                ...values,
                                jobTitle: selectedOption,
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

                          {formSubmitted && !values?.jobTitle && (
                            <Text mt="8px" fontSize="13px" color="tomato">
                              Job Title is required
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
                            Net Monthly Salary{" "}
                            <span
                              style={{
                                color: "tomato",
                                fontSize: "15px",
                              }}
                            >
                              *
                            </span>
                          </Text>
                          <AdminCustomInput
                            auth
                            mb
                            naira
                            type="number"
                            holder="Enter Net Monthly Salary"
                            name="monthlySalary"
                            value={values?.monthlySalary}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              (formSubmitted || touched?.monthlySalary) &&
                              errors?.monthlySalary
                            }
                          />
                        </Box>
                      </>
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

                        <Text fontWeight={500}>Next of Kin</Text>
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
                          <AdminCustomInput
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
                          <AdminCustomInput
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
                          <AdminCustomInput
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
                        values?.guarantor1 &&
                        values?.guarantor1Address &&
                        values?.guarantor1Phone &&
                        values?.guarantor2 &&
                        values?.guarantor2Address &&
                        values?.guarantor2Phone
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

                        <Text fontWeight={500}>Guarantor Information</Text>
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
                          <AdminCustomInput
                            auth
                            mb
                            holder="Full Name"
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

                        <Box w="full" mb={4}>
                          <Text mb="8px"></Text>
                          <AdminCustomInput
                            mb
                            auth
                            ngn
                            name="guarantor1Phone"
                            value={`${values?.guarantor1Phone}`}
                            onChange={(e) => {
                              const inputPhone = e.target.value
                                .replace(/\D/g, "")
                                .slice(0, 11);
                              handleChange({
                                target: {
                                  name: "guarantor1Phone",
                                  value: `${inputPhone}`,
                                },
                              });
                            }}
                            onBlur={handleBlur}
                            error={
                              (formSubmitted || touched?.guarantor1Phone) &&
                              errors?.guarantor1Phone
                            }
                          />
                        </Box>

                        <Box w="full" mb={4}>
                          <Text mb="8px"></Text>
                          <AdminCustomInput
                            auth
                            mb
                            holder="Address"
                            name="guarantor1Address"
                            value={values?.guarantor1Address}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              (formSubmitted || touched?.guarantor1Address) &&
                              errors?.guarantor1Address
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
                          <AdminCustomInput
                            auth
                            mb
                            holder="Full Name"
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

                        <Box w="full" mb={4}>
                          <Text mb="8px"></Text>
                          <AdminCustomInput
                            mb
                            auth
                            ngn
                            name="guarantor2Phone"
                            value={`${values?.guarantor2Phone}`}
                            onChange={(e) => {
                              const inputPhone = e.target.value
                                .replace(/\D/g, "")
                                .slice(0, 11);
                              handleChange({
                                target: {
                                  name: "guarantor2Phone",
                                  value: `${inputPhone}`,
                                },
                              });
                            }}
                            onBlur={handleBlur}
                            error={
                              (formSubmitted || touched?.guarantor2Phone) &&
                              errors?.guarantor2Phone
                            }
                          />
                        </Box>

                        <Box w="full" mb={4}>
                          <Text mb="8px"></Text>
                          <AdminCustomInput
                            auth
                            mb
                            holder="Address"
                            name="guarantor2Address"
                            value={values?.guarantor2Address}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              (formSubmitted || touched?.guarantor2Address) &&
                              errors?.guarantor2Address
                            }
                          />
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
                      pb={steps?.step5 ? "" : "24px"}
                      borderBottom={steps?.step5 ? "none" : "1px solid #E4E6E8"}
                      onClick={() =>
                        setSteps({
                          step1: false,
                          step2: false,
                          step3: false,
                          step4: false,
                          step5: !steps.step5,
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
                          <Text>5</Text>
                        </Flex>

                        <Text fontWeight={500}>Employee Documents</Text>
                      </Flex>

                      {steps?.step5 ? (
                        <IoIosArrowDown size="20px" />
                      ) : (
                        <IoIosArrowForward size="20px" />
                      )}
                    </Flex>

                    {steps?.step5 && (
                      <>
                        <Text mt="12px" fontSize="13px" color="#444648">
                          Please confirm if you have received the following
                          documents from the employee
                        </Text>
                        <Flex
                          align="center"
                          gap="12px"
                          cursor="pointer"
                          onClick={() =>
                            setValues({
                              ...values,
                              employmentLetter: !values?.employmentLetter,
                            })
                          }
                          w="full"
                          mb={4}
                          mt="24px"
                        >
                          <Checkbox
                            isChecked={values?.employmentLetter}
                            onChange={(e) =>
                              setValues({
                                ...values,
                                employmentLetter: e.target.checked,
                              })
                            }
                          />

                          <Text color="#444648" fontSize="14px">
                            Employment Letter
                          </Text>
                        </Flex>

                        <Flex
                          align="center"
                          gap="12px"
                          w="full"
                          mb={4}
                          cursor="pointer"
                          onClick={() =>
                            setValues({
                              ...values,
                              guarantorForm: !values?.guarantorForm,
                            })
                          }
                          mt="24px"
                        >
                          <Checkbox
                            isChecked={values?.guarantorForm}
                            onChange={(e) =>
                              setValues({
                                ...values,
                                guarantorForm: e.target.checked,
                              })
                            }
                          />

                          <Text color="#444648" fontSize="14px">
                            Guarantor Form 1
                          </Text>
                        </Flex>

                        <Flex
                          align="center"
                          gap="12px"
                          w="full"
                          cursor="pointer"
                          onClick={() =>
                            setValues({
                              ...values,
                              guarantorForm2: !values?.guarantorForm2,
                            })
                          }
                          mb={4}
                          mt="24px"
                        >
                          <Checkbox
                            isChecked={values?.guarantorForm2}
                            onChange={(e) =>
                              setValues({
                                ...values,
                                guarantorForm2: e.target.checked,
                              })
                            }
                          />

                          <Text color="#444648" fontSize="14px">
                            Guarantor Form 2
                          </Text>
                        </Flex>

                        <Flex
                          align="center"
                          gap="12px"
                          w="full"
                          mb={4}
                          mt="24px"
                          cursor="pointer"
                          onClick={() =>
                            setValues({
                              ...values,
                              confidentialityAgreement:
                                !values?.confidentialityAgreement,
                            })
                          }
                        >
                          <Checkbox
                            isChecked={values?.confidentialityAgreement}
                            onChange={(e) =>
                              setValues({
                                ...values,
                                confidentialityAgreement: e.target.checked,
                              })
                            }
                          />

                          <Text color="#444648" fontSize="14px">
                            Confidentiality Agreement
                          </Text>
                        </Flex>

                        <Flex
                          align="center"
                          gap="12px"
                          w="full"
                          mb={4}
                          mt="24px"
                          cursor="pointer"
                          onClick={() =>
                            setValues({
                              ...values,
                              nonSolicitationAgreement:
                                !values?.nonSolicitationAgreement,
                            })
                          }
                        >
                          <Checkbox
                            isChecked={values?.nonSolicitationAgreement}
                            onChange={(e) =>
                              setValues({
                                ...values,
                                nonSolicitationAgreement: e.target.checked,
                              })
                            }
                          />

                          <Text color="#444648" fontSize="14px">
                            Non-Solicication & Non-Competition Agreement
                          </Text>
                        </Flex>

                        <Flex
                          align="center"
                          gap="12px"
                          w="full"
                          mb={4}
                          cursor="pointer"
                          onClick={() =>
                            setValues({
                              ...values,
                              exclusivity: !values?.exclusivity,
                            })
                          }
                          mt="24px"
                        >
                          <Checkbox
                            isChecked={values?.exclusivity}
                            onChange={(e) =>
                              setValues({
                                ...values,
                                exclusivity: e.target.checked,
                              })
                            }
                          />

                          <Text color="#444648" fontSize="14px">
                            Exclusivity & Non-Conflict of Interest Agreement
                          </Text>
                        </Flex>

                        <Flex
                          align="center"
                          gap="12px"
                          w="full"
                          mb={4}
                          cursor="pointer"
                          onClick={() =>
                            setValues({
                              ...values,
                              identificationDocument:
                                !values?.identificationDocument,
                            })
                          }
                          mt="24px"
                        >
                          <Checkbox
                            isChecked={values?.identificationDocument}
                            onChange={(e) =>
                              setValues({
                                ...values,
                                identificationDocument: e.target.checked,
                              })
                            }
                          />

                          <Text color="#444648" fontSize="14px">
                            Government Issued ID
                          </Text>
                        </Flex>
                      </>
                    )}

                    <Flex
                      justifyContent="space-between"
                      color={
                        values?.driverLicenseNumber &&
                        values?.issueDate &&
                        values?.expiryDate &&
                        values?.expiryDate > values?.issueDate
                          ? "#0B841D"
                          : "#090C02"
                      }
                      mt="24px"
                      align="center"
                      w="full"
                      cursor="pointer"
                      pb={steps?.step6 ? "" : "24px"}
                      borderBottom={steps?.step6 ? "none" : "1px solid #E4E6E8"}
                      onClick={() =>
                        setSteps({
                          step1: false,
                          step2: false,
                          step3: false,
                          step4: false,
                          step5: false,
                          step6: !steps.step4,
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
                          <Text>6</Text>
                        </Flex>

                        <Text fontWeight={500}>
                          Driver's License (Optional)
                        </Text>
                      </Flex>

                      {steps?.step6 ? (
                        <IoIosArrowDown size="20px" />
                      ) : (
                        <IoIosArrowForward size="20px" />
                      )}
                    </Flex>

                    {steps?.step6 && (
                      <>
                        <Box w="full" mb={4} mt="24px">
                          <Text
                            mb="8px"
                            fontSize="12px"
                            fontWeight={500}
                            color="#444648"
                          >
                            License Number
                          </Text>
                          <AdminCustomInput
                            auth
                            mb
                            holder="License Number"
                            name="driverLicenseNumber"
                            value={values?.driverLicenseNumber}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              (formSubmitted || touched?.driverLicenseNumber) &&
                              errors?.driverLicenseNumber
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
                            Issue Date
                          </Text>
                          <DateTimePicker
                            selectedDate={values?.issueDate}
                            onChange={(date) => {
                              setValues({ ...values, issueDate: date });
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
                            Expiry Date
                          </Text>
                          <DateTimePicker
                            selectedDate={values?.expiryDate}
                            onChange={(date) => {
                              setValues({ ...values, expiryDate: date });
                            }}
                          />
                        </Box>

                        {values?.issueDate &&
                          values?.expiryDate &&
                          values?.expiryDate < values?.issueDate && (
                            <Text mt="8px" fontSize="14px" color="red">
                              Expiry Date is earlier than Issue Date
                            </Text>
                          )}
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
                        isDisabled={values?.expiryDate < values?.issueDate}
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

import React, { useState } from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
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
import { PRIVATE_PATHS } from "../../../routes/constants";
import useCustomToast from "../../../utils/notifications";
import { useCreateIncident } from "../../../services/admin/query/reports";
import { useNavigate } from "react-router-dom";
import TextInput from "../../../components/common/TextInput";
import {
  useGetAdministrators,
  useGetAllStaff,
} from "../../../services/admin/query/users";

const CreateIncident = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [steps, setSteps] = useState({
    step1: true,
    step2: false,
    step3: false,
    step4: false,
  });

  const { data: staffs } = useGetAllStaff({}, 1, 1000);
  const { data: managers } = useGetAdministrators({}, 1, 1000);

  const staffOptions = staffs?.map((staff) => ({
    label: staff?.fullName,
    value: Number(staff?.id),
  }));

  const managerOptions = managers?.data
    ?.filter((item) => item?.isManager)
    ?.map((staff) => ({
      label: `${staff?.firstName} ${staff?.lastName}`,
      value: Number(staff?.id),
    }));

  const { errorToast, successToast } = useCustomToast();
  const incident = JSON.parse(sessionStorage.getItem("incident"));

  const navigate = useNavigate();
  const { mutate, isLoading } = useCreateIncident({
    onSuccess: () => {
      successToast("Report created successfully!");
      sessionStorage.removeItem("incident");
      navigate(PRIVATE_PATHS.ADMIN_INCIDENTS);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const handleSubmit = (values = "") => {
    const { manager, staffInvolved, ...rest } = values;
    mutate({
      ...rest,
      serviceLog: Number(incident?.id),
      manager: Number(incident?.location?.managers[0]?.id),
      locationManager: Number(manager?.value),
      location: Number(incident?.location?.id),
      dateOfReport: new Date(),
      staffInvolved: staffInvolved?.map((item) => Number(item?.value)),
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
            <Text
              borderBottom="1px solid #E4E6E8"
              pb="10px"
              color="#090C02"
              fontWeight={500}
              fontSize="20px"
            >
              Report Incident
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
                      color="#0B841D"
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

                        <Text fontWeight={500}>Customer Information</Text>
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
                            Full Name
                          </Text>
                          <CustomInput
                            auth
                            mb
                            value={
                              incident?.customer
                                ? `${incident?.customer?.profile?.firstName} ${incident?.customer?.profile?.lastName}`
                                : incident?.vehicle?.customerName
                            }
                            isDisabled
                          />
                        </Box>

                        <Box w="full" mb={4}>
                          <Text
                            mb="8px"
                            fontSize="12px"
                            fontWeight={500}
                            color="#444648"
                          >
                            Email Address
                          </Text>
                          <CustomInput
                            auth
                            mb
                            value={
                              incident?.customer
                                ? incident?.customer?.email
                                : "N/A"
                            }
                            isDisabled
                          />
                        </Box>

                        <Box w="full" mb={4}>
                          <Text
                            mb="8px"
                            fontSize="12px"
                            fontWeight={500}
                            color="#444648"
                          >
                            Phone Number
                          </Text>
                          {console.log(incident)}
                          <CustomInput
                            auth
                            mb
                            ngn
                            value={
                              incident?.customer
                                ? incident?.customer?.profile?.phone
                                : "N/A"
                            }
                            isDisabled
                          />
                        </Box>
                      </Box>
                    )}

                    <Flex
                      justifyContent="space-between"
                      color="#0B841D"
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

                        <Text fontWeight={500}>Vehicle Information</Text>
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
                            Make
                          </Text>
                          <CustomInput
                            auth
                            mb
                            value={incident?.vehicle?.make?.name}
                            isDisabled
                          />
                        </Box>

                        <Box w="full" mb={4} mt="24px">
                          <Text
                            mb="8px"
                            fontSize="12px"
                            fontWeight={500}
                            color="#444648"
                          >
                            Model
                          </Text>
                          <CustomInput
                            auth
                            mb
                            value={incident?.vehicle?.model?.name}
                            isDisabled
                          />
                        </Box>

                        <Box w="full" mb={4} mt="24px">
                          <Text
                            mb="8px"
                            fontSize="12px"
                            fontWeight={500}
                            color="#444648"
                          >
                            Color
                          </Text>
                          <CustomInput
                            auth
                            mb
                            value={incident?.vehicle?.color}
                            isDisabled
                          />
                        </Box>
                        <Box w="full" mb={4} mt="24px">
                          <Text
                            mb="8px"
                            fontSize="12px"
                            fontWeight={500}
                            color="#444648"
                          >
                            License Plate No.
                          </Text>
                          <CustomInput
                            auth
                            mb
                            value={incident?.vehicle?.licensePlate}
                            isDisabled
                          />
                        </Box>

                        <Box w="full" mb={4} mt="24px">
                          <Text
                            mb="8px"
                            fontSize="12px"
                            fontWeight={500}
                            color="#444648"
                          >
                            State
                          </Text>
                          <CustomInput
                            auth
                            mb
                            value={incident?.vehicle?.state}
                            isDisabled
                          />
                        </Box>
                      </>
                    )}

                    <Flex
                      justifyContent="space-between"
                      color="#0B841D"
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

                        <Text fontWeight={500}>Service Information</Text>
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
                            Ticket Number
                          </Text>
                          <CustomInput
                            auth
                            mb
                            isDisabled
                            value={incident?.ticketNumber}
                          />
                        </Box>

                        <Box w="full" mb={4} mt="24px">
                          <Text
                            mb="8px"
                            fontSize="12px"
                            fontWeight={500}
                            color="#444648"
                          >
                            Service Type
                          </Text>
                          <CustomInput
                            mb
                            auth
                            value={incident?.service?.name}
                            isDisabled
                          />
                        </Box>
                      </>
                    )}

                    <Flex
                      justifyContent="space-between"
                      color={
                        values?.dateOfIncident &&
                        values?.manager &&
                        values?.staffInvolved?.length &&
                        values?.summary
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

                        <Text fontWeight={500}>Incident Summary</Text>
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
                            Date of Incident
                          </Text>
                          <DateTimePicker
                            selectedDate={values?.dateOfIncident}
                            onChange={(date) => {
                              setValues({ ...values, dateOfIncident: date });
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
                          <CustomInput
                            mb
                            auth
                            value={incident?.location?.name}
                            isDisabled
                          />
                        </Box>

                        <Box w="full" mb={4}>
                          <Text
                            mb="8px"
                            fontSize="12px"
                            fontWeight={500}
                            color="#444648"
                          >
                            Staff Involved{" "}
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
                              formSubmitted && !values?.staffInvolved
                                ? errorCustomStyles
                                : customStyles
                            }
                            placeholder="Select staff"
                            isMulti
                            options={staffOptions}
                            name="staffInvolved"
                            onChange={(selectedOption) =>
                              setValues({
                                ...values,
                                staffInvolved: selectedOption,
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

                          {formSubmitted && !values?.staffInvolved && (
                            <Text mt="8px" fontSize="13px" color="tomato">
                              Staff is required
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
                            Manager on Duty{" "}
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
                              formSubmitted && !values?.manager
                                ? errorCustomStyles
                                : customStyles
                            }
                            placeholder="Select manager"
                            options={managerOptions}
                            name="manager"
                            onChange={(selectedOption) =>
                              setValues({
                                ...values,
                                manager: selectedOption,
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

                          {formSubmitted && !values?.manager && (
                            <Text mt="8px" fontSize="13px" color="tomato">
                              Manager on Duty is required
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
                            Location Manager{" "}
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
                            value={`${incident?.location?.managers[0]?.firstName} ${incident?.location?.managers[0]?.lastName}`}
                            isDisabled
                          />
                        </Box>

                        <Box w="full" mb={4}>
                          <Text
                            mb="8px"
                            fontSize="12px"
                            fontWeight={500}
                            color="#444648"
                          >
                            Summary Notes{" "}
                            <span
                              style={{
                                color: "tomato",
                                fontSize: "15px",
                              }}
                            >
                              *
                            </span>
                          </Text>
                          <TextInput
                            auth
                            mb
                            h="100px"
                            holder="Enter summary"
                            name="summary"
                            value={values?.summary}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              (formSubmitted || touched?.summary) &&
                              errors?.summary
                            }
                          />
                        </Box>
                      </>
                    )}

                    <Box mt="24px">
                      <Button
                        variant="adminPrimary"
                        w="100%"
                        isLoading={isLoading}
                        type="submit"
                      >
                        Submit
                      </Button>
                    </Box>
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

export default CreateIncident;

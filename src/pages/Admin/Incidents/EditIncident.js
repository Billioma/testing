import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Spinner, Text } from "@chakra-ui/react";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import CustomInput from "../../../components/common/CustomInput";
import DateTimePicker from "../../../components/data/Admin/DateTimePicker";
import { customStyles } from "../../../components/common/constants";
import Select from "react-select";
import useCustomToast from "../../../utils/notifications";
import {
  useGetAdminIncident,
  useUpdateIncident,
} from "../../../services/admin/query/reports";
import { useNavigate, useParams } from "react-router-dom";
import TextInput from "../../../components/common/TextInput";
import {
  useGetAdministrators,
  useGetAllStaff,
} from "../../../services/admin/query/users";

const EditIncident = () => {
  const [values, setValues] = useState({
    manager: "",
    guestFirstName: "",
    guestLastName: "",
    guestPhoneNumber: "",
    guestEmail: "",
    dateOfIncident: new Date(),
    summary: "",
    type: "",
    staffInvolved: [""],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const { id } = useParams();

  const [steps, setSteps] = useState({
    step1: true,
    step2: false,
    step3: false,
    step4: false,
  });

  const { data: staffs } = useGetAllStaff({}, 1, 1000);
  const { data: managers } = useGetAdministrators({}, 1, 1000);

  const { refetch, data, isLoading: isGetting } = useGetAdminIncident(id);

  const staffOptions = staffs?.map((staff) => ({
    label: staff?.fullName,
    value: Number(staff?.id),
  }));

  const typeOptions = ["Accident", "Damages", "Theft"]?.map((type) => ({
    label: type,
    value: type,
  }));

  const managerOptions = managers?.data
    ?.filter((item) => item?.isManager)
    ?.map((staff) => ({
      label: `${staff?.firstName} ${staff?.lastName}`,
      value: Number(staff?.id),
    }));

  const { errorToast, successToast } = useCustomToast();

  const navigate = useNavigate();
  const { mutate, isLoading } = useUpdateIncident({
    onSuccess: () => {
      successToast("Report updated successfully!");
      navigate(-1);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const isDisabled = Object.values(values).some((value) => !value);

  const handleSubmit = () => {
    const { manager, type, staffInvolved, ...rest } = values;

    mutate({
      query: id,
      body: {
        ...rest,
        serviceLog: Number(data?.serviceLog?.id),
        manager: Number(manager?.value),
        locationManager: Number(data?.locationManager?.id),
        location: Number(data?.serviceLog?.location?.id),
        staffInvolved: staffInvolved?.map((item) => Number(item?.value)),
        type: type?.value,
      },
    });
  };

  useEffect(() => {
    const selectedType = typeOptions?.find(
      (option) => option.label === data?.type
    );
    const selectedManager = managerOptions?.find(
      (option) => option.value === Number(data?.manager?.id)
    );

    const selectedStaff = data?.staffInvolved
      ?.map((item) => {
        const matchedStaff = staffs?.find((staff) => staff.id === item?.id);
        return matchedStaff
          ? { label: matchedStaff.fullName, value: Number(matchedStaff.id) }
          : null;
      })
      .filter(Boolean);

    setValues({
      ...values,
      guestFirstName: data?.serviceLog?.customer?.profile?.firstName,
      guestLastName: data?.serviceLog?.customer?.profile?.lastName,
      guestEmail: data?.serviceLog?.customer?.email,
      guestPhoneNumber: data?.serviceLog?.customer?.profile?.phone,
      dateOfIncident: new Date(data?.dateOfIncident),
      dateOfReport: new Date(data?.dateOfReport),
      type: selectedType,
      staffInvolved: selectedStaff,
      manager: selectedManager,
      summary: data?.summary,
    });
  }, [data, staffs]);

  const isTrue = data?.serviceLog?.customer;

  return (
    <Box minH="75vh">
      <Flex align="flex-start" flexDir={{ md: "row", base: "column" }}>
        <GoBackTab />
        {isGetting ? (
          <Flex minH="60vh" w="full" justifyContent="center" align="center">
            <Spinner />
          </Flex>
        ) : (
          <>
            <Flex
              justifyContent="center"
              align="center"
              w="full"
              flexDir="column"
            >
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
                  <Flex
                    justifyContent="space-between"
                    color={isDisabled ? "#090C02" : "#0B841D"}
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
                          First Name
                        </Text>
                        <CustomInput
                          auth
                          mb
                          name="guestFirstName"
                          isDisabled={isTrue}
                          value={values?.guestFirstName}
                          onChange={handleChange}
                        />
                      </Box>

                      <Box w="full" mb={4}>
                        <Text
                          mb="8px"
                          fontSize="12px"
                          fontWeight={500}
                          color="#444648"
                        >
                          Last Name
                        </Text>
                        <CustomInput
                          auth
                          mb
                          name="guestLastName"
                          isDisabled={isTrue}
                          value={values?.guestLastName}
                          onChange={handleChange}
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
                          name="guestEmail"
                          isDisabled={isTrue}
                          value={values?.guestEmail}
                          onChange={handleChange}
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

                        <CustomInput
                          auth
                          mb
                          name="guestPhoneNumber"
                          ngn
                          value={values?.guestPhoneNumber}
                          isDisabled={isTrue}
                          onChange={(e) => {
                            const inputPhone = e.target.value
                              .replace(/\D/g, "")
                              .slice(0, 11);
                            setValues({
                              ...values,
                              guestPhoneNumber: inputPhone,
                            });
                          }}
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
                          value={data?.serviceLog?.vehicle?.make?.name}
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
                          value={data?.serviceLog?.vehicle?.model?.name}
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
                          value={data?.serviceLog?.vehicle?.color}
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
                          value={data?.serviceLog?.vehicle?.licensePlate}
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
                          value={data?.serviceLog?.vehicle?.state}
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
                          value={data?.serviceLog?.ticketNumber}
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
                          value={data?.serviceLog?.service?.name}
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
                            setValues({
                              ...values,
                              dateOfIncident: date,
                            });
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
                          Incident Type{" "}
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
                          styles={customStyles}
                          placeholder="Select type"
                          options={typeOptions}
                          name="type"
                          value={values.type}
                          onChange={(selectedOption) =>
                            setValues({
                              ...values,
                              type: selectedOption,
                            })
                          }
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
                          value={data?.serviceLog?.location?.name}
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
                          styles={customStyles}
                          placeholder="Select staff"
                          isMulti
                          options={staffOptions}
                          name="staffInvolved"
                          value={values?.staffInvolved}
                          onChange={(selectedOption) =>
                            setValues({
                              ...values,
                              staffInvolved: selectedOption,
                            })
                          }
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
                          styles={customStyles}
                          placeholder="Select manager"
                          options={managerOptions}
                          value={values?.manager}
                          name="manager"
                          onChange={(selectedOption) =>
                            setValues({
                              ...values,
                              manager: selectedOption,
                            })
                          }
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
                          value={`${data?.locationManager?.firstName} ${data?.locationManager?.lastName}`}
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
                        />
                      </Box>
                    </>
                  )}

                  <Box mt="24px">
                    <Button
                      variant="adminPrimary"
                      w="100%"
                      onClick={handleSubmit}
                      isLoading={isLoading}
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Box>
                </Box>
              </Flex>
            </Flex>
          </>
        )}
      </Flex>
    </Box>
  );
};

export default EditIncident;

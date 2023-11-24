import React, { useState } from "react";
import { Box, Flex, Text, Button, Switch } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import {
  customStyles,
  errorCustomStyles,
  RateTypes,
  statusType,
} from "../../../components/common/constants";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { PRIVATE_PATHS } from "../../../routes/constants";
import useCustomToast from "../../../utils/notifications";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import { useGetOperators } from "../../../services/admin/query/users";
import { useAddRate } from "../../../services/admin/query/locations";
import { useGetServices } from "../../../services/admin/query/services";
import { Form, Formik } from "formik";
import { IoIosArrowDown } from "react-icons/io";
import {
  initAdminRateValues,
  validateAdminRateSchema,
} from "../../../utils/validation";

export default function AddZone() {
  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();
  const { mutate, isLoading } = useAddRate({
    onSuccess: () => {
      successToast("Rate added successfully!");
      navigate(PRIVATE_PATHS.ADMIN_RATES);
    },
    onError: (error) => {
      errorToast(
        error?.response?.data?.message || error?.message || "An Error occurred"
      );
    },
  });

  const { data: operators } = useGetOperators({}, 1, 1000);
  const { data: services } = useGetServices({}, 1, 1000);

  const rateOptions = RateTypes?.map((rate, i) => ({
    value: i,
    label: rate,
  }));

  const operatorOptions = operators?.data?.map((operator) => ({
    label: operator?.name,
    value: parseInt(operator?.id),
  }));

  const statusOptions = statusType?.map((status, i) => ({
    value: i,
    label: status,
  }));

  const carServiceOptions = [
    { label: "PREMIUM", value: "PREMIUM" },
    { label: "BASIC", value: "BASIC" },
  ];

  const serviceOptions = services?.data?.map((service) => ({
    label: service?.name,
    value: parseInt(service?.id),
    serviceType: service?.serviceType,
  }));

  const handleSubmit = (values = "") => {
    const {
      operator,
      service,
      rateType,
      status,
      showCarServiceType,
      carServiceType,
      ...rest
    } = values;
    mutate({
      ...rest,
      operator: operator?.value,
      service: service?.value,
      serviceType: service?.serviceType,
      rateType: rateType?.value,
      status: status?.value,
      carServiceType: showCarServiceType ? carServiceType?.value : null,
    });
  };

  const [formSubmitted, setFormSubmitted] = useState(false);
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
            <Formik
              onSubmit={handleSubmit}
              initialValues={initAdminRateValues}
              validationSchema={validateAdminRateSchema}
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
                      fontSize="10px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Rate Name{" "}
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
                      auth
                      mb
                      holder="Enter rate name"
                      name="name"
                      value={values?.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={(formSubmitted || touched?.name) && errors?.name}
                    />
                  </Box>
                  <Box w="full" mb={4}>
                    <Text
                      mb="8px"
                      fontSize="10px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Operator{" "}
                      <span
                        style={{
                          color: "tomato",
                          fontSize: "13px",
                        }}
                      >
                        *
                      </span>
                    </Text>
                    <Select
                      styles={
                        formSubmitted && !values?.operator
                          ? errorCustomStyles
                          : customStyles
                      }
                      placeholder="Select operator"
                      options={operatorOptions}
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
                    {formSubmitted && !values?.operator && (
                      <Text mt="8px" fontSize="10px" color="tomato">
                        Operator is required
                      </Text>
                    )}
                  </Box>
                  <Box w="full" mb={4}>
                    <Text
                      mb="8px"
                      fontSize="10px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Service{" "}
                      <span
                        style={{
                          color: "tomato",
                          fontSize: "13px",
                        }}
                      >
                        *
                      </span>
                    </Text>
                    <Select
                      styles={
                        formSubmitted && !values?.service
                          ? errorCustomStyles
                          : customStyles
                      }
                      placeholder="Select service"
                      options={serviceOptions}
                      name="service"
                      onChange={(selectedOption) =>
                        setValues({
                          ...values,
                          service: selectedOption,
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
                    {formSubmitted && !values?.service && (
                      <Text mt="8px" fontSize="10px" color="tomato">
                        Service is required
                      </Text>
                    )}
                  </Box>
                  <Box w="full" mb={4}>
                    <Text
                      mb="8px"
                      fontSize="10px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Rate Type{" "}
                      <span
                        style={{
                          color: "tomato",
                          fontSize: "13px",
                        }}
                      >
                        *
                      </span>
                    </Text>
                    <Select
                      styles={
                        formSubmitted && !values?.rateType
                          ? errorCustomStyles
                          : customStyles
                      }
                      placeholder="Select rate type"
                      options={rateOptions}
                      name="rateType"
                      onChange={(selectedOption) =>
                        setValues({
                          ...values,
                          rateType: selectedOption,
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
                    {formSubmitted && !values?.rateType && (
                      <Text mt="8px" fontSize="10px" color="tomato">
                        Rate Type is required
                      </Text>
                    )}
                  </Box>
                  <Box w="full" mb={4}>
                    <Text
                      mb="8px"
                      fontSize="10px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Amount{" "}
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
                      auth
                      mb
                      holder="Enter amount"
                      type="number"
                      name="amount"
                      value={values?.amount}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        (formSubmitted || touched?.amount) && errors?.amount
                      }
                    />
                  </Box>
                  <Flex
                    align="center"
                    justifyContent={"space-between"}
                    gap="15px"
                    mb="16px"
                    mt={2}
                  >
                    <Text fontSize="12px" fontWeight={500} color="#444648">
                      Add Limit{" "}
                      <span
                        style={{
                          color: "tomato",
                          fontSize: "13px",
                        }}
                      >
                        *
                      </span>
                    </Text>
                    <Switch
                      onChange={() =>
                        setValues({
                          ...values,
                          noLimit: !values?.noLimit,
                        })
                      }
                      isChecked={values?.noLimit}
                      size="sm"
                      variant="adminPrimary"
                    />
                  </Flex>
                  {formSubmitted && !values?.noLimit && (
                    <Text mt="-8px" fontSize="10px" color="tomato">
                      Limit is required
                    </Text>
                  )}
                  {values?.noLimit ? (
                    <Flex flexDir={"row"} gap={4}>
                      <Box w="full" mb={4}>
                        <Text
                          mb="8px"
                          fontSize="10px"
                          fontWeight={500}
                          color="#444648"
                        >
                          Duration Start (Minutes){" "}
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
                          auth
                          mb
                          holder="Enter duration start"
                          type="number"
                          name="durationStart"
                          value={values?.durationStart}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            (formSubmitted || touched?.durationStart) &&
                            errors?.durationStart
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
                          Duration Limit (Minutes){" "}
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
                          auth
                          mb
                          holder="Enter duration limit"
                          name="durationLimit"
                          value={values?.durationLimit}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            (formSubmitted || touched?.durationLimit) &&
                            errors?.durationLimit
                          }
                        />
                      </Box>
                    </Flex>
                  ) : null}
                  <Flex
                    align="center"
                    justifyContent={"space-between"}
                    gap="15px"
                    mb="16px"
                    mt={2}
                  >
                    <Text fontSize="12px" fontWeight={500} color="#444648">
                      Flat Rate
                    </Text>
                    <Switch
                      onChange={() =>
                        setValues({
                          ...values,
                          flatRate: values?.flatRate === 1 ? 0 : 1,
                        })
                      }
                      isChecked={values?.flatRate}
                      size="sm"
                      variant="adminPrimary"
                    />
                  </Flex>
                  <Flex
                    align="center"
                    justifyContent={"space-between"}
                    gap="15px"
                    mb="16px"
                    mt={2}
                  >
                    <Text fontSize="12px" fontWeight={500} color="#444648">
                      Select Billing Type
                    </Text>
                    <Switch
                      onChange={() =>
                        setValues({
                          ...values,
                          showCarServiceType: !values?.showCarServiceType,
                        })
                      }
                      isChecked={values?.showCarServiceType}
                      size="sm"
                      variant="adminPrimary"
                    />
                  </Flex>
                  {values?.showCarServiceType ? (
                    <Box w="full" mb={4}>
                      <Text
                        mb="8px"
                        fontSize="10px"
                        fontWeight={500}
                        color="#444648"
                      >
                        Add Billing Type
                      </Text>
                      <Select
                        styles={customStyles}
                        placeholder="Select Billing type"
                        options={carServiceOptions}
                        name="carServiceType"
                        onChange={(selectedOption) =>
                          setValues({
                            ...values,
                            carServiceType: selectedOption,
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
                  ) : null}
                  <Box w="full" mb={4}>
                    <Text
                      mb="8px"
                      fontSize="10px"
                      fontWeight={500}
                      color="#444648"
                    >
                      Select Status{" "}
                      <span
                        style={{
                          color: "tomato",
                          fontSize: "13px",
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
                      <Text mt="8px" fontSize="10px" color="tomato">
                        Statu is required
                      </Text>
                    )}
                  </Box>
                  <Flex gap="24px" mt="24px">
                    <Button
                      variant="adminSecondary"
                      w="100%"
                      onClick={() => navigate(PRIVATE_PATHS.ADMIN_RATES)}
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
                  </Flex>{" "}
                </Form>
              )}
            </Formik>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

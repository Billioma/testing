import React, { useState } from "react";
import { Box, Button, Flex, Text, Switch } from "@chakra-ui/react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import CustomInput from "../../../../components/common/CustomInput";
import { IoIosArrowDown } from "react-icons/io";
import useCustomToast from "../../../../utils/notifications";
import {
  useCreateRate,
  useGetOpLocation,
} from "../../../../services/operator/query/locations";
import { Form, Formik } from "formik";
import {
  initRateValues,
  validateRateSchema,
  validateRateLimitSchema,
} from "../../../../utils/validation";
import { useGetServices } from "../../../../services/customer/query/locations";
import {
  DurationTypes,
  RateTypes,
} from "../../../../components/common/constants";

const AddRate = () => {
  const navigate = useNavigate();
  const { data: locations } = useGetOpLocation();
  const { data: services } = useGetServices();

  const serviceOptions = services?.map((service) => ({
    value: service?.serviceType,
    label: service?.name,
    id: service?.id,
  }));

  const durationOptions = DurationTypes?.map((duration) => ({
    value: duration,
    label: duration,
  }));

  const rateOptions = RateTypes?.map((rate, i) => ({
    value: i,
    label: rate,
  }));

  const zoneOptions = locations?.data?.reduce((acc, location) => {
    const zones =
      location?.zones?.map((zone) => ({
        value: zone?.id,
        label: zone?.name,
      })) || [];
    return acc.concat(zones);
  }, []);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: "100%",
      minHeight: "44px",
      color: "#646668",
      fontSize: "14px",
      cursor: "pointer",
      borderRadius: "4px",
      border: "1px solid #d4d6d8",
      paddingRight: "16px",
      background: "unset",
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#f4f6f8",
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isFocused ? "" : "",
      backgroundColor: state.isFocused ? "#d4d6d8" : "",
    }),
  };

  const { errorToast, successToast } = useCustomToast();

  const { mutate: createMutate, isLoading: isCreating } = useCreateRate({
    onSuccess: (res) => {
      successToast(res?.message);
      navigate("/operator/locations/rates");
      sessionStorage.removeItem("edit");
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occured"
      );
    },
  });

  const handleSubmit = (values = "") => {
    const {
      rateType,
      durationStart,
      durationLimit,
      durationType,
      serviceType,
      zones,
      ...rest
    } = values;
    limit
      ? createMutate({
          ...rest,
          zones: zones?.map((dat) => Number(dat?.value)),
          serviceType: serviceType?.value,
          durationType: durationType?.value,
          rateType: Number(rateType?.value),
          noLimit: 1,
          durationLimit: durationLimit,
          durationStart: durationStart,
          service: Number(serviceType?.id),
        })
      : createMutate({
          ...rest,
          zones: zones?.map((dat) => Number(dat?.value)),
          serviceType: serviceType?.value,
          rateType: Number(rateType?.value),
          service: Number(serviceType?.id),
          noLimit: 0,
        });
  };

  const [limit, setLimit] = useState(false);

  return (
    <Box minH="75vh">
      <Flex align="flex-start">
        <Box w="full">
          <Flex
            onClick={() => navigate(-1)}
            color="#242628"
            align="center"
            cursor="pointer"
            mb="23px"
            w="fit-content"
            pos="sticky"
            top="7rem"
            gap="8px"
          >
            <HiOutlineArrowNarrowLeft size="24px" color="#242628" />
            <Text fontSize="14px" fontWeight={500} lineHeight="100%">
              Back
            </Text>
          </Flex>
        </Box>

        <Flex justifyContent="center" align="center" w="full" flexDir="column">
          <Flex
            bg="#fff"
            borderRadius="12px"
            border="1px solid #D4D6D8"
            px="28px"
            py="32px"
            justifyContent="center"
            align="center"
            w={{ base: "full", md: "27rem" }}
            flexDir="column"
          >
            <Box mt="24px" w="full">
              <Formik
                onSubmit={handleSubmit}
                initialValues={initRateValues}
                validationSchema={
                  limit ? validateRateLimitSchema : validateRateSchema
                }
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
                    <Box>
                      <Text
                        color="#444648"
                        fontSize="10px"
                        fontWeight={500}
                        mb="8px"
                        lineHeight="100%"
                      >
                        Name
                      </Text>
                      <CustomInput
                        name="name"
                        value={values?.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={errors?.name && touched?.name && errors?.name}
                        holder="Enter Name"
                      />
                    </Box>

                    <Box my="16px">
                      <Text
                        color="#444648"
                        fontSize="10px"
                        fontWeight={500}
                        mb="8px"
                        lineHeight="100%"
                      >
                        Select Service
                      </Text>
                      <Select
                        styles={customStyles}
                        value={values.serviceType}
                        options={serviceOptions}
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
                        name="serviceType"
                        onChange={(selectedOption) =>
                          setValues({
                            ...values,
                            serviceType: selectedOption,
                          })
                        }
                        onBlur={handleBlur}
                      />
                    </Box>

                    <Box>
                      <Text
                        color="#444648"
                        fontSize="10px"
                        fontWeight={500}
                        mb="8px"
                        lineHeight="100%"
                      >
                        Select Rate Type
                      </Text>
                      <Select
                        styles={customStyles}
                        value={values.rateType}
                        options={rateOptions}
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
                        name="rateType"
                        onChange={(selectedOption) =>
                          setValues({
                            ...values,
                            rateType: selectedOption,
                          })
                        }
                        onBlur={handleBlur}
                      />
                    </Box>

                    <Box my="16px">
                      <Text
                        color="#444648"
                        fontSize="10px"
                        fontWeight={500}
                        mb="8px"
                        lineHeight="100%"
                      >
                        Enter Amount
                      </Text>
                      <CustomInput
                        name="amount"
                        value={values?.amount}
                        onChange={handleChange}
                        type="number"
                        onBlur={handleBlur}
                        error={
                          errors?.amount && touched?.amount && errors?.amount
                        }
                        holder="Enter Amount"
                      />
                    </Box>

                    <Flex
                      align="center"
                      w="full"
                      justifyContent="space-between"
                    >
                      <Text
                        color="#444648"
                        fontSize="12px"
                        mb="8px"
                        lineHeight="100%"
                      >
                        Add Limit
                      </Text>
                      <Switch
                        size="sm"
                        value={limit}
                        onChange={() => setLimit((prev) => !prev)}
                      />
                    </Flex>

                    {limit && (
                      <Box>
                        <Box my="16px">
                          <Text
                            color="#444648"
                            fontSize="10px"
                            fontWeight={500}
                            mb="8px"
                            lineHeight="100%"
                          >
                            Select Duration Type
                          </Text>
                          <Select
                            styles={customStyles}
                            value={values.durationType}
                            options={durationOptions}
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
                            name="durationType"
                            onChange={(selectedOption) =>
                              setValues({
                                ...values,
                                durationType: selectedOption,
                              })
                            }
                            onBlur={handleBlur}
                          />
                        </Box>

                        <Flex align="center" gap="16px">
                          <Box>
                            <Text
                              color="#444648"
                              fontSize="10px"
                              fontWeight={500}
                              mb="8px"
                              lineHeight="100%"
                            >
                              Duration Start (Minutes)
                            </Text>
                            <CustomInput
                              name="durationStart"
                              type="number"
                              value={values?.durationStart}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                errors?.durationStart &&
                                touched?.durationStart &&
                                errors?.durationStart
                              }
                              holder="Enter a number"
                            />
                          </Box>

                          <Box>
                            <Text
                              color="#444648"
                              fontSize="10px"
                              fontWeight={500}
                              mb="8px"
                              lineHeight="100%"
                            >
                              Duration Limit (Minutes)
                            </Text>
                            <CustomInput
                              name="durationLimit"
                              type="number"
                              value={values?.durationLimit}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                errors?.durationLimit &&
                                touched?.durationLimit &&
                                errors?.durationLimit
                              }
                              holder="Enter a number"
                            />
                          </Box>
                        </Flex>
                      </Box>
                    )}

                    <Box mt="16px">
                      <Text
                        color="#444648"
                        fontSize="10px"
                        fontWeight={500}
                        mb="8px"
                        lineHeight="100%"
                      >
                        Assign Zones
                      </Text>
                      <Select
                        styles={customStyles}
                        isMulti
                        value={values.zones}
                        options={zoneOptions}
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
                        name="zones"
                        onChange={(selectedOption) =>
                          setValues({
                            ...values,
                            zones: selectedOption,
                          })
                        }
                        onBlur={handleBlur}
                      />
                    </Box>

                    <Flex mt="24px" align="center" w="full" gap="24px">
                      <Button
                        bg="transparent"
                        w="70%"
                        border="1px solid #646668"
                        color="#646668"
                        fontWeight={500}
                        lineHeight="100%"
                        fontSize="14px"
                        _hover={{ bg: "transparent" }}
                        _active={{ bg: "transparent" }}
                        _focus={{ bg: "transparent" }}
                        px="26px"
                        py="17px"
                      >
                        Cancel
                      </Button>
                      <Button
                        color="#fff"
                        fontWeight={500}
                        lineHeight="100%"
                        isLoading={isCreating}
                        w="full"
                        isDisabled={!isValid || !dirty || !values.zones.length}
                        fontSize="12px"
                        type="submit"
                        px="26px"
                        py="17px"
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
        <Box w="full"></Box>
      </Flex>
    </Box>
  );
};

export default AddRate;

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Spinner,
  Text,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { usePaystackPayment } from "react-paystack";
import CustomInput from "../../../components/common/CustomInput";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import Select from "react-select";
import { allStates, colorTypes } from "../../../components/common/constants";
import { IoIosArrowDown } from "react-icons/io";
import SuccessfulPaymentModal from "../../../components/modals/SuccessfulPaymentModal";
import { useNavigate, useParams } from "react-router-dom";
import { useGetZone } from "../../../services/customer/query/locations";
import {
  useGetPublicMakes,
  useGetPublicModels,
} from "../../../services/customer/query/auth";
import { useCreateNonUserPayToPark } from "../../../services/customer/query/services";
import useCustomToast from "../../../utils/notifications";

const PayToPark = () => {
  const { zoneCode } = useParams();
  const [step, setStep] = useState(1);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const navigate = useNavigate();

  const { mutate, isLoading, data } = useGetZone({
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred"
      );
    },
  });

  useEffect(() => {
    if (zoneCode !== "") {
      mutate(zoneCode);
    }
  }, [zoneCode]);

  const [values, setValues] = useState({
    phone: "",
    email: "",
    plate: "",
    make: "",
    model: "",
    color: "",
    firstName: "",
    lastName: "",
    serviceType: "",
    state: "",
  });

  const serviceOptions = data?.rates?.map((service) => ({
    value: service?.id,
    label: service?.name,
    amount: service?.amount,
  }));
  const [isError, setIsError] = useState(false);
  const { errorToast } = useCustomToast();
  const { mutate: parkMutate, isLoading: isCreating } =
    useCreateNonUserPayToPark({
      onSuccess: () => {
        setValues({
          phone: "",
          email: "",
          plate: "",
          make: "",
          model: "",
          color: "",
          state: "",
          firstName: "",
          lastName: "",
          serviceType: "",
        });
      },
      onError: (err) => {
        errorToast(
          err?.response?.data?.message || err?.message || "An Error occurred"
        );
        setIsError(true);
      },
    });

  const stateOptions = allStates?.map((state) => ({
    value: state,
    label: state,
  }));

  const config = {
    reference: new Date().getTime().toString(),
    email: values?.email,
    amount:
      data?.rates?.length === 1
        ? Number(`${data?.rates[0]?.amount}00`)
        : Number(`${values?.serviceType?.amount}00`),
    publicKey: process.env.REACT_APP_PAYSTACK_KEY,
    metadata: {
      custom_fields: [
        {
          display_name: "Transaction Type",
          variable_name: "transaction_type",
          value: "GUEST_PAY_TO_PARK",
        },
      ],
    },
  };

  const initializePayment = usePaystackPayment(config);

  const onSuccess = () => {
    onOpen();
    const phoneNumber = `+234${values.phone}`;
    parkMutate({
      firstName: values?.firstName,
      lastName: values?.lastName,
      email: values?.email,
      phone: phoneNumber,
      vehicle: values?.plate,
      vehicleColor: values?.color?.label,
      vehicleMake: values?.make?.value,
      vehicleModel: values?.model?.value,
      vehicleState: values?.state?.value,
      zone: data?.id,
      service: data?.service?.id,
      amount: Number(values?.serviceType?.amount),
      rate: Number(values?.serviceType?.value),
    });
  };

  const { data: models } = useGetPublicModels();
  const { data: makes } = useGetPublicMakes();

  const modelToMap = models?.filter(
    (item) => item?.make?.name === values?.make?.label
  );
  const modelOptions = modelToMap?.map((model) => ({
    value: model?.id,
    label: model?.name,
  }));
  const makeOptions = makes?.map((make) => ({
    value: make?.id,
    label: make?.name,
  }));

  const colorOptions = colorTypes.map((color) => ({
    value: color.color,
    label: color.label,
  }));

  const handleSelectChange = (selectedOption, { name }) => {
    if (name === "make") {
      setValues((prevValues) => ({
        ...prevValues,
        make: selectedOption,
        model: "",
      }));
    } else {
      setValues((prevValues) => ({
        ...prevValues,
        [name]: selectedOption,
      }));
    }
  };

  const handleKeyPress = (e, limit) => {
    if (limit && e.target.value.length >= limit) {
      e.preventDefault();
    }
  };

  const getOptionLabel = (option) => (
    <Flex gap="8px" align="center">
      <Box
        width="28px"
        height="20px"
        backgroundColor={option.value}
        borderRadius="4px"
      />
      {option.label}
    </Flex>
  );

  const ServiceType = ({ data }) => (
    <Flex
      mt="-30px"
      h="40px"
      align="center"
      justifyContent="space-between"
      w="full"
      backgroundColor={data?.value}
      borderRadius="4px"
    >
      <Text>{data?.label}</Text>
      <Text>
        Price: ₦{" "}
        {data?.amount?.toLocaleString(undefined, {
          maximumFractionDigits: 2,
        }) || "0.00"}
      </Text>
    </Flex>
  );

  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const getOptionValue = (option) => option.value;

  const ColorOption = ({ data }) => (
    <Flex
      mt="-5px"
      onClick={() => {
        setValues({ ...values, color: data });
        setMenuIsOpen(false);
      }}
      px="10px"
      cursor="pointer"
      _hover={{ bg: "#f4f6f8" }}
      gap="8px"
      align="center"
      h="40px"
    >
      <Flex
        width="28px"
        height="20px"
        backgroundColor={data?.value}
        borderRadius="4px"
      ></Flex>
      {data?.label}
    </Flex>
  );

  const ColorOptio = ({ data }) => (
    <Flex mt="-30px" gap="8px" align="center" h="40px">
      <Flex
        width="28px"
        height="20px"
        backgroundColor={data?.value}
        borderRadius="4px"
      ></Flex>
      {data?.label}
    </Flex>
  );
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

  useEffect(() => {
    if (data?.rates?.length === 1) {
      setValues({
        ...values,
        serviceType: {
          amount: data?.rates[0]?.amount,
          value: data?.rates[0]?.id,
          label: data?.rates[0]?.name,
        },
      });
    } else {
      setValues({ ...values, serviceType: "" });
    }
  }, [data]);

  const [isMobile] = useMediaQuery("(max-width: 820px)");

  return (
    <Box w="full">
      {isLoading ? (
        <Flex minH="60vh" w="full" justifyContent="center" align="center">
          <Spinner />
        </Flex>
      ) : (
        <>
          {isMobile ? (
            <>
              <Image my="24px" src="/assets/park-logo.jpg" w="134px" h="28px" />
              <Flex align="center" w="full">
                {step === 1 ? (
                  <Flex align="center" w="full">
                    <Image src="/assets/fill.svg" />
                    <Box h="2px" bg="transparent" w="full"></Box>
                  </Flex>
                ) : (
                  step !== 1 &&
                  values?.serviceType &&
                  values?.plate &&
                  values?.make &&
                  values?.state &&
                  values?.model &&
                  values?.plate?.length === 8 &&
                  values?.color && (
                    <Flex align="center" w="full">
                      <Image src="/assets/complete.svg" />
                      <Box h="2px" bg="red" w="full"></Box>
                    </Flex>
                  )
                )}
                {step === 2 ? (
                  <Flex align="center" w="full">
                    <Image src="/assets/fill.svg" />
                    <Box h="2px" bg="transparent" w="full"></Box>
                  </Flex>
                ) : step !== 2 &&
                  step !== 1 &&
                  values?.email &&
                  values?.firstName &&
                  values?.lastName &&
                  values.phone ? (
                  <Flex align="center" w="full">
                    <Image src="/assets/complete.svg" />
                    <Box h="2px" bg="red" w="full"></Box>
                  </Flex>
                ) : (
                  <Flex align="center" w="full">
                    <Image src="/assets/empty.svg" />
                    <Box h="2px" bg="transparent" w="full"></Box>
                  </Flex>
                )}
                {step === 3 ? (
                  <Image src="/assets/fill.svg" />
                ) : (
                  <Image src="/assets/empty.svg" />
                )}
              </Flex>
              <Flex
                justifyContent="center"
                align={{ base: "flex-start", md: "center" }}
                w="full"
                flexDir="column"
              >
                <Flex
                  bg="#fff"
                  borderRadius="12px"
                  justifyContent="center"
                  w={{ md: "30rem", base: "100%", "3xl": "35rem" }}
                  flexDir="column"
                >
                  {step === 3 ? (
                    <Flex
                      align="center"
                      gap="32px"
                      w="full"
                      mb="25px"
                      mt="20px"
                      onClick={() => {
                        setStep(step - 1);
                      }}
                      cursor="pointer"
                    >
                      <Box>
                        <HiOutlineArrowNarrowLeft size="24px" color="#242628" />
                      </Box>

                      <Box w="full">
                        <Text
                          lineHeight="100%"
                          color="#444648"
                          fontSize="14px"
                          fontWeight={500}
                        >
                          Make Payment
                        </Text>
                      </Box>
                    </Flex>
                  ) : step === 1 ? (
                    <Text
                      lineHeight="100%"
                      color="#444648"
                      mb="25px"
                      mt="20px"
                      textAlign="center"
                      fontSize="14px"
                      fontWeight={500}
                    >
                      Enter Vehicle Details
                    </Text>
                  ) : (
                    <Flex
                      align="center"
                      gap="32px"
                      w="full"
                      mb="25px"
                      mt="20px"
                      onClick={() => {
                        setStep(step - 1);
                      }}
                      cursor="pointer"
                    >
                      {step === 1 ? (
                        <Box w="full"></Box>
                      ) : (
                        <Box>
                          <HiOutlineArrowNarrowLeft
                            size="24px"
                            color="#242628"
                          />
                        </Box>
                      )}
                      <Box>
                        <Text
                          lineHeight="100%"
                          color="#444648"
                          fontSize="14px"
                          fontWeight={500}
                        >
                          Enter Contact Details
                        </Text>
                      </Box>
                    </Flex>
                  )}

                  {step !== 3 && (
                    <Box
                      mt="16px"
                      w="full"
                      border="1px solid #D4D6D8"
                      borderRadius="8px"
                      p="12px"
                    >
                      <Flex align="center" gap="12px">
                        <Image src="/assets/zone_pic.png" w="96px" h="96px" />
                        <Box w="full">
                          <Flex
                            align="center"
                            justifyContent="space-between"
                            w="full"
                          >
                            <Box>
                              <Text
                                fontSize="14px"
                                color="#848688"
                                lineHeight="100%"
                                fontWeight={500}
                              >
                                Zone {data?.name}
                              </Text>
                              <Text
                                mt="8px"
                                fontSize="12px"
                                color="#242628"
                                lineHeight="100%"
                              >
                                {data?.location?.name}
                              </Text>
                            </Box>
                            <Box>
                              <Text
                                fontSize="14px"
                                color="#848688"
                                lineHeight="100%"
                                fontWeight={500}
                              >
                                Price
                              </Text>
                              <Text
                                mt="8px"
                                textAlign="center"
                                fontSize="12px"
                                color="#242628"
                                lineHeight="100%"
                              >
                                ₦{" "}
                                {values?.serviceType?.amount?.toLocaleString()}
                              </Text>
                            </Box>
                          </Flex>

                          <Flex
                            align="flex-end"
                            mt="30px"
                            justifyContent="space-between"
                            w="full"
                          >
                            <Box>
                              <Text
                                fontSize="14px"
                                color="#848688"
                                lineHeight="100%"
                                fontWeight={500}
                              >
                                Amenities{" "}
                              </Text>
                              <Text
                                mt="8px"
                                fontSize="12px"
                                color="#242628"
                                lineHeight="100%"
                              >
                                View
                              </Text>
                            </Box>
                            <Box>
                              <Text
                                fontSize="14px"
                                color="#848688"
                                lineHeight="100%"
                                fontWeight={500}
                              >
                                Service Type
                              </Text>
                              <Text
                                mt="8px"
                                fontSize="12px"
                                color="#242628"
                                lineHeight="100%"
                              >
                                Pay-To-Park
                              </Text>
                            </Box>
                          </Flex>
                        </Box>
                      </Flex>
                    </Box>
                  )}

                  {step === 1 && (
                    <Box>
                      {data?.rates?.length > 1 ? (
                        <Box mt="16px">
                          {/* <Text
                            color="#444648"
                            fontSize="10px"
                            lineHeight="100%"
                            mb="8px"
                          >
                            Service Type
                          </Text> */}
                          <Select
                            styles={customStyles}
                            placeholder="Select Service Type"
                            components={{
                              SingleValue: ServiceType,
                              IndicatorSeparator: () => (
                                <div style={{ display: "none" }}></div>
                              ),
                            }}
                            options={serviceOptions}
                            onChange={(selectedOption) =>
                              handleSelectChange(selectedOption, {
                                name: "serviceType",
                              })
                            }
                          />
                        </Box>
                      ) : (
                        ""
                      )}
                      <Box mt="16px">
                        {/* <Text
                          color="#444648"
                          fontSize="10px"
                          lineHeight="100%"
                          mb="8px"
                        >
                          Select Vehicle State
                        </Text> */}
                        <Select
                          styles={customStyles}
                          options={stateOptions}
                          placeholder="Select Vehicle State"
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
                          onChange={(selectedOption) =>
                            handleSelectChange(selectedOption, {
                              name: "state",
                            })
                          }
                        />
                      </Box>

                      <Box my="16px">
                        {/* <Text
                          color="#444648"
                          fontSize="10px"
                          lineHeight="100%"
                          mb="8px"
                        >
                          Enter your Vehicle Licence Number
                        </Text> */}
                        <CustomInput
                          auth
                          mb
                          holder="Enter Licence Number"
                          handleKeyPress={(e) => handleKeyPress(e, 8)}
                          value={values.plate}
                          onChange={(e) =>
                            setValues({
                              ...values,
                              plate: e.target.value,
                            })
                          }
                        />
                      </Box>

                      <Box>
                        {/* <Text
                          color="#444648"
                          fontSize="10px"
                          lineHeight="100%"
                          mb="8px"
                        >
                          Select Vehicle Make
                        </Text> */}
                        <Select
                          styles={customStyles}
                          placeholder="Select Vehicle Make"
                          options={makeOptions}
                          value={values.make}
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
                          onChange={(selectedOption) =>
                            handleSelectChange(selectedOption, { name: "make" })
                          }
                        />
                      </Box>

                      <Box my="16px">
                        {/* <Text
                          color="#444648"
                          fontSize="10px"
                          lineHeight="100%"
                          mb="8px"
                        >
                          Select Vehicle Model
                        </Text> */}
                        <Select
                          styles={customStyles}
                          placeholder="Select Vehicle Model"
                          options={modelOptions}
                          value={values.model}
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
                          onChange={(selectedOption) =>
                            handleSelectChange(selectedOption, {
                              name: "model",
                            })
                          }
                        />
                      </Box>

                      <Box>
                        {/* <Text
                          color="#444648"
                          fontSize="10px"
                          lineHeight="100%"
                          mb="8px"
                        >
                          Select Vehicle Color
                        </Text> */}
                        <Select
                          styles={customStyles}
                          placeholder="Select Vehicle Color"
                          value={values.color}
                          onMenuOpen={() => setMenuIsOpen(true)}
                          menuIsOpen={menuIsOpen}
                          onMenuClose={() => setMenuIsOpen(false)}
                          components={{
                            SingleValue: ColorOptio,
                            Option: ColorOption,
                            IndicatorSeparator: () => (
                              <div style={{ display: "none" }}></div>
                            ),
                            DropdownIndicator: () => (
                              <div>
                                <IoIosArrowDown size="15px" color="#646668" />
                              </div>
                            ),
                          }}
                          getOptionLabel={getOptionLabel}
                          getOptionValue={getOptionValue}
                          options={colorOptions}
                        />
                      </Box>
                    </Box>
                  )}

                  {step === 2 && (
                    <Flex flexDir="column" mb="30px">
                      <Box my="16px">
                        {/* <Text
                          color="#444648"
                          fontSize="10px"
                          lineHeight="100%"
                          mb="8px"
                        >
                          Enter Your Phone Number
                        </Text> */}
                        <CustomInput
                          auth
                          ngn
                          mb
                          holder="Enter Phone Mumber"
                          handleKeyPress={(e) => handleKeyPress(e, 11)}
                          value={values.phone}
                          type="number"
                          onChange={(e) =>
                            setValues({
                              ...values,
                              phone: e.target.value,
                            })
                          }
                        />
                      </Box>

                      <Box>
                        {/* <Text
                          color="#444648"
                          fontSize="10px"
                          lineHeight="100%"
                          mb="8px"
                        >
                          Enter Your Email
                        </Text> */}
                        <CustomInput
                          auth
                          mb
                          type="email"
                          holder="Enter Email Address"
                          value={values.email}
                          onChange={(e) =>
                            setValues({
                              ...values,
                              email: e.target.value,
                            })
                          }
                        />
                      </Box>

                      <Box my="16px">
                        {/* <Text
                          color="#444648"
                          fontSize="10px"
                          lineHeight="100%"
                          mb="8px"
                        >
                          Enter Your First Name
                        </Text> */}
                        <CustomInput
                          auth
                          mb
                          type="email"
                          holder="Enter First Name"
                          value={values.firstName}
                          onChange={(e) =>
                            setValues({
                              ...values,
                              firstName: e.target.value,
                            })
                          }
                        />
                      </Box>

                      <Box>
                        {/* <Text
                          color="#444648"
                          fontSize="10px"
                          lineHeight="100%"
                          mb="8px"
                        >
                          Enter Your Last Name
                        </Text> */}
                        <CustomInput
                          auth
                          mb
                          type="email"
                          holder="Enter Last Name"
                          value={values.lastName}
                          onChange={(e) =>
                            setValues({
                              ...values,
                              lastName: e.target.value,
                            })
                          }
                        />
                      </Box>
                    </Flex>
                  )}

                  {step === 3 && (
                    <Flex flexDir="column" minH="70vh">
                      <Flex
                        border="1px solid #D4D6D8"
                        borderRadius="8px"
                        p="24px"
                        flexDir="column"
                      >
                        <Flex
                          flexDir="column"
                          justifyContent="center"
                          align="center"
                        >
                          <Image
                            w="40px"
                            h="40px"
                            src="/assets/park-confirm.png"
                          />
                          <Text
                            mt="16px"
                            mb="24px"
                            color="#242628"
                            fontWeight={500}
                            lineHeight="100%"
                          >
                            Summary
                          </Text>
                        </Flex>

                        <Box>
                          <Flex
                            mb="24px"
                            align="center"
                            justifyContent="space-between"
                            w="full"
                          >
                            <Text
                              color="#848688"
                              w="full"
                              fontSize="14px"
                              lineHeight="100%"
                              fontWeight={500}
                            >
                              Name
                            </Text>
                            <Text
                              color="#242628"
                              textAlign="end"
                              w="full"
                              fontSize="14px"
                              lineHeight="100%"
                              fontWeight={500}
                            >
                              {values?.firstName} {values?.lastName}
                            </Text>
                          </Flex>

                          <Flex
                            mb="24px"
                            align="center"
                            justifyContent="space-between"
                            w="full"
                          >
                            <Text
                              color="#848688"
                              w="full"
                              fontSize="14px"
                              lineHeight="100%"
                              fontWeight={500}
                            >
                              Email
                            </Text>
                            <Text
                              color="#242628"
                              textAlign="end"
                              w="full"
                              fontSize="14px"
                              lineHeight="100%"
                              fontWeight={500}
                            >
                              {values?.email}
                            </Text>
                          </Flex>

                          <Flex
                            mb="24px"
                            align="center"
                            justifyContent="space-between"
                            w="full"
                          >
                            <Text
                              color="#848688"
                              w="full"
                              fontSize="14px"
                              lineHeight="100%"
                              fontWeight={500}
                            >
                              Phone Number
                            </Text>
                            <Text
                              color="#242628"
                              textAlign="end"
                              w="full"
                              fontSize="14px"
                              lineHeight="100%"
                              fontWeight={500}
                            >
                              +234{Number(values?.phone)}
                            </Text>
                          </Flex>

                          <Flex
                            align="center"
                            justifyContent="space-between"
                            w="full"
                          >
                            <Text
                              color="#848688"
                              w="full"
                              fontSize="14px"
                              lineHeight="100%"
                              fontWeight={500}
                            >
                              Service
                            </Text>
                            <Text
                              color="#242628"
                              textAlign="end"
                              w="full"
                              fontSize="14px"
                              lineHeight="100%"
                              fontWeight={500}
                            >
                              Pay-To-Park
                            </Text>
                          </Flex>

                          <Flex
                            my="24px"
                            align="center"
                            justifyContent="space-between"
                            w="full"
                          >
                            <Text
                              color="#848688"
                              w="full"
                              fontSize="14px"
                              lineHeight="100%"
                              fontWeight={500}
                            >
                              Price
                            </Text>
                            <Text
                              color="#242628"
                              textAlign="end"
                              w="full"
                              fontSize="14px"
                              lineHeight="100%"
                              fontWeight={500}
                            >
                              ₦ {Number(values?.serviceType?.amount)}
                            </Text>
                          </Flex>

                          <Flex
                            align="center"
                            justifyContent="space-between"
                            w="full"
                          >
                            <Text
                              color="#848688"
                              w="full"
                              fontSize="14px"
                              lineHeight="100%"
                              fontWeight={500}
                            >
                              Location
                            </Text>
                            <Text
                              color="#242628"
                              textAlign="end"
                              w="full"
                              fontSize="14px"
                              lineHeight="100%"
                              fontWeight={500}
                            >
                              {data?.location?.name}
                            </Text>
                          </Flex>

                          <Flex
                            align="center"
                            my="24px"
                            justifyContent="space-between"
                            w="full"
                          >
                            <Text
                              color="#848688"
                              w="full"
                              fontSize="14px"
                              lineHeight="100%"
                              fontWeight={500}
                            >
                              Zone
                            </Text>
                            <Text
                              color="#242628"
                              textAlign="end"
                              w="full"
                              fontSize="14px"
                              lineHeight="100%"
                              fontWeight={500}
                            >
                              {data?.name}
                            </Text>
                          </Flex>

                          <Flex
                            align="center"
                            justifyContent="space-between"
                            w="full"
                          >
                            <Text
                              color="#848688"
                              w="full"
                              fontSize="14px"
                              lineHeight="100%"
                              fontWeight={500}
                            >
                              License Number
                            </Text>
                            <Text
                              color="#242628"
                              textAlign="end"
                              w="full"
                              fontSize="14px"
                              lineHeight="100%"
                              fontWeight={500}
                            >
                              {values?.plate}
                            </Text>
                          </Flex>

                          <Flex
                            mt="24px"
                            align="center"
                            justifyContent="space-between"
                            w="full"
                          >
                            <Text
                              color="#848688"
                              w="full"
                              fontSize="14px"
                              lineHeight="100%"
                              fontWeight={500}
                            >
                              Vehicle
                            </Text>
                            <Text
                              color="#242628"
                              textAlign="end"
                              w="full"
                              fontSize="14px"
                              lineHeight="100%"
                              fontWeight={500}
                            >
                              {values?.make?.label} {values?.model?.label}
                            </Text>
                          </Flex>
                        </Box>
                      </Flex>

                      <Flex
                        onClick={() => {
                          initializePayment(onSuccess);
                        }}
                        mt="24px"
                        mb="30px"
                        w="100%"
                        gap="24px"
                        align="center"
                      >
                        <Button w="full" bg="red" py="17px" fontSize="14px">
                          Make Payment
                        </Button>
                      </Flex>
                    </Flex>
                  )}
                  {step !== 3 && (
                    <Button
                      onClick={() => setStep(step + 1)}
                      w="full"
                      bg="red"
                      mt="24px"
                      mb="30px"
                      py="17px"
                      isDisabled={
                        step === 1
                          ? !values?.serviceType?.value ||
                            !values?.plate ||
                            !values?.make ||
                            !values?.state ||
                            !values?.model ||
                            !values?.color ||
                            values?.plate?.length < 8
                          : step === 2
                          ? !values?.email ||
                            !values?.phone ||
                            !values?.firstName ||
                            !values?.lastName
                          : false
                      }
                      fontSize="14px"
                    >
                      {step !== 3 ? "Proceed" : "Park Now"}
                    </Button>
                  )}
                </Flex>
              </Flex>
            </>
          ) : (
            <Flex justifyContent="center" align="center" h="75vh">
              <Heading>Please Open this URL on your mobile device</Heading>
            </Flex>
          )}

          <SuccessfulPaymentModal
            setShowCreate={() => navigate("/customer/auth/login")}
            isOpen={isOpen}
            isCreating={isCreating}
            onClose={onClose}
            isError={isError}
          />
          {/* <CreateAccountModal
            values={values}
            setCreate={setCreate}
            create={create}
            isOpen={showCreate}
            onClose={() => setShowCreate(false)}
          /> */}
        </>
      )}
    </Box>
  );
};

export default PayToPark;

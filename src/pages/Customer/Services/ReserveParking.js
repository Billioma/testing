import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Image,
  Radio,
  RadioGroup,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { BsCheckCircle } from "react-icons/bs";
import Select from "react-select";
import ConfirmReserveModal from "../../../components/modals/ConfirmReserveModal";
import { useGetLocations } from "../../../services/customer/query/locations";
import { CiLocationOn } from "react-icons/ci";
import { Calendar } from "react-calendar";
import {
  formatDate,
  formatTimeToHHMMSS,
  timeArray,
} from "../../../utils/helpers";
import { useGetVehicles } from "../../../services/customer/query/vehicles";
import { useGetCards } from "../../../services/customer/query/payment";
import { useGetUser } from "../../../services/customer/query/user";
import {
  useCreateReserveParking,
  useGetReserveParking,
  useRequestReserveParking,
} from "../../../services/customer/query/services";
import useCustomToast from "../../../utils/notifications";
import { useNavigate } from "react-router-dom";
import { usePaystackPayment } from "react-paystack";
import FundWalletDrawer from "../../../components/modals/FundWalletDrawer";
import { allStates, cities } from "../../../components/common/constants";

const ReserveParking = () => {
  const [step, setStep] = useState(1);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [showFunds, setShowFunds] = useState(false);
  const [values, setValues] = useState({
    state: "",
    city: "",
    locations: "",
    arrivalTime: "",
    departureTime: "",
    paymentMethod: "",
    cardId: "",
    vehicle: "",
    color: "",
    make: "",
    model: "",
  });

  useEffect(() => {
    setStep(1);
    setValues({
      state: "",
      city: "",
      locations: "",
      arrivalTime: "",
      departureTime: "",
      paymentMethod: "",
      cardId: "",
      vehicle: "",
      color: "",
      make: "",
      model: "",
    });
  }, []);

  const { data: cards, refetch: refetchCards } = useGetCards();
  const { data: userData, refetch } = useGetUser();

  const [startDate, setStartDate] = useState(false);
  const [startValue, startChange] = useState("");
  const [endValue, endChange] = useState("");
  const [endDate, setEndDate] = useState(false);

  const start = formatDate(startValue);
  const end = formatDate(endValue);

  const startDateRange = new Date();

  const isDateDisabled = (date) => {
    return date < startDateRange;
  };
  const handleEndDateChange = (date) => {
    if (!isDateDisabled(date)) {
      endChange(date);
    }
    setEndDate(false);
  };

  const handleDateChange = (date) => {
    if (!isDateDisabled(date)) {
      startChange(date);
    }
    setStartDate(false);
  };

  const tileClassName = ({ date }) => {
    if (date.getDate() === startDateRange.getDate()) {
      return "selected-date";
    }
    if (isDateDisabled(date)) {
      return "disabled-date";
    }
    return null;
  };

  const { data: locations } = useGetLocations();
  const { data: vehicles } = useGetVehicles();
  const currentStateLocation = locations?.filter((dat) =>
    dat?.address?.includes(values?.city?.value)
  );

  const stateOptions = allStates?.map((state) => ({
    value: state,
    label: state,
  }));
  const cityOptions = (
    values.state.value === "Lagos" ? cities.slice(0, 4) : cities.slice(4, 6)
  )?.map((city) => ({
    value: city,
    label: city,
  }));
  const locationOptions = currentStateLocation?.map((city) => ({
    value: city?.name,
    label: city?.name,
    id: city?.id,
  }));
  const timeOptions = timeArray?.map((time) => ({
    value: time,
    label: time,
  }));
  const vehicleOptions = vehicles?.data?.map((car) => ({
    value: `${car?.model?.make?.name} - ${car?.model?.name} - ${car?.licensePlate}`,
    label: `${car?.model?.make?.name} - ${car?.model?.name} - ${car?.licensePlate}`,
    main: `${car?.model?.make?.name} - ${car?.model?.name}`,
    id: car?.id,
  }));

  const handleSelectChange = (selectedOption, { name }) => {
    setValues({
      ...values,
      [name]: selectedOption,
    });
    if (name === "state") {
      setValues({ ...values, state: selectedOption, city: "", locations: "" });
    } else if (name === "city") {
      setValues({ ...values, city: selectedOption, locations: "" });
    }
  };

  const config = {
    reference: new Date().getTime().toString(),
    email: userData?.email,
    amount: 10000,
    publicKey: process.env.REACT_APP_PAYSTACK_KEY,
    metadata: {
      custom_fields: [
        {
          display_name: "Transaction Type",
          variable_name: "transaction_type",
          value: "TOKENIZATION",
        },
      ],
    },
  };

  const onSuccess = () => {
    setTimeout(() => {
      refetchCards();
    }, 5000);
  };

  const onCloses = () => {
    setTimeout(() => {
      refetchCards();
    }, 5000);
  };

  const initializePayment = usePaystackPayment(config);

  const { mutate: reqeustReserve, data: requestData } =
    useRequestReserveParking();
  const navigate = useNavigate();
  const { successToast, errorToast } = useCustomToast();
  const { refetch: refetchParking } = useGetReserveParking(10, 1);
  const { mutate: reserveMutate, isLoading: isReserving } =
    useCreateReserveParking({
      onSuccess: () => {
        refetch();
        refetchParking();
        navigate("/customer/services");
        successToast("Payment Successful");
      },
      onError: (err) => {
        errorToast(
          err?.response?.data?.message || err?.message || "An Error occurred"
        );
      },
    });

  useEffect(() => {
    if (start && end && values?.locations && values?.vehicle) {
      reqeustReserve({
        arrival: `${start} ${formatTimeToHHMMSS(values?.arrivalTime?.value)}`,
        departure: `${end} ${formatTimeToHHMMSS(values?.departureTime?.value)}`,
        location: Number(values?.locations?.id),
        service: "3",
        vehicle: values.vehicle?.id,
      });
    }
  }, [values, start, end]);
  const formattedDate = `${start.substr(6, 4)}-${start.substr(
    0,
    2
  )}-${start.substr(3, 2)}T${formatTimeToHHMMSS(
    values?.arrivalTime?.value
  )}.000Z`;
  const formattedDeparture = `${end.substr(6, 4)}-${end.substr(
    0,
    2
  )}-${end.substr(3, 2)}T${formatTimeToHHMMSS(
    values?.departureTime?.value
  )}.000Z`;

  const handleSubmit = () => {
    Number(values?.paymentMethod) === 0
      ? reserveMutate({
          amount: requestData?.amount,
          arrival: formattedDate,
          cardId: values?.cardId,
          customer: userData?.id,
          departure: formattedDeparture,
          paymentMethod: Number(values?.paymentMethod),
          rates: requestData?.rates?.map((dat) => dat?.id),
          service: "3",
          vehicle: values.vehicle?.id,
          zone: Number(requestData?.zone?.id),
        })
      : reserveMutate({
          amount: requestData?.amount,
          arrival: formattedDate,
          customer: userData?.id,
          departure: formattedDeparture,
          paymentMethod: Number(values?.paymentMethod),
          rates: requestData?.rates?.map((dat) => dat?.id),
          service: "3",
          vehicle: values.vehicle?.id,
          zone: Number(requestData?.zone?.id),
        });
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "100%",
      height: "44px",
      color: "#646668",
      fontSize: "14px",
      cursor: "pointer",
      borderRadius: "4px",
      border: "1px solid #D4D6D8",
      background: state.selectProps.menuIsOpen
        ? "unset"
        : state.hasValue
        ? "#F4F6F8"
        : "unset",
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest(".box") === null) {
        setStartDate(false);
        setEndDate(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <Box minH="75vh">
      <Flex justifyContent="center" align="center" w="full" flexDir="column">
        <Flex
          bg="#fff"
          borderRadius="12px"
          py="40px"
          px="32px"
          justifyContent="center"
          w={{ base: "full", md: "30rem" }}
          flexDir="column"
        >
          {step !== 1 && (
            <Flex
              align="center"
              gap="8px"
              mb="23px"
              onClick={() => {
                setStep(step - 1);
                setValues({
                  state: "",
                  city: "",
                  locations: "",
                  arrivalTime: "",
                  departureTime: "",
                  paymentMethod: "",
                  cardId: "",
                  vehicle: "",
                  color: "",
                  make: "",
                  model: "",
                });
              }}
              cursor="pointer"
              w="fit-content"
            >
              <HiOutlineArrowNarrowLeft size="24px" color="#242628" />
              <Text
                lineHeight="100%"
                color="#242628"
                fontSize="14px"
                fontWeight={500}
              >
                Back
              </Text>
            </Flex>
          )}
          <Text
            fontSize="20px"
            color="#242628"
            textAlign={step === 1 ? "start" : "center"}
            mb={"32px"}
            lineHeight="100%"
            fontWeight={500}
          >
            Reserve Parking
          </Text>

          {step === 1 && (
            <>
              <Box w="full">
                <Select
                  styles={customStyles}
                  placeholder="Select State"
                  options={stateOptions}
                  value={values.state}
                  defaultValue={values.state}
                  onChange={(selectedOption) => {
                    handleSelectChange(selectedOption, { name: "state" });
                  }}
                  components={{
                    IndicatorSeparator: () => (
                      <div style={{ display: "none" }}></div>
                    ),
                  }}
                />
              </Box>
              <Box w="full" my="24px">
                <Select
                  styles={customStyles}
                  placeholder="Select City"
                  options={cityOptions}
                  isDisabled={!values.state}
                  value={values.city}
                  defaultValue={values.city}
                  onChange={(selectedOption) =>
                    handleSelectChange(selectedOption, { name: "city" })
                  }
                  components={{
                    IndicatorSeparator: () => (
                      <div style={{ display: "none" }}></div>
                    ),
                  }}
                />
              </Box>
              <Box w="full">
                <Select
                  styles={customStyles}
                  placeholder="Select Location"
                  options={locationOptions}
                  value={values.locations}
                  isDisabled={!values.state || !values.city}
                  defaultValue={values.locations}
                  onChange={(selectedOption) =>
                    handleSelectChange(selectedOption, { name: "locations" })
                  }
                  components={{
                    IndicatorSeparator: () => (
                      <div style={{ display: "none" }}></div>
                    ),
                  }}
                />
              </Box>
            </>
          )}

          {step === 2 && (
            <Box>
              <Box
                bg="#141618"
                border="1px solid #D4D6D8"
                borderRadius="8px"
                py="12px"
                px="16px"
              >
                <CiLocationOn color="red" size="16px" />

                <Flex
                  mt="16px"
                  align="center"
                  justifyContent="space-between"
                  w="full"
                >
                  <Box w="full">
                    <Text color="#fff" fontSize="10px" lineHeight="100%">
                      Location
                    </Text>
                    <Text
                      color="#D4D6D8"
                      fontWeight={500}
                      fontSize="12px"
                      lineHeight="100%"
                      mt="8px"
                    >
                      {values?.locations?.value}
                    </Text>
                  </Box>

                  <Flex flexDir="column" justifyContent="center" w="full">
                    <Text color="#fff" fontSize="10px" lineHeight="100%">
                      State
                    </Text>
                    <Text
                      color="#D4D6D8"
                      fontWeight={500}
                      fontSize="12px"
                      lineHeight="100%"
                      mt="8px"
                    >
                      {values?.state?.value}
                    </Text>
                  </Flex>

                  <Flex flexDir="column" justifyContent="flex-end">
                    <Text color="#fff" fontSize="10px" lineHeight="100%">
                      City
                    </Text>
                    <Text
                      color="#D4D6D8"
                      fontWeight={500}
                      fontSize="12px"
                      lineHeight="100%"
                      mt="8px"
                    >
                      {values?.city?.value}
                    </Text>
                  </Flex>
                </Flex>
              </Box>

              <Flex align="center" gap="16px" my="16px">
                <Box w="full">
                  <Text
                    mb="8px"
                    fontSize="10px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Arrival Date
                  </Text>

                  <Box pos="relative" w="full" className="box">
                    <Flex
                      fontSize="14px"
                      onClick={() => setStartDate((prev) => !prev)}
                      align="center"
                      justifyContent="space-between"
                      w="full"
                      bg={start ? "#F4F6F8" : "transparent"}
                      color={start ? "#000" : ""}
                      h="44px"
                      cursor="pointer"
                      borderRadius="4px"
                      border="1px solid #D4D6D8"
                      py="12px"
                      px="16px"
                    >
                      <Text>{start ? start : "Select Date"}</Text>
                      <Image src="/assets/cal.svg" w="20px" h="20px" />{" "}
                    </Flex>
                    {startDate && (
                      <Box pos="absolute" top="50px" w="200%" zIndex="3">
                        <Calendar
                          onChange={handleDateChange}
                          value={startValue}
                          minDate={startDateRange}
                          tileClassName={tileClassName}
                        />
                      </Box>
                    )}
                  </Box>
                </Box>

                <Box w="full">
                  <Text
                    mb="8px"
                    fontSize="10px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Arrival Time
                  </Text>

                  <Select
                    styles={customStyles}
                    placeholder="Select Time"
                    options={timeOptions}
                    value={values.arrivalTime}
                    defaultValue={values.arrivalTime}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, {
                        name: "arrivalTime",
                      })
                    }
                    components={{
                      IndicatorSeparator: () => (
                        <div style={{ display: "none" }}></div>
                      ),
                      DropdownIndicator: () => (
                        <Image
                          src="/assets/clock.svg"
                          mr="16px"
                          style={{ width: "20px", height: "20px" }}
                        />
                      ),
                    }}
                  />
                </Box>
              </Flex>

              <Flex align="center" gap="16px">
                <Box w="full">
                  <Text
                    mb="8px"
                    fontSize="10px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Departure Date
                  </Text>

                  <Box pos="relative" w="full" className="box">
                    <Flex
                      fontSize="14px"
                      onClick={() => setEndDate((prev) => !prev)}
                      align="center"
                      justifyContent="space-between"
                      w="full"
                      h="44px"
                      cursor="pointer"
                      borderRadius="4px"
                      bg={end ? "#F4F6F8" : "transparent"}
                      color={end ? "#000" : ""}
                      border="1px solid #D4D6D8"
                      py="12px"
                      px="16px"
                    >
                      <Text>{end ? end : "Select Date"}</Text>
                      <Image src="/assets/cal.svg" w="20px" h="20px" />{" "}
                    </Flex>
                    {endDate && (
                      <Box pos="absolute" top="70" w="200%" zIndex="3">
                        <Calendar
                          onChange={handleEndDateChange}
                          value={endValue}
                          minDate={startDateRange}
                          tileClassName={tileClassName}
                        />
                      </Box>
                    )}
                  </Box>
                </Box>

                <Box w="full">
                  <Text
                    mb="8px"
                    fontSize="10px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Departure Time
                  </Text>

                  <Select
                    styles={customStyles}
                    placeholder="Select Time"
                    options={timeOptions}
                    value={values.departureTime}
                    defaultValue={values.departureTime}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, {
                        name: "departureTime",
                      })
                    }
                    components={{
                      IndicatorSeparator: () => (
                        <div style={{ display: "none" }}></div>
                      ),
                      DropdownIndicator: () => (
                        <Image
                          src="/assets/clock.svg"
                          mr="16px"
                          style={{ width: "20px", height: "20px" }}
                        />
                      ),
                    }}
                  />
                </Box>
              </Flex>
              {start &&
                end &&
                values.arrivalTime &&
                values.departureTime &&
                formattedDeparture < formattedDate && (
                  <Text mt="8px" fontSize="12px" color="red">
                    Departure Date is earlier than Arrival Date
                  </Text>
                )}

              <Box w="full" my="16px">
                <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                  Select Vehicle
                </Text>

                <Select
                  styles={customStyles}
                  placeholder="Select Vehicle"
                  options={vehicleOptions}
                  value={values.vehicle}
                  defaultValue={values.vehicle}
                  onChange={(selectedOption) =>
                    handleSelectChange(selectedOption, {
                      name: "vehicle",
                    })
                  }
                  components={{
                    IndicatorSeparator: () => (
                      <div style={{ display: "none" }}></div>
                    ),
                  }}
                />
              </Box>

              <Box>
                <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                  Payment Method
                </Text>
                <Flex mt="17px" align="center">
                  <RadioGroup
                    value={values.paymentMethod}
                    onChange={(e) =>
                      setValues({
                        ...values,
                        paymentMethod: e,
                      })
                    }
                    align="center"
                    display="flex"
                    gap="24px"
                  >
                    <Radio size="sm" value={"1"}>
                      <Text fontSize="14px"> Pay with Wallet</Text>
                    </Radio>
                    <Radio size="sm" value={"0"}>
                      <Text fontSize="14px">Pay with Card</Text>
                    </Radio>
                    <Radio size="sm" value={"2"}>
                      <Text fontSize="14px">Pay with Points</Text>
                    </Radio>
                  </RadioGroup>
                </Flex>
              </Box>

              {values.paymentMethod === "1" && (
                <Box
                  mt="16px"
                  border="1px solid #D4D6D8"
                  borderRadius="4px"
                  p="16px"
                >
                  <Flex align="center" w="full" justifyContent="space-between">
                    <Box>
                      <Text
                        color="#444648"
                        fontSize="10px"
                        lineHeight="100%"
                        mb="8px"
                      >
                        Wallet
                      </Text>
                      <Text fontSize="14px" color="#646668" lineHeight="100%">
                        <span style={{ fontWeight: 500 }}> Balance: </span> ₦{" "}
                        {userData?.wallet?.balance?.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }) || "0.00"}
                      </Text>
                    </Box>

                    <Box>
                      <BsCheckCircle color="#0B841D" />
                    </Box>
                  </Flex>
                </Box>
              )}

              {values.paymentMethod === "0" && (
                <Box>
                  {cards?.data?.length ? (
                    cards?.data?.map((dat, i) => (
                      <Box key={i}>
                        <Box
                          mt="16px"
                          cursor="pointer"
                          border={
                            values?.cardId === dat?.id
                              ? "1px solid #0B841D"
                              : "1px solid #D4D6D8"
                          }
                          onClick={() =>
                            setValues({
                              ...values,
                              cardId: dat?.id,
                            })
                          }
                          borderRadius="4px"
                          p="16px"
                        >
                          <Flex
                            align="center"
                            w="full"
                            justifyContent="space-between"
                          >
                            <Box>
                              <Text
                                color="#444648"
                                fontSize="10px"
                                lineHeight="100%"
                                mb="8px"
                              >
                                Card Details
                              </Text>
                              <Text
                                fontSize="14px"
                                textTransform="capitalize"
                                color="#646668"
                                lineHeight="100%"
                              >
                                {dat?.cardType} Ending *****{dat?.last4}
                              </Text>
                            </Box>

                            {values.cardId === dat?.id && (
                              <Box>
                                <BsCheckCircle color="#0B841D" />
                              </Box>
                            )}
                          </Flex>
                        </Box>
                      </Box>
                    ))
                  ) : (
                    <Box>No Card Available</Box>
                  )}
                  <Flex
                    mt="8px"
                    color="red"
                    fontSize="12px"
                    fontWeight={500}
                    lineHeight="100%"
                    justifyContent="flex-end"
                    w="full"
                  >
                    <Text
                      cursor="pointer"
                      onClick={() => {
                        initializePayment(onSuccess, onCloses);
                      }}
                      textDecor="underline"
                    >
                      Add a Card
                    </Text>
                  </Flex>
                </Box>
              )}

              {values.paymentMethod === "1" && (
                <Flex
                  mt="8px"
                  color="red"
                  fontSize="12px"
                  fontWeight={500}
                  lineHeight="100%"
                  justifyContent="flex-end"
                  w="full"
                >
                  <Text
                    cursor="pointer"
                    onClick={() => setShowFunds(true)}
                    textDecor="underline"
                  >
                    Top Up Wallet
                  </Text>
                </Flex>
              )}
            </Box>
          )}

          <Button
            onClick={() => (step === 2 ? onOpen() : setStep(step + 1))}
            w="full"
            bg="red"
            mt="32px"
            py="17px"
            isDisabled={
              step === 1
                ? !values?.state || !values?.city || !values?.locations
                : step === 2
                ? (start &&
                    end &&
                    values.arrivalTime &&
                    values.departureTime &&
                    formattedDeparture < formattedDate) ||
                  !values.arrivalTime ||
                  !values.departureTime
                : ""
            }
            fontSize="14px"
          >
            {step === 1 ? "Select" : "Reserve and Park Later"}
          </Button>
        </Flex>
      </Flex>
      <ConfirmReserveModal
        start={start}
        end={end}
        amount={requestData?.amount}
        action={handleSubmit}
        values={values}
        isLoading={isReserving}
        isOpen={isOpen}
        onClose={onClose}
      />
      <FundWalletDrawer
        refetchUser={refetch}
        isOpen={showFunds}
        cards={cards}
        action={() => {
          initializePayment(onSuccess, onCloses);
        }}
        onClose={() => setShowFunds(false)}
      />
    </Box>
  );
};

export default ReserveParking;

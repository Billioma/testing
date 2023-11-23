import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Radio,
  RadioGroup,
  Skeleton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { BsCheckCircle } from "react-icons/bs";
import Select from "react-select";
import CustomInput from "../../../components/common/CustomInput";
import ConfirmEventModal from "../../../components/modals/ConfirmEventModal";
import {
  useGetEvents,
  useGetServices,
} from "../../../services/customer/query/locations";
import { Calendar } from "react-calendar";
import { formatDate, formatTime } from "../../../utils/helpers";
import {
  useGetMake,
  useGetModel,
  useGetVehicles,
} from "../../../services/customer/query/vehicles";
import { useGetCards } from "../../../services/customer/query/payment";
import { useGetUser } from "../../../services/customer/query/user";
import { usePaystackPayment } from "react-paystack";
import FundWalletDrawer from "../../../components/modals/FundWalletDrawer";
import {
  useCreateEventParking,
  useGetEventParking,
} from "../../../services/customer/query/services";
import useCustomToast from "../../../utils/notifications";
import { useNavigate } from "react-router-dom";
import AddVehicleModal from "../../../components/modals/AddVehicleModal";

const EventParking = () => {
  const [step, setStep] = useState(1);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [values, setValues] = useState({
    event: "",
    service: "",
    vehicle: "",
    cardId: "",
    paymentMethod: "",
  });
  const [startDate, setStartDate] = useState(false);
  const [startValue, startChange] = useState("");

  useEffect(() => {
    setStep(1);
    startChange("");
    setValues({
      event: "",
      service: "",
      vehicle: "",
      cardId: "",
      paymentMethod: "",
    });
  }, []);
  const [showFunds, setShowFunds] = useState(false);
  const { data: userData, refetch } = useGetUser();
  const { refetch: refetchEvent } = useGetEventParking(10, 1);
  const { data: cards, refetch: refetchCards } = useGetCards();

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

  const [event, setEvent] = useState({});

  const start = formatDate(startValue);

  const { data: events, isLoading: isEVent } = useGetEvents();
  const { data: services } = useGetServices();
  const [showVehicle, setShowVehicle] = useState(false);
  const { data: models } = useGetModel();
  const { data: vehicles, refetch: refetchVehicle } = useGetVehicles();
  const { data: makes } = useGetMake();
  const today = new Date();
  const filteredEvent = events?.filter(
    (item) =>
      item?.name?.toLowerCase().includes(values?.event?.toLowerCase()) &&
      new Date(item?.eventStartDateTime) > today
  );

  const startDateRange = new Date(event?.eventStartDateTime);
  const endDateRange = new Date(event?.eventEndDateTime);

  const isDateDisabled = (date) => {
    return date > endDateRange || date < startDateRange;
  };

  const handleDateChange = (date) => {
    if (!isDateDisabled(date)) {
      startChange(date);
    }
    setStartDate(false);
  };

  const tileClassName = ({ date }) => {
    if (
      date.getDate() === startDateRange.getDate() ||
      date.getDate() === endDateRange.getDate()
    ) {
      return "selected-date";
    }
    if (isDateDisabled(date)) {
      return "disabled-date";
    }
    return null;
  };
  const mainService = services?.filter(
    (item) => item?.id === "1" || item?.id === "3" || item?.id === "5"
  );

  const servicesOptions = mainService?.map((event) => ({
    value: event?.name,
    label: event?.name,
    id: event?.id,
  }));

  const vehicleOptions = vehicles?.data?.map((car) => ({
    value: `${car?.model?.make?.name} - ${car?.model?.name} - ${car?.licensePlate}`,
    main: `${car?.model?.make?.name} - ${car?.model?.name}`,
    label: `${car?.model?.make?.name} - ${car?.model?.name} - ${car?.licensePlate}`,
    id: car?.id,
  }));

  const handleSelectChange = (selectedOption, { name }) => {
    setValues({
      ...values,
      [name]: selectedOption,
    });
  };

  const { successToast, errorToast } = useCustomToast();
  const navigate = useNavigate();
  const { mutate: eventMutate, isLoading: isEventing } = useCreateEventParking({
    onSuccess: () => {
      navigate("/customer/history/user");
      successToast("Parking spot reserved");
      onClose();
      refetch();
      refetchEvent();
      setEvent({});
      setValues({
        event: "",
        service: "",
        vehicle: "",
        cardId: "",
        paymentMethod: "",
      });
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred"
      );
    },
  });

  const handleSubmit = () => {
    Number(values?.paymentMethod) === 0
      ? eventMutate({
          cardId: values?.cardId,
          event: event?.id,
          paymentMethod: Number(values?.paymentMethod),
          reservedDate: start,
          service: values?.service?.id,
          vehicle: values?.vehicle?.id,
        })
      : eventMutate({
          event: event?.id,
          paymentMethod: Number(values?.paymentMethod),
          reservedDate: start,
          service: values?.service?.id,
          vehicle: values?.vehicle?.id,
        });
  };
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
    const handleClickOutside = (event) => {
      if (event.target.closest(".box") === null) {
        setStartDate(false);
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
          w={{
            base: "full",
            sm: "30rem",
            lg: !filteredEvent?.length || step !== 1 ? "30rem" : "unset",
            "3xl": !filteredEvent?.length || step !== 1 ? "35rem" : "unset",
          }}
          flexDir="column"
        >
          {step !== 1 && (
            <Flex align="center" gap="8px" color="#242628">
              <HiOutlineArrowNarrowLeft
                cursor="pointer"
                onClick={() => {
                  setStep(step - 1);
                  setValues({
                    event: "",
                    service: "",
                    vehicle: "",
                    cardId: "",
                    paymentMethod: "",
                  });
                  startChange("");
                }}
                size="24px"
              />
              <Text fontSize="14px" fontWeight={500}>
                Back
              </Text>
            </Flex>
          )}

          <Text
            fontSize="20px"
            color="#242628"
            lineHeight="100%"
            textAlign="center"
            fontWeight={700}
            mb="32px"
            mt="23px"
          >
            Event Parking
          </Text>

          {step === 1 && (
            <Box>
              {filteredEvent?.length ? (
                <Flex justifyContent="center" w="full" align="center">
                  <Flex
                    justifyContent="center"
                    w={{ base: "100%", lg: "40%" }}
                    align="center"
                  >
                    <CustomInput
                      holder="Search Event"
                      search
                      auth
                      value={values?.event}
                      onChange={(e) =>
                        setValues({
                          ...values,
                          event: e.target.value,
                        })
                      }
                    />
                  </Flex>
                </Flex>
              ) : (
                !isEVent && (
                  <Flex justifyContent="center" align="center">
                    <Text>No Upcoming Events at the moment</Text>
                  </Flex>
                )
              )}

              <Box mt="20px">
                <Skeleton
                  display={isEVent ? "flex" : "none"}
                  isLoaded={!isEVent}
                  h="8rem"
                ></Skeleton>
                <Grid
                  gap="24px"
                  templateColumns={
                    filteredEvent?.length === 1
                      ? "repeat(1,1fr)"
                      : [
                          "repeat(1,1fr)",
                          "repeat(1,1fr)",
                          "repeat(1,1fr)",
                          "repeat(2,1fr)",
                        ]
                  }
                >
                  {events?.length
                    ? filteredEvent?.map((data, i) => (
                        <GridItem key={i}>
                          <Box
                            border="1px solid #D4D6D8"
                            borderRadius="10px"
                            p="12px"
                            minW={{ base: "full", md: "26rem" }}
                            minH="7.5rem"
                          >
                            <Flex align="center" gap="12px">
                              <Box
                                w="36%"
                                display={{ base: "none", md: "flex" }}
                              >
                                <Image
                                  src={
                                    process.env.REACT_APP_BASE_URL +
                                      data?.image || "/assets/zone_pic.png"
                                  }
                                  borderRadius="6px"
                                  objectFit="cover"
                                  w="96px"
                                  h="96px"
                                />
                              </Box>

                              <Box w="full">
                                <Flex
                                  align="center"
                                  justifyContent="space-between"
                                  w="full"
                                >
                                  <Box w="full">
                                    <Text
                                      lineHeight="100%"
                                      fontSize="12px"
                                      color="#242628"
                                    >
                                      Event Name
                                    </Text>
                                    <Text
                                      mt="8px"
                                      color="#848688"
                                      fontWeight={500}
                                      lineHeight="100%"
                                      fontSize="14px"
                                    >
                                      {data?.name}
                                    </Text>
                                  </Box>

                                  <Box w="60%">
                                    <Text
                                      lineHeight="100%"
                                      fontSize="12px"
                                      color="#242628"
                                    >
                                      Date
                                    </Text>
                                    <Text
                                      mt="8px"
                                      color="#848688"
                                      fontWeight={500}
                                      lineHeight="100%"
                                      fontSize="14px"
                                    >
                                      {formatDate(data?.eventStartDateTime)}
                                    </Text>
                                  </Box>
                                </Flex>

                                <Flex
                                  mt="20px"
                                  align="center"
                                  justifyContent="space-between"
                                  w="full"
                                >
                                  <Box w="full">
                                    <Text
                                      lineHeight="100%"
                                      fontSize="12px"
                                      color="#242628"
                                    >
                                      Location
                                    </Text>
                                    <Text
                                      mt="8px"
                                      color="#848688"
                                      fontWeight={500}
                                      lineHeight="100%"
                                      fontSize="14px"
                                      w="80%"
                                    >
                                      {data?.address}
                                    </Text>
                                  </Box>

                                  <Box w="60%">
                                    <Button
                                      onClick={() => {
                                        setEvent(data);
                                        setStep(step + 1);
                                      }}
                                      w="full"
                                      fontSize="12px"
                                    >
                                      Select
                                    </Button>
                                  </Box>
                                </Flex>
                              </Box>
                            </Flex>
                          </Box>
                        </GridItem>
                      ))
                    : ""}
                </Grid>
              </Box>
            </Box>
          )}

          {step === 2 && (
            <Box>
              <Box
                border="1px solid #EE383A"
                borderRadius="8px"
                py="12px"
                px="16px"
              >
                <Flex align="center" w="full" justifyContent="space-between">
                  <Flex align="center" gap="16px" w="full">
                    <Image
                      display={{ base: "none", md: "flex" }}
                      src="/assets/event.png"
                      w="24px"
                      h="24px"
                    />

                    <Box>
                      <Text lineHeight="100%" color="#242628" fontSize="10px">
                        Event Name
                      </Text>
                      <Text
                        mt="8px"
                        color="#646668"
                        fontWeight={500}
                        lineHeight="100%"
                        fontSize="12px"
                      >
                        {event?.name}
                      </Text>
                    </Box>
                  </Flex>

                  <Flex flexDir="column" w={{ base: "100%", md: "25%" }}>
                    <Text color="#242628" fontSize="10px" lineHeight="100%">
                      Location
                    </Text>
                    <Text
                      color="#646668"
                      fontWeight={500}
                      fontSize="12px"
                      lineHeight="100%"
                      mt="8px"
                    >
                      {event?.address}
                    </Text>
                  </Flex>
                </Flex>

                <Flex
                  mt="16px"
                  align="center"
                  flexWrap={{ base: "wrap", md: "nowrap" }}
                  justifyContent="space-between"
                  w="full"
                >
                  <Box w={{ base: "40%", md: "80%" }}>
                    <Text color="#242628" fontSize="10px" lineHeight="100%">
                      Start
                    </Text>
                    <Text
                      color="#646668"
                      fontWeight={500}
                      fontSize="12px"
                      lineHeight="100%"
                      mt="8px"
                    >
                      {formatDate(event?.eventStartDateTime)}{" "}
                      {formatTime(event?.eventStartDateTime)}
                    </Text>
                  </Box>

                  <Flex
                    flexDir="column"
                    justifyContent="flex-start"
                    w={{ base: "50%", md: "80%" }}
                  >
                    <Text color="#242628" fontSize="10px" lineHeight="100%">
                      End
                    </Text>
                    <Text
                      color="#646668"
                      fontWeight={500}
                      fontSize="12px"
                      lineHeight="100%"
                      mt="8px"
                    >
                      {formatDate(event?.eventEndDateTime)}{" "}
                      {formatTime(event?.eventEndDateTime)}
                    </Text>
                  </Flex>

                  <Flex
                    flexDir="column"
                    mt={{ base: "10px", md: "unset" }}
                    justifyContent="flex-end"
                    w={{ base: "40%", md: "40%" }}
                  >
                    <Text color="#242628" fontSize="10px" lineHeight="100%">
                      Amount Due
                    </Text>
                    <Text
                      color="#646668"
                      fontWeight={500}
                      fontSize="12px"
                      lineHeight="100%"
                      mt="8px"
                    >
                      ₦{" "}
                      {event?.price?.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      }) || "0.00"}
                    </Text>
                  </Flex>
                </Flex>
              </Box>

              <Box w="full" my="16px">
                <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                  Select Date
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
                    <Box pos="absolute" top="50px" w="full" zIndex="3">
                      <Calendar
                        onChange={handleDateChange}
                        value={startValue}
                        minDate={startDateRange}
                        maxDate={endDateRange}
                        tileClassName={tileClassName}
                      />
                    </Box>
                  )}
                </Box>
              </Box>

              <Box w="full" my="16px">
                <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                  Select Service
                </Text>

                <Select
                  styles={customStyles}
                  placeholder="Select Service"
                  options={servicesOptions}
                  value={values?.service}
                  defaultValue={values?.service}
                  onChange={(selectedOption) =>
                    handleSelectChange(selectedOption, {
                      name: "service",
                    })
                  }
                  components={{
                    IndicatorSeparator: () => (
                      <div style={{ display: "none" }}></div>
                    ),
                  }}
                />
              </Box>

              <Box w="full" my="16px">
                <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                  Select Vehicle
                </Text>

                <Select
                  styles={customStyles}
                  placeholder="Select Vehicle"
                  options={vehicleOptions}
                  value={values?.vehicle}
                  defaultValue={values?.vehicle}
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
              {vehicles?.data?.length === 0 ? (
                <Flex
                  mt="8px"
                  color="red"
                  mb="16px"
                  fontSize="12px"
                  fontWeight={500}
                  lineHeight="100%"
                  justifyContent="flex-end"
                  w="full"
                >
                  <Text
                    cursor="pointer"
                    onClick={() => setShowVehicle(true)}
                    textDecor="underline"
                  >
                    Add a Vehicle
                  </Text>
                </Flex>
              ) : (
                ""
              )}

              <Box mb="16px">
                <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                  Payment Method
                </Text>
                <Flex mt="17px" align="center">
                  <RadioGroup
                    value={values?.paymentMethod}
                    onChange={(e) =>
                      setValues({
                        ...values,
                        paymentMethod: e,
                      })
                    }
                    align="center"
                    display="grid"
                    gridTemplateColumns={"repeat(2,1fr)"}
                    rowGap="15px"
                    w="full"
                    justifyContent="space-between"
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
                    <Radio size="sm" value={"3"}>
                      <Text fontSize="14px">Pay with Transfer</Text>
                    </Radio>
                  </RadioGroup>
                </Flex>
              </Box>

              {values?.paymentMethod === "1" && (
                <Box>
                  <Box border="1px solid #D4D6D8" borderRadius="4px" p="16px">
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
                          Wallet
                        </Text>
                        <Text fontSize="14px" color="#646668" lineHeight="100%">
                          <span style={{ fontWeight: 500 }}> Balance: </span> ₦{" "}
                          {userData?.wallet?.balance?.toLocaleString(
                            undefined,
                            {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }
                          ) || "0.00"}
                        </Text>
                      </Box>

                      <Box>
                        <BsCheckCircle color="#0B841D" />
                      </Box>
                    </Flex>
                  </Box>

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
                </Box>
              )}

              {values?.paymentMethod === "0" && (
                <Box>
                  {cards?.data?.length ? (
                    cards?.data?.map((dat, i) => (
                      <Box key={i}>
                        <Box
                          mb="16px"
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

                            {values?.cardId === dat?.id && (
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
            </Box>
          )}

          <Button
            onClick={() => (step === 2 ? onOpen() : setStep(step + 1))}
            w="full"
            bg="red"
            display={step === 1 ? "none" : "flex"}
            mt="32px"
            py="17px"
            isDisabled={
              step === 1
                ? !values?.event
                : step === 2
                ? values?.paymentMethod === "0"
                  ? !values?.cardId
                  : !values?.service ||
                    !values?.vehicle ||
                    !values?.paymentMethod
                : ""
            }
            fontSize="14px"
          >
            {step === 1 ? "Enter" : "Reserve Event Parking"}
          </Button>
        </Flex>
      </Flex>
      <ConfirmEventModal
        values={values}
        event={event}
        start={start}
        isLoading={isEventing}
        action={handleSubmit}
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
      <AddVehicleModal
        makes={makes}
        models={models}
        noVehicle
        refetch={refetchVehicle}
        isOpen={showVehicle}
        onClose={() => setShowVehicle(false)}
      />
    </Box>
  );
};

export default EventParking;

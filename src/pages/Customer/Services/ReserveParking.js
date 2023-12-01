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
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { BsCheck, BsCheckCircle } from "react-icons/bs";
import Select from "react-select";
import ConfirmReserveModal from "../../../components/modals/ConfirmReserveModal";
import { useGetLocations } from "../../../services/customer/query/locations";
import { CiLocationOn, CiMap } from "react-icons/ci";
import { PiWarningCircleLight } from "react-icons/pi";
import { Calendar } from "react-calendar";
import {
  formatDate,
  formatHour,
  formatNewDate,
  formatTimeMinute,
  formatTimeToHHMMSS,
} from "../../../utils/helpers";
import {
  useGetMake,
  useGetModel,
  useGetVehicles,
} from "../../../services/customer/query/vehicles";
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
import AddVehicleModal from "../../../components/modals/AddVehicleModal";
import CustomInput from "../../../components/common/CustomInput";
import { FaListUl } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import DatePicker from "react-multi-date-picker";

const ReserveParking = () => {
  const [step, setStep] = useState(1);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [showFunds, setShowFunds] = useState(false);
  const [tab, setTab] = useState("List");
  const [values, setValues] = useState({
    state: "",
    city: "",
    locations: "",
    locationName: "",
    location: "",
    arrivalTime: "",
    departureTime: "",
    paymentMethod: "",
    cardId: "",
    vehicle: "",
    color: "",
    make: "",
    model: "",
  });

  const [startDate, setStartDate] = useState(false);
  const [startValue, startChange] = useState("");
  const [endValue, endChange] = useState("");
  const [space, setSpace] = useState("");
  const [endDate, setEndDate] = useState(false);
  // useEffect(() => {
  //   setStep(1);
  //   endChange("");
  //   startChange("");
  //   setValues({
  //     state: "",
  //     city: "",
  // reqeustReserve()
  //     locations: "",
  // setSpace("")
  //     arrivalTime: "",
  // location: "",
  //     departureTime: "",
  //     paymentMethod: "",
  //     cardId: "",
  //     vehicle: "",
  //     color: "",
  //     make: "",
  //     model: "",
  //   });
  // }, []);

  const { data: cards, refetch: refetchCards } = useGetCards();
  const { data: userData, refetch } = useGetUser();

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
  const [showVehicle, setShowVehicle] = useState(false);
  const { data: models } = useGetModel();
  const { data: vehicles, refetch: refetchVehicle } = useGetVehicles();
  const { data: makes } = useGetMake();
  const [locationName, setLocationName] = useState("");
  const colors = ["#F4F6F8", "#E3FDE7", "#FDE8E8"];
  const currentStateLocation = locations?.filter((dat) => {
    const lowercaseState = values?.state?.value?.toLowerCase();
    const lowercaseLocationName = locationName?.toLowerCase();

    const stateMatches =
      !lowercaseState || dat?.state?.toLowerCase()?.includes(lowercaseState);

    const nameMatches =
      !lowercaseLocationName ||
      dat?.name?.toLowerCase()?.includes(lowercaseLocationName);

    return stateMatches && nameMatches;
  });

  const today = new Date();
  const firstHour = formatHour(today);
  const lastMinute = formatTimeMinute(today);
  const generateTimeArrays = (date) => {
    const times = [];
    const shouldStartFromNow = formatNewDate(date) === formatNewDate(today);
    const startHour = shouldStartFromNow
      ? Number(lastMinute) === 45 || Number(lastMinute) === 0
        ? Number(firstHour) + 1
        : Number(firstHour)
      : 0;
    const startMinute = shouldStartFromNow
      ? Number(lastMinute) === 45
        ? 0
        : Number(lastMinute)
      : 0;
    for (let hour = startHour; hour < 24; hour++) {
      for (let minute = startMinute; minute < 60; minute += 15) {
        const isPM = hour >= 12;
        const hourFormatted = (hour % 12 || 12).toString().padStart(2, "0");
        const minuteFormatted = minute.toString().padStart(2, "0");
        const period = isPM ? "PM" : "AM";
        const time = `${hourFormatted}:${minuteFormatted} ${period}`;
        times.push(time);
      }
    }

    return times;
  };

  const timeArrays = generateTimeArrays(startValue);
  const timeArray = generateTimeArrays(endValue);

  const stateOptions = allStates?.map((state) => ({
    value: state,
    label: state,
  }));

  const timeOption = timeArray?.map((time) => ({
    value: time,
    label: time,
  }));
  const timeOptions = timeArrays?.map((time) => ({
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

  const {
    mutate: reqeustReserve,
    data: requestData,
    isLoading: isRequesting,
  } = useRequestReserveParking({
    onSuccess: () => {
      setSpace("space");
    },
    onError: (err) => {
      if (err?.response?.status === 404) {
        setSpace("noSpace");
      }
    },
  });
  const navigate = useNavigate();
  const { successToast, errorToast } = useCustomToast();
  const { refetch: refetchParking } = useGetReserveParking(10, 1);
  const { mutate: reserveMutate, isLoading: isReserving } =
    useCreateReserveParking({
      onSuccess: () => {
        refetch();
        refetchParking();
        navigate("/customer/history/user");
        successToast("Parking spot reserved");
      },
      onError: (err) => {
        errorToast(
          err?.response?.data?.message || err?.message || "An Error occurred"
        );
      },
    });

  const handleRequest = () => {
    reqeustReserve({
      arrival: `${start}${formatTimeToHHMMSS(values?.arrivalTime?.value)}`,
      departure: `${end}${formatTimeToHHMMSS(values?.departureTime?.value)}`,
      location: Number(values?.location?.id),
      service: "3",
      vehicle: values?.vehicle?.id,
    });
  };
  // useEffect(() => {
  //   if (start && end && values?.locations && values?.vehicle) {
  //     reqeustReserve({
  //       arrival: `${start}${formatTimeToHHMMSS(values?.arrivalTime?.value)}`,
  //       departure: `${end}${formatTimeToHHMMSS(values?.departureTime?.value)}`,
  //       location: Number(values?.locations?.id),
  //       service: "3",
  //       vehicle: values?.vehicle?.id,
  //     });
  //   }
  // }, [values, start, end]);
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
          arrival: `${start}${formatTimeToHHMMSS(values?.arrivalTime?.value)}`,
          departure: `${end}${formatTimeToHHMMSS(
            values?.departureTime?.value
          )}`,
          cardId: values?.cardId,
          customer: userData?.id,
          paymentMethod: Number(values?.paymentMethod),
          rates: requestData?.rates?.map((dat) => dat?.id),
          service: "3",
          vehicle: values?.vehicle?.id,
          zone: Number(requestData?.zone?.id),
        })
      : reserveMutate({
          amount: requestData?.amount,
          arrival: `${start}${formatTimeToHHMMSS(values?.arrivalTime?.value)}`,
          departure: `${end}${formatTimeToHHMMSS(
            values?.departureTime?.value
          )}`,
          customer: userData?.id,
          paymentMethod: Number(values?.paymentMethod),
          rates: requestData?.rates?.map((dat) => dat?.id),
          service: "3",
          vehicle: values?.vehicle?.id,
          zone: Number(requestData?.zone?.id),
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

  const customFirstStyles = {
    control: (provided) => ({
      ...provided,
      width: "100%",
      minHeight: "40px",
      paddingRight: "10px",
      color: "#646668",
      fontSize: "14px",
      cursor: "pointer",
      borderRadius: "8px",
      border: "none",
      background: "#f4f6f8",
    }),
    menu: (provided) => ({
      ...provided,
      fontSize: "13px",
      backgroundColor: "#fff",
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isFocused ? "" : "",
      cursor: "pointer",
      backgroundColor: state.isFocused ? "#fff" : "#f4f6f8",
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
          px={{ base: "20px", md: "32px" }}
          justifyContent="center"
          w={
            step === 1 ? "full" : { md: "30rem", base: "100%", "3xl": "35rem" }
          }
          flexDir="column"
        >
          {step !== 1 && (
            <Flex
              align="center"
              gap="8px"
              mb="23px"
              onClick={() => {
                setStep(step - 1);
                reqeustReserve();
                endChange("");
                startChange("");
                setSpace("");
                setValues({
                  state: "",
                  city: "",
                  locations: "",
                  arrivalTime: "",
                  departureTime: "",
                  paymentMethod: "",
                  cardId: "",
                  vehicle: "",
                  location: "",
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
              <Flex
                justifyContent="space-between"
                flexDir={{ base: "column", md: "row" }}
                align={{ base: "flex-start", md: "center" }}
                gap={{ base: "24px", md: "unset" }}
                mb="24px"
              >
                <Flex
                  align={{ base: "flex-start", md: "center" }}
                  gap={{ base: "15px", md: "24px" }}
                  w={{ base: "100%", md: "60%" }}
                  flexDir={{ base: "column", md: "row" }}
                >
                  <Box w={{ base: "100%", md: "60%" }}>
                    <Select
                      styles={customFirstStyles}
                      placeholder="Select State"
                      options={stateOptions}
                      value={values?.state}
                      defaultValue={values?.state}
                      onChange={(selectedOption) => {
                        handleSelectChange(selectedOption, { name: "state" });
                      }}
                      components={{
                        IndicatorSeparator: () => (
                          <div style={{ display: "none" }}></div>
                        ),
                        DropdownIndicator: () =>
                          values?.state?.value !== undefined ? (
                            <MdCancel
                              onClick={() => {
                                setValues({ ...values, state: "" });
                              }}
                            />
                          ) : (
                            <IoIosArrowDown size="15px" color="#646668" />
                          ),
                      }}
                    />
                  </Box>

                  <Box w="full">
                    <CustomInput
                      onChange={(e) => setLocationName(e.target.value)}
                      value={locationName}
                      reserve
                      mb
                      holder="Search name"
                    />
                  </Box>
                </Flex>

                <Flex w={{ base: "full", md: "unset" }}>
                  {["List", "Map"].map((dat, i) => (
                    <Flex
                      color={tab === dat ? "red" : "#646668"}
                      gap="8px"
                      px="10px"
                      cursor="pointer"
                      w={{ base: "full", md: "unset" }}
                      _hover={{ color: "red" }}
                      pb="8px"
                      borderBottom={tab === dat ? "3px solid red" : "none"}
                      fontWeight={tab === dat ? 700 : 400}
                      key={i}
                      onClick={() => setTab(dat)}
                    >
                      <Box>{i === 0 ? <FaListUl /> : <CiMap />}</Box>
                      <Text fontSize="14px" lineHeight="100%">
                        {dat}
                      </Text>
                    </Flex>
                  ))}
                </Flex>
              </Flex>

              <Grid
                gap="35px"
                templateColumns={
                  currentStateLocation?.length
                    ? [
                        "repeat(1,1fr)",
                        "repeat(1,1fr)",
                        "repeat(2,1fr)",
                        "repeat(2,1fr)",
                      ]
                    : "repeat(1,1fr)"
                }
              >
                {currentStateLocation?.length ? (
                  currentStateLocation?.map((dat, i) => (
                    <GridItem key={i}>
                      <Box
                        borderRadius="8px"
                        border="1px solid #d4d6d8"
                        p="16px"
                      >
                        <Flex align="center" gap="24px">
                          <Box display={{ base: "none", md: "block" }}>
                            <Image
                              src="/assets/loc.jpg"
                              borderRadius="9px"
                              maxW="125px"
                              maxH="125px"
                              objectFit="cover"
                            />
                          </Box>

                          <Box w="full">
                            <Flex
                              align="center"
                              w="full"
                              gap="24px"
                              justifyContent="space-between"
                            >
                              <Box w="full">
                                <Text
                                  fontSize="10px"
                                  color="#242628"
                                  lineHeight="100%"
                                  mb="8px"
                                >
                                  Location
                                </Text>
                                <Text
                                  fontSize="14px"
                                  color="#848688"
                                  lineHeight="100%"
                                  fontWeight={500}
                                >
                                  {dat?.name}
                                </Text>
                              </Box>

                              <Flex
                                align="center"
                                gap="4px"
                                color="#FFA36D"
                                fontWeight={500}
                                fontSize="12px"
                                lineHeight="100%"
                              >
                                <PiWarningCircleLight size="16px" />
                                <Text>Details</Text>
                              </Flex>
                            </Flex>

                            <Flex
                              mt="22px"
                              align="flex-end"
                              w="full"
                              gap="24px"
                              justifyContent="space-between"
                            >
                              <Box w="full">
                                <Text
                                  mb="8px"
                                  fontSize="10px"
                                  color="#242628"
                                  lineHeight="100%"
                                >
                                  Amenities
                                </Text>
                                <Flex
                                  flexWrap="wrap"
                                  align="center"
                                  gap="12px"
                                  rowGap="8px"
                                >
                                  {dat?.amenities?.map((amenity, i) => (
                                    <Flex
                                      key={i}
                                      justifyContent="center"
                                      align="center"
                                      bg={colors[i % colors?.length]}
                                      fontSize="10px"
                                      color="#646668"
                                      fontWeight={500}
                                      lineHeight="100%"
                                      borderRadius="4px"
                                      py="7px"
                                      px="10px"
                                    >
                                      {amenity?.name}
                                    </Flex>
                                  ))}
                                </Flex>
                              </Box>

                              <Box>
                                <Button
                                  size="sm"
                                  onClick={() => {
                                    setValues({
                                      ...values,
                                      location: dat,
                                    });
                                    setStep(step + 1);
                                  }}
                                  fontSize="12px"
                                  lineHeight="100%"
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
                ) : (
                  <Flex
                    gap="16px"
                    justifyContent="center"
                    align="center"
                    w="full"
                    my="38px"
                    flexDir="column"
                  >
                    <Image src="/assets/no-loc.jpg" w="64px" h="64px" />
                    <Text
                      color="#848688"
                      fontSize="12px"
                      lineHeight="100%"
                      fontWeight={500}
                    >
                      No Location Data
                    </Text>
                  </Flex>
                )}
              </Grid>
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
                      {values?.location?.name}
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
                      {values?.location?.state}
                    </Text>
                  </Flex>
                </Flex>
              </Box>

              <Flex
                gap="16px"
                my="16px"
                flexDir={{ base: "column", md: "row" }}
                align={{ base: "flex-start", md: "center" }}
              >
                <Box w="full">
                  <Text
                    mb="8px"
                    fontSize="10px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Arrival Date
                  </Text>
                  <Box display={{ base: "flex", md: "none" }}>
                    <DatePicker
                      placeholder="Select Date"
                      value={startValue}
                      minDate={startDateRange}
                      onChange={startChange}
                    />
                  </Box>
                  <Box
                    pos="relative"
                    display={{ base: "none", md: "flex" }}
                    w="full"
                    className="box"
                  >
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
                    value={values?.arrivalTime}
                    defaultValue={values?.arrivalTime}
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

              <Flex
                flexDir={{ base: "column", md: "row" }}
                align={{ base: "flex-start", md: "center" }}
                gap="16px"
              >
                <Box w="full">
                  <Text
                    mb="8px"
                    fontSize="10px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Departure Date
                  </Text>

                  <Box display={{ base: "flex", md: "none" }}>
                    <DatePicker
                      placeholder="Select Date"
                      value={endValue}
                      minDate={startDateRange}
                      onChange={endChange}
                    />
                  </Box>

                  <Box
                    pos="relative"
                    display={{ base: "none", md: "flex" }}
                    w="full"
                    className="box"
                  >
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
                    options={timeOption}
                    value={values?.departureTime}
                    defaultValue={values?.departureTime}
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
                values?.arrivalTime &&
                values?.departureTime &&
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
                  mt="-8px"
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

              {isRequesting ? (
                <Flex
                  align="center"
                  gap="8px"
                  color="#EE8F38"
                  fontSize="12px"
                  lineHeight="100%"
                  fontWeight={500}
                >
                  <Spinner size="sm" />
                  <Text>Checking Parking Availability</Text>
                </Flex>
              ) : space === "noSpace" ? (
                <Flex
                  align="center"
                  gap="8px"
                  color="red"
                  fontSize="12px"
                  lineHeight="100%"
                  fontWeight={500}
                >
                  <BsCheckCircle size="16px" />
                  <Text>Desired time unavailable.</Text>
                </Flex>
              ) : space === "space" ? (
                <Flex
                  align="center"
                  gap="8px"
                  color="#0B841D"
                  fontSize="12px"
                  lineHeight="100%"
                  fontWeight={500}
                >
                  <BsCheckCircle size="16px" />
                  <Text>Parking space is available at your desired time.</Text>
                </Flex>
              ) : (
                ""
              )}

              {space === "space" ? (
                <>
                  <Box mt="24px">
                    <Text
                      mb="8px"
                      fontSize="10px"
                      fontWeight={500}
                      color="#444648"
                    >
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
                        gridTemplateColumns={{
                          base: "repeat(1,1fr)",
                          md: "repeat(2,1fr)",
                        }}
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
                    <Box
                      mt="16px"
                      border="1px solid #0B841D"
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
                            Wallet
                          </Text>
                          <Text
                            fontSize="14px"
                            color="#646668"
                            lineHeight="100%"
                          >
                            <span style={{ fontWeight: 500 }}> Balance: </span>{" "}
                            ₦{" "}
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
                  )}
                  {values?.paymentMethod === "0" && (
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
                        <Box fontSize="14px" fontWeight={500} mt="8px">
                          No Card Available
                        </Box>
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
                  {values?.paymentMethod === "1" && (
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
                  )}{" "}
                </>
              ) : (
                ""
              )}
            </Box>
          )}
          {step !== 1 ? (
            <Button
              onClick={() =>
                step === 2 && requestData === undefined
                  ? handleRequest()
                  : step === 2 && requestData !== undefined
                  ? onOpen()
                  : setStep(step + 1)
              }
              w="full"
              bg="red"
              mt="32px"
              py="17px"
              isDisabled={
                step === 2 && requestData === undefined
                  ? !end ||
                    !start ||
                    !values?.arrivalTime ||
                    !values?.departureTime ||
                    formattedDeparture < formattedDate ||
                    !values?.arrivalTime ||
                    !values?.departureTime ||
                    !values?.vehicle
                  : step === 2 && requestData !== undefined
                  ? values?.paymentMethod === "0"
                    ? !values?.cardId ||
                      (start &&
                        end &&
                        values?.arrivalTime &&
                        values?.departureTime &&
                        formattedDeparture < formattedDate) ||
                      !values?.arrivalTime ||
                      !values?.departureTime ||
                      !values?.vehicle ||
                      !values?.paymentMethod
                    : values?.paymentMethod === "2" ||
                      values?.paymentMethod === "3"
                    ? true
                    : ""
                  : ""
              }
              fontSize="14px"
            >
              {step === 1
                ? "Select"
                : step === 2 && requestData === undefined
                ? "Request Reservation"
                : "Reserve and Park Later"}
            </Button>
          ) : (
            ""
          )}
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

export default ReserveParking;

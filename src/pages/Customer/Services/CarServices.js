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
  Text,
} from "@chakra-ui/react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import {
  useGetLocations,
  useGetServices,
} from "../../../services/customer/query/locations";
import {
  BookingSlots,
  carServiceDesc,
  carServiceIcon,
} from "../../../components/common/constants";
import {
  useGetMake,
  useGetModel,
  useGetVehicles,
} from "../../../services/customer/query/vehicles";
import Select from "react-select";
import { Calendar } from "react-calendar";
import { formatDate } from "../../../utils/helpers";
import { BsCheckCircle } from "react-icons/bs";
import { useGetUser } from "../../../services/customer/query/user";
import {
  useGetBookingRate,
  useCreateServiceBookings,
  useGetCarService,
} from "../../../services/customer/query/services";
import { useGetCards } from "../../../services/customer/query/payment";
import useCustomToast from "../../../utils/notifications";
import { useNavigate } from "react-router-dom";
import FundWalletDrawer from "../../../components/modals/FundWalletDrawer";
import { usePaystackPayment } from "react-paystack";
import AddVehicleModal from "../../../components/modals/AddVehicleModal";
import DatePicker from "react-multi-date-picker";
import PointsModal from "../../../components/modals/PointsModal";

const CarServices = () => {
  const [step, setStep] = useState(1);
  const { data: locations } = useGetLocations();
  const { data } = useGetServices();
  const { data: cards, refetch: refetchCards } = useGetCards();
  const { data: userData, refetch } = useGetUser();
  const { refetch: refetchBooking } = useGetCarService(10, 1);
  const [showPoint, setShowPoint] = useState(false);

  const [values, setValues] = useState({
    serviceId: "",
    address: "",
    appointmentTime: "",
    img: "",
    desc: "",
    billingRate: "",
    cardId: "",
    paymentMethod: "",
    vehicle: "",
  });
  const [startDate, setStartDate] = useState(false);
  const [startValue, startChange] = useState("");
  const [filteredLocations, setFilteredLocations] = useState([]);

  useEffect(() => {
    if (locations && values?.serviceId?.label) {
      const searchTerm = values?.serviceId?.label.includes("Gauge")
        ? values?.serviceId?.label
            ?.toLowerCase()
            .split(" ")[2]
            ?.replace("s", "")
        : values?.serviceId?.label?.toLowerCase().split(" ")[0];

      const filteredLocations = locations?.filter((location) => {
        const matchingAmenities = location?.amenities?.filter((amenity) =>
          amenity?.name?.toLowerCase().includes(searchTerm)
        );
        return matchingAmenities.length > 0;
      });

      setFilteredLocations(filteredLocations);
    }
  }, [locations, values]);

  const startDateRange = new Date();

  const isDateDisabled = (date) => {
    return date < startDateRange;
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

  useEffect(() => {
    setStep(1);
    startChange("");

    setValues({
      serviceId: "",
      address: "",
      appointmentTime: "",
      img: "",
      desc: "",
      billingRate: "",
      cardId: "",
      paymentMethod: "",
      vehicle: "",
    });
  }, []);

  const targetNames = [
    "Wash my car",
    "Fuel my car",
    "Gauge my tyres",
    "Tow my car",
  ];

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

  const carServiceArray = data?.filter((item) =>
    targetNames.some(
      (targetName) => targetName.toLowerCase() === item?.name?.toLowerCase()
    )
  );

  const start = formatDate(startValue);

  const [showVehicle, setShowVehicle] = useState(false);
  const { data: models } = useGetModel();
  const { data: vehicles, refetch: refetchVehicle } = useGetVehicles();
  const { data: makes } = useGetMake();
  const [showFunds, setShowFunds] = useState(false);
  const { data: basicRate } = useGetBookingRate(
    values?.serviceId?.value,
    "BASIC"
  );
  const { data: premiumRate } = useGetBookingRate(
    values?.serviceId?.value,
    "PREMIUM"
  );

  const basicArray = basicRate?.filter((item) => item?.flatRate === 0);
  const premiumArray = premiumRate?.filter((item) => item?.flatRate === 0);

  const rateArray = basicArray?.concat(premiumArray);

  const addressOptions = filteredLocations?.map((item) => ({
    value: item?.id,
    label: item?.name,
  }));

  const servicesOptions = carServiceArray?.map((item) => ({
    value: item?.id,
    label: item?.name,
  }));

  let ratesOptions = rateArray?.map((item) => ({
    value: item?.id,
    label: `${item?.name} - ₦ ${item?.amount?.toLocaleString(undefined, {
      maximumFractionDigits: 2,
    })}`,
    type: item?.carServiceType,
    amount: item?.amount,
  }));

  const timeOptions = BookingSlots?.map((time) => ({
    value: time,
    label: time,
  }));

  const vehicleOptions = vehicles?.data?.map((car) => ({
    value: `${car?.id}`,
    label: `${car?.model?.make?.name} - ${car?.model?.name} - ${car?.licensePlate}`,
    main: `${car?.model?.make?.name} - ${car?.model?.name}`,
  }));
  const navigate = useNavigate();
  const { successToast, errorToast } = useCustomToast();
  const handleSelectChange = (selectedOption, { name }) => {
    setValues({
      ...values,
      [name]: selectedOption,
    });
  };

  const { mutate: bookMutate, isLoading: isBooking } = useCreateServiceBookings(
    {
      onSuccess: () => {
        startChange("");
        refetch();
        refetchBooking();
        // setValues({
        //   serviceId: "",
        //   address: "",
        //   appointmentTime: "",
        //   img: "",
        //   desc: "",
        //   billingRate: "",
        //   cardId: "",
        //   paymentMethod: "",
        //   vehicle: "",
        // });
        // setStep(1);
        if (values.paymentMethod !== "3") {
          setShowPoint(true);
        } else if (values.paymentMethod === "3") {
          navigate("/customer/history/user");
        }
        successToast("Payment Successful");
      },
      onError: (err) => {
        errorToast(
          err?.response?.data?.message || err?.message || "An Error occurred"
        );
      },
    }
  );

  const selectedIndex = BookingSlots.findIndex(
    (time) => time === values?.appointmentTime?.value
  );

  const handleBook = () => {
    Number(values?.paymentMethod) === 0
      ? bookMutate({
          address: values?.address?.label,
          location: values?.address?.value,
          appointmentDate: start,
          appointmentDateType: 0,
          appointmentSlot: selectedIndex,
          billingRate: values?.billingRate?.value,
          billingType: 0,
          bookingType: "ONETIME",
          paymentMethod: Number(values?.paymentMethod),
          cardId: Number(values?.cardId),
          service: values?.serviceId?.value,
          serviceType: values?.billingRate?.type,
          vehicle: values?.vehicle?.value,
        })
      : bookMutate({
          address: values?.address?.label,
          location: values?.address?.value,
          appointmentDate: start,
          appointmentDateType: 0,
          appointmentSlot: selectedIndex,
          billingRate: values?.billingRate?.value,
          billingType: 0,
          bookingType: "ONETIME",
          paymentMethod: Number(values?.paymentMethod),
          service: values?.serviceId?.value,
          serviceType: values?.billingRate?.type,
          vehicle: values?.vehicle?.value,
        });
  };
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "100%",
      minHeight: "44px",
      color: "#646668",
      fontSize: "16px",
      cursor: "pointer",
      borderRadius: "4px",
      border: state.hasValue ? "none" : "1px solid #D4D6D8",
      background: state.hasValue ? "#f4f6f8" : "unset",
    }),
    menu: (provided) => ({
      ...provided,
      fontSize: "15px",
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

  useEffect(() => {
    if (step === 2) {
      const selectedServiceOption = servicesOptions?.find(
        (option) => option?.value === values?.serviceId
      );
      setValues({
        ...values,
        serviceId: selectedServiceOption,
      });
    }
  }, [step]);

  return (
    <Box minH="75vh">
      <PointsModal
        isOpen={showPoint}
        onClose={() => setShowPoint(false)}
        amount={values?.billingRate?.amount}
      />
      <Flex justifyContent="center" align="center" w="full" flexDir="column">
        <Flex
          bg="#fff"
          borderRadius="12px"
          py="40px"
          px="32px"
          justifyContent="center"
          w={{ md: "30rem", base: "100%", "3xl": "35rem" }}
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
                  serviceId: "",
                  address: "",
                  appointmentTime: "",
                  img: "",
                  desc: "",

                  billingRate: "",

                  cardId: "",
                  paymentMethod: "",

                  vehicle: "",
                });
                startChange("");
              }}
              cursor="pointer"
              w="fit-content"
            >
              <HiOutlineArrowNarrowLeft size="24px" color="#242628" />
              <Text lineHeight="100%" color="#242628" fontWeight={500}>
                Back
              </Text>
            </Flex>
          )}
          <Text
            fontSize="20px"
            color="#242628"
            textAlign={step === 1 ? "start" : "center"}
            mb={step === 1 || step === 3 ? "32px" : "unset"}
            lineHeight="100%"
            fontWeight={500}
          >
            Car Services
          </Text>

          {step === 1 && (
            <Box>
              <Grid
                gap="16px"
                rowGap="32px"
                templateColumns={[
                  "repeat(1,1fr)",
                  "repeat(1,1fr)",
                  "repeat(2,1fr)",
                  "repeat(2,1fr)",
                ]}
              >
                {carServiceArray?.length
                  ? carServiceArray?.map((dat, i) => (
                      <GridItem key={i}>
                        <Flex
                          align="center"
                          gap="16px"
                          bg="#F4F6F8"
                          borderRadius="8px"
                          py="24px"
                          cursor="pointer"
                          onClick={() => {
                            setValues({
                              ...values,
                              serviceId: dat?.id,
                              img: carServiceIcon[i],
                              desc: carServiceDesc[i],
                            });
                            setStep(step + 1);
                          }}
                          px="16px"
                        >
                          <Image src={carServiceIcon[i]} />

                          <Text
                            fontWeight={500}
                            color="#646668"
                            lineHeight="100%"
                          >
                            {dat?.name}
                          </Text>
                        </Flex>
                      </GridItem>
                    ))
                  : ""}
              </Grid>
            </Box>
          )}

          {step === 2 && (
            <Box>
              <Box w="full" my="32px">
                <Select
                  styles={customStyles}
                  placeholder="Car Service"
                  options={servicesOptions}
                  value={values?.serviceId}
                  defaultValue={values?.serviceId}
                  onChange={(selectedOption) =>
                    handleSelectChange(selectedOption, {
                      name: "serviceId",
                    })
                  }
                  components={{
                    IndicatorSeparator: () => (
                      <div style={{ display: "none" }}></div>
                    ),
                  }}
                />
              </Box>

              <Box w="full">
                <Text mb="8px" fontSize="12px" fontWeight={500} color="#444648">
                  Select Service Option
                </Text>
                <Select
                  styles={customStyles}
                  placeholder="Car Service"
                  options={ratesOptions}
                  value={values?.billingRate}
                  defaultValue={values?.billingRate}
                  onChange={(selectedOption) =>
                    handleSelectChange(selectedOption, {
                      name: "billingRate",
                    })
                  }
                  components={{
                    IndicatorSeparator: () => (
                      <div style={{ display: "none" }}></div>
                    ),
                  }}
                />
              </Box>

              <Box w="full" my="32px">
                <Text mb="8px" fontSize="12px" fontWeight={500} color="#444648">
                  Enter Address
                </Text>
                <Select
                  styles={customStyles}
                  placeholder="Enter Address"
                  options={addressOptions}
                  value={values?.address}
                  onChange={(selectedOption) =>
                    handleSelectChange(selectedOption, {
                      name: "address",
                    })
                  }
                  components={{
                    IndicatorSeparator: () => (
                      <div style={{ display: "none" }}></div>
                    ),
                  }}
                />
              </Box>

              <Flex
                flexDir={{ base: "column", md: "row" }}
                align={{ base: "flex-start", md: "center" }}
                gap="16px"
              >
                <Box w="full">
                  <Text
                    mb="8px"
                    fontSize="12px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Select Day
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
                    display={{ base: "none", md: "flex" }}
                    pos="relative"
                    w="full"
                    className="box"
                  >
                    <Flex
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

                      <Image src="/assets/cal.svg" w="20px" h="20px" />
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
                    fontSize="12px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Select Time
                  </Text>

                  <Select
                    styles={customStyles}
                    placeholder="Select Time"
                    options={timeOptions}
                    value={values?.appointmentTime}
                    defaultValue={values?.appointmentTime}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, {
                        name: "appointmentTime",
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

              <Box w="full" mt="32px">
                <Text mb="8px" fontSize="12px" fontWeight={500} color="#444648">
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
                  fontSize="14px"
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
            </Box>
          )}

          {step === 3 && (
            <Box border="1px solid #D4D6D8" borderRadius="8px" p="24px">
              <Flex flexDir="column" justifyContent="center" align="center">
                <Image
                  w="40px"
                  h="40px"
                  src={
                    values?.img ||
                    carServiceIcon.find((item) =>
                      item
                        ?.toLowerCase()
                        .includes(
                          values?.serviceId?.label?.toLowerCase().split(" ")[0]
                        )
                    )
                  }
                />
                <Text
                  mt="16px"
                  mb="32px"
                  color="#242628"
                  fontWeight={500}
                  lineHeight="100%"
                >
                  Schedule{" "}
                  {values?.desc ||
                    carServiceDesc.find((item) =>
                      item
                        ?.toLowerCase()
                        .includes(
                          values?.serviceId?.label?.toLowerCase().split(" ")[0]
                        )
                    )}
                </Text>
              </Flex>

              <Box>
                <Flex align="center" justifyContent="space-between" w="full">
                  <Text
                    color="#242628"
                    w="full"
                    lineHeight="100%"
                    fontWeight={500}
                  >
                    Service Type
                  </Text>
                  <Text
                    color="#242628"
                    textAlign="end"
                    w="full"
                    lineHeight="100%"
                    fontWeight={500}
                  >
                    {values?.billingRate?.type}
                  </Text>
                </Flex>

                <Flex
                  my="24px"
                  align="center"
                  justifyContent="space-between"
                  w="full"
                >
                  <Text
                    color="#242628"
                    w="full"
                    lineHeight="100%"
                    fontWeight={500}
                  >
                    Day
                  </Text>
                  <Text
                    color="#242628"
                    textAlign="end"
                    w="full"
                    lineHeight="100%"
                    fontWeight={500}
                  >
                    {start}
                  </Text>
                </Flex>

                <Flex align="center" justifyContent="space-between" w="full">
                  <Text
                    color="#242628"
                    w="full"
                    lineHeight="100%"
                    fontWeight={500}
                  >
                    Time
                  </Text>
                  <Text
                    color="#242628"
                    textAlign="end"
                    w="full"
                    lineHeight="100%"
                    fontWeight={500}
                  >
                    {values?.appointmentTime?.value}
                  </Text>
                </Flex>

                <Flex
                  mt="24px"
                  align="center"
                  justifyContent="space-between"
                  w="full"
                >
                  <Text
                    color="#242628"
                    w="full"
                    lineHeight="100%"
                    fontWeight={500}
                  >
                    Selected Vehicle
                  </Text>
                  <Text
                    color="#242628"
                    textAlign="end"
                    w="full"
                    lineHeight="100%"
                    fontWeight={500}
                  >
                    {values?.vehicle?.main}
                  </Text>
                </Flex>

                <Flex
                  mt="24px"
                  align="center"
                  justifyContent="space-between"
                  w="full"
                >
                  <Text
                    color="#242628"
                    w="full"
                    lineHeight="100%"
                    fontWeight={500}
                  >
                    Amount
                  </Text>
                  <Text
                    color="#242628"
                    textAlign="end"
                    w="full"
                    lineHeight="100%"
                    fontWeight={500}
                  >
                    {values?.paymentMethod === "3"
                      ? `${Math.ceil(values?.billingRate?.amount / 100)} Points`
                      : `₦ 
                  ${
                    values?.billingRate?.amount?.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    }) || "0.00"
                  }`}
                  </Text>
                </Flex>
              </Box>

              <Box mt="32px" mb="16px">
                <Text
                  color="#444648"
                  fontSize="12px"
                  lineHeight="100%"
                  mb="8px"
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
                      <Text> Pay with Wallet</Text>
                    </Radio>
                    <Radio size="sm" value={"0"}>
                      <Text>Pay with Card</Text>
                    </Radio>
                    <Radio size="sm" value={"3"}>
                      <Text>Pay with Points</Text>
                    </Radio>
                    <Radio size="sm" value={"2"}>
                      <Text>Pay with Transfer</Text>
                    </Radio>
                  </RadioGroup>
                </Flex>
              </Box>

              {values?.paymentMethod === "1" && (
                <Box border="1px solid #D4D6D8" borderRadius="4px" p="16px">
                  <Flex align="center" w="full" justifyContent="space-between">
                    <Box>
                      <Text
                        color="#444648"
                        fontSize="12px"
                        lineHeight="100%"
                        mb="8px"
                      >
                        Wallet
                      </Text>
                      <Text color="#646668" lineHeight="100%">
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
                                fontSize="12px"
                                lineHeight="100%"
                                mb="8px"
                              >
                                Card Details
                              </Text>
                              <Text
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
                    fontSize="14px"
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
                  fontSize="14px"
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

              {values.paymentMethod === "3" && (
                <Box mt="8px">
                  <Box border="1px solid #0B841D" borderRadius="4px" p="16px">
                    <Flex
                      align="center"
                      w="full"
                      justifyContent="space-between"
                    >
                      <Box>
                        <Text
                          color="#444648"
                          fontSize="12px"
                          lineHeight="100%"
                          mb="8px"
                        >
                          Points
                        </Text>
                        <Text color="#646668" lineHeight="100%">
                          <span style={{ fontWeight: 500 }}> Balance: </span>
                          {userData?.wallet?.points || "0"}
                        </Text>
                      </Box>

                      <Box>
                        <BsCheckCircle color="#0B841D" />
                      </Box>
                    </Flex>
                  </Box>
                </Box>
              )}
            </Box>
          )}

          {step !== 1 && (
            <Button
              onClick={() => (step === 2 ? setStep(step + 1) : handleBook())}
              mt="32px"
              isLoading={isBooking}
              isDisabled={
                step === 3
                  ? values?.paymentMethod === "0"
                    ? !values?.cardId
                    : !values?.paymentMethod || values?.paymentMethod === "2"
                  : step === 2
                  ? !values?.address ||
                    !values?.appointmentTime ||
                    !values?.billingRate ||
                    !values?.serviceId ||
                    !values?.vehicle
                  : ""
              }
              py="17px"
              w="full"
            >
              {step === 2 ? "Proceed" : "Book Car Service"}
            </Button>
          )}
        </Flex>
      </Flex>

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

export default CarServices;

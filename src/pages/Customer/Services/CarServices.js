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
import { useGetServices } from "../../../services/customer/query/locations";
import {
  BookingSlots,
  carServiceDesc,
  carServiceIcon,
} from "../../../components/common/constants";
import { useGetVehicles } from "../../../services/customer/query/vehicles";
import Select from "react-select";
import { Calendar } from "react-calendar";
import { formatDate } from "../../../utils/helpers";
import { IoIosArrowDown } from "react-icons/io";
import CustomInput from "../../../components/common/CustomInput";
import { BsCheckCircle } from "react-icons/bs";
import { useGetUser } from "../../../services/customer/query/user";
import {
  useGetBookingRate,
  useCreateServiceBookings,
} from "../../../services/customer/query/services";
import { useGetCards } from "../../../services/customer/query/payment";
import useCustomToast from "../../../utils/notifications";
import { useNavigate } from "react-router-dom";
import FundWalletDrawer from "../../../components/modals/FundWalletDrawer";
import { usePaystackPayment } from "react-paystack";

const CarServices = () => {
  const [step, setStep] = useState(1);

  const { data } = useGetServices();
  const { data: cards, refetch: refetchCards } = useGetCards();
  const { data: userData, refetch } = useGetUser();
  const [values, setValues] = useState({
    serviceId: "",
    address: "",
    appointmentTime: "",
    img: "",
    desc: "",
    appointmentDateType: "",
    appointmentSlot: "",
    billingRate: "",
    billingType: "",
    bookingType: "",
    cardId: "",
    paymentMethod: "",
    service: "",
    vehicle: "",
  });

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
    publicKey: process.env.PAYSTACK_KEY,
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

  const [startDate, setStartDate] = useState(false);
  const [startValue, startChange] = useState("");

  const start = formatDate(startValue);

  const { data: vehicles } = useGetVehicles();

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
      onSuccess: (res) => {
        startChange("");
        setValues({
          serviceId: "",
          address: "",
          appointmentTime: "",
          img: "",
          desc: "",
          appointmentDateType: "",
          appointmentSlot: "",
          billingRate: "",
          billingType: "",
          bookingType: "",
          cardId: "",
          paymentMethod: "",
          service: "",
          vehicle: "",
        });
        setStep(1);
        navigate("/customer/services");
        successToast(res?.message);
      },
      onError: (err) => {
        errorToast(
          err?.response?.data?.message || err?.message || "An Error occured"
        );
      },
    }
  );

  const selectedIndex = BookingSlots.findIndex(
    (time) => time === values.appointmentTime?.value
  );

  const handleBook = () => {
    Number(values?.paymentMethod) === 0
      ? bookMutate({
          address: values?.address,
          appointmentDate: start,
          appointmentDateType: 0,
          appointmentSlot: selectedIndex,
          billingRate: values?.billingRate?.value,
          billingType: Number(values?.billingType),
          bookingType: "ONETIME",
          paymentMethod: Number(values?.paymentMethod),
          cardId: Number(values?.cardId),
          service: values?.serviceId?.value,
          serviceType: values?.billingRate?.type,
          vehicle: values?.vehicle?.value,
        })
      : bookMutate({
          address: values?.address,
          appointmentDate: start,
          appointmentDateType: 0,
          appointmentSlot: selectedIndex,
          billingRate: values?.billingRate?.value,
          billingType: Number(values?.billingType),
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
      <Flex justifyContent="center" align="center" w="full" flexDir="column">
        <Flex
          bg="#fff"
          borderRadius="12px"
          py="40px"
          px="32px"
          justifyContent="center"
          w="30rem"
          flexDir="column"
        >
          {step !== 1 && (
            <Flex
              align="center"
              gap="8px"
              mb="23px"
              onClick={() => setStep(step - 1)}
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
                            fontSize="14px"
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
                  value={values.serviceId}
                  defaultValue={values.serviceId}
                  onChange={(selectedOption) =>
                    handleSelectChange(selectedOption, {
                      name: "serviceId",
                    })
                  }
                />
              </Box>

              <Box w="full">
                <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                  Select Service Option
                </Text>
                <Select
                  styles={customStyles}
                  placeholder="Car Service"
                  options={ratesOptions}
                  value={values.billingRate}
                  defaultValue={values.billingRate}
                  onChange={(selectedOption) =>
                    handleSelectChange(selectedOption, {
                      name: "billingRate",
                    })
                  }
                />
              </Box>

              <Box w="full" my="32px">
                <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                  Enter Address
                </Text>
                <CustomInput
                  auth
                  value={values?.address}
                  holder="Enter Address"
                  onChange={(e) =>
                    setValues({
                      ...values,
                      address: e.target.value,
                    })
                  }
                />
              </Box>

              <Flex align="center" gap="16px">
                <Box w="full">
                  <Text
                    mb="8px"
                    fontSize="10px"
                    fontWeight={500}
                    color="#444648"
                  >
                    Select Day
                  </Text>

                  <Box pos="relative" w="full" className="box">
                    <Flex
                      fontSize="14px"
                      onClick={() => setStartDate((prev) => !prev)}
                      align="center"
                      justifyContent="space-between"
                      w="full"
                      bg={start ? "#F4F6F8" : "tranparent"}
                      color={start ? "#000" : ""}
                      h="44px"
                      cursor="pointer"
                      borderRadius="4px"
                      border="1px solid #D4D6D8"
                      py="12px"
                      px="16px"
                    >
                      <Text>{start ? start : "Select Date"}</Text>

                      <IoIosArrowDown />
                    </Flex>
                    {startDate && (
                      <Box pos="absolute" top="50px" w="200%" zIndex="3">
                        <Calendar
                          onChange={(e) => {
                            startChange(e);
                            setStartDate(false);
                          }}
                          value={startValue}
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
                    Select Time
                  </Text>

                  <Select
                    styles={customStyles}
                    placeholder="Select Time"
                    options={timeOptions}
                    value={values.appointmentTime}
                    defaultValue={values.appointmentTime}
                    onChange={(selectedOption) =>
                      handleSelectChange(selectedOption, {
                        name: "appointmentTime",
                      })
                    }
                  />
                </Box>
              </Flex>

              <Box w="full" mt="32px">
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
                />
              </Box>
            </Box>
          )}

          {step === 3 && (
            <Box border="1px solid #D4D6D8" borderRadius="8px" p="24px">
              <Flex flexDir="column" justifyContent="center" align="center">
                <Image w="40px" h="40px" src={values.img} />
                <Text
                  mt="16px"
                  mb="32px"
                  color="#242628"
                  fontWeight={500}
                  lineHeight="100%"
                >
                  Schedule {values?.desc}
                </Text>
              </Flex>

              <Box>
                <Flex align="center" justifyContent="space-between" w="full">
                  <Text
                    color="#242628"
                    w="full"
                    fontSize="14px"
                    lineHeight="100%"
                    fontWeight={500}
                  >
                    Service Type
                  </Text>
                  <Text
                    color="#242628"
                    textAlign="end"
                    w="full"
                    fontSize="14px"
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
                    fontSize="14px"
                    lineHeight="100%"
                    fontWeight={500}
                  >
                    Day
                  </Text>
                  <Text
                    color="#242628"
                    textAlign="end"
                    w="full"
                    fontSize="14px"
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
                    fontSize="14px"
                    lineHeight="100%"
                    fontWeight={500}
                  >
                    Time
                  </Text>
                  <Text
                    color="#242628"
                    textAlign="end"
                    w="full"
                    fontSize="14px"
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
                    fontSize="14px"
                    lineHeight="100%"
                    fontWeight={500}
                  >
                    Selected Vehicle
                  </Text>
                  <Text
                    color="#242628"
                    textAlign="end"
                    w="full"
                    fontSize="14px"
                    lineHeight="100%"
                    fontWeight={500}
                  >
                    {values?.vehicle?.main}
                  </Text>
                </Flex>
              </Box>

              <Box mt="32px">
                <Text
                  color="#444648"
                  fontSize="10px"
                  lineHeight="100%"
                  mb="8px"
                >
                  Payment Method
                </Text>
                <Flex my="17px" align="center">
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
                    <Radio value={"1"}>
                      <Text fontSize="13px"> Pay via Wallet</Text>
                    </Radio>
                    <Radio value={"0"}>
                      <Text fontSize="13px">Pay via Card</Text>
                    </Radio>
                    <Radio value={"2"}>
                      <Text fontSize="13px">Pay via Points</Text>
                    </Radio>
                  </RadioGroup>
                </Flex>
              </Box>

              {values.paymentMethod === "1" && (
                <Box border="1px solid #D4D6D8" borderRadius="4px" p="16px">
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
                        })}
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
                              ? "1px solid red"
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

                            <Box>
                              <BsCheckCircle color="#0B841D" />
                            </Box>
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

          {step !== 1 && (
            <Button
              onClick={() => (step === 2 ? setStep(step + 1) : handleBook())}
              mt="32px"
              isLoading={isBooking}
              fontSize="14px"
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
    </Box>
  );
};

export default CarServices;

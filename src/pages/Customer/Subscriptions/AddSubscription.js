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
  Switch,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { CarIcon } from "../../../components/common/images";
import {
  useGetLocations,
  useGetPlans,
} from "../../../services/customer/query/locations";
import {
  errorCustomStyles,
  intervals,
} from "../../../components/common/constants";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import Select from "react-select";
import {
  useGetMake,
  useGetModel,
  useGetVehicles,
} from "../../../services/customer/query/vehicles";
import { BsCheckCircle } from "react-icons/bs";
import {
  useCustomerCreateSubscription,
  useGetUser,
  useGetUserSub,
} from "../../../services/customer/query/user";
import useCustomToast from "../../../utils/notifications";
import { useNavigate } from "react-router-dom";
import { useGetCards } from "../../../services/customer/query/payment";
import { usePaystackPayment } from "react-paystack";
import FundWalletDrawer from "../../../components/modals/FundWalletDrawer";
import { AiOutlineEdit } from "react-icons/ai";
import AddVehicleModal from "../../../components/modals/AddVehicleModal";
import PointsModal from "../../../components/modals/PointsModal";

const AddSubscription = () => {
  const { data: plans, isLoading: isPlan } = useGetPlans();
  const [step, setStep] = useState(1);
  const [currentSub, setCurrentSub] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showPoint, setShowPoint] = useState(false);
  const { data: models } = useGetModel();
  const { data: vehicles, refetch: refetchVehicle } = useGetVehicles();
  const { data: makes } = useGetMake();

  const { data: cards, refetch: refetchCards } = useGetCards();
  const { data: userData, refetch } = useGetUser();
  const { data: locations } = useGetLocations();

  const [state, setState] = useState({
    membershipPlan: "",
    subscriptionOptions: [
      {
        planFeature: 0,
        data: [],
      },
    ],
    autoRenewal: false,
    paymentMethod: "",
  });
  const [featureTypes, setFeatureTypes] = useState([]);

  const handleSelectChange = (selectedOption, { name }) => {
    let temp = state?.subscriptionOptions;
    let tempTypeIndex = temp?.findIndex((feature) => feature.type === name);

    if (tempTypeIndex !== -1) {
      const objectsWithSameType = temp.filter(
        (feature) => feature.type === name
      );

      if (name === "vehicle" || name === "location") {
        const newData = Array.isArray(selectedOption)
          ? selectedOption.map((dat) => dat?.value)
          : selectedOption
          ? [selectedOption.value]
          : [];

        objectsWithSameType.forEach((obj) => {
          obj.data = [...new Set(newData)];
        });
      }

      setState({ ...state, subscriptionOptions: [...temp] });
    } else {
      const newEntry = {
        type: name,
        data:
          (name === "vehicle" || name === "location") &&
          (Array.isArray(selectedOption)
            ? selectedOption.map((dat) => dat?.value)
            : selectedOption
            ? [selectedOption.value]
            : []),
      };

      setState({
        ...state,
        subscriptionOptions: [...temp, newEntry],
      });
    }
  };

  const handlePlanSelection = (dat) => {
    const tempFeatureTypes = [];
    const temp = dat?.features?.map((feature) => {
      tempFeatureTypes?.push(
        getFeatureType(feature.featureType, feature.value)
      );

      setFeatureTypes(tempFeatureTypes[0] ? tempFeatureTypes : []);
      return {
        planFeature: feature.id,
        data: [],
        type:
          feature.featureType === 0
            ? "vehicle"
            : feature.featureType === 3
            ? "location"
            : null,
      };
    });

    setState({
      ...state,
      membershipPlan: dat.id,
      subscriptionOptions: temp,
    });

    setCurrentSub(dat);
    setStep(step + 1);
  };
  const getFeatureType = (type, limit) => {
    switch (type) {
      case 0:
        return { vehicle: parseInt(limit) };

      case 3:
        return { location: parseInt(limit) };

      case 6:
        return { users: parseInt(limit) };

      default:
        break;
    }
  };

  useEffect(() => {
    setStep(1);
    setFormSubmitted(false);
    setCurrentSub({});
    setState({
      membershipPlan: "",
      subscriptionOptions: [
        {
          planFeature: 0,
          data: [],
        },
      ],
      autoRenewal: false,
      paymentMethod: "",
    });
  }, []);
  const locationToMap = locations?.filter((item) => item?.isSubApplicable);

  const locationOptions = locationToMap?.map((location) => ({
    value: location?.id,
    label: location?.name,
    id: location?.id,
  }));

  const vehicleOptions = vehicles?.data?.map((car) => ({
    value: car?.id,
    label: `${car?.model?.make?.name} - ${car?.model?.name} - ${car?.licensePlate}`,
    id: car?.id,
  }));

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

  const [showFunds, setShowFunds] = useState(false);

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
  const { refetch: refetchSub } = useGetUserSub(10, 1);
  const { successToast, errorToast } = useCustomToast();
  const navigate = useNavigate();
  const { mutate, isLoading } = useCustomerCreateSubscription({
    onSuccess: (res) => {
      refetch();
      refetchSub();
      if (state.paymentMethod !== "3") {
        setShowPoint(true);
      } else if (state.paymentMethod === "3") {
        navigate("/customer/subscriptions");
      }
      // setState({
      //   membershipPlan: "",
      //   subscriptionOptions: [
      //     {
      //       planFeature: 0,
      //       data: [],
      //     },
      //   ],
      //   autoRenewal: false,
      //   paymentMethod: "",
      // });
      // setCurrentSub({});
      // setStep(1);

      setFormSubmitted(false);
      successToast(res?.message);
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred"
      );
    },
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handlePay = () => {
    const { cardId, autoRenewal, ...rest } = state;
    state?.paymentMethod === "0"
      ? mutate({
          ...rest,
          cardId: cardId,
          autoRenewal: autoRenewal ? 1 : 0,
        })
      : mutate({
          ...rest,
          autoRenewal: autoRenewal ? 1 : 0,
        });
  };

  return (
    <Box minH="75vh">
      <PointsModal
        isOpen={showPoint}
        onClose={() => setShowPoint(false)}
        amount={currentSub?.amount}
      />
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
            lg: step === 2 || !plans?.length ? "30rem" : "unset",
            "3xl": step === 2 || !plans?.length ? "35rem" : "unset",
          }}
          flexDir="column"
        >
          {step !== 1 && (
            <Flex
              align="center"
              gap="8px"
              mb="23px"
              onClick={() => {
                setStep(step - 1);
                setState({
                  membershipPlan: "",
                  subscriptionOptions: [
                    {
                      planFeature: 0,
                      data: [],
                    },
                  ],
                  autoRenewal: false,
                  paymentMethod: "",
                });
                setCurrentSub({});
                setStep(1);
                setFormSubmitted(false);
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
            mb="32px"
            lineHeight="100%"
            fontWeight={500}
          >
            Subscribe
          </Text>

          {step === 1 && (
            <>
              <Skeleton
                display={isPlan ? "flex" : "none"}
                isLoaded={!isPlan}
                h="8rem"
              ></Skeleton>
              <Grid
                gap="24px"
                templateColumns={
                  plans?.length === 1
                    ? "repeat(1,1fr)"
                    : [
                        "repeat(1,1fr)",
                        "repeat(1,1fr)",
                        "repeat(1,1fr)",
                        "repeat(2,1fr)",
                      ]
                }
              >
                {plans?.length
                  ? plans?.map((dat, i) => (
                      <GridItem key={i}>
                        <Box
                          key={i}
                          mb={step === 1 ? "32px" : "24px"}
                          p="12px"
                          borderRadius="8px"
                          border="1px solid #D4D6D8"
                          minW={{ base: "full", md: "26rem" }}
                        >
                          <Flex
                            align="flex-start"
                            justifyContent="space-between"
                            w="full"
                          >
                            <Box w="full">
                              <Text
                                fontSize="14px"
                                color="#242628"
                                lineHeight="100%"
                              >
                                Subscription Name
                              </Text>
                              <Text
                                mt="8px"
                                color="#848688"
                                fontWeight={500}
                                lineHeight="100%"
                              >
                                {dat?.name}
                              </Text>
                            </Box>

                            <Box w="90%">
                              <Text
                                fontSize="14px"
                                color="#242628"
                                lineHeight="100%"
                              >
                                Duration
                              </Text>
                              <Text
                                mt="8px"
                                color="#848688"
                                fontWeight={500}
                                lineHeight="100%"
                              >
                                {Object.values(intervals[dat?.interval])[0]}
                              </Text>
                            </Box>

                            <Flex justifyContent="flex-end" w="30%">
                              <Text
                                fontSize="14px"
                                color="#242628"
                                lineHeight="100%"
                                textDecor="underline"
                              >
                                Details
                              </Text>
                            </Flex>
                          </Flex>

                          <Flex
                            mt="30px"
                            align="center"
                            justifyContent="space-between"
                            w="full"
                          >
                            <Box w="full">
                              <Text
                                fontSize="14px"
                                color="#242628"
                                lineHeight="100%"
                              >
                                Price
                              </Text>
                              <Text
                                mt="8px"
                                color="#848688"
                                fontWeight={500}
                                lineHeight="100%"
                              >
                                ₦{" "}
                                {dat?.amount?.toLocaleString(undefined, {
                                  maximumFractionDigits: 2,
                                }) || "0.00"}
                              </Text>
                            </Box>

                            <Box w="70%">
                              <Text
                                fontSize="14px"
                                color="#242628"
                                lineHeight="100%"
                              >
                                Features
                              </Text>
                              <Flex mt="8px" align="center" gap="16px">
                                {dat?.features?.slice(0, 2)?.map((item, i) => (
                                  <Flex align="center" gap="4px">
                                    {i === 0 ? (
                                      <Image src="/assets/location.svg" />
                                    ) : (
                                      <CarIcon fill="#EE383A" />
                                    )}
                                    <Text
                                      color="#838688"
                                      lineHeight="100%"
                                      fontWeight={500}
                                    >
                                      {item?.value}
                                    </Text>
                                  </Flex>
                                ))}
                              </Flex>
                            </Box>

                            <Flex justifyContent="flex-end" w="30%">
                              <Button
                                onClick={() =>
                                  step === 1 ? handlePlanSelection(dat) : ""
                                }
                                w="full"
                                py="17px"
                                px="26px"
                              >
                                Select
                              </Button>
                            </Flex>
                          </Flex>
                        </Box>
                      </GridItem>
                    ))
                  : ""}
              </Grid>
            </>
          )}

          {step === 2 && (
            <>
              <Box
                mb="24px"
                p="12px"
                borderRadius="8px"
                minW={{ base: "full", md: "26rem" }}
                border="1px solid #D4D6D8"
              >
                <Flex
                  align="flex-start"
                  justifyContent="space-between"
                  w="full"
                >
                  <Box w="full">
                    <Text fontSize="14px" color="#242628" lineHeight="100%">
                      Subscription Name
                    </Text>
                    <Text
                      mt="8px"
                      color="#848688"
                      fontWeight={500}
                      lineHeight="100%"
                    >
                      {currentSub?.name}
                    </Text>
                  </Box>

                  <Box w="90%">
                    <Text fontSize="14px" color="#242628" lineHeight="100%">
                      Duration
                    </Text>
                    <Text
                      mt="8px"
                      color="#848688"
                      fontWeight={500}
                      lineHeight="100%"
                    >
                      {Object.values(intervals[currentSub?.interval])[0]}
                    </Text>
                  </Box>

                  <Flex justifyContent="flex-end" w="30%">
                    <Text
                      fontSize="14px"
                      color="#242628"
                      lineHeight="100%"
                      textDecor="underline"
                    >
                      Details
                    </Text>
                  </Flex>
                </Flex>

                <Flex
                  mt="30px"
                  align="center"
                  justifyContent="space-between"
                  w="full"
                >
                  <Box w="full">
                    <Text fontSize="14px" color="#242628" lineHeight="100%">
                      Price
                    </Text>
                    <Text
                      mt="8px"
                      color="#848688"
                      fontWeight={500}
                      lineHeight="100%"
                    >
                      ₦{" "}
                      {currentSub?.amount?.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      }) || "0.00"}
                    </Text>
                  </Box>

                  <Box w="70%">
                    <Text fontSize="14px" color="#242628" lineHeight="100%">
                      Features
                    </Text>
                    <Flex mt="8px" align="center" gap="16px">
                      {currentSub?.features?.slice(0, 2)?.map((item, i) => (
                        <Flex align="center" gap="4px">
                          {i === 0 ? (
                            <Image src="/assets/location.svg" />
                          ) : (
                            <CarIcon fill="#EE383A" />
                          )}
                          <Text
                            color="#838688"
                            lineHeight="100%"
                            fontWeight={500}
                          >
                            {item?.value}
                          </Text>
                        </Flex>
                      ))}
                    </Flex>
                  </Box>

                  <Flex justifyContent="flex-end" w="30%">
                    <Button
                      onClick={() => {
                        setState({
                          membershipPlan: "",
                          subscriptionOptions: [
                            {
                              planFeature: 0,
                              data: [],
                            },
                          ],
                          autoRenewal: false,
                          paymentMethod: "",
                        });
                        setCurrentSub({});
                        setStep(1);
                        setFormSubmitted(false);
                      }}
                      w="full"
                      py="6px"
                      px="16px"
                      display="flex"
                      align="center"
                      gap="8px"
                    >
                      <Text>Change</Text>
                      <AiOutlineEdit size="15px" />
                    </Button>
                  </Flex>
                </Flex>
              </Box>
              <form
                onSubmit={(e) => {
                  (featureTypes?.length &&
                    !state?.subscriptionOptions[0]?.data?.length) ||
                  (state?.paymentMethod === "0" && !state?.cardId) ||
                  !state?.paymentMethod
                    ? setFormSubmitted(true)
                    : (setFormSubmitted(true), handlePay(e));
                  e.preventDefault();
                }}
              >
                {featureTypes?.find((type) => type["vehicle"]) && (
                  <>
                    <Box
                      w="full"
                      mb={vehicles?.data?.length === 0 ? "" : "24px"}
                    >
                      <Text
                        mb="8px"
                        fontSize="14px"
                        fontWeight={500}
                        color="#444648"
                      >
                        {featureTypes?.find((type) => type["vehicle"])
                          ?.vehicle > 1
                          ? `Select up to ${
                              featureTypes?.find((type) => type["vehicle"])
                                ?.vehicle
                            } vehicles`
                          : "Select a vehicle"}
                      </Text>

                      <Select
                        styles={
                          featureTypes?.length &&
                          featureTypes?.find((type) => type["vehicle"]) &&
                          formSubmitted &&
                          !state?.subscriptionOptions?.find(
                            (item) => item?.type === "vehicle"
                          )?.data?.length
                            ? errorCustomStyles
                            : customStyles
                        }
                        placeholder="Select Vehicle"
                        options={vehicleOptions}
                        isOptionDisabled={() =>
                          state.subscriptionOptions?.find(
                            (item) => item?.type === "vehicle"
                          )?.data?.length ===
                          featureTypes?.find((type) => type["vehicle"])?.vehicle
                            ? true
                            : false
                        }
                        isMulti={
                          featureTypes?.find((type) => type["vehicle"])
                            ?.vehicle > 1
                        }
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
                      {formSubmitted &&
                        featureTypes?.find((type) => type["vehicle"]) &&
                        !state?.subscriptionOptions?.find(
                          (item) => item?.type === "vehicle"
                        )?.data?.length && (
                          <Text mt="5px" fontSize="14px" color="tomato">
                            Select at least one vehicle
                          </Text>
                        )}
                    </Box>
                    {vehicles?.data?.length === 0 ? (
                      <Flex
                        mt="8px"
                        color="red"
                        mb="16px"
                        fontWeight={500}
                        lineHeight="100%"
                        justifyContent="flex-end"
                        w="full"
                      >
                        <Text
                          cursor="pointer"
                          onClick={onOpen}
                          textDecor="underline"
                        >
                          Add a Vehicle
                        </Text>
                      </Flex>
                    ) : (
                      ""
                    )}
                  </>
                )}

                {featureTypes?.find((type) => type["location"]) && (
                  <Box w="full" mb="24px">
                    <Text
                      mb="8px"
                      fontSize="14px"
                      fontWeight={500}
                      color="#444648"
                    >
                      {featureTypes?.find((type) => type["location"])
                        ?.location > 1
                        ? `Select up to ${
                            featureTypes?.find((type) => type["location"])
                              ?.location
                          } locations`
                        : " Select a location"}
                    </Text>

                    <Select
                      isOptionDisabled={() =>
                        state.subscriptionOptions?.find(
                          (item) => item?.type === "location"
                        )?.data?.length ===
                        featureTypes?.find((type) => type["location"])?.location
                          ? true
                          : false
                      }
                      styles={
                        featureTypes?.length &&
                        featureTypes?.find((type) => type["location"]) &&
                        formSubmitted &&
                        !state?.subscriptionOptions?.find(
                          (item) => item?.type === "location"
                        )?.data?.length
                          ? errorCustomStyles
                          : customStyles
                      }
                      placeholder="Select Location"
                      options={locationOptions}
                      isMulti={
                        featureTypes?.find((type) => type["location"])
                          ?.location > 1
                      }
                      onChange={(selectedOption) =>
                        handleSelectChange(selectedOption, {
                          name: "location",
                        })
                      }
                      components={{
                        IndicatorSeparator: () => (
                          <div style={{ display: "none" }}></div>
                        ),
                      }}
                    />
                    {formSubmitted &&
                      featureTypes?.find((type) => type["location"]) &&
                      !state?.subscriptionOptions?.find(
                        (item) => item?.type === "location"
                      )?.data?.length && (
                        <Text mt="5px" fontSize="14px" color="tomato">
                          Select at least one location
                        </Text>
                      )}
                  </Box>
                )}

                <Flex
                  align="center"
                  justifyContent="flex-end"
                  gap="24px"
                  mb="24px"
                >
                  <Text fontSize="14px" fontWeight={500} color="#444648">
                    Autorenewal Subscription
                  </Text>
                  <Switch
                    onChange={() =>
                      setState({
                        ...state,
                        autoRenewal: !state?.autoRenewal,
                      })
                    }
                    size="sm"
                  />
                </Flex>

                <Box mb="24px">
                  <Text
                    mb="8px"
                    fontSize={
                      formSubmitted && !state?.paymentMethod ? "13px" : "10px"
                    }
                    fontWeight={500}
                    color={
                      formSubmitted && !state?.paymentMethod
                        ? "tomato"
                        : "#444648"
                    }
                  >
                    {formSubmitted && !state?.paymentMethod
                      ? "Select a payment method"
                      : "Payment Method"}
                  </Text>
                  <Flex mt="17px" align="center">
                    <RadioGroup
                      value={state?.paymentMethod}
                      onChange={(e) => {
                        setState({
                          ...state,
                          paymentMethod: e,
                        });
                        setFormSubmitted(false);
                      }}
                      align="center"
                      display="flex"
                      gap="24px"
                    >
                      <Radio size="sm" value={"1"}>
                        <Text> Pay via Wallet</Text>
                      </Radio>
                      <Radio size="sm" value={"0"}>
                        <Text>Pay via card</Text>
                      </Radio>
                    </RadioGroup>
                  </Flex>
                </Box>

                {state?.paymentMethod === "1" && (
                  <Box border="1px solid #D4D6D8" borderRadius="4px" p="16px">
                    <Flex
                      align="center"
                      w="full"
                      justifyContent="space-between"
                    >
                      <Box>
                        <Text
                          color="#444648"
                          fontSize="14px"
                          lineHeight="100%"
                          mb="8px"
                        >
                          Wallet
                        </Text>
                        <Text color="#646668" lineHeight="100%">
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
                )}

                {state?.paymentMethod === "0" && (
                  <Box>
                    {cards?.data?.length ? (
                      cards?.data?.map((dat, i) => (
                        <Box key={i}>
                          <Box
                            mt="16px"
                            cursor="pointer"
                            border={
                              state?.cardId === dat?.id
                                ? "1px solid #0B841D"
                                : formSubmitted &&
                                  state?.paymentMethod === "0" &&
                                  !state?.cardId
                                ? "1px solid red"
                                : "1px solid #D4D6D8"
                            }
                            onClick={() =>
                              setState({
                                ...state,
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
                                  fontSize="14px"
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

                              {state?.cardId === dat?.id && (
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
                    {formSubmitted &&
                      state?.paymentMethod === "0" &&
                      !state?.cardId && (
                        <Text mt="5px" fontSize="14px" color="tomato">
                          Select a card
                        </Text>
                      )}
                    <Flex
                      mt="8px"
                      color="red"
                      mb="16px"
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
                {state?.paymentMethod === "1" && (
                  <Flex
                    mt="8px"
                    color="red"
                    mb="16px"
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

                <Button
                  isLoading={isLoading}
                  type="submit"
                  w="full"
                  py="17px"
                  // isDisabled={
                  //   step === 2
                  //     ? values?.paymentMethod === "0"
                  //       ? !values?.cardId
                  //       : !values?.vehicle ||
                  //         !values?.location ||
                  //         !values?.paymentMethod
                  //     : ""
                  // }
                >
                  Make Payment
                </Button>
              </form>
            </>
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
        isOpen={isOpen}
        onClose={onClose}
      />
    </Box>
  );
};

export default AddSubscription;

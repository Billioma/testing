import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Image,
  Radio,
  RadioGroup,
  Switch,
  Text,
} from "@chakra-ui/react";
import { CarIcon } from "../../../components/common/images";
import {
  useGetLocations,
  useGetPlans,
} from "../../../services/customer/query/locations";
import { intervals } from "../../../components/common/constants";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import Select from "react-select";
import { useGetVehicles } from "../../../services/customer/query/vehicles";
import { BsCheckCircle } from "react-icons/bs";
import {
  useCustomerCreateSubscription,
  useGetUser,
} from "../../../services/customer/query/user";
import useCustomToast from "../../../utils/notifications";
import { useNavigate } from "react-router-dom";
import { useGetCards } from "../../../services/customer/query/payment";
import { usePaystackPayment } from "react-paystack";
import FundWalletDrawer from "../../../components/modals/FundWalletDrawer";

const AddSubscription = () => {
  const { data: plans } = useGetPlans();
  const [step, setStep] = useState(1);
  const [currentSub, setCurrentSub] = useState({});
  const { data: vehicles } = useGetVehicles();

  const { data: cards, refetch: refetchCards } = useGetCards();
  const { data: userData, refetch } = useGetUser();
  const { data: locations } = useGetLocations();

  const [values, setValues] = useState({
    vehicle: "",
    location: "",
    autoRenew: false,
    cardId: "",
    paymentMethod: "",
  });

  useEffect(() => {
    setStep(1);
    setCurrentSub({});
    setValues({
      vehicle: "",
      location: "",
      autoRenew: false,
      paymentMethod: "",
    });
  }, []);

  const move = (dat) => {
    setCurrentSub(dat);
    setStep(step + 1);
  };

  const locationOptions = locations?.map((location) => ({
    value: location?.name,
    label: location?.name,
    id: location?.id,
  }));

  const vehicleOptions = vehicles?.data?.map((car) => ({
    value: `${car?.model?.make?.name} - ${car?.model?.name} - ${car?.licensePlate}`,
    label: `${car?.model?.make?.name} - ${car?.model?.name} - ${car?.licensePlate}`,
    id: car?.id,
  }));

  const handleSelectChange = (selectedOption, { name }) => {
    if (name === "vehicle" && selectedOption.length > 2) {
      return;
    }

    setValues({
      ...values,
      [name]: selectedOption,
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
      border: "1px solid #D4D6D8",
      background: state.selectProps.menuIsOpen
        ? "unset"
        : state.hasValue
        ? "#F4F6F8"
        : "unset",
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
  const { successToast, errorToast } = useCustomToast();
  const navigate = useNavigate();
  const { mutate, isLoading } = useCustomerCreateSubscription({
    onSuccess: (res) => {
      navigate("/customer/subscriptions");
      setValues({
        vehicle: "",
        location: "",
        autoRenew: false,
        paymentMethod: "",
      });
      setCurrentSub({});
      setStep(1);
      successToast(res?.message);
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occured"
      );
    },
  });
  const vehicledIds =
    values?.vehicle && values?.vehicle?.map((item) => Number(item.id));

  const handlePay = () => {
    Number(values?.paymentMethod) === 0
      ? mutate({
          autoRenewal: values.autoRenew ? 1 : 0,
          membershipPlan: currentSub?.id,
          cardId: values?.cardId,
          paymentMethod: Number(values?.paymentMethod),
          subscriptionOptions: [
            {
              data: vehicledIds,
              planFeature: "34",
              type: "vehicle",
            },
            {
              data: [Number(values.location?.id)],
              planFeature: "33",
              type: "location",
            },
            {
              planFeature: "35",
            },
          ],
        })
      : mutate({
          autoRenewal: values.autoRenew ? 1 : 0,
          membershipPlan: currentSub?.id,
          paymentMethod: Number(values?.paymentMethod),
          subscriptionOptions: [
            {
              data: vehicledIds,
              planFeature: "34",
              type: "vehicle",
            },
            {
              data: [Number(values.location?.id)],
              planFeature: "33",
              type: "location",
            },
            {
              planFeature: "35",
            },
          ],
        });
  };

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
          <Text
            fontSize="20px"
            color="#242628"
            lineHeight="100%"
            fontWeight={500}
            mb="32px"
          >
            Subscribe
          </Text>
          {step !== 1 && (
            <Box mb="32px">
              <HiOutlineArrowNarrowLeft
                cursor="pointer"
                onClick={() => setStep(step - 1)}
                size="24px"
                color="#242628"
              />
            </Box>
          )}

          {plans?.length
            ? plans?.map((dat, i) => (
                <Box
                  key={i}
                  mb={step === 1 ? "32px" : "24px"}
                  p="12px"
                  borderRadius="8px"
                  border="1px solid #D4D6D8"
                >
                  <Flex
                    align="flex-start"
                    justifyContent="space-between"
                    w="full"
                  >
                    <Box w="full">
                      <Text fontSize="10px" color="#242628" lineHeight="100%">
                        Subscription Name
                      </Text>
                      <Text
                        mt="8px"
                        color="#848688"
                        fontSize="14px"
                        fontWeight={500}
                        lineHeight="100%"
                      >
                        {dat?.name}
                      </Text>
                    </Box>

                    <Box w="90%">
                      <Text fontSize="10px" color="#242628" lineHeight="100%">
                        Duration
                      </Text>
                      <Text
                        mt="8px"
                        color="#848688"
                        fontSize="14px"
                        fontWeight={500}
                        lineHeight="100%"
                      >
                        {Object.values(intervals[dat?.interval])[0]}
                      </Text>
                    </Box>

                    <Flex justifyContent="flex-end" w="30%">
                      <Text
                        fontSize="10px"
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
                      <Text fontSize="10px" color="#242628" lineHeight="100%">
                        Price
                      </Text>
                      <Text
                        mt="8px"
                        color="#848688"
                        fontSize="14px"
                        fontWeight={500}
                        lineHeight="100%"
                      >
                        ₦{" "}
                        {dat?.amount?.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })}
                      </Text>
                    </Box>

                    <Box w="70%">
                      <Text fontSize="10px" color="#242628" lineHeight="100%">
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
                              fontSize="14px"
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
                        onClick={() => (step === 1 ? move(dat) : "")}
                        w="full"
                        py="17px"
                        px="26px"
                        fontSize="12px"
                      >
                        Select
                      </Button>
                    </Flex>
                  </Flex>
                </Box>
              ))
            : ""}

          {step === 2 && (
            <>
              <Box w="full" mb="24px">
                <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                  Select up to 2 vehicles
                </Text>

                <Select
                  styles={customStyles}
                  placeholder="Select Vehicle"
                  options={vehicleOptions}
                  isMulti
                  value={values.vehicle}
                  defaultValue={values.vehicle}
                  onChange={(selectedOption) =>
                    handleSelectChange(selectedOption, {
                      name: "vehicle",
                    })
                  }
                />
              </Box>

              <Box w="full" mb="24px">
                <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
                  Select a Location
                </Text>

                <Select
                  styles={customStyles}
                  placeholder="Select Location"
                  options={locationOptions}
                  value={values.location}
                  defaultValue={values.location}
                  onChange={(selectedOption) =>
                    handleSelectChange(selectedOption, {
                      name: "location",
                    })
                  }
                />
              </Box>

              <Box mb="24px">
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
                    <Radio value={"1"}>
                      <Text fontSize="14px"> Pay via Wallet</Text>
                    </Radio>
                    <Radio value={"0"}>
                      <Text fontSize="14px">Pay via card</Text>
                    </Radio>
                  </RadioGroup>
                </Flex>
              </Box>

              <Flex align="center" gap="15px" mb="16px">
                <Text fontSize="10px" fontWeight={500} color="#444648">
                  Auto Renew
                </Text>
                <Switch
                  onChange={() =>
                    setValues({
                      ...values,
                      autoRenew: !values.autoRenew,
                    })
                  }
                  size="sm"
                />
              </Flex>

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
                    mb="16px"
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
                onClick={handlePay}
                w="full"
                py="17px"
                fontSize="14px"
              >
                Make Payment
              </Button>
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
    </Box>
  );
};

export default AddSubscription;

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
import CustomInput from "../../../components/common/CustomInput";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { BsCheckCircle } from "react-icons/bs";
import Select from "react-select";
import ConfirmParkModal from "../../../components/modals/ConfirmParkModal";
import { useGetZone } from "../../../services/customer/query/locations";
import useCustomToast from "../../../utils/notifications";
import { useGetVehicles } from "../../../services/customer/query/vehicles";
import { useGetUser } from "../../../services/customer/query/user";
import {
  useCreatePayToPark,
  useGetPayToPark,
} from "../../../services/customer/query/services";
import { useNavigate } from "react-router-dom";
import { useGetCards } from "../../../services/customer/query/payment";
import { usePaystackPayment } from "react-paystack";
import FundWalletDrawer from "../../../components/modals/FundWalletDrawer";

const Park = () => {
  const [zone, setZone] = useState("");
  const [step, setStep] = useState(1);
  const [showFunds, setShowFunds] = useState(false);
  const navigate = useNavigate();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { errorToast, successToast } = useCustomToast();
  const [error, setError] = useState(false);
  const { data: cards, refetch: refetchCards } = useGetCards();
  const { data: userData, refetch } = useGetUser();

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
  const [values, setValues] = useState({
    vehicle: "",
    serviceType: "",
    paymentMethod: "",
    cardId: "",
  });
  const { mutate, isLoading, data } = useGetZone({
    onSuccess: () => {
      setError(false);
      setStep(step + 1);
    },
    onError: (err) => {
      if (err?.response?.data?.message) {
        setError(true);
      } else {
        errorToast(
          err?.response?.data?.message || err?.message || "An Error occurred"
        );
      }
    },
  });

  const { refetch: refetchPark } = useGetPayToPark(10, 1);
  const { mutate: parkMutate, isLoading: isCreating } = useCreatePayToPark({
    onSuccess: () => {
      onClose();
      refetchPark();
      refetch();
      navigate("/customer/services");
      setValues({
        vehicle: "",
        serviceType: "",
        paymentMethod: "",
        cardId: "",
      });
      setZone("");
      setStep(1);
      successToast("Payment Successful");
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred"
      );
    },
  });

  const handleSearchZone = () => {
    mutate(zone);
  };

  const handlePark = () => {
    Number(values?.paymentMethod) === 0
      ? parkMutate({
          amount: values?.serviceType?.amount,
          paymentMethod: Number(values?.paymentMethod),
          cardId: Number(values?.cardId),
          rate: Number(values?.serviceType?.rate),
          service: data?.service?.id,
          vehicle: Number(values?.vehicle?.id),
          zone: data?.id,
        })
      : parkMutate({
          amount: values?.serviceType?.amount,
          paymentMethod: Number(values?.paymentMethod),
          rate: Number(values?.serviceType?.rate),
          service: data?.service?.id,
          vehicle: Number(values?.vehicle?.id),
          zone: data?.id,
        });
  };

  useEffect(() => {
    setStep(1);
    setValues({ vehicle: "", serviceType: "", paymentMethod: "", cardId: "" });
    setZone("");
  }, []);

  const { data: vehicles } = useGetVehicles();
  const serviceOptions = data?.rates?.map((service) => ({
    value: service?.name,
    label: service?.name,
    amount: service?.amount,
    rate: service?.id,
  }));
  const vehicleOptions = vehicles?.data?.map((car) => ({
    value: `${car?.model?.make?.name} - ${car?.model?.name} - ${car?.licensePlate}`,
    label: `${car?.model?.make?.name} - ${car?.model?.name} - ${car?.licensePlate}`,
    make: `${car?.model?.make?.name} - ${car?.model?.name}`,
    id: car?.id,
  }));

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

  const handleSelectChange = (selectedOption, { name }) => {
    setValues({
      ...values,
      [name]: selectedOption,
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
                  vehicle: "",
                  serviceType: "",
                  paymentMethod: "",
                  cardId: "",
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
            mb="32px"
            lineHeight="100%"
            fontWeight={500}
          >
            Park Now
          </Text>

          <CustomInput
            auth
            value={zone}
            mb
            holder="Enter zone number"
            onChange={(e) => {
              setZone(e.target.value);
              setStep(1);
              setError(false);
            }}
          />

          {error && (
            <Text color="red" fontSize="13px" mt="8px">
              Zone '{zone}' was not found! Try search another zone.
            </Text>
          )}

          {(step === 2 || step === 3) && (
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
                  <Flex align="center" justifyContent="space-between" w="full">
                    <Box>
                      <Text
                        fontSize="14px"
                        color="#848688"
                        lineHeight="100%"
                        fontWeight={500}
                      >
                        Zone {zone}
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
                        Capacity
                      </Text>
                      <Text
                        mt="8px"
                        textAlign="center"
                        fontSize="12px"
                        color="#242628"
                        lineHeight="100%"
                      >
                        {data?.capacity}
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
                        {data?.amenities[0]?.name}
                      </Text>
                    </Box>
                    <Box>
                      <Text
                        cursor="pointer"
                        fontSize="10px"
                        textDecor="underline"
                        color="#242628"
                        lineHeight="100%"
                      >
                        Details
                      </Text>
                    </Box>
                  </Flex>
                </Box>
              </Flex>
            </Box>
          )}

          {step === 3 && (
            <Box>
              <Box my="16px">
                <Text
                  color="#444648"
                  fontSize="10px"
                  lineHeight="100%"
                  mb="8px"
                >
                  Service Type
                </Text>
                <Select
                  styles={customStyles}
                  components={{
                    SingleValue: ServiceType,
                    IndicatorSeparator: () => (
                      <div style={{ display: "none" }}></div>
                    ),
                  }}
                  options={serviceOptions}
                  onChange={(selectedOption) =>
                    handleSelectChange(selectedOption, { name: "serviceType" })
                  }
                />
              </Box>

              <Box>
                <Text
                  color="#444648"
                  fontSize="10px"
                  lineHeight="100%"
                  mb="8px"
                >
                  Select Vehicle
                </Text>
                <Select
                  styles={customStyles}
                  placeholder="Select Vehicle"
                  options={vehicleOptions}
                  value={values.vehicle}
                  components={{
                    IndicatorSeparator: () => (
                      <div style={{ display: "none" }}></div>
                    ),
                  }}
                  defaultValue={values.vehicle}
                  onChange={(selectedOption) =>
                    handleSelectChange(selectedOption, {
                      name: "vehicle",
                    })
                  }
                />
              </Box>

              <Box my="16px">
                <Text
                  color="#444648"
                  fontSize="10px"
                  lineHeight="100%"
                  mb="8px"
                >
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

              {values.paymentMethod === "1" && (
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

              {values.paymentMethod === "0" && (
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
            </Box>
          )}

          <Button
            onClick={() =>
              step === 3
                ? onOpen()
                : step === 1
                ? handleSearchZone()
                : setStep(step + 1)
            }
            w="full"
            bg="red"
            isLoading={isLoading}
            mt="32px"
            py="17px"
            isDisabled={
              step === 1
                ? !zone
                : step === 3
                ? values.paymentMethod === "0"
                  ? !values.cardId
                  : ""
                : ""
            }
            fontSize="14px"
          >
            {step === 1 ? "Enter" : "Park Now"}
          </Button>
        </Flex>
      </Flex>
      <ConfirmParkModal
        isLoading={isCreating}
        dataa={data}
        action={handlePark}
        values={values}
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

export default Park;

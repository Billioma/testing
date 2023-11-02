import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Radio,
  RadioGroup,
  Text,
} from "@chakra-ui/react";
import CustomInput from "../common/CustomInput";
import { useGetCards } from "../../services/customer/query/payment";
import { useGetUser } from "../../services/customer/query/user";
import { BsCheckCircle } from "react-icons/bs";
import { usePaystackPayment } from "react-paystack";
import FundWalletDrawer from "./FundWalletDrawer";
import { useCreateTips } from "../../services/customer/query/services";
import useCustomToast from "../../utils/notifications";

const MakeTipModal = ({
  isOpen,
  onClose,
  data,
  refetchTips,
  refetchParking,
}) => {
  const [values, setValues] = useState({
    paymentMethod: "1",
    amount: "",
    cardId: "",
  });

  const { data: cards, refetch: refetchCards } = useGetCards();
  const [showFunds, setShowFunds] = useState(false);

  const { data: userData, refetch } = useGetUser();

  const close = () => {
    setValues({ amount: "", paymentMethod: "1", cardId: "" });
    onClose();
  };

  const { successToast, errorToast } = useCustomToast();
  const { mutate, isLoading } = useCreateTips({
    onSuccess: () => {
      refetchTips();
      refetch();
      refetchParking();
      close();
      successToast("Payment Successful");
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred"
      );
    },
  });

  const handleSubmit = () => {
    Number(values?.paymentMethod) === 0
      ? mutate({
          service: data?.serviceLog?.id,
          amount: values.amount,
          paymentMethod: 0,
          cardId: Number(values?.cardId),
        })
      : mutate({
          service: data?.serviceLog?.id,
          amount: values.amount,
          paymentMethod: 1,
        });
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

  return (
    <Modal isCentered trapFocus={false} isOpen={isOpen} onClose={close}>
      <ModalOverlay backdropFilter="auto" backdropBlur="2px" />
      <ModalContent
        py="40px"
        overflowY="auto"
        borderRadius="8px"
        bg="#fff"
        color="#000"
      >
        <ModalBody>
          <Box>
            <Text
              textAlign="center"
              fontSize="20px"
              color="@242628"
              fontWeight={500}
              lineHeight="100%"
            >
              Add a Tip
            </Text>

            <Box mt="28px">
              <Text
                fontSize="10px"
                color="#444648"
                mb="8px"
                fontWeight={500}
                lineHeight="100%"
              >
                Enter Tip Amount
              </Text>
              <CustomInput
                auth
                value={values.amount}
                onChange={(e) =>
                  setValues({ ...values, amount: e.target.value })
                }
              />
            </Box>

            <Flex
              mt="28px"
              align="center"
              gap="15px"
              fontSize="12px"
              color="#646668"
              fontWeight={700}
              flexWrap={{ base: "wrap", md: "nowrap" }}
              lineHeight="100%"
              justifyContent="space-between"
              w="full"
            >
              <Box w="30%">
                <Flex
                  justifyContent="center"
                  align="center"
                  bg="#f4f6f8"
                  borderRadius="12px"
                  onClick={() => setValues({ ...values, amount: 500 })}
                  py="6px"
                  cursor="pointer"
                  px="20px"
                >
                  ₦ 500
                </Flex>
              </Box>
              <Box w="30%">
                <Flex
                  justifyContent="center"
                  align="center"
                  bg="#f4f6f8"
                  onClick={() => setValues({ ...values, amount: 1000 })}
                  borderRadius="12px"
                  py="6px"
                  px="20px"
                  cursor="pointer"
                >
                  ₦ 1,000
                </Flex>
              </Box>

              <Box w="30%">
                <Flex
                  justifyContent="center"
                  align="center"
                  bg="#f4f6f8"
                  borderRadius="12px"
                  py="6px"
                  px="20px"
                  cursor="pointer"
                  onClick={() => setValues({ ...values, amount: 1500 })}
                >
                  ₦ 1,500
                </Flex>
              </Box>

              <Box w="30%">
                <Flex
                  justifyContent="center"
                  align="center"
                  bg="#f4f6f8"
                  cursor="pointer"
                  borderRadius="12px"
                  py="6px"
                  px="20px"
                  onClick={() => setValues({ ...values, amount: 2000 })}
                >
                  ₦ 2,000
                </Flex>
              </Box>
            </Flex>

            <Box mt="28px">
              <Text
                color="#444648"
                fontWeight={500}
                fontSize="10px"
                lineHeight="100%"
              >
                Payment Method
              </Text>

              <Flex my="16px" align="center">
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
                  justifyContent="space-between"
                  w="full"
                >
                  <Radio size="sm" value={"1"}>
                    <Text
                      fontSize="13px"
                      color={
                        values.paymentMethod === "1" ? "#EE383A" : "#646668"
                      }
                      fontWeight={values.paymentMethod === "1" ? 500 : 400}
                    >
                      {" "}
                      Pay with Wallet
                    </Text>
                  </Radio>
                  <Radio size="sm" value={"0"}>
                    <Text
                      fontSize="13px"
                      color={
                        values.paymentMethod === "0" ? "#EE383A" : "#646668"
                      }
                      fontWeight={values.paymentMethod === "0" ? 500 : 400}
                    >
                      Pay with Card
                    </Text>
                  </Radio>
                </RadioGroup>
              </Flex>

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
                      Fund Wallet
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

            <Flex mt="28px" Falign="center" w="full" gap="20px">
              <Box w="full">
                <Button
                  w="full"
                  border="1px solid #ee7a38"
                  color="#ee7a38"
                  onClick={close}
                  bg="transparent"
                  fontSize="13px"
                  borderRadius="4px"
                  py="17px"
                >
                  Cancel
                </Button>
              </Box>
              <Box w="full">
                <Button
                  w="full"
                  isLoading={isLoading}
                  onClick={handleSubmit}
                  isDisabled={
                    !values.amount || values.paymentMethod === "0"
                      ? !values.cardId
                      : ""
                  }
                  fontSize="13px"
                  borderRadius="4px"
                  py="17px"
                >
                  Tip Attendant
                </Button>
              </Box>
            </Flex>
          </Box>
        </ModalBody>
      </ModalContent>

      <FundWalletDrawer
        refetchUser={refetch}
        isOpen={showFunds}
        cards={cards}
        action={() => {
          initializePayment(onSuccess, onCloses);
        }}
        onClose={() => setShowFunds(false)}
      />
    </Modal>
  );
};

export default MakeTipModal;

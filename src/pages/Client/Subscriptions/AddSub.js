import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Radio,
  RadioGroup,
  Skeleton,
  Switch,
  Text,
} from "@chakra-ui/react";
import { useGetClientusers } from "../../../services/client/query/users";
import useCustomToast from "../../../utils/notifications";
import { useNavigate } from "react-router-dom";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { intervals } from "../../../components/common/constants";
import {
  useCreateClientSub,
  useGetClientSubs,
  useGetMemPlan,
} from "../../../services/client/query/subscription";
import { BsCheckCircle, BsCheckLg, BsPlus } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import {
  useGetClientCards,
  useGetClientDetails,
} from "../../../services/client/query/user";
import { usePaystackPayment } from "react-paystack";
import FundWalletDrawer from "../../../components/modals/FundWalletDrawer";
import ConfirmPaySubModal from "../../../components/modals/ConfirmPaySubModal";

const AddUser = () => {
  const [step, setStep] = useState(1);
  const { errorToast, successToast } = useCustomToast();
  const navigate = useNavigate();
  const { data: clientUsers } = useGetClientusers();
  const { data: plans, isLoading } = useGetMemPlan();
  const { mutate } = useGetClientSubs(10, 1);

  const [currentSub, setCurrentSub] = useState({});
  const [users, setUsers] = useState([]);
  const [values, setValues] = useState({
    paymentMethod: "",
    cardId: "",
    autoRenew: false,
  });

  const [showFunds, setShowFunds] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { data: cards, refetch: refetchCards } = useGetClientCards();
  const { data: userData, refetch } = useGetClientDetails();

  const { mutate: subMutate, isLoading: isCreating } = useCreateClientSub({
    onSuccess: () => {
      refetch();
      setShowConfirm(false);
      mutate({ limit: 10, page: 1 });
      setCurrentSub({});
      setValues({
        paymentMethod: "",
        cardId: "",
        autoRenew: false,
      });
      setUsers([]);
      setStep(1);
      navigate("/client/subscriptions");
      successToast("Payment Successful");
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred"
      );
    },
  });

  const handleCreateSub = () => {
    Number(values?.paymentMethod) === 0
      ? subMutate({
          autoRenewal: values.autoRenew ? 1 : 0,
          paymentMethod: Number(values?.paymentMethod),
          cardId: Number(values?.cardId),
          membershipPlan: currentSub?.id,
          subscriptionOptions: [
            {
              planFeature: currentSub?.features[0]?.id,
              type: "user",
              data: users?.map((data) => data?.id),
            },
          ],
        })
      : subMutate({
          autoRenewal: values.autoRenew ? 1 : 0,
          paymentMethod: Number(values?.paymentMethod),
          membershipPlan: currentSub?.id,
          subscriptionOptions: [
            {
              planFeature: currentSub?.features[0]?.id,
              type: "user",
              data: users?.map((data) => data?.id),
            },
          ],
        });
  };

  const config = {
    reference: new Date().getTime().toString(),
    email: userData?.email,
    amount: 10000,
    publicKey: "pk_test_e964b65cc4a797b13c04243259057608cdc95848",
    metadata: {
      custom_fields: [
        {
          display_name: "Transaction Type",
          variable_name: "transaction_type",
          value: "TOKENIZATION",
        },
        {
          display_name: "Tokenization Type",
          variable_name: "tokenization_type",
          value: "CLIENT",
        },
      ],
    },
    channels: ["card"],
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
  const handleUserClick = (user) => {
    const userIndex = users.findIndex((u) => u?.id === user?.id);

    if (
      currentSub?.features?.length &&
      userIndex === -1 &&
      users?.length < Number(currentSub?.features[0]?.value)
    ) {
      setUsers([...users, user]);
    } else if (userIndex !== -1) {
      const updatedUsers = [...users];
      updatedUsers.splice(userIndex, 1);
      setUsers(updatedUsers);
    }
  };

  const isUserSelected = (user) => {
    return users.some((u) => u?.id === user?.id);
  };

  const move = (dat) => {
    setCurrentSub(dat);
    setStep(step + 1);
  };

  useEffect(() => {
    setStep(1);
    setCurrentSub({});
    setUsers([]);
    setValues({
      paymentMethod: "",
      cardId: "",
      autoRenew: false,
    });
  }, []);

  return (
    <Box minH="75vh">
      {step === 1 && (
        <Flex
          onClick={() => navigate(-1)}
          color="#242628"
          align="center"
          cursor="pointer"
          mb="24px"
          w="fit-content"
          gap="8px"
        >
          <HiOutlineArrowNarrowLeft size="24px" color="#242628" />
          <Text fontSize="14px" fontWeight={500} lineHeight="100%">
            Back
          </Text>
        </Flex>
      )}

      <Flex w="full" justifyContent="center" align="center">
        <Skeleton
          display={isLoading ? "flex" : "none"}
          isLoaded={!isLoading}
          w="50%"
          h="8rem"
        ></Skeleton>
      </Flex>

      {plans?.length && step === 1 && (
        <Grid
          border="1px solid #e4e6e8"
          borderRadius="16px"
          gap="24px"
          py="24px"
          px="28px"
          templateColumns={[
            plans?.length === 1
              ? "repeat(1,1fr)"
              : [
                  "repeat(1,1fr)",
                  "repeat(1,1fr)",
                  "repeat(1,1fr)",
                  "repeat(2,1fr)",
                ],
          ]}
        >
          {plans?.length
            ? plans?.map((dat, i) => (
                <GridItem key={i}>
                  <Box
                    key={i}
                    p="16px"
                    borderRadius="8px"
                    border="1px solid #D4D6D8"
                  >
                    <Flex
                      align="flex-end"
                      flexDir={["column", "row", "row", "row"]}
                      justifyContent="space-between"
                      gap={["20px", "", "", ""]}
                      w="full"
                    >
                      <Flex
                        flexDir={["row", "column", "column", "column"]}
                        gap="16px"
                        w="full"
                      >
                        <Text
                          w="full"
                          color="#848688"
                          fontSize="14px"
                          fontWeight={500}
                          lineHeight="100%"
                        >
                          {dat?.name}
                        </Text>

                        <Flex
                          align={["flex-start", "center", "center", "center"]}
                          w="full"
                          gap="8px"
                          flexDir={["column", "row", "row", "row"]}
                        >
                          <Text
                            color="#242628"
                            fontSize="10px"
                            lineHeight="100%"
                          >
                            Price
                          </Text>
                          <Text
                            color="#848688"
                            fontSize="14px"
                            fontWeight={500}
                            lineHeight="100%"
                          >
                            ₦{" "}
                            {dat?.amount?.toLocaleString(undefined, {
                              maximumFractionDigits: 2,
                            }) || "0.00"}
                          </Text>
                        </Flex>

                        <Flex
                          align={["flex-start", "center", "center", "center"]}
                          gap="8px"
                          w="full"
                          flexDir={["column", "row", "row", "row"]}
                        >
                          <Text color="#000" fontSize="10px" lineHeight="100%">
                            Duration
                          </Text>
                          <Text
                            color="#848688"
                            fontSize="14px"
                            fontWeight={500}
                            lineHeight="100%"
                          >
                            {Object.values(intervals[dat?.interval])[0]}
                          </Text>
                        </Flex>
                      </Flex>

                      <Flex align="center" w="100%" gap="20px">
                        <Button
                          bg="transparent"
                          border="1px solid #444648"
                          _hover={{ bg: "Transparent" }}
                          _active={{ bg: "transparent" }}
                          _focus={{ bg: "transparent" }}
                          fontSize="12px"
                          color="#444648"
                          py="17px"
                          px="26px"
                          w="full"
                        >
                          Details
                        </Button>
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
                </GridItem>
              ))
            : ""}
        </Grid>
      )}

      {step === 2 && (
        <Flex
          align="flex-start"
          justifyContent="space-between"
          flexDir={["column", "row", "row", "row"]}
          w="full"
        >
          <Box w="full">
            <Flex
              onClick={() => setStep(step - 1)}
              color="#242628"
              align="center"
              cursor="pointer"
              mb="24px"
              w="fit-content"
              gap="8px"
            >
              <HiOutlineArrowNarrowLeft size="24px" color="#242628" />
              <Text fontSize="14px" fontWeight={500} lineHeight="100%">
                Back
              </Text>
            </Flex>
          </Box>
          <Flex
            justifyContent="center"
            align="center"
            w="full"
            flexDir="column"
          >
            <Flex
              bg="#fff"
              py="40px"
              px="24px"
              borderRadius="8px"
              border="1px solid #e4e6e8"
              justifyContent="center"
              w={{
                base: "full",
                sm: "30rem",
              }}
              flexDir="column"
            >
              <Text
                fontSize="24px"
                fontWeight={700}
                lineHeight="100%"
                color="#242628"
                textAlign="center"
              >
                {currentSub?.name}
              </Text>

              <Box
                my="32px"
                borderRadius="8px"
                p="16px"
                border="1px solid #d4d6d8"
              >
                <Box>
                  <Text
                    color="#646668"
                    fontSize="14px"
                    fontWeight={500}
                    lineHeight="100%"
                  >
                    Plan Details
                  </Text>
                </Box>
                <Flex
                  align="center"
                  justifyContent="space-between"
                  mt="16px"
                  w="full"
                >
                  <Flex
                    align={["flex-start", "center", "center", "center"]}
                    w="full"
                    gap="8px"
                    flexDir={["column", "row", "row", "row"]}
                  >
                    <Text color="#242628" fontSize="10px" lineHeight="100%">
                      Price
                    </Text>
                    <Text
                      color="#848688"
                      fontSize="12px"
                      fontWeight={500}
                      lineHeight="100%"
                    >
                      ₦{" "}
                      {currentSub?.amount?.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      }) || "0.00"}
                    </Text>
                  </Flex>

                  <Flex
                    align={["flex-end", "center", "center", "center"]}
                    justifyContent="flex-end"
                    gap="8px"
                    w="full"
                    flexDir={["column", "row", "row", "row"]}
                  >
                    <Text color="#000" fontSize="10px" lineHeight="100%">
                      Duration
                    </Text>
                    <Text
                      color="#848688"
                      fontSize="12px"
                      fontWeight={500}
                      lineHeight="100%"
                    >
                      {Object.values(intervals[currentSub?.interval])[0]}
                    </Text>
                  </Flex>
                </Flex>
              </Box>

              {currentSub?.features?.length ? (
                <Box borderRadius="8px" p="16px" border="1px solid #e4e6e8">
                  <Text
                    color="#646668"
                    fontSize="12px"
                    fontWeight={500}
                    lineHeight="100%"
                  >
                    Select up to{" "}
                    {currentSub?.features && currentSub?.features[0]?.value}{" "}
                    User
                    {currentSub?.features &&
                    Number(currentSub?.features[0]?.value) === 1
                      ? ""
                      : "s"}
                  </Text>

                  <Flex
                    flexDir="column"
                    gap="24px"
                    borderTop="1px solid #d4d6d8"
                    mt="16px"
                    pt="16px"
                  >
                    {clientUsers?.data?.length
                      ? clientUsers?.data?.map((user, i) => (
                          <Flex
                            align="center"
                            key={i}
                            justifyContent="space-between"
                            w="full"
                          >
                            <Box w="full">
                              <Text
                                color="#646668"
                                fontSize="14px"
                                lineHeight="100%"
                              >
                                {user?.profile?.firstName}{" "}
                                {user?.profile?.lastName}
                              </Text>
                              <Text
                                mt="8px"
                                color="#444648"
                                fontSize="14px"
                                fontWeight={500}
                                lineHeight="100%"
                              >
                                {user?.email}
                              </Text>
                            </Box>
                            <Flex
                              justifyContent="center"
                              align="center"
                              p="10px"
                              opacity={
                                users?.length ===
                                  Number(currentSub?.features[0]?.value) &&
                                !isUserSelected(user)
                                  ? 0.5
                                  : 1
                              }
                              cursor="pointer"
                              onClick={() => handleUserClick(user)}
                              bg={
                                users?.some((u) => u?.id === user?.id)
                                  ? "#0b841d"
                                  : "#EE383A"
                              }
                              borderRadius="8px"
                              border="1px solid #e4e6e8"
                            >
                              {users.some((u) => u?.id === user?.id) ? (
                                <BsCheckLg size="20px" color="#fff" />
                              ) : (
                                <BsPlus size="20px" color="#fff" />
                              )}
                            </Flex>
                          </Flex>
                        ))
                      : ""}
                  </Flex>
                </Box>
              ) : (
                ""
              )}

              <Flex align="center" mt="32px" w="100%" gap="24px">
                <Button
                  bg="transparent"
                  border="1px solid #444648"
                  _hover={{ bg: "Transparent" }}
                  _active={{ bg: "transparent" }}
                  _focus={{ bg: "transparent" }}
                  fontSize="12px"
                  color="#444648"
                  py="17px"
                  px="26px"
                  onClick={() => {
                    setCurrentSub({});
                    setValues({
                      paymentMethod: "",
                      cardId: "",
                      autoRenew: false,
                    });
                    setUsers([]);
                    setStep(1);
                  }}
                  w="full"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => setStep(step + 1)}
                  w="full"
                  py="17px"
                  px="26px"
                  fontSize="12px"
                  isDisabled={currentSub?.features?.length && !users?.length}
                >
                  Save
                </Button>
              </Flex>
            </Flex>
          </Flex>
          <Box w="full"></Box>
        </Flex>
      )}

      {step === 3 && (
        <Flex
          align="flex-start"
          justifyContent="space-between"
          flexDir={["column", "row", "row", "row"]}
          w="full"
        >
          <Box w="full">
            <Flex
              onClick={() => setStep(step - 1)}
              color="#242628"
              align="center"
              cursor="pointer"
              w="fit-content"
              gap="8px"
            >
              <HiOutlineArrowNarrowLeft size="24px" color="#242628" />
              <Text fontSize="14px" fontWeight={500} lineHeight="100%">
                Back
              </Text>
            </Flex>
          </Box>
          <Flex
            justifyContent="center"
            align="center"
            w="full"
            flexDir="column"
          >
            <Flex
              bg="#fff"
              py="32px"
              px="24px"
              borderRadius="8px"
              border="1px solid #e4e6e8"
              justifyContent="center"
              w={{
                base: "full",
                sm: "30rem",
              }}
              flexDir="column"
            >
              <Box p="16px" borderRadius="8px" bg="#000" color="#fff">
                <Box>
                  <Text fontSize="14px" fontWeight={500} lineHeight="100%">
                    {currentSub?.name}
                  </Text>
                </Box>
                <Flex
                  align="center"
                  justifyContent="space-between"
                  mt="16px"
                  w="full"
                >
                  <Flex
                    align={["flex-start", "center", "center", "center"]}
                    w="full"
                    gap="8px"
                    flexDir={["column", "row", "row", "row"]}
                  >
                    <Text fontSize="10px" lineHeight="100%">
                      Price
                    </Text>
                    <Text
                      fontSize="12px"
                      color="#848688"
                      fontWeight={700}
                      lineHeight="100%"
                    >
                      ₦{" "}
                      {currentSub?.amount?.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      }) || "0.00"}
                    </Text>
                  </Flex>

                  <Flex
                    align={["flex-end", "center", "center", "center"]}
                    justifyContent="flex-end"
                    gap="8px"
                    w="full"
                    flexDir={["column", "row", "row", "row"]}
                  >
                    <Text fontSize="10px" lineHeight="100%">
                      Duration
                    </Text>
                    <Text
                      fontSize="12px"
                      fontWeight={700}
                      color="#848688"
                      lineHeight="100%"
                    >
                      {Object.values(intervals[currentSub?.interval])[0]}
                    </Text>
                  </Flex>
                </Flex>
              </Box>

              {currentSub?.features?.length ? (
                <Flex
                  mt="24px"
                  align="center"
                  justifyContent="space-between"
                  w="full"
                  borderRadius="4px"
                  py="12px"
                  px="16px"
                  border="1px solid #d4d6d8"
                >
                  <Text color="#646668" fontSize="12px" lineHeight="100%">
                    {users?.length} user{users?.length > 1 ? "s" : ""} selected
                  </Text>

                  <Button
                    py="6px"
                    px="16px"
                    size="sm"
                    fontSize="10px"
                    onClick={() => setStep(step - 1)}
                    display="flex"
                    align="center"
                    gap="8px"
                  >
                    <Text>Change</Text>
                    <AiOutlineEdit size="15px" />
                  </Button>
                </Flex>
              ) : (
                ""
              )}

              <Box mt="24px">
                <Text color="#444648" fontSize="10px" lineHeight="100%">
                  Client Payment Method
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
                    gap="32px"
                  >
                    <Radio size="sm" value={"1"}>
                      <Text
                        color={
                          values.paymentMethod === "1" ? "#EE383A" : "#646668"
                        }
                        fontWeight={values.paymentMethod === "1" ? 500 : 400}
                        fontSize="14px"
                      >
                        {" "}
                        Wallet
                      </Text>
                    </Radio>
                    <Radio size="sm" value={"0"}>
                      <Text
                        color={
                          values.paymentMethod === "0" ? "#EE383A" : "#646668"
                        }
                        fontWeight={values.paymentMethod === "0" ? 500 : 400}
                        fontSize="14px"
                      >
                        Card
                      </Text>
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
                    <Text fontSize="14px" fontWeight={500}>
                      No Card Available
                    </Text>
                  )}
                  <Flex
                    mt="8px"
                    color="red"
                    fontSize="12px"
                    mb="24px"
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
                  mb="24px"
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

              <Flex
                align="center"
                justifyContent="space-between"
                w="full"
                mb="24px"
              >
                <Text fontSize="12px" color="#646668">
                  Renew Automatically
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

              <Flex align="center" w="100%" gap="24px">
                <Button
                  bg="transparent"
                  border="1px solid #444648"
                  _hover={{ bg: "Transparent" }}
                  _active={{ bg: "transparent" }}
                  _focus={{ bg: "transparent" }}
                  fontSize="12px"
                  color="#444648"
                  py="17px"
                  onClick={() => {
                    setCurrentSub({});
                    setValues({
                      paymentMethod: "",
                      cardId: "",
                      autoRenew: false,
                    });
                    setUsers([]);
                    setStep(1);
                  }}
                  px="26px"
                  w="40%"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => setShowConfirm(true)}
                  w="70%"
                  py="17px"
                  isDisabled={
                    values.paymentMethod === "0"
                      ? !values.cardId
                      : values.paymentMethod == "1" && !values.paymentMethod
                  }
                  px="26px"
                  fontSize="12px"
                >
                  Make Payment
                </Button>
              </Flex>
            </Flex>
          </Flex>
          <Box w="full"></Box>
        </Flex>
      )}

      <FundWalletDrawer
        refetchUser={refetch}
        isOpen={showFunds}
        cards={cards}
        client
        action={() => {
          initializePayment(onSuccess, onCloses);
        }}
        onClose={() => setShowFunds(false)}
      />
      <ConfirmPaySubModal
        isLoading={isCreating}
        action={handleCreateSub}
        dataa={currentSub}
        refetchUser={refetch}
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
      />
    </Box>
  );
};

export default AddUser;

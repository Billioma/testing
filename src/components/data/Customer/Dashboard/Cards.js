import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {
  useGetMake,
  useGetModel,
  useGetVehicles,
} from "../../../../services/customer/query/vehicles";
import {
  useGetUser,
  useGetUserSub,
  useRenewSub,
} from "../../../../services/customer/query/user";
import { formatDate } from "../../../../utils/helpers";
import { intervals } from "../../../common/constants";
import FundWalletDrawer from "../../../modals/FundWalletDrawer";
import { useGetCards } from "../../../../services/customer/query/payment";
import { usePaystackPayment } from "react-paystack";
import EditVehicleModal from "../../../modals/EditVehicleModal";
import AddVehicleModal from "../../../modals/AddVehicleModal";
import { useNavigate } from "react-router-dom";
import { MdOutlineRefresh } from "react-icons/md";
import RenewSubModal from "../../../modals/RenewSubModal";
import useCustomToast from "../../../../utils/notifications";

const Cards = () => {
  const [index, setIndex] = useState(0);
  const [showAdd, setShowAdd] = useState(false);
  const [subIndex, setSubIndex] = useState(0);
  const {
    data: vehicles,
    isLoading,
    refetch: refetchVehicle,
  } = useGetVehicles();
  const [showFunds, setShowFunds] = useState(false);
  const {
    isLoading: isSubscription,
    data: subscriptions,
    refetch: refetchSub,
  } = useGetUserSub(10, 1);
  const { data: cards, refetch: refetchCards } = useGetCards();
  const { data: userData, isLoading: isUserLoading, refetch } = useGetUser();

  const { data: models } = useGetModel();
  const { data: makes } = useGetMake();

  const [currentVehicles, setCurrentVehicles] = useState("");
  const [show, setShow] = useState(false);

  const openMenu = (data) => {
    setShow(true);
    setCurrentVehicles(data);
  };

  const currentVehicle = vehicles?.data?.filter((item, i) => i === index);
  const currentSub = subscriptions?.data?.filter((item, i) => i === subIndex);
  const today = new Date();

  const [renew, setRenew] = useState("");
  const [showRenew, setShowRenew] = useState(false);
  const [currentSubs, setCurrentSubs] = useState("");
  const openOption = (data) => {
    setShowRenew(true), setCurrentSubs(data);
  };
  const [values, setValues] = useState({
    cardId: "",
    paymentMethod: "",
    amount: "",
  });
  const { successToast, errorToast } = useCustomToast();
  const { mutate: renewMutate, isLoading: isRenew } = useRenewSub({
    onSuccess: (res) => {
      refetch();
      refetchSub();
      setShowRenew(false);
      setValues({ cardId: "", paymentMethod: "", amount: "" });
      successToast(res?.message);
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occured"
      );
    },
  });

  const handleRenew = () => {
    Number(values.paymentMethod) === 0
      ? renewMutate({
          query: currentSubs?.id,
          body: {
            autoRenewal: 1,
            paymentMethod: Number(values.paymentMethod),
            cardId: Number(values?.cardId),
          },
        })
      : renewMutate({
          query: currentSubs?.id,
          body: {
            autoRenewal: 1,
            paymentMethod: Number(values.paymentMethod),
          },
        });
  };

  useEffect(() => {
    if (currentSub?.length) {
      const nextPaymentDate = new Date(currentSub[0]?.nextPaymentDate);

      const timeDifference = nextPaymentDate - today;

      const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
      setRenew(daysDifference);
    }
  }, [currentSub]);

  const navigate = useNavigate();
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

  const onClose = () => {
    setTimeout(() => {
      refetchCards();
    }, 5000);
  };

  const initializePayment = usePaystackPayment(config);

  return (
    <Box>
      <Grid
        gap="24px"
        templateColumns={[
          "repeat(1,1fr)",
          "repeat(1,1fr)",
          "repeat(2,1fr)",
          "repeat(3,1fr)",
        ]}
      >
        <GridItem>
          <Skeleton isLoaded={!isUserLoading}>
            <Box
              bg="#fff"
              py="24px"
              px="20px"
              borderRadius="16px"
              h="14rem"
              w="full"
            >
              <Flex align="center" gap="16px">
                <Image src="/assets/wallet.png" w="40px" h="40px" />
                <Text
                  color="red"
                  lineHeight="100%"
                  fontWeight={700}
                  fontSize="20px"
                >
                  Wallet
                </Text>
              </Flex>

              <Text
                mt="20px"
                fontSize="12px"
                color="#848688"
                fontWeight={700}
                lineHeight="100%"
              >
                Wallet Balance
              </Text>
              <Text
                mt="8px"
                color="#242628"
                fontSize="32px"
                fontWeight={500}
                lineHeight="100%"
              >
                ₦{" "}
                {userData?.wallet?.balance?.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Text>

              <Button
                mt="20px"
                w="full"
                lineHeight="100%"
                bg="#242628"
                borderRadius="8px"
                py="14px"
                onClick={() => setShowFunds(true)}
                color="#fff"
                fontSize="12px"
                fontWeight={500}
              >
                Fund My Wallet
              </Button>
            </Box>
          </Skeleton>
        </GridItem>

        <GridItem>
          <Skeleton h="14rem" isLoaded={!isSubscription}>
            <Box
              bg="#fff"
              py="24px"
              px="20px"
              borderRadius="16px"
              h="14rem"
              w="full"
            >
              <Flex align="center" justifyContent="space-between" w="full">
                <Flex align="center" gap="16px" w="full">
                  <Image src="/assets/card.png" w="40px" h="40px" />
                  <Text
                    color="red"
                    lineHeight="100%"
                    fontWeight={700}
                    fontSize="20px"
                  >
                    Subscriptions
                  </Text>
                </Flex>

                <Flex
                  flexDir="column"
                  justifyContent="flex-end"
                  align="flex-end"
                  gap="4px"
                  w="100%"
                >
                  <Flex
                    flexDir="column"
                    justifyContent="center"
                    align="center"
                    gap="4px"
                    w="30%"
                  >
                    <Text
                      fontSize="10px"
                      color="#848688"
                      fontWeight={700}
                      lineHeight="100%"
                    >
                      {subIndex + 1} of {subscriptions?.data?.length}
                    </Text>
                    <Flex align="center" gap="16px">
                      <Flex
                        cursor="pointer"
                        border="1px solid #242628"
                        opacity={subIndex !== 0 ? 1 : 0.4}
                        onClick={() =>
                          subIndex !== 0 && setSubIndex(subIndex - 1)
                        }
                        rounded="full"
                        p="2px"
                      >
                        <IoIosArrowBack size="13px" />
                      </Flex>
                      <Flex
                        cursor="pointer"
                        opacity={
                          subscriptions?.data?.length !== subIndex + 1 ? 1 : 0.4
                        }
                        onClick={() =>
                          subscriptions?.data?.length !== subIndex + 1 &&
                          setSubIndex(subIndex + 1)
                        }
                        border="1px solid #242628"
                        rounded="full"
                        p="2px"
                      >
                        <IoIosArrowForward size="13px" />
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
              {subscriptions?.data?.length ? (
                currentSub?.map((data, i) => (
                  <Box key={i}>
                    <Flex
                      mt="32px"
                      align="center"
                      justifyContent="space-between"
                      w="full"
                    >
                      <Box>
                        <Text
                          fontSize="12px"
                          color="#848688"
                          fontWeight={700}
                          lineHeight="100%"
                        >
                          Subscription Type
                        </Text>
                        <Text
                          mt="8px"
                          color="#242628"
                          fontSize="14px"
                          fontWeight={500}
                          lineHeight="100%"
                        >
                          {data?.membershipPlan?.name}
                        </Text>
                      </Box>

                      <Box>
                        <Text
                          fontSize="12px"
                          color="#848688"
                          fontWeight={700}
                          lineHeight="100%"
                        >
                          Duration
                        </Text>
                        <Text
                          mt="8px"
                          color="#242628"
                          fontSize="14px"
                          fontWeight={500}
                          lineHeight="100%"
                        >
                          {
                            Object.values(
                              intervals[data?.membershipPlan?.interval]
                            )[0]
                          }
                        </Text>
                      </Box>
                    </Flex>

                    <Flex
                      align="flex-end"
                      mt="32px"
                      justifyContent="space-between"
                      w="full"
                    >
                      <Box w="80%">
                        <Text
                          fontSize="12px"
                          color="#848688"
                          fontWeight={700}
                          lineHeight="100%"
                        >
                          Amount
                        </Text>
                        <Text
                          mt="8px"
                          color="#242628"
                          fontSize="14px"
                          fontWeight={500}
                          lineHeight="100%"
                        >
                          ₦{" "}
                          {data?.membershipPlan?.amount?.toLocaleString(
                            undefined,
                            {
                              maximumFractionDigits: 2,
                            }
                          )}
                        </Text>
                      </Box>
                      <Box w="full">
                        <Text
                          fontSize="12px"
                          color="#848688"
                          fontWeight={700}
                          lineHeight="100%"
                        >
                          Next Payment
                        </Text>
                        <Text
                          mt="8px"
                          color="#242628"
                          fontSize="14px"
                          fontWeight={500}
                          lineHeight="100%"
                        >
                          {formatDate(data?.nextPaymentDate)}
                        </Text>
                      </Box>
                      <Box w={renew < 5 ? "100%" : "60%"}>
                        <Flex
                          color="#0B841D"
                          cursor="pointer"
                          align="center"
                          onClick={() =>
                            renew < 5
                              ? openOption(data)
                              : navigate("/customer/subscriptions")
                          }
                          gap="4px"
                        >
                          <Text
                            fontSize="10px"
                            fontWeight={700}
                            lineHeight="100%"
                          >
                            {renew <= 5
                              ? " Renew Subscription"
                              : "View Details"}
                          </Text>
                          {renew < 5 ? (
                            <MdOutlineRefresh size="12px" />
                          ) : (
                            <IoIosArrowForward size="12px" />
                          )}
                        </Flex>
                      </Box>
                    </Flex>
                  </Box>
                ))
              ) : (
                <Box fontSize="13px" fontWeight={500} color="#000">
                  <Text color="#848688" my="37px" textAlign="center">
                    You are yet to make a subscription
                  </Text>
                  <Button
                    onClick={() => navigate("/customer/add-subscriptions")}
                    borderRadius="8px"
                    w="full"
                  >
                    Add a Subscription
                  </Button>
                </Box>
              )}
            </Box>
          </Skeleton>
        </GridItem>

        <GridItem>
          <Skeleton isLoaded={!isLoading}>
            <Box
              bg="#fff"
              py="24px"
              px="20px"
              borderRadius="16px"
              h="14rem"
              w="full"
            >
              <Flex align="center" justifyContent="space-between" w="full">
                <Flex align="center" gap="16px">
                  <Image src="/assets/car.png" w="56px" h="40px" />
                  <Text
                    color="red"
                    lineHeight="100%"
                    fontWeight={700}
                    fontSize="20px"
                  >
                    Vehicles
                  </Text>
                </Flex>

                <Flex
                  flexDir="column"
                  justifyContent="flex-end"
                  align="flex-end"
                  gap="4px"
                  w="100%"
                >
                  <Flex
                    flexDir="column"
                    justifyContent="center"
                    align="center"
                    gap="4px"
                    w="30%"
                  >
                    <Text
                      fontSize="10px"
                      color="#848688"
                      fontWeight={700}
                      lineHeight="100%"
                    >
                      {index + 1} of {vehicles?.data?.length}
                    </Text>
                    <Flex align="center" gap="16px">
                      <Flex
                        cursor="pointer"
                        border="1px solid #242628"
                        opacity={index !== 0 ? 1 : 0.4}
                        onClick={() => index !== 0 && setIndex(index - 1)}
                        rounded="full"
                        p="2px"
                      >
                        <IoIosArrowBack size="13px" />
                      </Flex>
                      <Flex
                        cursor="pointer"
                        opacity={vehicles?.data?.length !== index + 1 ? 1 : 0.4}
                        onClick={() =>
                          vehicles?.data?.length !== index + 1 &&
                          setIndex(index + 1)
                        }
                        border="1px solid #242628"
                        rounded="full"
                        p="2px"
                      >
                        <IoIosArrowForward size="13px" />
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
              {vehicles?.data?.length ? (
                currentVehicle?.map((data, i) => (
                  <Box key={i}>
                    <Flex
                      mt="32px"
                      align="center"
                      justifyContent="space-between"
                      w="full"
                    >
                      <Box>
                        <Text
                          fontSize="12px"
                          color="#848688"
                          fontWeight={700}
                          lineHeight="100%"
                        >
                          Vehicle
                        </Text>
                        <Text
                          mt="8px"
                          color="#242628"
                          fontSize="14px"
                          fontWeight={500}
                          lineHeight="100%"
                        >
                          {data?.model?.make?.name} {data?.model?.name}
                        </Text>
                      </Box>

                      <Box>
                        <Text
                          fontSize="12px"
                          color="#848688"
                          fontWeight={700}
                          lineHeight="100%"
                        >
                          Color
                        </Text>
                        <Text
                          mt="8px"
                          color="#242628"
                          fontSize="14px"
                          fontWeight={500}
                          lineHeight="100%"
                        >
                          {data?.color}
                        </Text>
                      </Box>
                    </Flex>

                    <Flex
                      align="center"
                      mt="32px"
                      justifyContent="space-between"
                      w="full"
                    >
                      <Box w="full">
                        <Text
                          fontSize="12px"
                          color="#848688"
                          fontWeight={700}
                          lineHeight="100%"
                        >
                          State
                        </Text>
                        <Text
                          mt="8px"
                          color="#242628"
                          fontSize="14px"
                          fontWeight={500}
                          lineHeight="100%"
                        >
                          {data?.state}
                        </Text>
                      </Box>

                      <Box w="full">
                        <Text
                          fontSize="12px"
                          color="#848688"
                          fontWeight={700}
                          lineHeight="100%"
                        >
                          License Plate
                        </Text>
                        <Text
                          mt="8px"
                          color="#242628"
                          fontSize="14px"
                          fontWeight={500}
                          lineHeight="100%"
                        >
                          {data?.licensePlate}
                        </Text>
                      </Box>

                      <Flex
                        flexDir="column"
                        justifyContent="flex-end"
                        align="flex-end"
                        gap="4px"
                        w="100%"
                      >
                        <Flex
                          flexDir="column"
                          justifyContent="center"
                          align="center"
                          gap="4px"
                          w="100%"
                        >
                          <Button
                            bg="transparent"
                            border="1px solid #242628"
                            rounded="full"
                            px="24px"
                            py="7px"
                            w="full"
                            color="#242628"
                            onClick={() => openMenu(data)}
                            lineHeight="100%"
                            fontSize="10px"
                            fontWeight={500}
                          >
                            Edit
                          </Button>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Box>
                ))
              ) : (
                <Box fontSize="13px" fontWeight={500} color="#000">
                  <Text my="37px" color="#848688" textAlign="center">
                    You are yet to add a vehicle
                  </Text>
                  <Button
                    onClick={() => setShowAdd(true)}
                    borderRadius="8px"
                    w="full"
                  >
                    Add a Vehicle
                  </Button>
                </Box>
              )}
            </Box>
          </Skeleton>
        </GridItem>
      </Grid>
      <FundWalletDrawer
        refetchUser={refetch}
        isOpen={showFunds}
        cards={cards}
        action={() => {
          initializePayment(onSuccess, onClose);
        }}
        onClose={() => setShowFunds(false)}
      />
      <AddVehicleModal
        makes={makes}
        refetch={refetchVehicle}
        models={models}
        isOpen={showAdd}
        onClose={() => setShowAdd(false)}
      />
      <EditVehicleModal
        makes={makes}
        models={models}
        dataa={currentVehicles}
        refetch={refetchVehicle}
        isOpen={show}
        onClose={() => setShow(false)}
      />
      <RenewSubModal
        currentSub={currentSub}
        isLoading={isRenew}
        values={values}
        setValues={setValues}
        handleRenew={handleRenew}
        userData={userData}
        action={() => {
          initializePayment(onSuccess, onClose);
        }}
        cards={cards}
        isOpen={showRenew}
        onClose={() => setShowRenew(false)}
      />
    </Box>
  );
};

export default Cards;

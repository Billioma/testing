import React, { useState } from "react";
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
import { useGetUser } from "../../../../../services/customer/query/user";
import { useGetCards } from "../../../../../services/customer/query/payment";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { cardImg } from "../../../../common/constants";
import { useDeleteCard } from "../../../../../services/customer/query/user";
import useCustomToast from "../../../../../utils/notifications";
import { usePaystackPayment } from "react-paystack";
import FundWalletDrawer from "../../../../modals/FundWalletDrawer";
import ConfirmDeleteModal from "../../../../modals/ConfirmDeleteModal";

const Cards = () => {
  const {
    data: userData,
    isLoading: isUserLoading,
    refetch: refetchUser,
  } = useGetUser();
  const { data: cards, isLoading: isCard, refetch } = useGetCards();
  const [showFund, setShowFund] = useState(false);

  const [currentCards, setCurrentCards] = useState("");

  const { errorToast, successToast } = useCustomToast();

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
      refetch();
    }, 5000);
  };

  const onClose = () => {
    setTimeout(() => {
      refetch();
    }, 5000);
  };

  const initializePayment = usePaystackPayment(config);
  const [showDelete, setShowDelete] = useState(false);
  const { mutate, isLoading: isDeleting } = useDeleteCard({
    onSuccess: (res) => {
      setIndex(0);
      setShowDelete(false);
      successToast(res?.message);
      refetch();
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred"
      );
    },
  });

  const openDelete = (data) => {
    setShowDelete(true);
    setCurrentCards(data);
  };

  const handleSubmit = () => {
    mutate(currentCards?.id);
  };

  const [index, setIndex] = useState(0);

  const currentCard = cards?.data?.filter((item, i) => i === index);

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
                fontSize="14px"
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
                  maximumFractionDigits: 2,
                }) || "0.00"}
              </Text>

              <Button
                mt="20px"
                w="full"
                lineHeight="100%"
                bg="#242628"
                borderRadius="8px"
                onClick={() => setShowFund(true)}
                py="14px"
                color="#fff"
                fontSize="14px"
                fontWeight={500}
              >
                Fund My Wallet
              </Button>
            </Box>
          </Skeleton>
        </GridItem>

        <GridItem>
          <Skeleton isLoaded={!isCard}>
            <Flex
              flexDir="column"
              bg="#fff"
              py="24px"
              px="20px"
              borderRadius="16px"
              h="14rem"
              w="full"
            >
              <Flex align="center" gap="16px">
                <Image src="/assets/cards.png" w="40px" h="40px" />
                <Text
                  color="red"
                  lineHeight="100%"
                  fontWeight={700}
                  fontSize="20px"
                >
                  Cards
                </Text>
              </Flex>
              <Box mt="20px">
                {cards?.data?.length ? (
                  currentCard?.map((data, i) => {
                    const matchedCardImg = cardImg.find(
                      (item) =>
                        item.name.toLowerCase() ===
                        data.cardType.trim().toLowerCase()
                    );
                    return (
                      <Box key={i}>
                        <Text
                          fontSize="14px"
                          fontWeight={700}
                          lineHeight="100%"
                          color="#848688"
                        >
                          Card Details
                        </Text>
                        <Flex
                          mt="8px"
                          align="center"
                          justifyContent="space-between"
                          w="full"
                        >
                          <Flex align="center" gap="10px">
                            <Image
                              objectFit="contain"
                              src={matchedCardImg?.img}
                              w="30px"
                              h="23px"
                            />
                            <Text
                              fontSize="24px"
                              color="#242628"
                              fontWeight={500}
                              lineHeight="100%"
                            >
                              ** **** {data?.last4}
                            </Text>
                          </Flex>
                          <Flex
                            flexDir="column"
                            justifyContent="center"
                            align="center"
                            gap="4px"
                            w="15%"
                          >
                            <Text
                              fontSize="12px"
                              color="#848688"
                              fontWeight={700}
                              lineHeight="100%"
                            >
                              {index + 1} of {cards?.data?.length}
                            </Text>
                            <Flex align="center" gap="16px">
                              <Flex
                                cursor="pointer"
                                border="1px solid #242628"
                                opacity={index !== 0 ? 1 : 0.4}
                                onClick={() =>
                                  index !== 0 && setIndex(index - 1)
                                }
                                rounded="full"
                                p="2px"
                              >
                                <IoIosArrowBack size="13px" />
                              </Flex>
                              <Flex
                                cursor="pointer"
                                opacity={
                                  cards?.data?.length !== index + 1 ? 1 : 0.4
                                }
                                onClick={() =>
                                  cards?.data?.length !== index + 1 &&
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

                          <Box>
                            <Image
                              onClick={() => openDelete(data)}
                              src="/assets/bin.svg"
                              cursor="pointer"
                              w="20px"
                              h="20px"
                            />
                          </Box>
                        </Flex>
                      </Box>
                    );
                  })
                ) : (
                  <Flex
                    justifyContent="center"
                    align="center"
                    fontSize="13px"
                    fontWeight={500}
                    color="#000"
                  >
                    No card yet
                  </Flex>
                )}
              </Box>

              <Button
                mt="auto"
                w="full"
                lineHeight="100%"
                bg="#242628"
                borderRadius="8px"
                py="14px"
                color="#fff"
                isDisabled={cards?.data?.length === 3 ? true : false}
                onClick={() => {
                  initializePayment(onSuccess, onClose);
                }}
                fontSize="14px"
                fontWeight={500}
              >
                {cards?.data?.length === 3
                  ? "You have reached your card limit"
                  : cards?.data?.length
                  ? "Add Another Card"
                  : "Add a Card"}
              </Button>
            </Flex>
          </Skeleton>
        </GridItem>
      </Grid>

      <FundWalletDrawer
        cards={cards}
        refetchUser={refetchUser}
        action={() => {
          initializePayment(onSuccess, onClose);
        }}
        isOpen={showFund}
        onClose={() => setShowFund(false)}
      />
      <ConfirmDeleteModal
        isOpen={showDelete}
        isLoading={isDeleting}
        action={handleSubmit}
        title="Card"
        onClose={() => setShowDelete(false)}
      />
    </Box>
  );
};

export default Cards;

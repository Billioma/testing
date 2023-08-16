import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Image, Td, Text, Tr } from "@chakra-ui/react";
import TableFormat from "../../../common/TableFormat";
import { FiMoreVertical } from "react-icons/fi";
import {
  Status,
  intervals,
  subHeader,
  subOptions,
} from "../../../common/constants";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {
  useCancelSub,
  useGetUser,
  useGetUserSub,
  useRenewSub,
} from "../../../../services/customer/query/user";
import { formatDate } from "../../../../utils/helpers";
import TableLoader from "../../../loaders/TableLoader";
import { Add } from "../../../common/images";
import { useNavigate } from "react-router-dom";
import ConfirmDeleteModal from "../../../modals/ConfirmDeleteModal";
import useCustomToast from "../../../../utils/notifications";
import RenewSubModal from "../../../modals/RenewSubModal";
import { useGetCards } from "../../../../services/customer/query/payment";
import { usePaystackPayment } from "react-paystack";

const TableLayer = () => {
  const navigate = useNavigate();
  const [showRenew, setShowRenew] = useState(false);
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(false);
  const limit = 10;
  const { data: userData, refetch: refetchUser } = useGetUser();
  const [showCancel, setShowCancel] = useState(false);
  const { isLoading, data: subs, refetch } = useGetUserSub(limit, page);

  const [values, setValues] = useState({
    cardId: "",
    paymentMethod: "",
    amount: "",
  });

  const sortedSubs = subs?.data?.sort(
    (a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)
  );

  const [currentSub, setCurrentSub] = useState("");

  const open = (dat) => {
    setShow(true);
    setCurrentSub(dat);
  };

  const openOption = (dat, i) => {
    i === 0
      ? (setShowRenew(true), setCurrentSub(dat))
      : i === 1
      ? (setShowCancel(true), setCurrentSub(dat))
      : "";
  };
  const { data: cards, refetch: refetchCards } = useGetCards();

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

  const { errorToast, successToast } = useCustomToast();
  const { mutate, isLoading: isCancel } = useCancelSub({
    onSuccess: (res) => {
      setShowCancel(false);
      successToast(res?.message);
      refetch();
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occured"
      );
    },
  });

  const { mutate: renewMutate, isLoading: isRenew } = useRenewSub({
    onSuccess: (res) => {
      refetch();
      refetchUser();
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
          query: currentSub?.id,
          body: {
            autoRenewal: 1,
            paymentMethod: Number(values.paymentMethod),
            cardId: Number(values?.cardId),
          },
        })
      : renewMutate({
          query: currentSub?.id,
          body: {
            autoRenewal: 1,
            paymentMethod: Number(values.paymentMethod),
          },
        });
  };

  const handleSubmit = () => {
    mutate(currentSub?.id);
  };

  useEffect(() => {
    if (showCancel || showRenew) {
      setShow(false);
    }
  }, [showCancel, showRenew]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest(".box") === null) {
        setShow(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <Box mt="16px">
      {isLoading ? (
        <TableLoader />
      ) : subs?.data?.length ? (
        <TableFormat
          maxH={"50vh"}
          opt
          minH="25vh"
          header={subHeader}
          paginate={
            <Flex
              justifyContent="center"
              align="center"
              flexDir="column"
              w="full"
            >
              <Flex
                flexDir={{ base: "column", md: "row" }}
                justifyContent="center"
                gap={{ base: "10px", md: "32px" }}
                align="center"
              >
                <Text fontSize="12px" color="#242628" lineHeight="100%">
                  Showing rows 1 to {subs?.total < limit ? subs?.total : limit}{" "}
                  of {subs?.total}
                </Text>

                <Flex gap="16px" align="center">
                  <Flex
                    opacity={subs?.page === 1 ? 0.5 : 1}
                    onClick={() => (subs?.page !== 1 ? setPage(page - 1) : "")}
                    cursor={subs?.page === 1 ? "" : "pointer"}
                    align="center"
                    gap="2px"
                    color="#A4A6A8"
                    fontSize="12px"
                  >
                    <IoIosArrowBack />
                    <Text lineHeight="100%">Previous</Text>
                  </Flex>

                  <Flex
                    align="center"
                    gap="5px"
                    color="#A4A6A8"
                    fontSize="12px"
                  >
                    <Flex
                      bg="tranparent"
                      py="6px"
                      px="8px"
                      color="#242628"
                      fontSize="12px"
                      lineHeight="100%"
                    >
                      <Text>{subs?.page}</Text>
                    </Flex>
                    <Text fontWeight={500} fontSize="12px">
                      -{" "}
                    </Text>
                    <Flex
                      bg="#242628"
                      py="6px"
                      px="8px"
                      color="#fff"
                      fontSize="12px"
                      lineHeight="100%"
                    >
                      <Text>{subs?.pageCount}</Text>
                    </Flex>
                  </Flex>

                  <Flex
                    opacity={subs?.page === subs?.pageCount ? 0.5 : 1}
                    onClick={() =>
                      subs?.page !== subs?.pageCount ? setPage(page + 1) : ""
                    }
                    cursor={subs?.page === subs?.pageCount ? "" : "pointer"}
                    align="center"
                    gap="2px"
                    color="#A4A6A8"
                    fontSize="12px"
                  >
                    <IoIosArrowForward />
                    <Text lineHeight="100%">Next</Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          }
        >
          {sortedSubs?.map((dat, i) => (
            <Tr
              key={i}
              color="#646668"
              fontWeight={500}
              fontSize="12px"
              lineHeight="100%"
            >
              <Td textAlign="center">{dat?.membershipPlan?.name}</Td>
              <Td textAlign="center">
                ₦{" "}
                {dat?.membershipPlan?.amount?.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </Td>
              <Td textAlign="center">
                {Object.values(intervals[dat?.membershipPlan?.interval])[0]}
              </Td>
              <Td textAlign="center">{formatDate(dat?.nextPaymentDate)}</Td>
              <Td>
                <Flex
                  color={
                    dat?.cancelled === 1
                      ? "#E81313"
                      : Object.values(Status[dat?.status])[0]
                  }
                  bg={
                    dat?.cancelled === 1
                      ? "#F9D0CD"
                      : Object.values(Status[dat?.status])[2]
                  }
                  py="5px"
                  px="16px"
                  justifyContent="center"
                  borderRadius="4px"
                  align="center"
                >
                  {dat?.cancelled === 1
                    ? "Cancelled"
                    : Object.values(Status[dat?.status])[1]}
                </Flex>
              </Td>
              <Td textAlign="center">{formatDate(dat?.createdAt)}</Td>
              <Td>
                <Flex
                  pos="relative"
                  cursor="pointer"
                  onClick={() => open(dat)}
                  justifyContent="center"
                  className="box"
                  align="center"
                >
                  <FiMoreVertical />

                  {show && currentSub === dat && (
                    <Box
                      border="1px solid #F4F6F8"
                      px="4px"
                      py="8px"
                      bg="#fff"
                      borderRadius="4px"
                      pos="absolute"
                      right="0"
                      zIndex={5555555}
                      top="20px"
                      boxShadow="0px 8px 16px 0px rgba(0, 0, 0, 0.08)"
                    >
                      {subOptions.map((item, i) => (
                        <Flex
                          key={i}
                          mb="8px"
                          py="6px"
                          px="8px"
                          borderRadius="2px"
                          justifyContent="center"
                          align="center"
                          onClick={() => openOption(dat, i)}
                          _hover={{ bg: "#F4F6F8" }}
                          cursor="pointer"
                          fontSize="10px"
                          color={i !== 2 ? "#646668" : "#A11212"}
                          lineHeight="100%"
                          fontWeight={500}
                        >
                          {item}
                        </Flex>
                      ))}
                    </Box>
                  )}
                </Flex>
              </Td>
            </Tr>
          ))}
        </TableFormat>
      ) : (
        <Flex
          gap="14px"
          justifyContent="center"
          align="center"
          mt="48px"
          mb="68px"
          flexDir="column"
        >
          <Image src="/assets/sub.png" />
          <Text
            color="#848688"
            fontSize="12px"
            lineHeight="100%"
            fontWeight={500}
          >
            You are yet to make a subscription
          </Text>

          <Button
            onClick={() => navigate("/customer/add-subscriptions")}
            display="flex"
            gap="8px"
            fontSize="12px"
          >
            <Text>Add Subscription</Text>
            <Add fill="#fff" />
          </Button>
        </Flex>
      )}

      <ConfirmDeleteModal
        cancel
        title="Subscription"
        action={handleSubmit}
        isLoading={isCancel}
        isOpen={showCancel}
        onClose={() => setShowCancel(false)}
      />
      <RenewSubModal
        currentSub={currentSub}
        isLoading={isRenew}
        values={values}
        setValues={setValues}
        handleRenew={handleRenew}
        userData={userData}
        action={() => {
          initializePayment(onSuccess, onCloses);
        }}
        cards={cards}
        isOpen={showRenew}
        onClose={() => setShowRenew(false)}
      />
    </Box>
  );
};

export default TableLayer;

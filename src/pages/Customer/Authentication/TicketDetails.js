import React, { useEffect } from "react";
import GoBackTab from "../../../components/data/Admin/GoBackTab";
import {
  Box,
  Button,
  Flex,
  Skeleton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { PiTicketBold } from "react-icons/pi";
import {
  useGetTicket,
  useRetrieveVehicle,
} from "../../../services/customer/query/locations";
import { useParams } from "react-router-dom";
import { formatDate, formatTime } from "../../../utils/helpers";
import { PaymentMethods } from "../../../components/common/constants";
import RetrieveSuccess from "../../../components/modals/RetrieveSuccess";
import useCustomToast from "../../../utils/notifications";
import { usePaystackPayment } from "react-paystack";

const TicketDetails = () => {
  const { id } = useParams();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { errorToast } = useCustomToast();
  const { mutate, isLoading, data } = useGetTicket({
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred"
      );
    },
  });

  const { mutate: retrieveMutate, isLoading: isRetrieve } = useRetrieveVehicle({
    onSuccess: () => {
      onOpen();
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred"
      );
    },
  });

  const config = {
    reference: new Date().getTime().toString(),
    amount: Number(`${data?.amount}00`),
    publicKey: process.env.REACT_APP_PAYSTACK_KEY,
    serviceLogId: data?.id,
    email: data?.location?.client?.email,
    metadata: {
      custom_fields: [
        {
          display_name: "Transaction Type",
          variable_name: "transaction_type",
          value: "GUEST_VEHICLE_RETRIEVAL",
        },
      ],
    },
  };

  const initializePayment = usePaystackPayment(config);

  const handleSubmit = () => {
    const latestPaymentMethod = data?.paymentStatus
      ? data?.payments
          ?.filter(
            (p) => p.paymentMethod !== null && p.paymentMethod !== undefined
          )
          .reduce(
            (latest, current) =>
              new Date(current.createdAt) > new Date(latest.createdAt)
                ? current
                : latest,
            data?.payments?.[0]
          )?.paymentMethod
      : "6";

    retrieveMutate({
      query: id,
      body: {
        timeOut: new Date(),
        comment: null,
        status: 1,
        delivered: 1,
        paymentMethod: latestPaymentMethod?.toString() ?? "6",
        amountPaid: data?.amount,
        paid: 1,
      },
    });
  };

  const onSuccess = () => {
    onOpen();
    handleSubmit();
  };

  const handleRetrieveClick = () => {
    if (data?.paymentStatus) {
      handleSubmit();
    } else {
      if (typeof initializePayment === "function") {
        initializePayment(() => {
          // This callback always runs after payment completes successfully
          onSuccess();
        });
      } else {
        errorToast("Payment system not loaded yet");
      }
    }
  };

  useEffect(() => {
    if (id !== "") {
      mutate(id);
    }
  }, [id]);

  return (
    <Box w="full" color="#242628" mt="20px">
      <RetrieveSuccess
        isOpen={isOpen}
        onClose={onClose}
        isRetrieve={isRetrieve}
      />
      <Flex align="center" justifyContent="space-between" w="full">
        <Box w="25%">
          <GoBackTab alt />
        </Box>

        <Text w="50%" fontSize="15px">
          Transaction Summary
        </Text>
        <Box w="25%" />
      </Flex>

      <Skeleton isLoaded={!isLoading} borderRadius="12px">
        <Flex
          border="1px solid #E4E6E8"
          borderRadius="12px"
          mt="24px"
          p="24px"
          align="center"
          justifyContent="space-between"
        >
          <Box>
            <Flex color="#444648" align="center" gap="5px">
              <PiTicketBold />
              <Text fontSize="14px">{data?.id}</Text>
            </Flex>
            <Text mt="8px" fontSize="20px">
              ₦{Number(data?.finalAmount)?.toLocaleString()}
            </Text>
          </Box>

          <Box>
            <Flex
              bg={data?.paymentStatus ? "#E5FFE5" : "#FFEDD2"}
              borderRadius="4px"
              p="4px 6px"
              color={data?.paymentStatus ? "#008000" : "#F79E1B"}
              fontSize="14px"
            >
              {data?.paymentStatus ? "Paid" : "Unpaid"}
            </Flex>
          </Box>
        </Flex>
      </Skeleton>

      <Skeleton isLoaded={!isLoading} borderRadius="12px">
        <Box
          fontSize="14px"
          border="1px solid #E4E6E8"
          borderRadius="12px"
          my="16px"
          p="24px"
        >
          <Text fontWeight={700}>Customer Details</Text>

          <Flex mt="24px" align="center" justifyContent="space-between">
            <Text>Phone Number</Text>
            <Text>{data?.vehicle?.customerPhoneNumber || "N/A"}</Text>
          </Flex>
        </Box>
      </Skeleton>

      <Skeleton isLoaded={!isLoading} borderRadius="12px">
        <Box
          fontSize="14px"
          border="1px solid #E4E6E8"
          borderRadius="12px"
          my="16px"
          p="24px"
        >
          <Text fontWeight={700}>Car Details</Text>

          <Flex mt="24px" align="center" justifyContent="space-between">
            <Text>Vehicles</Text>
            <Text>
              {data?.vehicle?.nake?.name} {data?.vehicle?.model?.name}
            </Text>
          </Flex>

          <Flex my="16px" align="center" justifyContent="space-between">
            <Text>License Plate</Text>
            <Text>{data?.vehicle?.licensePlate}</Text>
          </Flex>

          <Flex align="center" justifyContent="space-between">
            <Text>Color</Text>
            <Text>{data?.vehicle?.color}</Text>
          </Flex>
        </Box>
      </Skeleton>

      <Skeleton isLoaded={!isLoading} borderRadius="12px">
        <Box
          fontSize="14px"
          border="1px solid #E4E6E8"
          borderRadius="12px"
          mb="16px"
          p="24px"
        >
          <Text fontWeight={700}>Service Details</Text>

          <Flex mt="24px" align="center" justifyContent="space-between">
            <Text>Location</Text>
            <Text>{data?.location?.name}</Text>
          </Flex>

          <Flex my="16px" align="center" justifyContent="space-between">
            <Text>Zone</Text>
            <Text>{data?.zone?.name}</Text>
          </Flex>

          <Flex align="center" justifyContent="space-between">
            <Text>Date</Text>
            <Text>{formatDate(data?.timeIn)}</Text>
          </Flex>

          <Flex my="16px" align="center" justifyContent="space-between">
            <Text>Entry Time</Text>
            <Text>{formatTime(data?.timeIn)}</Text>
          </Flex>

          <Flex align="center" justifyContent="space-between">
            <Text>Service Type</Text>
            <Text>N/A</Text>
          </Flex>
        </Box>
      </Skeleton>

      <Skeleton isLoaded={!isLoading} borderRadius="12px">
        <Box
          fontSize="14px"
          border="1px solid #E4E6E8"
          borderRadius="12px"
          p="24px"
        >
          <Text fontWeight={700}>Payment Details</Text>

          <Flex mt="24px" align="center" justifyContent="space-between">
            <Text>Fee</Text>
            <Text>₦ {Number(data?.finalAmount)?.toLocaleString()}</Text>
          </Flex>

          <Flex my="16px" align="center" justifyContent="space-between">
            <Text>Payment Method</Text>
            <Text>
              {PaymentMethods[
                data?.payments
                  ?.filter(
                    (p) =>
                      p.paymentMethod !== null && p.paymentMethod !== undefined
                  )
                  .reduce(
                    (latest, current) =>
                      new Date(current.createdAt) > new Date(latest.createdAt)
                        ? current
                        : latest,
                    data?.payments?.[0] // fallback
                  )?.paymentMethod
              ] ?? "Unknown"}
            </Text>
          </Flex>

          <Flex align="center" justifyContent="space-between">
            <Text>Payment Status</Text>
            <Text>{data?.paymentStatus ? "Paid" : "Unpaid"}</Text>
          </Flex>
        </Box>
      </Skeleton>

      <Skeleton isLoaded={!isLoading} borderRadius="12px">
        <Button
          isLoading={isRetrieve}
          onClick={handleRetrieveClick}
          h="50px"
          w="full"
          mb="50px"
          mt="108px"
        >
          Request Vehicle
        </Button>
      </Skeleton>
    </Box>
  );
};

export default TicketDetails;

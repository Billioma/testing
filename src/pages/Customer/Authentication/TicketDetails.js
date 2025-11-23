import React, { useEffect, useState } from "react";
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
import { formatDateTime } from "../../../utils/helpers";
import { PaymentMethods } from "../../../components/common/constants";
import RetrieveSuccess from "../../../components/modals/RetrieveSuccess";
import useCustomToast from "../../../utils/notifications";
import { usePaystackPayment } from "react-paystack";
import Msg from "../../../components/modals/Msg";

const TicketDetails = () => {
  const { id } = useParams();
  const [msgs, setMsgs] = useState("");
  const { isOpen, onClose, onOpen } = useDisclosure();
  const msg = useDisclosure();
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
      msg.onClose();
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
    email: data?.location?.client?.email,
    metadata: {
      serviceLogId: data?.id,
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
    retrieveMutate({
      query: id,
      body: {
        message: msgs,
        ticketNumber: data?.ticketNumber,
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
      msg.onClose();
      if (typeof initializePayment === "function") {
        initializePayment(() => {
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
    <Flex flexDir="column" h="80vh" w="full" color="#242628" mt="40px">
      <RetrieveSuccess
        isOpen={true}
        onClose={onClose}
        isRetrieve={isRetrieve}
      />
      <Msg
        isLoading={isRetrieve}
        action={handleRetrieveClick}
        msg
        setMsgs={setMsgs}
        msgs={msgs}
        isOpen={msg.isOpen}
        onClose={msg.onClose}
      />

      <Text textAlign="center" fontWeight={600} fontSize="15px">
        Transaction Summary
      </Text>

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
          <Text fontWeight={700} textAlign="center">
            Ticket Details
          </Text>

          <Flex mt="24px" align="center" justifyContent="space-between">
            <Text fontWeight={500}>Phone Number</Text>
            <Text>{data?.vehicle?.customerPhoneNumber || "N/A"}</Text>
          </Flex>

          <Flex my="16px" align="center" justifyContent="space-between">
            <Text fontWeight={500}>Vehicle</Text>
            <Text>
              {data?.vehicle?.make?.name} {data?.vehicle?.model?.name} (
              {data?.vehicle?.licensePlate}) - {data?.vehicle?.color}
            </Text>
          </Flex>

          <Flex align="center" justifyContent="space-between">
            <Text fontWeight={500}>Location - Zone</Text>
            <Text>
              {data?.location?.name} - {data?.zone?.name}
            </Text>
          </Flex>

          <Flex my="16px" align="center" justifyContent="space-between">
            <Text fontWeight={500}>Date</Text>
            <Text>{formatDateTime(data?.timeIn)}</Text>
          </Flex>

          <Flex align="center" justifyContent="space-between">
            <Text fontWeight={500}>Payment Method</Text>
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
                    data?.payments?.[0]
                  )?.paymentMethod
              ] ?? "Unknown"}
            </Text>
          </Flex>
        </Box>
      </Skeleton>

      <Skeleton mt="auto" isLoaded={!isLoading} borderRadius="12px">
        <Button onClick={msg.onOpen} h="50px" w="full" mt="24px">
          Request Vehicle
        </Button>
      </Skeleton>
    </Flex>
  );
};

export default TicketDetails;

import { Box, Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { formatDat, formatTime } from "../../../utils/helpers";
import { PaymentMethods } from "../../../components/common/constants";
import { PiTicketLight } from "react-icons/pi";
import {
  useMakePayment,
  useRetrieveTicket,
} from "../../../services/attendant/query/logs";
import useCustomToast from "../../../utils/notifications";
import { useNavigate } from "react-router-dom";
import MakePay from "../../../components/modals/MakePay";
import { useState } from "react";

const Layout = ({ label, value }) => {
  return (
    <Flex align="center" justifyContent="space-between">
      <Text>{label}</Text>

      {label.includes("Status") ? (
        <Text
          borderRadius="4px"
          p="4px 6px"
          bg={value === "Paid" ? "#E3FDE7" : "#FFEDD2"}
          color={value === "Paid" ? "#008A16" : "#F79E1B"}
        >
          {value}
        </Text>
      ) : (
        <Text>{value}</Text>
      )}
    </Flex>
  );
};

const Details = () => {
  const data = JSON.parse(localStorage.getItem("history"));
  const [method, setMethod] = useState("");

  const navigate = useNavigate();
  const open = useDisclosure();
  const { errorToast, successToast } = useCustomToast();
  const { mutate, isLoading } = useRetrieveTicket({
    onSuccess: (res) => {
      successToast(res?.message);
      navigate("/attendant/history");
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred",
      );
    },
  });

  const handleSubmit = () => {
    mutate({
      query: data?.id,
      body: {
        timeOut: new Date(),
        comment: null,
        status: 1,
        delivered: 1,
        paymentMethod: null,
        amountPaid: data?.payments[0]?.amountPaid || data?.amount,
        paid: 1,
      },
    });
  };

  const { mutate: payMutate, isLoading: isPay } = useMakePayment({
    onSuccess: () => {
      handleSubmit();
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred",
      );
    },
  });

  const handlePay = () => {
    payMutate({
      query: data?.id,
      body: {
        amount: data?.amount,
        amountPaid: data?.amount,
        comment: "",
        paymentMethod: method.value,
      },
    });
  };

  return (
    <Box>
      <MakePay
        action={handlePay}
        isLoading={isPay || isLoading}
        isOpen={open.isOpen}
        onClose={open.onClose}
        setMethod={setMethod}
        method={method}
      />
      <Box fontSize="14px" color="#242628">
        <Flex
          align="center"
          justifyContent="space-between"
          bg="#fff"
          p="24px"
          border="1px solid #E4E6E8"
          borderRadius="12px"
        >
          <Box>
            <Flex align="center" gap="5px" color="#444648" fontSize="14px">
              <PiTicketLight />
              <Text>{data?.id}</Text>
            </Flex>
            <Text fontFamily="Recoleta" fontSize="24px">
              ₦{Number(data?.amount)?.toLocaleString()}
            </Text>
          </Box>

          <Text
            p="4px 6px"
            borderRadius="4px"
            fontSize="14px"
            bg={data?.delivered ? "#E3FDE7" : "#FFEDD2"}
            color={data?.delivered ? "#008A16" : "#F79E1B"}
          >
            {data?.delivered ? "Retrieved" : "Parked"}
          </Text>
        </Flex>
        <Box
          my="24px"
          bg="#fff"
          p="24px"
          border="1px solid #E4E6E8"
          borderRadius="12px"
        >
          <Text fontWeight={700}>Customer Details</Text>

          <Flex mt="24px" gap="16px" flexDir="column">
            <Layout
              label="Name"
              value={
                data?.customer?.profile?.firstName
                  ? `${data?.customer?.profile?.firstName} ${data?.customer?.profile?.lastName}`
                  : data?.vehicle?.customerName || "N/A"
              }
            />
            <Layout
              label="Phone Number"
              value={data?.customer?.profile?.phone || "N/A"}
            />
          </Flex>
        </Box>
        <Box bg="#fff" p="24px" border="1px solid #E4E6E8" borderRadius="12px">
          <Text fontWeight={700}>Car Details</Text>

          <Flex mt="24px" gap="16px" flexDir="column">
            <Layout
              label="Vehicle"
              value={`${data?.vehicle?.make?.name} ${data?.vehicle?.model?.name}`}
            />
            <Layout label="License Plate" value={data?.vehicle?.licensePlate} />
            <Layout label="Color" value={data?.vehicle?.color} />
          </Flex>
        </Box>
        <Box
          my="24px"
          bg="#fff"
          p="24px"
          border="1px solid #E4E6E8"
          borderRadius="12px"
        >
          <Text fontWeight={700}>Service Details</Text>

          <Flex mt="24px" gap="16px" flexDir="column">
            <Layout label="Location" value={data?.location?.name} />
            <Layout label="Zone" value={data?.zone?.name} />
            <Layout label="Date" value={formatDat(data?.timeIn)} />
            <Layout label="Entry Time" value={formatTime(data?.timeIn)} />
            <Layout label="Service Type" value={data?.initialRate?.name} />
          </Flex>
        </Box>
        <Box bg="#fff" p="24px" border="1px solid #E4E6E8" borderRadius="12px">
          <Text fontWeight={700}>Payment Details</Text>

          <Flex mt="24px" gap="16px" flexDir="column">
            <Layout
              label="Fee"
              value={`₦${Number(data?.amount)?.toLocaleString()}`}
            />
            <Layout
              label="Payment Method"
              value={
                PaymentMethods?.find(
                  (dat, i) => i === data?.payments[0]?.paymentMethod,
                ) || "N/A"
              }
            />
            <Layout
              label="Payment Status"
              value={data?.payments[0]?.amountPaid ? "Paid" : "Pending"}
            />
          </Flex>
        </Box>
      </Box>

      <Button
        onClick={() =>
          !data?.payments?.length ? open.onOpen() : handleSubmit()
        }
        bg="#EE383A"
        h="50px"
        isLoading={isLoading}
        w="full"
        mt="32px"
      >
        Retrieve Vehicle
      </Button>
    </Box>
  );
};

export default Details;

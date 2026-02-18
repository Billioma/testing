import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { formatDat, formatTime } from "../../../utils/helpers";
import { PaymentMethods } from "../../../components/common/constants";
import {
  useProcessEvent,
  useProcessReserve,
} from "../../../services/attendant/query/logs";
import useCustomToast from "../../../utils/notifications";
import { useNavigate } from "react-router-dom";
import { IoCarOutline } from "react-icons/io5";

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
  const type = localStorage.getItem("resType");
  const data = JSON.parse(localStorage.getItem("attRes"));
  const dataToMap = type === "Event" ? data : data[0];

  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();
  const { mutate: eventMutate, isLoading: isEvent } = useProcessEvent({
    onSuccess: (res) => {
      successToast(res?.message);
      navigate("/attendant/history");
      localStorage.removeItem("resType");
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred",
      );
    },
  });
  const { mutate: reserveMutate, isLoading: isReserve } = useProcessReserve({
    onSuccess: (res) => {
      successToast(res?.message);
      navigate("/attendant/history");
      localStorage.removeItem("resType");
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred",
      );
    },
  });

  const handleSubmit = () => {
    if (type === "Reserve") {
      reserveMutate(dataToMap?.id);
    } else {
      eventMutate(dataToMap?.id);
    }
  };

  return (
    <Box>
      <Box fontSize="14px" color="#242628">
        <Flex
          flexDir="column"
          align="center"
          justifyContent="center"
          bg="#fff"
          p="24px"
          border="1px solid #E4E6E8"
          borderRadius="12px"
        >
          <Text fontFamily="Recoleta" fontSize="24px" color="#242628">
            {dataToMap?.vehicle?.licensePlate}
          </Text>
          <Flex color="#444648" mt="8px" align="center" gap="5px">
            <IoCarOutline />
            <Text fontSize="14px">
              {dataToMap?.vehicle?.make?.name} {dataToMap?.vehicle?.model?.name}
            </Text>
          </Flex>
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
                dataToMap?.customer?.profile?.firstName
                  ? `${dataToMap?.customer?.profile?.firstName} ${dataToMap?.customer?.profile?.lastName}`
                  : dataToMap?.vehicle?.customerName || "N/A"
              }
            />
            <Layout
              label="Phone Number"
              value={dataToMap?.customer?.profile?.phone || "N/A"}
            />
          </Flex>
        </Box>

        <Box bg="#fff" p="24px" border="1px solid #E4E6E8" borderRadius="12px">
          <Text fontWeight={700}>Car Details</Text>

          <Flex mt="24px" gap="16px" flexDir="column">
            <Layout
              label="Vehicle"
              value={`${dataToMap?.vehicle?.make?.name} ${dataToMap?.vehicle?.model?.name}`}
            />
            <Layout
              label="License Plate"
              value={dataToMap?.vehicle?.licensePlate}
            />
            <Layout label="Color" value={dataToMap?.vehicle?.color} />
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
            <Layout label="Location" value={dataToMap?.location?.name} />
            <Layout label="Zone" value={dataToMap?.zone?.name} />
            <Layout label="Date" value={formatDat(dataToMap?.arrival)} />
            <Layout label="Time" value={formatTime(dataToMap?.arrival)} />
            <Layout label="Service Type" value={dataToMap?.service?.name} />
          </Flex>
        </Box>

        <Box bg="#fff" p="24px" border="1px solid #E4E6E8" borderRadius="12px">
          <Text fontWeight={700}>Payment Details</Text>

          <Flex mt="24px" gap="16px" flexDir="column">
            <Layout
              label="Fee"
              value={`₦ ${Number(dataToMap?.amount)?.toLocaleString()}`}
            />
            <Layout
              label="Payment Method"
              value={
                PaymentMethods?.find(
                  (dat, i) => i === dataToMap?.paymentMethod,
                ) || "N/A"
              }
            />
            <Layout
              label="Payment Status"
              value={dataToMap?.paymentStatus === 1 ? "Paid" : "Pending"}
            />
          </Flex>
        </Box>
      </Box>

      <Button
        onClick={handleSubmit}
        bg="#EE383A"
        h="50px"
        isLoading={isEvent || isReserve}
        w="full"
        mt="32px"
      >
        Process Reservation
      </Button>
    </Box>
  );
};

export default Details;

import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { formatDat, formatTime } from "../../../utils/helpers";
import { useProcessPtp } from "../../../services/attendant/query/logs";
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

const ParkDetails = () => {
  const data = JSON.parse(localStorage.getItem("attPtp"));

  const navigate = useNavigate();
  const { errorToast, successToast } = useCustomToast();
  const { mutate, isLoading } = useProcessPtp({
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
    mutate(data?.id);
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
            {data?.vehicle?.licensePlate}
          </Text>
          <Flex color="#444648" mt="8px" align="center" gap="5px">
            <IoCarOutline />
            <Text fontSize="14px">
              {data?.vehicle?.make?.name} {data?.vehicle?.model?.name}
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
            <Layout label="Location" value={data?.zone?.location?.name} />
            <Layout label="Zone" value={data?.zone?.name} />
            <Layout label="Date" value={formatDat(data?.createdAt)} />
            <Layout label="Time" value={formatTime(data?.createdAt)} />
            <Layout label="Service Type" value={data?.service?.name} />
          </Flex>
        </Box>

        <Box bg="#fff" p="24px" border="1px solid #E4E6E8" borderRadius="12px">
          <Text fontWeight={700}>Payment Details</Text>

          <Flex mt="24px" gap="16px" flexDir="column">
            <Layout
              label="Fee"
              value={`₦ ${Number(data?.amount)?.toLocaleString()}`}
            />
            <Layout
              label="Payment Status"
              value={data?.paymentStatus === 1 ? "Paid" : "Pending"}
            />
          </Flex>
        </Box>
      </Box>

      <Button
        onClick={handleSubmit}
        bg="#EE383A"
        h="50px"
        isLoading={isLoading}
        w="full"
        mt="32px"
      >
        Process Reservation
      </Button>
    </Box>
  );
};

export default ParkDetails;

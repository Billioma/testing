"use client";
import { useState } from "react";
import { Box, Button, Text, Flex, Grid } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import { formatDateTime, getNumbers } from "../../../utils/helpers";
import { useGetTickets } from "../../../services/operator/query/user";
import useCustomToast from "../../../utils/notifications";

const Tickets = () => {
  const [phone, setPhone] = useState("");

  const { errorToast, successToast } = useCustomToast();

  const { mutate, isLoading, data } = useGetTickets({
    onSuccess: (res) => {
      successToast(res?.message);
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred"
      );
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();
    mutate(phone);
  };

  return (
    <Box mt="50px" w="100%">
      <Box
        w={{ base: "100%", md: "unset" }}
        maxW={{ base: "100%", md: "400px" }}
      >
        <Text
          fontSize="20px"
          color="#242628"
          mb="32px"
          lineHeight="100%"
          fontWeight={500}
        >
          Ticket History
        </Text>
        <Flex gap={2} mb={5}>
          <CustomInput
            mb
            reserve
            holder="Enter phone number"
            type="tel"
            value={phone}
            onChange={(e) => {
              const numStr = getNumbers(e.target.value);
              setPhone(numStr);
            }}
          />

          <Button isLoading={isLoading} onClick={handleSearch}>
            Search
          </Button>
        </Flex>
      </Box>

      <Grid
        templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
        alignContent="center"
        gap="20px"
        w="full"
        display={data ? "grid" : "none"}
      >
        {data?.map((t) => (
          <Box
            key={t.id}
            p={4}
            border="1px solid #eee"
            w="full"
            fontSize="14px"
            borderRadius="12px"
            mb={3}
          >
            <Flex justify="space-between">
              <Text fontWeight={600}>{t.ticketNumber}</Text>
              <Flex
                bg={t.paymentStatus ? "#E5FFE5" : "#FEF1F1"}
                color={t.paymentStatus ? "#0B841D" : "#EE383A"}
                fontWeight={500}
                borderRadius="4px"
                p="4px 6px"
              >
                {t.paymentStatus ? "Paid" : "Unpaid"}
              </Flex>
            </Flex>

            <Flex align="center" mt="10px" justifyContent="space-between">
              <Text fontWeight={500}>Vehicle</Text>
              <Text>
                ({t?.vehicle?.licensePlate}) - {t?.vehicle?.color}
              </Text>
            </Flex>

            <Flex my="10px" align="center" justifyContent="space-between">
              <Text fontWeight={500}>Location</Text>
              <Text>
                {t?.location.name} ({t?.zone.name})
              </Text>
            </Flex>

            <Flex align="center" justifyContent="space-between">
              <Text fontWeight={500}>Time In</Text>
              <Text>{formatDateTime(t.timeIn)}</Text>
            </Flex>

            <Flex mt="10px" align="center" justifyContent="space-between">
              <Text fontWeight={500}>Amount</Text>
              <Text>₦ {Number(t.amount)?.toLocaleString()}</Text>
            </Flex>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default Tickets;

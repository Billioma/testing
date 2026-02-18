import { Box, Button, Flex, Text } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import { useState } from "react";
import { PiScan } from "react-icons/pi";
import { useCheckPtp } from "../../../services/attendant/query/logs";
import useCustomToast from "../../../utils/notifications";
import { useNavigate } from "react-router-dom";

const Park = () => {
  const [ticket, setTicket] = useState("");
  const { errorToast } = useCustomToast();
  const navigate = useNavigate();
  const attZone = JSON.parse(localStorage.getItem("attZone"));

  const { mutate, isLoading } = useCheckPtp({
    onSuccess: (res) => {
      localStorage.setItem("attPtp", JSON.stringify(res));
      navigate(`/attendant/park/${res?.id}`);
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred",
      );
    },
  });

  const handleSubmit = () => {
    mutate({ zoneId: attZone?.id, ticketNumber: ticket });
  };

  return (
    <Box>
      <Flex
        flexDir="column"
        gap="24px"
        bg="#fff"
        border="1px solid #E4E6E8"
        borderRadius="8px"
        p="20px 18px"
      >
        <Box>
          <Text mb="8px" color="#242628" fontSize="14px">
            Ticket No.
          </Text>

          <CustomInput
            value={ticket}
            holder="Enter Ticket No."
            onChange={(e) => setTicket(e.target.value)}
          />
        </Box>

        <Flex align="center" gap="10px">
          <Button
            isDisabled={!ticket}
            mt="24px"
            w="full"
            h="50px"
            onClick={handleSubmit}
            isLoading={isLoading}
          >
            Search Ticket
          </Button>

          <Button mt="24px" w="50px" h="50px">
            <PiScan size="25px" />
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Park;

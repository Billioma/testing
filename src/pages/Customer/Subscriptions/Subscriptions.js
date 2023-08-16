import React from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Add } from "../../../components/common/images";
import TableLayer from "../../../components/data/Customer/Subscription/TableLayer";
import { useNavigate } from "react-router-dom";

const Subscriptions = () => {
  const navigate = useNavigate();
  return (
    <Box minH="75vh">
      <Box bg="#fff" w="full" px="23px" py="24px" borderRadius="8px">
        <Flex
          align={{ base: "flex-start", md: "center" }}
          gap={{ base: "20px", md: "unset" }}
          flexDirection={{ base: "column", md: "row" }}
          justifyContent="space-between"
          w="full"
        >
          <Text color="#242628" fontWeight={500} lineHeight="100%">
            Subscriptions
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

        <TableLayer />
      </Box>
    </Box>
  );
};

export default Subscriptions;

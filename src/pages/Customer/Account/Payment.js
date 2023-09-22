import React from "react";
import { Box } from "@chakra-ui/react";
import TableLayer from "../../../components/data/Customer/Account/Payment/TableLayer";
import Cards from "../../../components/data/Customer/Account/Payment/Cards";

const Payment = () => {
  return (
    <Box minH="75vh">
      <Cards />
      <TableLayer />
    </Box>
  );
};

export default Payment;

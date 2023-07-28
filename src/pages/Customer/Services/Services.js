import React from "react";
import { Box } from "@chakra-ui/react";
import Service from "../../../components/data/Customer/Dashboard/Services";
import TableLayer from "../../../components/data/Services/TableLayer";

const Services = () => {
  return (
    <Box minH="75vh">
      <Service opt />
      <TableLayer />
    </Box>
  );
};

export default Services;

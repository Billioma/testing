import React from "react";
import { Box } from "@chakra-ui/react";
import Cards from "../../../components/data/Customer/Dashboard/Cards";
import Services from "../../../components/data/Customer/Dashboard/Services";
import TableLayer from "../../../components/data/Customer/Dashboard/TableLayer";

const Dashboard = () => {
  return (
    <Box minH="75vh">
      <Cards />
      <Services />
      <TableLayer />
    </Box>
  );
};

export default Dashboard;

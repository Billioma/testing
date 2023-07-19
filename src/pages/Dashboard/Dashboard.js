import React from "react";
import { Box } from "@chakra-ui/react";
import Cards from "../../components/data/Dashboard/Cards";
import Services from "../../components/data/Dashboard/Services";
import ActiveSessions from "../../components/data/Dashboard/ActiveSessions";

const Dashboard = () => {
  return (
    <Box minH="75vh">
      <Cards />
      <Services />
      <ActiveSessions />
    </Box>
  );
};

export default Dashboard;

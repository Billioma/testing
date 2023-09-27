import React from "react";
import { Box } from "@chakra-ui/react";
import TopUserSection from "../../../components/data/Admin/Dashboard/TopUserSection";
import ServicesSection from "../../../components/data/Admin/Dashboard/ServicesSection";
import ActivitySection from "../../../components/data/Admin/Dashboard/ActivitySection";

const Dashboard = () => {
  return (
    <Box>
      <TopUserSection />
      <ServicesSection />
      <ActivitySection />
    </Box>
  );
};

export default Dashboard;

import React from "react";
import { Box } from "@chakra-ui/react";
import VehicleCards from "../../../components/data/Customer/Vehicles/VehicleCards";
import { useGetVehicles } from "../../../services/query/vehicles";

const Vehicles = () => {
  return (
    <Box minH="75vh">
      <VehicleCards />
    </Box>
  );
};

export default Vehicles;

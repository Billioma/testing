import React from "react";
import { Box } from "@chakra-ui/react";
import VehicleCards from "../../../components/data/Customer/Vehicles/VehicleCards";
import { useGetStates } from "../../../services/customer/query/locations";

const Vehicles = () => {
  const { data: states } = useGetStates();
  return (
    <Box minH="75vh">
      <VehicleCards states={states} />
    </Box>
  );
};

export default Vehicles;

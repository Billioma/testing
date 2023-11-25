import React, { useEffect } from "react";
import { Box, useDisclosure } from "@chakra-ui/react";
import Cards from "../../../components/data/Customer/Dashboard/Cards";
import Services from "../../../components/data/Customer/Dashboard/Services";
import TableLayer from "../../../components/data/Customer/Dashboard/TableLayer";
import AddVehicleModal from "../../../components/modals/AddVehicleModal";
import {
  useGetMake,
  useGetModel,
  useGetVehicles,
} from "../../../services/customer/query/vehicles";
import {
  useGetProfile,
} from "../../../services/admin/query/auth";

const Dashboard = () => {
  const login = localStorage.getItem("login");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: models } = useGetModel();
  // const { data: dd } = useGetProfile();
  const {
    data: vehicles,
    isLoading,
    refetch: refetchVehicle,
  } = useGetVehicles();
  const { data: makes } = useGetMake();

  useEffect(() => {
    setTimeout(() => {
      if (login === "login" && vehicles?.data?.length === 0) {
        onOpen();
      }
    }, 2000);
  }, [login, vehicles]);

  return (
    <Box minH="75vh">
      <Cards
        vehicles={vehicles}
        isLoading={isLoading}
        refetchVehicle={refetchVehicle}
      />
      <Services />
      <TableLayer />

      <AddVehicleModal
        makes={makes}
        models={models}
        noVehicle
        refetch={refetchVehicle}
        isOpen={isOpen}
        onClose={onClose}
      />
    </Box>
  );
};

export default Dashboard;

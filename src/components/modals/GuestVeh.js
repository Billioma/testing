import React from "react";
import ModalLayout from "./ModalLayout";
import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const GuestVeh = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  return (
    <ModalLayout isOpen={isOpen} onClose={onClose}>
      <Flex flexDir="column" align="center">
        <Image src="/assets/check.png" w="112px" h="112px" />

        <Text mt="24px" mb="8px" fontFamily="Recoleta" fontSize="24px">
          Vehicle Not Found
        </Text>

        <Text my="20px" textAlign="center" fontSize="14px" mb="8px">
          Vehicle not found. Would you like to log this vehicle as a guest.
        </Text>

        <Button
          mt="32px"
          h="50px"
          borderRadius="8px"
          w="240px"
          bg="#EE383A"
          onClick={() => navigate("/attendant/vehicle/create")}
        >
          Log As Guest Vehicle
        </Button>
        <Button
          onClick={onClose}
          h="50px"
          w="full"
          bg="transparent"
          color="#EE383A"
        >
          Cancel
        </Button>
      </Flex>
    </ModalLayout>
  );
};

export default GuestVeh;

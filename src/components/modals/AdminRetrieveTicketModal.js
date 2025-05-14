import React from "react";
import { Flex, Text, Button } from "@chakra-ui/react";
import ModalLayout from "./ModalLayout";

const AdminRetrieveTicketModal = ({
  isOpen,
  handleSubmit,
  onClose,
  title,
  subTitle,
  isLoading,
  btnColor = "",
  headerColor = "#242628",
}) => {
  return (
    <ModalLayout isOpen={isOpen} onClose={onClose}>
      <Flex justifyContent="center" align="center" flexDir="column">
        <Text
          mb="14px"
          color={headerColor}
          fontWeight={700}
          fontSize="24px"
          lineHeight="100%"
        >
          {title}
        </Text>

        <Text fontSize="14px" color="#646668">
          {subTitle}
        </Text>
      </Flex>

      <Flex gap={4} mt={10}>
        <Button
          fontSize="14px"
          fontWeight={500}
          onClick={onClose}
          lineHeight="100%"
          w="45%"
          py="17px"
          variant="adminSecondary"
        >
          No
        </Button>

        <Button
          fontSize="14px"
          fontWeight={500}
          isLoading={isLoading}
          onClick={handleSubmit}
          lineHeight="100%"
          w="55%"
          py="17px"
          variant="adminPrimary"
          bg={btnColor}
        >
          Yes
        </Button>
      </Flex>
    </ModalLayout>
  );
};

export default AdminRetrieveTicketModal;

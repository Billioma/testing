import React from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import ModalLayout from "./ModalLayout";

const ConfirmDeleteModal = ({
  isOpen,
  cancel,
  onClose,
  admin,
  title,
  user,
  isLoading,
  action,
}) => {
  return (
    <ModalLayout isOpen={isOpen} onClose={onClose}>
      <Flex justifyContent="center" align="center" flexDir="column">
        <Text
          mb="32px"
          color="#242628"
          fontSize="24px"
          fontWeight={700}
          lineHeight="100%"
        >
          {cancel ? "Cancel" : user ? "Remove" : "Delete"} {title}
        </Text>

        <Text textAlign="center">
          Are you sure you want to{" "}
          {cancel ? "cancel" : user ? "remove" : "delete"} this{" "}
          <span style={{ textTransform: "lowercase" }}>{title}</span>?
        </Text>

        <Flex mt="32px" gap="24px" w="full" align="center">
          <Button
            onClick={onClose}
            bg="transparent"
            color="#0D0718"
            fontSize="14px"
            w="full"
            border="1px solid #0D0718"
            py="17px"
          >
            No
          </Button>
          <Button
            w="100%"
            bg={admin ? "#0D0718" : "red"}
            fontSize="14px"
            color="#fff"
            onClick={action}
            isLoading={isLoading}
          >
            Yes
          </Button>
        </Flex>
      </Flex>
    </ModalLayout>
  );
};

export default ConfirmDeleteModal;

import React from "react";
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

const ConfirmDeleteModal = ({
  isOpen,
  cancel,
  onClose,
  admin,
  title,
  isLoading,
  action,
}) => {
  return (
    <Modal isCentered trapFocus={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay backdropFilter="auto" backdropBlur="2px" />
      <ModalContent
        py="40px"
        px="20px"
        overflowY="auto"
        borderRadius="8px"
        bg="#fff"
        color="#000"
      >
        <ModalBody>
          <Flex justifyContent="center" align="center" flexDir="column">
            <Text
              mb="32px"
              color="#242628"
              fontSize="24px"
              fontWeight={700}
              lineHeight="100%"
            >
              {cancel ? "Cancel" : "Delete"} {title}
            </Text>

            <Text textAlign="center">
              Are you sure you want to {cancel ? "cancel" : "delete"} this{" "}
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
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmDeleteModal;

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

const ConfirmPaySubModal = ({ isOpen, dataa, onClose, isLoading, action }) => {
  return (
    <Modal isCentered trapFocus={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay backdropFilter="auto" backdropBlur="2px" />
      <ModalContent
        px="24px"
        py="40px"
        overflowY="auto"
        borderRadius="8px"
        bg="#fff"
        color="#000"
      >
        <ModalBody>
          <Text
            textAlign="center"
            color="#242628"
            fontWeight={700}
            fontSize="24px"
            lineHeight="100%"
          >
            Confirm Parking
          </Text>
          <Text
            textAlign="center"
            my="32px"
            color="#646668"
            fontSize="14px"
            lineHeight="100%"
          >
            You will be charged ₦{" "}
            {dataa?.amount?.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            }) || "0.00"}{" "}
            from your wallet to complete payment
          </Text>

          <Flex w="100%" gap="24px" align="center">
            <Button
              bg="transparent"
              color="#444648"
              fontSize="12px"
              onClick={onClose}
              w="100%"
              border="1px solid #444648"
              py="17px"
            >
              Cancel
            </Button>
            <Button
              w="100%"
              fontSize="12px"
              onClick={action}
              isLoading={isLoading}
            >
              Pay Now
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmPaySubModal;

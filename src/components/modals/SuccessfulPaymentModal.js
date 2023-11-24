import React from "react";
import {
  Box,
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

const SuccessfulPaymentModal = ({ isOpen, setShowCreate, onClose }) => {
  return (
    <Modal isCentered trapFocus={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay backdropFilter="auto" backdropBlur="2px" />
      <ModalContent
        pt="70px"
        pb="40px"
        px="24px"
        overflowY="auto"
        borderRadius="12px"
        bg="#fff"
        color="#000"
      >
        <ModalBody px="0">
          <Box>
            <Flex justifyContent="center" align="center">
              <Image src="/assets/success.svg" />
            </Flex>

            <Text
              fontFamily="Cooper"
              color="#444648"
              fontWeight={900}
              lineHeight="120%"
              textAlign="center"
              fontSize="24px"
              mt="24px"
            >
              Payment Successful
            </Text>

            <Flex mt="32px" w="full">
              <Button
                w="full"
                onClick={() => setShowCreate(true)}
                fontSize="13px"
                borderRadius="4px"
                py="17px"
              >
                Done
              </Button>
            </Flex>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SuccessfulPaymentModal;

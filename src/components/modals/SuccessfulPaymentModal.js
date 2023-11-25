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
  Spinner,
  Text,
} from "@chakra-ui/react";

const SuccessfulPaymentModal = ({
  isOpen,
  isCreating,
  setShowCreate,
  isError,
  onClose,
}) => {
  return (
    <Modal
      isCentered
      closeOnOverlayClick={false}
      trapFocus={false}
      isOpen={isOpen}
      onClose={onClose}
    >
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
                isDisabled={isCreating || isError}
                borderRadius="4px"
                py="17px"
              >
                {isCreating ? (
                  <Flex align="center" gap="8px">
                    <Spinner size="sm" /> Inititing Pay-To-Park
                  </Flex>
                ) : isError ? (
                  "Session Failed"
                ) : (
                  "Done"
                )}
              </Button>
            </Flex>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SuccessfulPaymentModal;

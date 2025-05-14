import React from "react";
import { Box, Button, Flex, Image, Spinner, Text } from "@chakra-ui/react";
import ModalLayout from "./ModalLayout";

const SuccessfulPaymentModal = ({
  isOpen,
  isCreating,
  setShowCreate,
  isError,
  onClose,
}) => {
  return (
    <ModalLayout isOpen={isOpen} onClose={onClose}>
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
    </ModalLayout>
  );
};

export default SuccessfulPaymentModal;

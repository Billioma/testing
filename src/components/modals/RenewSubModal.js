import React from "react";
import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { BsCheckCircle } from "react-icons/bs";

const RenewSubModal = ({
  isOpen,
  cards,
  userData,
  values,
  setValues,
  handleRenew,
  onClose,
  isLoading,
  action,
}) => {
  const close = () => {
    onClose();
    setValues({
      cardId: "",
      paymentMethod: "",
      amount: "",
    });
  };

  return (
    <Modal isCentered trapFocus={false} isOpen={isOpen} onClose={close}>
      <ModalOverlay backdropFilter="auto" backdropBlur="2px" />
      <ModalContent
        py="32px"
        px="24px"
        overflowY="auto"
        borderRadius="12px"
        bg="#fff"
        color="#000"
      >
        <ModalBody px="0">
          <Box>
            <Flex align="center" flexDirection="column">
              <Text
                color="#444648"
                fontSize="24px"
                fontWeight={700}
                lineHeight="100%"
              >
                Renew Subscription
              </Text>
            </Flex>

            <Box my="24px">
              <Text fontSize="14px" mb="8px">
                Pay with Wallet
              </Text>
              <Box
                cursor="pointer"
                onClick={() =>
                  setValues({
                    ...values,
                    paymentMethod: "1",
                  })
                }
                border={
                  values?.paymentMethod === "1"
                    ? "1px solid #0B841D"
                    : "1px solid #D4D6D8"
                }
                borderRadius="4px"
                p="16px"
              >
                <Flex align="center" w="full" justifyContent="space-between">
                  <Box>
                    <Text
                      color="#444648"
                      fontSize="10px"
                      lineHeight="100%"
                      mb="8px"
                    >
                      Wallet
                    </Text>
                    <Text fontSize="14px" color="#646668" lineHeight="100%">
                      <span style={{ fontWeight: 500 }}> Balance: </span> ₦{" "}
                      {userData?.wallet?.balance?.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }) || "0.00"}
                    </Text>
                  </Box>

                  {values?.paymentMethod === "1" && (
                    <Box>
                      <BsCheckCircle color="#0B841D" />
                    </Box>
                  )}
                </Flex>
              </Box>
            </Box>

            <Box>
              <Text fontSize="14px" mb="8px">
                Pay with Card
              </Text>
              {cards?.data?.length
                ? cards?.data?.map((dat, i) => (
                    <Box key={i}>
                      <Box
                        mb="16px"
                        cursor="pointer"
                        border={
                          values?.paymentMethod === "0" &&
                          values?.cardId === dat?.id
                            ? "1px solid #0B841D"
                            : "1px solid #D4D6D8"
                        }
                        onClick={() =>
                          setValues({
                            ...values,
                            cardId: dat?.id,
                            paymentMethod: "0",
                          })
                        }
                        borderRadius="4px"
                        p="16px"
                      >
                        <Flex
                          align="center"
                          w="full"
                          justifyContent="space-between"
                        >
                          <Box>
                            <Text
                              color="#444648"
                              fontSize="12px"
                              lineHeight="100%"
                              mb="8px"
                            >
                              Card Details
                            </Text>
                            <Text
                              fontSize="14px"
                              textTransform="capitalize"
                              color="#646668"
                              lineHeight="100%"
                            >
                              {dat?.cardType} Ending *****{dat?.last4}
                            </Text>
                          </Box>

                          {values?.paymentMethod === "0" &&
                            values?.cardId === dat?.id && (
                              <Box>
                                <BsCheckCircle color="#0B841D" />
                              </Box>
                            )}
                        </Flex>
                      </Box>
                    </Box>
                  ))
                : ""}

              <Text
                color="red"
                onClick={action}
                fontSize="12px"
                mt="8px"
                _hover={{ textDecor: "underline" }}
                textAlign="end"
                cursor="pointer"
                lineHeight="100%"
                fontWeight={500}
              >
                Add a Card
              </Text>
            </Box>

            <Flex mt="24px" w="100%" gap="24px" align="center">
              <Button
                bg="transparent"
                color="#0D0718"
                fontSize="14px"
                onClick={close}
                w="full"
                border="1px solid #0D0718"
                py="25px"
              >
                Cancel
              </Button>
              <Button
                w="100%"
                py="25px"
                fontSize="12px"
                onClick={handleRenew}
                isDisabled={!values?.paymentMethod}
                isLoading={isLoading}
              >
                Renew Subscription
              </Button>
            </Flex>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default RenewSubModal;

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
import { formatDate } from "../../utils/helpers";

const ConfirmEventModal = ({
  isOpen,
  values,
  event,
  start,
  onClose,
  isLoading,
  action,
}) => {
  return (
    <Modal isCentered trapFocus={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay backdropFilter="auto" backdropBlur="2px" />
      <ModalContent
        px="24px"
        py="40px"
        overflowY="auto"
        borderRadius="12px"
        bg="#fff"
        color="#000"
      >
        <ModalBody px="0">
          <Flex
            border="1px solid #D4D6D8"
            borderRadius="8px"
            p="24px"
            flexDir="column"
          >
            <Flex flexDir="column" justifyContent="center" align="center">
              <Image w="40px" h="40px" src="/assets/event.png" />
              <Text
                mt="16px"
                mb="32px"
                color="#242628"
                fontWeight={500}
                lineHeight="100%"
              >
                Confirm Event Parking
              </Text>
            </Flex>

            <Box>
              <Flex align="center" justifyContent="space-between" w="full">
                <Text
                  color="#848688"
                  w="full"
                  fontSize="14px"
                  lineHeight="100%"
                  fontWeight={500}
                >
                  Location
                </Text>
                <Text
                  color="#242628"
                  textAlign="end"
                  w="full"
                  fontSize="14px"
                  lineHeight="100%"
                  fontWeight={500}
                >
                  {event?.address}
                </Text>
              </Flex>

              <Flex
                my="24px"
                align="center"
                justifyContent="space-between"
                w="full"
              >
                <Text
                  color="#848688"
                  w="full"
                  fontSize="14px"
                  lineHeight="100%"
                  fontWeight={500}
                >
                  Reserved Date
                </Text>
                <Text
                  color="#242628"
                  textAlign="end"
                  w="full"
                  fontSize="14px"
                  lineHeight="100%"
                  fontWeight={500}
                >
                  {start}
                </Text>
              </Flex>

              <Flex align="center" justifyContent="space-between" w="full">
                <Text
                  color="#848688"
                  w="full"
                  fontSize="14px"
                  lineHeight="100%"
                  fontWeight={500}
                >
                  Start Date
                </Text>
                <Text
                  color="#242628"
                  textAlign="end"
                  w="full"
                  fontSize="14px"
                  lineHeight="100%"
                  fontWeight={500}
                >
                  {formatDate(event?.eventStartDateTime)}
                </Text>
              </Flex>

              <Flex
                my="24px"
                align="center"
                justifyContent="space-between"
                w="full"
              >
                <Text
                  color="#848688"
                  w="full"
                  fontSize="14px"
                  lineHeight="100%"
                  fontWeight={500}
                >
                  End Date
                </Text>
                <Text
                  color="#242628"
                  textAlign="end"
                  w="full"
                  fontSize="14px"
                  lineHeight="100%"
                  fontWeight={500}
                >
                  {formatDate(event?.eventEndDateTime)}
                </Text>
              </Flex>

              <Flex align="center" justifyContent="space-between" w="full">
                <Text
                  color="#848688"
                  w="full"
                  fontSize="14px"
                  lineHeight="100%"
                  fontWeight={500}
                >
                  Selected Vehicle
                </Text>
                <Text
                  color="#242628"
                  textAlign="end"
                  w="full"
                  fontSize="14px"
                  lineHeight="100%"
                  fontWeight={500}
                >
                  {values?.vehicle?.main}
                </Text>
              </Flex>

              <Flex
                mt="24px"
                align="center"
                justifyContent="space-between"
                w="full"
              >
                <Text
                  color="#848688"
                  w="full"
                  fontSize="14px"
                  lineHeight="100%"
                  fontWeight={500}
                >
                  Amount
                </Text>
                <Text
                  color="#242628"
                  textAlign="end"
                  w="full"
                  fontSize="14px"
                  lineHeight="100%"
                  fontWeight={500}
                >
                  ₦{" "}
                  {event?.price?.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  }) || "0.00"}
                </Text>
              </Flex>
            </Box>
          </Flex>

          <Flex mt="32px" w="100%" gap="24px" align="center">
            <Button
              bg="transparent"
              color="#444648"
              fontSize="12px"
              onClick={onClose}
              w="70%"
              border="1px solid #444648"
              py="17px"
            >
              Go Back
            </Button>
            <Button
              w="100%"
              fontSize="12px"
              onClick={action}
              isLoading={isLoading}
            >
              Confirm Reservation
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmEventModal;

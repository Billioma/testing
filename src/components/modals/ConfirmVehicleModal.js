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

const ConfirmVehicleModal = ({
  isOpen,
  values,
  onClose,
  isLoading,
  action,
}) => {
  return (
    <Modal isCentered trapFocus={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay backdropFilter="auto" backdropBlur="2px" />
      <ModalContent
        py="24px"
        px="24px"
        overflowY="auto"
        borderRadius="12px"
        bg="#fff"
        color="#000"
      >
        <ModalBody px="0">
          <Flex justifyContent="center" align="center" flexDir="column">
            <Image w="56px" h="40px" src="/assets/car.png" />
            <Text
              mt="25px"
              color="#444648"
              fontWeight={700}
              textAlign="center"
              lineHeight="100%"
            >
              Record Exists!
            </Text>
            <Text mt="8px" fontSize="14px" mb="24px">
              Confirm this is your vehicle?
            </Text>

            <Box bg="#F4F6F8" borderRadius="8px" minW="65%" p="16px">
              <Flex align="center" justifyContent="space-between" w="full">
                <Box>
                  <Text
                    color="#848688"
                    fontSize="10px"
                    lineHeight="100%"
                    fontWeight={700}
                  >
                    Vehicle
                  </Text>
                  <Text
                    mt="8px"
                    color="#242628"
                    fontSize="14px"
                    lineHeight="100%"
                    fontWeight={500}
                  >
                    {values?.make?.label} {values?.model?.label}
                  </Text>
                </Box>

                <Box>
                  <Text
                    color="#848688"
                    fontSize="10px"
                    lineHeight="100%"
                    fontWeight={700}
                  >
                    Color
                  </Text>
                  <Text
                    mt="8px"
                    color="#242628"
                    fontSize="14px"
                    lineHeight="100%"
                    fontWeight={500}
                  >
                    {values?.color?.label}
                  </Text>
                </Box>
              </Flex>

              <Flex
                mt="32px"
                align="center"
                justifyContent="space-between"
                w="full"
              >
                <Box>
                  <Text
                    color="#848688"
                    fontSize="10px"
                    lineHeight="100%"
                    fontWeight={700}
                  >
                    License Plate
                  </Text>
                  <Text
                    mt="8px"
                    color="#242628"
                    fontSize="14px"
                    lineHeight="100%"
                    fontWeight={500}
                  >
                    {values?.plate}
                  </Text>
                </Box>

                <Box>
                  <Text
                    color="#848688"
                    fontSize="10px"
                    lineHeight="100%"
                    fontWeight={700}
                  >
                    State
                  </Text>
                  <Text
                    mt="8px"
                    color="#242628"
                    fontSize="14px"
                    lineHeight="100%"
                    fontWeight={500}
                  >
                    {values?.state}
                  </Text>
                </Box>
              </Flex>
            </Box>

            <Flex mt="24px" w="65%" gap="24px" align="center">
              <Button
                bg="transparent"
                color="#444648"
                fontSize="12px"
                onClick={onClose}
                w="50%"
                border="1px solid #444648"
                py="17px"
              >
                No, Edit
              </Button>
              <Button
                w="100%"
                fontSize="12px"
                onClick={action}
                isLoading={isLoading}
              >
                Yes, Save
              </Button>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmVehicleModal;

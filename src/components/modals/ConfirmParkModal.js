import React from "react";
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import ModalLayout from "./ModalLayout";

const ConfirmParkModal = ({
  isOpen,
  dataa,
  values,
  onClose,
  isLoading,
  action,
}) => {
  return (
    <ModalLayout isOpen={isOpen} onClose={onClose}>
      <Flex
        border="1px solid #D4D6D8"
        borderRadius="8px"
        p="24px"
        flexDir="column"
      >
        <Flex flexDir="column" justifyContent="center" align="center">
          <Image w="40px" h="40px" src="/assets/park-confirm.png" />
          <Text
            mt="16px"
            mb="32px"
            color="#242628"
            fontWeight={500}
            lineHeight="100%"
          >
            Confirm Parking
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
              {dataa?.location?.name}
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
              Zone
            </Text>
            <Text
              color="#242628"
              textAlign="end"
              w="full"
              fontSize="14px"
              lineHeight="100%"
              fontWeight={500}
            >
              {dataa?.name}
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
              Parking Type
            </Text>
            <Text
              color="#242628"
              textAlign="end"
              w="full"
              fontSize="14px"
              lineHeight="100%"
              fontWeight={500}
            >
              {dataa?.service?.name}
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
              {values?.vehicle?.make}
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
              {values?.paymentMethod === "3"
                ? `${values?.serviceType?.amount / 100} Points`
                : `₦ 
                  ${
                    values?.serviceType?.amount?.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    }) || "0.00"
                  }`}
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
        <Button w="100%" fontSize="12px" onClick={action} isLoading={isLoading}>
          Confirm Parking
        </Button>
      </Flex>
    </ModalLayout>
  );
};

export default ConfirmParkModal;

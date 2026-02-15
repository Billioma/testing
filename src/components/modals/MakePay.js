import React, { useState } from "react";
import ModalLayout from "./ModalLayout";
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { attStyles, customStyles, PaymentMethods } from "../common/constants";
import { IoIosArrowDown } from "react-icons/io";
import Select from "react-select";

const MakePay = ({ isOpen, onClose, method, setMethod, action, isLoading }) => {
  const payOptions = PaymentMethods?.slice(0, 4)?.map((method, index) => ({
    value: index,
    label: method,
  }));

  return (
    <ModalLayout isOpen={isOpen} onClose={onClose}>
      <Flex flexDir="column" align="center">
        <Image src="/assets/check.png" w="112px" h="112px" />

        <Text mt="24px" mb="8px" fontFamily="Recoleta" fontSize="24px">
          Payment Not Found
        </Text>

        <Box w="full" my="20px">
          <Text fontSize="14px" textAlign="center" mb="8px">
            Select payment method <span style={{ color: "tomato" }}>*</span>
          </Text>

          <Select
            styles={customStyles}
            options={payOptions}
            placeholder="Payment Method"
            value={method}
            defaultValue={method}
            components={{
              IndicatorSeparator: () => <div style={{ display: "none" }}></div>,
              DropdownIndicator: () => (
                <IoIosArrowDown size="15px" color="#646668" />
              ),
            }}
            onChange={(selectedOption) => {
              setMethod(selectedOption);
            }}
          />
        </Box>

        <Button
          mt="32px"
          h="50px"
          borderRadius="8px"
          w="240px"
          bg="#EE383A"
          onClick={action}
          isLoading={isLoading}
          isDisabled={!method}
        >
          Proceed to log payment
        </Button>
        <Button
          onClick={() => {
            onClose();
            setMethod("");
          }}
          h="50px"
          w="full"
          bg="transparent"
          color="#EE383A"
        >
          Cancel
        </Button>
      </Flex>
    </ModalLayout>
  );
};

export default MakePay;

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
import { MdClose } from "react-icons/md";
import DateTimePicker from "../data/Admin/DateTimePicker";
import { customStyles, types } from "../common/constants";
import Select from "react-select";
import { IoIosArrowDown } from "react-icons/io";

const ApproveDeny = ({
  isOpen,
  approve,
  med,
  reject,
  isApprove,
  loan,
  isReject,
  values,
  setValues,
  type,
  onClose,
}) => {
  const action = () => {
    type === "approve" ? approve() : reject();
  };

  const typesOptions = types?.map((type) => ({
    value: type?.value,
    label: type?.label,
  }));
  return (
    <Modal isCentered trapFocus={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay backdropFilter="auto" backdropBlur="2px" />
      <ModalContent
        px="32px"
        py="24px"
        h={type === "decline" || med ? "" : "600px"}
        overflowY="auto"
        borderRadius="8px"
        bg="#fff"
        color="#000"
      >
        <ModalBody px="0">
          <Flex align="center" justifyContent="space-between" w="full">
            <Flex align="center" gap="8px">
              <Image
                src={
                  type === "decline" ? "/assets/trash.svg" : "/assets/warn.jpg"
                }
                w="24px"
                h="24px"
              />

              <Text
                textTransform="capitalize"
                fontWeight={500}
                color={type === "decline" ? "red" : "#09020c"}
              >
                {type} {loan ? "Loan" : med ? "medical request" : "Leave"}?
              </Text>
            </Flex>

            <Flex
              border="1px solid #090C02"
              rounded="full"
              p="3px"
              cursor={isApprove || isReject ? "" : "pointer"}
              onClick={() => (isApprove || isReject ? "" : onClose())}
              justifyContent="center"
              align="center"
            >
              <MdClose size="12px" />
            </Flex>
          </Flex>

          <Text my="24px" color="#000">
            You’re about to {type} this{" "}
            {loan ? "loan" : med ? "medical request" : "leave"}, this action
            cannot be undone.
          </Text>

          <Flex
            gap="12px"
            flexDir="column"
            display={type === "approve" && !med ? "flex" : "none"}
          >
            <Box>
              <Text fontSize="13px" mb="8px" color="#444648" fontWeight={500}>
                Start Date
              </Text>
              <DateTimePicker
                selectedDate={values?.startDate}
                onChange={(date) => {
                  setValues({ ...values, startDate: date });
                }}
              />
            </Box>

            <Box>
              <Text fontSize="13px" mb="8px" color="#444648" fontWeight={500}>
                End Date
              </Text>
              <DateTimePicker
                selectedDate={values?.endDate}
                onChange={(date) => {
                  setValues({ ...values, endDate: date });
                }}
              />
            </Box>

            <Box>
              <Text fontSize="13px" mb="8px" color="#444648" fontWeight={500}>
                Type
              </Text>
              <Select
                styles={customStyles}
                options={typesOptions}
                components={{
                  IndicatorSeparator: () => (
                    <div style={{ display: "none" }}></div>
                  ),
                  DropdownIndicator: () => (
                    <div>
                      <IoIosArrowDown size="15px" color="#646668" />
                    </div>
                  ),
                }}
                value={values?.isPaid}
                onChange={(selectedOption) =>
                  setValues({ ...values, isPaid: selectedOption })
                }
              />
            </Box>
          </Flex>

          <Flex gap="24px" mt="12px" justifyContent="flex-end" align="center">
            <Button
              border="1px solid #999999"
              color="#999999"
              onClick={onClose}
              bg="transparent"
              variant="adminPrimary"
              h="48px"
            >
              Cancel
            </Button>
            <Button
              onClick={action}
              isLoading={isApprove || isReject}
              variant="adminPrimary"
              h="48px"
            >
              Proceed
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ApproveDeny;

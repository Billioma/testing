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
import Calendar from "react-calendar";
import { convertToDateTimeString, formatDate } from "../../utils/helpers";

const StartnEnd = ({
  isOpen,
  setShowEndDate,
  showEndDate,
  showStartDate,
  setShowStartDate,
  startChange,
  startValue,
  endChange,
  endValue,
  onClose,
}) => {
  const disableNonSunday = ({ date }) => {
    return date.getDay() !== 0;
  };

  const addNonSundayClass = ({ date }) => {
    return date.getDay() !== 0 ? "greyed-out" : null;
  };

  const getNextSaturday = (date) => {
    const nextSaturday = new Date(date);
    nextSaturday.setDate(date.getDate() + 6);
    return nextSaturday;
  };

  return (
    <Modal isCentered trapFocus={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay backdropFilter="auto" backdropBlur="2px" />
      <ModalContent
        px="27px"
        py="24px"
        overflowY="auto"
        h={showStartDate ? "29rem" : showEndDate ? "34rem" : "unset"}
        borderRadius="8px"
        bg="#fff"
        color="#000"
      >
        <ModalBody px="0">
          <Flex align="center" justifyContent="space-between" w="full">
            <Flex align="center" gap="8px">
              <Image src="/assets/warn.jpg" w="24px" h="24px" />

              <Text textTransform="capitalize" fontWeight={500} color="#09020c">
                Select Timeframe
              </Text>
            </Flex>
          </Flex>

          <Text my="24px" color="#000">
            Choose a starting date to view your schedule for the week.
          </Text>

          <Flex gap="12px" flexDir="column">
            <Box>
              <Text fontSize="12px" mb="8px" color="#444648" fontWeight={500}>
                From Date
              </Text>
              <Box pos="relative" w="100%" className="box">
                <Flex
                  border={
                    startValue
                      ? "1px solid #DCE7FF"
                      : "1px solid rgba(15, 23, 43, 0.3)"
                  }
                  h="44px"
                  w="100%"
                  onClick={() => {
                    setShowStartDate(true);
                    setShowEndDate(false);
                  }}
                  bg={startValue ? "#E8EEFD" : "transparent"}
                  borderRadius="8px"
                  cursor="pointer"
                  gap="10px"
                  align="center"
                  p="12px"
                >
                  <Image src="/assets/calendar.svg" w="22px" h="22px" />
                  <Text
                    fontSize="13px"
                    color={startValue ? "#444648" : "#B4B4B4"}
                  >
                    {formatDate(startValue) || "dd/mm/yyyy"}
                  </Text>
                </Flex>

                {showStartDate && (
                  <Box
                    className="box alt-calendar"
                    pos="absolute"
                    top="50"
                    w="full"
                    onClick={(e) => e.stopPropagation()}
                    zIndex="3"
                  >
                    <Calendar
                      onChange={(e) => {
                        const date = convertToDateTimeString(e);
                        startChange(date);
                        const endDate = getNextSaturday(new Date(date));
                        endChange(convertToDateTimeString(endDate));
                        setShowStartDate(false);
                      }}
                      value={startValue}
                      tileDisabled={disableNonSunday}
                      tileClassName={addNonSundayClass}
                    />
                  </Box>
                )}
              </Box>
            </Box>

            <Box>
              <Text fontSize="12px" mb="8px" color="#444648" fontWeight={500}>
                To Date
              </Text>
              <Box pos="relative" w="100%" className="box alt-calendar">
                <Flex
                  border={
                    endValue
                      ? "1px solid #DCE7FF"
                      : "1px solid rgba(15, 23, 43, 0.3)"
                  }
                  h="44px"
                  w="100%"
                  bg={endValue ? "#E8EEFD" : "transparent"}
                  borderRadius="8px"
                  cursor="not-allowed"
                  gap="10px"
                  align="center"
                  p="12px"
                >
                  <Image src="/assets/calendar.svg" w="22px" h="22px" />
                  <Text
                    fontSize="13px"
                    color={endValue ? "#444648" : "#B4B4B4"}
                  >
                    {formatDate(endValue) || "dd/mm/yyyy"}
                  </Text>
                </Flex>
              </Box>
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
            <Button onClick={onClose} variant="adminPrimary" h="48px">
              Apply
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default StartnEnd;

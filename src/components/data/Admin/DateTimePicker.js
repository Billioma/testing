import React from "react";
import { Box, Button, Flex, Icon, useDisclosure } from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatDate } from "../../../utils/helpers";

const DateTimePicker = ({
  onChange,
  selectedDate = new Date(),
  hasTime = false,
  isDisabled = false,
}) => {
  const { onOpen } = useDisclosure();

  const handleDateChange = (date) => {
    const temp = formatDate(date, null, hasTime);
    onChange(temp);
  };

  return (
    <Flex align="center">
      <DatePicker
        selected={new Date(selectedDate)}
        isDisabled={isDisabled}
        onChange={handleDateChange}
        showTimeSelect={hasTime}
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="MMMM d, yyyy h:mm aa"
        popperPlacement="bottom-end"
        popperModifiers={{
          flip: {
            enabled: false,
          },
          preventOverflow: {
            enabled: true,
          },
        }}
        customInput={
          <Box
            as={Button}
            onClick={onOpen}
            rightIcon={<Icon as={CalendarIcon} />}
            h={"44px"}
            w="100%"
            justifyContent={"space-between"}
            bg="#fff"
            color={"#000"}
            border={"1px solid #D4D6D8"}
            fontWeight={400}
            textAlign={"left"}
          >
            {formatDate(selectedDate, null, hasTime)}
          </Box>
        }
      />
    </Flex>
  );
};

export default DateTimePicker;

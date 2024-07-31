import React from "react";
import {
  Box,
  Button,
  Flex,
  Icon,
  Select,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatNewDates } from "../../../utils/helpers";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const parseFormattedDate = (dateString) => {
  if (!dateString) return new Date();
  if (typeof dateString === "string") {
    const [datePart, timePart] = dateString.split(" ");
    const [year, month, day] = datePart.split("-").map(Number);
    if (timePart) {
      const [hours, minutes] = timePart.split(":").map(Number);
      return new Date(year, month - 1, day, hours, minutes);
    }
    return new Date(year, month - 1, day);
  }
  return new Date(dateString);
};


const DateTimePicker = ({
  onChange,
  selectedDate = new Date(),
  hasTime = false,
  isDisabled = false,
}) => {
  const { onOpen } = useDisclosure();

  const handleDateChange = (date) => {
    onChange(date);
  };

  const isValidDate = (date) => !isNaN(new Date(date).getTime());

  return (
    <Flex align="center">
      <DatePicker
        selected={isValidDate(selectedDate) ? parseFormattedDate(selectedDate) : new Date()}
        disabled={isDisabled}
        onChange={handleDateChange}
        showTimeSelect={hasTime}
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="MMMM d, yyyy h:mm aa"
        popperPlacement="bottom-end"
        popperModifiers={[
          {
            name: "flip",
            enabled: true,
          },
          {
            name: "preventOverflow",
            options: {
              boundary: "viewport",
            },
          },
        ]}
        showMonthDropdown
        showYearDropdown
        showMonthYearDropdown
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <Flex justifyContent="space-between" px="10px">
            <IoIosArrowBack
              size="18px"
              cursor={prevMonthButtonDisabled ? "" : "pointer"}
              onClick={() => (prevMonthButtonDisabled ? "" : decreaseMonth())}
            />

            <Select
              bg="transparent"
              h="20px"
              fontSize="14px"
              w="fit-content"
              cursor="pointer"
              value={date.getMonth()}
              onChange={({ target: { value } }) => changeMonth(value)}
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i}>
                  {new Date(0, i).toLocaleString("en", { month: "long" })}
                </option>
              ))}
            </Select>

            <Select
              bg="transparent"
              h="20px"
              fontSize="14px"
              w="fit-content"
              cursor="pointer"
              value={date.getFullYear()}
              onChange={({ target: { value } }) => changeYear(value)}
            >
              {Array.from({ length: 300 }, (_, i) => (
                <option key={i} value={i + 1900}>
                  {i + 1900}
                </option>
              ))}
            </Select>

            <IoIosArrowForward
              size="18px"
              cursor={nextMonthButtonDisabled ? "" : "pointer"}
              onClick={() => (nextMonthButtonDisabled ? "" : increaseMonth())}
            />
          </Flex>
        )}
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
            {formatNewDates(selectedDate, null, hasTime)}
          </Box>
        }
      />
    </Flex>
  );
};

export default DateTimePicker;

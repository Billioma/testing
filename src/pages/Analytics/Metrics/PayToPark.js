import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import StartEnd from "../../../components/modals/StartEnd";
import { formatDates } from "../../../utils/helpers";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { PiExportLight } from "react-icons/pi";
import Select from "react-select";
import { IoStar } from "react-icons/io5";
import Types from "../../../components/data/Analytics/Metrics/PayToPark/Types";
import LocationDistro from "../../../components/data/Analytics/Metrics/PayToPark/LocationDistro";
import PaidUnpaid from "../../../components/data/Analytics/Metrics/PayToPark/PaidUnpaid";
import Paid from "../../../components/data/Analytics/Metrics/PayToPark/Paid";
import Transaction from "../../../components/data/Analytics/Metrics/PayToPark/Transaction";
import Sessions from "../../../components/data/Analytics/Metrics/PayToPark/Sessions";

const PayToPark = () => {
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minWidth: "100px",
      minHeight: "40px",
      color: "#646668",
      fontSize: "16px",
      cursor: "pointer",
      borderRadius: "8px",
      border: state.hasValue ? "none" : "1px solid #D4D6D8",
      paddingRight: "16px",
      background: state.hasValue ? "#f4f6f8" : "unset",
      boxShadow: state.isFocused ? "none" : "none",
      "&:hover": {
        boxShadow: "none",
      },
    }),
    menu: (provided) => ({
      ...provided,
      fontSize: "15px",
      backgroundColor: "#fff",
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isFocused ? "" : "",
      backgroundColor: state.isFocused ? "#f4f6f8" : "",
    }),
  };
  const [filter, setFilter] = useState("");
  const [showEndDate, setShowEndDate] = useState(false);
  const [startValue, startChange] = useState(new Date());
  const [endValue, endChange] = useState(new Date());
  const [showStartDate, setShowStartDate] = useState(false);

  const {
    isOpen: isDateOpen,
    onClose: onDateClose,
    onOpen: onDateOpen,
  } = useDisclosure();

  const filterOptions = ["This Month", "Last 3 Months"]?.map((time) => ({
    value: time,
    label: time,
  }));

  return (
    <Box minH="75vh">
      <Flex
        align="center"
        justifyContent="space-between"
        border="1px solid #d4d6d8"
        borderRadius="8px"
        flexDir={{ base: "column", md: "row" }}
        gap={{ base: "20px", md: "unset" }}
        p="24px 23px"
      >
        <Flex align="center" gap="4px" color="#444648" fontSize="12px">
          <Flex
            align="center"
            gap="8px"
            onClick={onDateOpen}
            bg="#F4F6F8"
            cursor="pointer"
            py="12px"
            px="16px"
            borderRadius="4px"
          >
            <Image
              src="/assets/calendar.svg"
              w="20px"
              h="20px"
              objectFit="contain"
            />
            <Text>{formatDates(startValue)}</Text>
          </Flex>

          <IoIosArrowForward size="20px" />

          <Flex
            align="center"
            gap="8px"
            onClick={onDateOpen}
            bg="#F4F6F8"
            cursor="pointer"
            py="12px"
            px="16px"
            borderRadius="4px"
          >
            <Image
              src="/assets/calendar.svg"
              w="20px"
              h="20px"
              objectFit="contain"
            />
            <Text>{formatDates(endValue)}</Text>
          </Flex>
        </Flex>

        <Flex align="center" gap="24px">
          <Box w={{ base: "100%", md: "unset" }}>
            <Select
              styles={customStyles}
              options={filterOptions}
              placeholder="All Time"
              value={filter}
              defaultValue={filter}
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
              onChange={(selectedOption) => setFilter(selectedOption)}
            />
          </Box>

          <Box w={{ base: "100%", md: "unset" }}>
            <Button
              display="flex"
              bg="#000"
              _hover={{ bg: "#000" }}
              borderRadius="8px"
              _active={{ bg: "#000" }}
              _focus={{ bg: "#000" }}
              gap="8px"
            >
              <Text>Export Data</Text>
              <PiExportLight size="20px" />
            </Button>
          </Box>

          <Flex
            justifyContent="center"
            align="center"
            cursor="pointer"
            display={{ base: "none", md: "flex" }}
            transition=".3s ease-in-out"
            _hover={{ bg: "#F4F6F8" }}
            borderRadius="8px"
            border="1px solid #848688"
            p="10px"
          >
            <Image
              src="/assets/refresh.svg"
              // className={isRefetch && "mirrored-icon"}
              w="20px"
              h="20px"
            />
          </Flex>
        </Flex>
        <StartEnd
          startValue={startValue}
          startChange={startChange}
          endValue={endValue}
          endChange={endChange}
          showStartDate={showStartDate}
          setShowStartDate={setShowStartDate}
          showEndDate={showEndDate}
          setShowEndDate={setShowEndDate}
          isOpen={isDateOpen}
          onClose={onDateClose}
        />
      </Flex>

      <Flex
        align="center"
        flexDir={{ base: "column", md: "row" }}
        gap={{ base: "usnet", md: "24px" }}
      >
        {[
          "Average Pay to Park service Rating",
          "Pay to Park transactions",
          "paid parking sessions Revenue",
        ].map((item, i) => (
          <Box
            borderRadius="8px"
            key={i}
            bg="#F4F6F8"
            w="full"
            pt="5px"
            my={{ base: "10px", md: "20px" }}
            px="5px"
            border="1px solid #E4E6E8"
          >
            <Box h="6px" w="full" bg="#000" borderRadius="full"></Box>
            <Box p="15px" pt="0px" pb="20px">
              <Text
                mt="24px"
                lineHeight="100%"
                fontWeight={700}
                textTransform="capitalize"
                color="#242628"
              >
                {item}
              </Text>

              <Flex
                mt="24px"
                align="flex-end"
                justifyContent="space-between"
                w="full"
              >
                <Box w="full">
                  <Flex mt="24px" align="center" gap="12px">
                    <Text
                      fontSize="28px"
                      lineHeight="100%"
                      color="#646668"
                      fontWeight={500}
                    >
                      {i === 0 ? "3.1" : i === 1 ? "31" : "₦300,345,123.00"}
                    </Text>{" "}
                    {i === 0 ? <IoStar color="#EE383A" size="15px" /> : ""}
                  </Flex>
                </Box>

                <Flex
                  colot="#000"
                  fontSize="12px"
                  p="10px"
                  rounded="full"
                  bg="#FFFFFF"
                >
                  +30.6%
                </Flex>
              </Flex>
            </Box>
          </Box>
        ))}
      </Flex>

      <Flex align="center" gap="24px" flexDir={{ base: "column", md: "row" }}>
        <Box w={{ base: "100%", md: "100%" }}>
          <Types />
        </Box>
        <Box w={{ base: "100%", md: "100%" }}>
          <LocationDistro />
        </Box>
      </Flex>

      <Flex
        my="24px"
        align="center"
        gap="24px"
        flexDir={{ base: "column", md: "row" }}
      >
        <Box w={{ base: "100%", md: "60%" }}>
          <Paid />
        </Box>
        <Box w={{ base: "100%", md: "40%" }}>
          <PaidUnpaid />
        </Box>
      </Flex>

      <Flex align="center" gap="24px" flexDir={{ base: "column", md: "row" }}>
        <Box w={{ base: "100%", md: "40%" }}>
          <Transaction />
        </Box>
        <Box w={{ base: "100%", md: "60%" }}>
          <Sessions />
        </Box>
      </Flex>
    </Box>
  );
};

export default PayToPark;

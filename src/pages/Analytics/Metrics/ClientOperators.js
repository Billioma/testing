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

import Operators from "../../../components/data/Analytics/Metrics/ClientsOperators/Operators/Operators";
import Clients from "../../../components/data/Analytics/Metrics/ClientsOperators/Clients/Clients";

const ClientOperators = () => {
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

  const [tab, setTab] = useState("Clients");
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
        flexDir={{ base: "column", md: "row" }}
        w="100%"
        bg="#F4F6F8"
        gap="24px"
        my="24px"
        align={{ base: "flex-start", md: "center" }}
      >
        {["Clients", "Operators"].map((item, i) => (
          <Flex
            py="11px"
            px="20px"
            fontSize="13px"
            fontWeight={500}
            w="fit-content"
            cursor="pointer"
            _hover={{ color: "#000" }}
            transition=".3s ease-in-out"
            justifyContent={{ base: "flex-start", md: "center" }}
            color={tab === item ? "#444648" : "#949698"}
            align="center"
            key={i}
            borderBottom={tab === item ? "2px solid #000" : "none"}
            onClick={() => {
              setTab(item);
            }}
          >
            {item}
          </Flex>
        ))}
      </Flex>

      <Flex
        align="center"
        flexDir={{ base: "column", md: "row" }}
        gap={{ base: "usnet", md: "24px" }}
      >
        {(tab === "Clients"
          ? ["Clients on parkinSpace", "Incidents Reported"]
          : ["Operators", "Incidents Reported"]
        ).map((item, i) => (
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
                  <Text
                    mt="24px"
                    fontSize="28px"
                    lineHeight="100%"
                    color="#646668"
                    fontWeight={500}
                  >
                    31
                  </Text>
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

      {tab === "Clients" && <Clients />}
      {tab === "Operators" && <Operators />}
    </Box>
  );
};

export default ClientOperators;

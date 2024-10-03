import React, { useState } from "react";
import {
  Box,
  Flex,
  Image,
  Button,
  Text,
  useDisclosure,
  Skeleton,
} from "@chakra-ui/react";
import StartEnd from "../../../components/modals/StartEnd";
import { formatDates, getStartOfWeek } from "../../../utils/helpers";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { PiExportLight } from "react-icons/pi";
import Select from "react-select";
import { useGetLocationMetrics } from "../../../services/analytics/query/metrics";
import RevenueChart from "../../../components/data/Analytics/Metrics/Locations/RevenueChart";
import High from "../../../components/data/Analytics/Metrics/Locations/High";
import ActiveInactive from "../../../components/data/Analytics/Metrics/Locations/ActiveInactive";
import { useGetLocations } from "../../../services/admin/query/locations";
import { useNavigate } from "react-router-dom";

const Location = () => {
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
  const [location, setLocation] = useState("");
  const navigate = useNavigate();
  const [showEndDate, setShowEndDate] = useState(false);
  const [startValue, startChange] = useState(getStartOfWeek(new Date()));
  const [endValue, endChange] = useState(new Date());
  const [showStartDate, setShowStartDate] = useState(false);

  const {
    isOpen: isDateOpen,
    onClose: onDateClose,
    onOpen: onDateOpen,
  } = useDisclosure();

  const { data: locations } = useGetLocations({}, 1, 1000);

  const filterOptions = ["This Month", "Last 3 Months"]?.map((time) => ({
    value: time,
    label: time,
  }));

  const locationOptions = locations?.data
    ?.filter((item) => item?.client) // Filters items where 'client.name' exists
    ?.map((place) => ({
      value: place?.id,
      label: place?.name,
    }));
console.log(locationOptions)
  const [isRefetch, setIsRefetch] = useState(false);

  const { data, isLoading, refetch } = useGetLocationMetrics(
    {
      refetchOnWindowFocus: true,
      onSuccess: () => {
        setIsRefetch(false);
      },
      onError: () => {
        setIsRefetch(false);
      },
      onSettled: () => {
        setIsRefetch(false);
      },
    },
    formatDates(startValue),
    formatDates(endValue)
  );

  const handleRefreshClick = async () => {
    setIsRefetch(true);
    await refetch();
  };
  return (
    <Box minH="75vh">
      <Flex
        align={{ base: "flex-start", md: "center" }}
        justifyContent="space-between"
        border="1px solid #d4d6d8"
        borderRadius="8px"
        flexDir={{ base: "column", md: "row" }}
        gap={{ base: "20px", md: "unset" }}
        p="24px 23px"
      >
        <Flex
          align="center"
          w={{ base: "unset", md: "50%" }}
          gap="4px"
          color="#444648"
          fontSize="12px"
        >
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

          <Box
            w={{ base: "100%", md: "50%" }}
            display={{ base: "none", md: "block" }}
            ml="15px"
          >
            <Select
              styles={customStyles}
              options={locationOptions}
              placeholder="Select Location"
              value={location}
              defaultValue={location}
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
              onChange={(selectedOption) => {
                setLocation(selectedOption);
                navigate(
                  `/analytics/metrics/locations/${selectedOption?.value}`
                );
              }}
            />
          </Box>
        </Flex>

        <Box
          display={{ base: "block", md: "none" }}
          w={{ base: "100%", md: "unset" }}
        >
          <Select
            styles={customStyles}
            options={locationOptions}
            placeholder="Select Location"
            value={location}
            defaultValue={location}
            components={{
              IndicatorSeparator: () => <div style={{ display: "none" }}></div>,
              DropdownIndicator: () => (
                <div>
                  <IoIosArrowDown size="15px" color="#646668" />
                </div>
              ),
            }}
            onChange={(selectedOption) => {
              setLocation(selectedOption);
              navigate(`/analytics/metrics/locations/${selectedOption?.value}`);
            }}
          />
        </Box>

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
            onClick={handleRefreshClick}
            borderRadius="8px"
            border="1px solid #848688"
            p="10px"
          >
            <Image
              src="/assets/refresh.svg"
              className={isRefetch && "mirrored-icon"}
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
        {["parking locations available", "top Tipping Location"].map(
          (item, i) => (
            <Skeleton
              isLoaded={!isLoading}
              borderRadius="8px"
              my={{ base: "10px", md: "20px" }}
              w="full"
            >
              <Box
                borderRadius="8px"
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
                    {item?.toLowerCase()}
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
                          {i === 0
                            ? `${Number(
                                data?.data?.parkingLocationsAvailable?.value
                              )?.toLocaleString()}%`
                            : data?.data?.topTippingLocation?.locationName}
                        </Text>{" "}
                      </Flex>
                    </Box>

                    <Flex
                      colot="#000"
                      fontSize="12px"
                      p="10px"
                      rounded="full"
                      display={i === 0 ? "flex" : "none"}
                      bg="#FFFFFF"
                    >
                      {Number(
                        data?.data?.parkingLocationsAvailable?.percentageChange
                      )?.toFixed(1)}
                      %
                    </Flex>
                  </Flex>
                </Box>
              </Box>
            </Skeleton>
          )
        )}
      </Flex>

      <Flex
        align="flex-start"
        gap="24px"
        mt="24px"
        flexDir={{ base: "column", md: "row" }}
      >
        <Box w={{ base: "100%", md: "60%" }}>
          <Skeleton isLoaded={!isLoading} borderRadius="8px">
            <RevenueChart dataa={data?.data?.totalRevenueGenerated} />
          </Skeleton>
        </Box>

        <Box w={{ base: "100%", md: "40%" }}>
          <Skeleton isLoaded={!isLoading} borderRadius="8px">
            <ActiveInactive dataa={data?.data?.activeVsInactive} />
          </Skeleton>
        </Box>
      </Flex>

      <Box mt="24px" w={{ base: "100%", md: "100%" }}>
        <Skeleton isLoaded={!isLoading} borderRadius="8px">
          <High dataa={data?.data?.highestPerformingLocations} />
        </Skeleton>
      </Box>
    </Box>
  );
};

export default Location;

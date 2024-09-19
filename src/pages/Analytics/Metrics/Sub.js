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
import { useGetSubMetrics } from "../../../services/analytics/query/metrics";
import ActInact from "../../../components/data/Analytics/Metrics/Sub/ActInact";
import Reg from "../../../components/data/Analytics/Metrics/Sub/Reg";
import Per from "../../../components/data/Analytics/Metrics/Sub/Per";
import RevenueChart from "../../../components/data/Analytics/Metrics/Sub/RevenueChart";
import ActCorp from "../../../components/data/Analytics/Metrics/Sub/ActCorp";
import ActCust from "../../../components/data/Analytics/Metrics/Sub/ActCust";
import Gross from "../../../components/data/Analytics/Metrics/Sub/Gross";

const Sub = () => {
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
  const [startValue, startChange] = useState(getStartOfWeek(new Date()));
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

  const [isRefetch, setIsRefetch] = useState(false);

  const { data, isLoading, refetch } = useGetSubMetrics(
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

      <Skeleton isLoaded={!isLoading} borderRadius="8px">
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
              available subscription types
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
                    {Number(
                      data?.data?.availableSubscriptionTypes?.value
                    )?.toLocaleString()}
                  </Text>{" "}
                </Flex>
              </Box>

              <Flex
                colot="#000"
                fontSize="12px"
                p="10px"
                rounded="full"
                bg="#FFFFFF"
              >
                +
                {Number(
                  data?.data?.availableSubscriptionTypes?.percentageChange
                )}
                %
              </Flex>
            </Flex>
          </Box>
        </Box>
      </Skeleton>

      <Flex align="center" gap="24px" flexDir={{ base: "column", md: "row" }}>
        <Box w={{ base: "100%", md: "60%" }}>
          <Skeleton isLoaded={!isLoading} borderRadius="8px">
            <Reg dataa={data?.data?.registeredSubscriptions} />
          </Skeleton>
        </Box>
        <Box w={{ base: "100%", md: "40%" }}>
          <Skeleton isLoaded={!isLoading} borderRadius="8px">
            <ActInact dataa={data?.data?.subscriptionsBreakdown} />
          </Skeleton>
        </Box>
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
            <Per dataa={data?.data?.revenuePerSubscription} />
          </Skeleton>
        </Box>
      </Flex>

      <Flex
        mt="24px"
        align="center"
        gap="24px"
        flexDir={{ base: "column", md: "row" }}
      >
        <Box w={{ base: "100%", md: "50%" }}>
          <Skeleton isLoaded={!isLoading} borderRadius="8px">
            <ActCorp dataa={data?.data?.corporateSubscriptionsCategories} />
          </Skeleton>
        </Box>
        <Box w={{ base: "100%", md: "50%" }}>
          <Skeleton isLoaded={!isLoading} borderRadius="8px">
            <ActCust dataa={data?.data?.membershipSubscriptionsCategories} />
          </Skeleton>
        </Box>
      </Flex>

      <Box mt="24px" w={{ base: "100%", md: "100%" }}>
        <Skeleton isLoaded={!isLoading} borderRadius="8px">
          <Gross dataa={data?.data?.highestGrossingSubscriptions} />
        </Skeleton>
      </Box>
    </Box>
  );
};

export default Sub;

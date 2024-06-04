import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Skeleton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  useGetScheduleDay,
  useGetSchedules,
} from "../../../services/admin/query/schedule";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BsSearch } from "react-icons/bs";
import AllTableLayer from "../../../components/data/Admin/StaffSchedule/AllTableLayer";
import { useNavigate } from "react-router-dom";
import ScheduleStaffTableLayer from "../../../components/data/Admin/StaffSchedule/ScheduleStaffTableLayer";

const StaffSchedule = () => {
  const [type, setType] = useState("");

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [startRow, setStartRow] = useState(1);
  const [endRow, setEndRow] = useState(0);
  const [search, setSearch] = useState("");

  const [dayPage, setDayPage] = useState(1);
  const [dayLimit, setDayLimit] = useState(25);
  const [dayStartRow, setDayStartRow] = useState(1);
  const [dayEndRow, setDayEndRow] = useState(0);
  const [daySearch, setDaySearch] = useState("");
  const { data, isLoading, refetch } = useGetSchedules(
    {
      refetchOnWindowFocus: true,
    },
    page,
    limit,
    search
  );

  const { mutate, data: daySchedule, isLoading: isDay } = useGetScheduleDay();

  useEffect(() => {
    refetch();
  }, []);

  const typeToMap = [
    { name: "Week", value: "" },
    { name: "Monday", value: "monday" },
    { name: "Tuesday", value: "tuesday" },
    { name: "Wednesday", value: "wednesday" },
    { name: "Thursday", value: "thursday" },
    { name: "Friday", value: "friday" },
    { name: "Saturday", value: "saturday" },
    { name: "Sunday", value: "sunday" },
  ];

  const handleDay = (type) => {
    mutate({
      week: data?.currentWeek?.id,
      day: type,
      page: dayPage,
      limit: dayLimit,
      search: daySearch,
    });
  };

  const { isOpen, onClose, onOpen } = useDisclosure();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest(".box") === null) {
        onClose(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (type) {
      handleDay(type);
    }
  }, [type, dayLimit, dayPage, daySearch]);

  useEffect(() => {
    if (!data) {
      return;
    }

    const currentPage = page;
    const itemsPerPage = limit;
    const totalItems = data?.total;

    const currentStartRow = (currentPage - 1) * itemsPerPage + 1;
    const currentEndRow = Math.min(currentPage * itemsPerPage, totalItems);

    setStartRow(currentStartRow);
    setEndRow(currentEndRow);
  }, [data, page, limit, type, search]);
console.log(search)
  useEffect(() => {
    if (!daySchedule) {
      return;
    }

    const currentPage = dayPage;
    const itemsPerPage = dayLimit;
    const totalItems = daySchedule?.total;

    const currentStartRow = (currentPage - 1) * itemsPerPage + 1;
    const currentEndRow = Math.min(currentPage * itemsPerPage, totalItems);
    setDayStartRow(currentStartRow);
    setDayEndRow(currentEndRow);
  }, [daySchedule, dayPage, dayLimit, type, daySearch]);


  return (
    <Box minH="75vh">
      <Flex
        mb="24px"
        bg="#F4F6F8"
        flexWrap={{ base: "wrap", md: "nowrap" }}
        w="100%"
        align="center"
      >
        {typeToMap.map((item, i) => (
          <Flex
            py="11px"
            px={{ base: "20px", md: "unset" }}
            fontSize="13px"
            fontWeight={500}
            w={{ base: "33%", md: "100%" }}
            cursor="pointer"
            _hover={{ color: "#000" }}
            transition=".3s ease-in-out"
            justifyContent={{ base: "flex-start", md: "center" }}
            color={type === item?.value ? "#444648" : "#949698"}
            align="center"
            key={i}
            borderBottom={type === item?.value ? "2px solid #000" : "none"}
            onClick={() =>
              i === 0
                ? (setType(item?.value),
                  setPage(1),
                  setLimit(25),
                  setSearch(""))
                : (setType(item?.value),
                  setDayPage(1),
                  setDayLimit(25),
                  setDaySearch(""),
                  handleDay(item?.value))
            }
          >
            {item?.name}
          </Flex>
        ))}
      </Flex>

      <Box border="1px solid #d4d6d8" borderRadius="8px" p="24px 23px">
        <Flex
          align={{ base: "flex-start", md: "center" }}
          gap={{ base: "20px", md: "unset" }}
          flexDir={{ base: "column", md: "row" }}
          fontWeight={500}
          justifyContent="space-between"
          w="full"
        >
          <Flex align="center" gap="24px">
            <Text
              display={data?.locations?.length || isLoading ? "block" : "none"}
              color="#242628"
              fontSize="14px"
            >
              Schedule
            </Text>

            <Flex
              display={data?.locations?.length || isLoading ? "flex" : "none"}
              align="center"
              gap="4px"
              color="#444648"
              fontSize="12px"
            >
              <Skeleton
                borderRadius="4px"
                w="100px"
                h="40px"
                isLoaded={!isLoading}
              >
                <Flex bg="#F4F6F8" py="12px" px="16px" borderRadius="4px">
                  {data?.currentWeek?.startDate}
                </Flex>
              </Skeleton>
              <IoIosArrowForward size="20px" />
              <Skeleton
                borderRadius="4px"
                w="100px"
                h="40px"
                isLoaded={!isLoading}
              >
                <Flex bg="#F4F6F8" py="12px" px="16px" borderRadius="4px">
                  {data?.currentWeek?.endDate}
                </Flex>
              </Skeleton>
            </Flex>
          </Flex>

          <Flex
            align={{ base: "flex-start", md: "center" }}
            gap={{ base: "15px", md: "24px" }}
            flexDir={{ base: "column", md: "row" }}
            w={{ base: "full", md: "unset" }}
          >
            <InputGroup>
              <InputLeftElement>
                <BsSearch />
              </InputLeftElement>

              <Input
                border="1px solid #848688"
                fontSize="13px"
                value={type ? daySearch : search}
                onChange={(e) =>
                  type
                    ? setDaySearch(e.target.value)
                    : setSearch(e.target.value)
                }
                fontWeight={500}
                color="##D4D6D8"
                placeholder="Search for anything"
                borderRadius="8px"
                py="10px"
                h="40px"
                px="16px"
              />
            </InputGroup>

            <Box pos="relative" className="box">
              <Flex
                bg="#242628"
                borderRadius="8px"
                align="center"
                transition=".3s ease-in-out"
                cursor="pointer"
                _hover={{ opacity: 0.8 }}
                onClick={onOpen}
                gap="8px"
                h="40px"
                justifyContent="center"
                fontSize="12px"
                fontWeight={500}
                color="#fff"
                w={{ base: "full", md: "14rem" }}
              >
                <Text>Add Schedule</Text>
                <IoIosArrowDown />
              </Flex>

              {isOpen && (
                <Box
                  pos="absolute"
                  top="12"
                  right="0"
                  w="100%"
                  bg="#fff"
                  zIndex={5}
                  border="1px solid #D4D6D8"
                  borderRadius="8px"
                  py="10px"
                >
                  {["Staff", "Location"].map((item, i) => (
                    <Flex
                      key={i}
                      _hover={{ bg: "#F4F6F8" }}
                      transition=".3s ease-in-out"
                      cursor="pointer"
                      py="10px"
                      px="25px"
                      onClick={() =>
                        i === 0
                          ? (navigate("/admin/staff-schedule/create/staff"),
                            onClose())
                          : (navigate("/admin/staff-schedule/create/location"),
                            onClose())
                      }
                    >
                      By {item}
                    </Flex>
                  ))}
                </Box>
              )}
            </Box>
          </Flex>
        </Flex>
      </Box>

      {!type ? (
        <AllTableLayer
          startRow={startRow}
          endRow={endRow}
          page={page}
          limit={limit}
          setPage={setPage}
          isLoading={isLoading}
          data={data}
          setLimit={setLimit}
        />
      ) : (
        type && (
          <ScheduleStaffTableLayer
            setLimit={setDayLimit}
            startRow={dayStartRow}
            endRow={dayEndRow}
            page={dayPage}
            limit={dayLimit}
            setPage={setDayPage}
            isLoading={isDay}
            data={daySchedule}
          />
        )
      )}
    </Box>
  );
};

export default StaffSchedule;

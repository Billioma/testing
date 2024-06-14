import { Box, Flex, Skeleton, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useGetSchedule } from "../../../services/staff/query/schedule";
import dayjs from "dayjs";

const getCurrentWeekDates = () => {
  const now = dayjs();
  const startOfWeek = now.startOf("week").add(1, "day");
  const dates = Array.from({ length: 7 }).map((_, i) => ({
    day: startOfWeek.add(i, "day").format("dddd").toLowerCase(),
    date: startOfWeek.add(i, "day").format("DD"),
  }));
  return dates;
};

const weekDates = getCurrentWeekDates();

const daysMap = [
  { label: "monday", value: "MON" },
  { label: "tuesday", value: "TUE" },
  { label: "wednesday", value: "WED" },
  { label: "thursday", value: "THU" },
  { label: "friday", value: "FRI" },
  { label: "saturday", value: "SAT" },
  { label: "sunday", value: "SUN" },
];

const Schedule = () => {
  const { data, isLoading, refetch } = useGetSchedule({
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    refetch();
  }, []);

  const getDaySchedule = (day) => {
    const schedules = data?.[day.toLowerCase()] || [];
    return schedules.map((schedule, index) => (
      <Box key={index} display={index > 0 ? "none" : "block"}>
        <Text mb="10px" fontSize="18px" fontWeight={500}>
          {schedule.location.name}
        </Text>
      </Box>
    ));
  };

  const today = new Date();
  const daysOfWeek = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  const dayName = daysOfWeek[today.getDay()];

  const currentSchedule = data?.[dayName] && data?.[dayName][0];
  return (
    <Flex align="flex-start" gap="64px" flexDir={{ base: "column", md: "row" }}>
      <Box w={{ base: "100%", md: "60%" }}>
        <Text
          fontSize={{ base: "35px", md: "48px" }}
          fontWeight={500}
          color="#090c02"
          mb="24px"
        >
          Schedule
        </Text>

        {isLoading ? (
          <Flex flexDir="column" gap="16px">
            <Skeleton borderRadius="8px" h="7rem"></Skeleton>
            <Skeleton borderRadius="8px" h="7rem"></Skeleton>
            <Skeleton borderRadius="8px" h="7rem"></Skeleton>
          </Flex>
        ) : (
          daysMap?.map((day, i) => {
            const weekDate = weekDates.find(
              (weekDate) => weekDate.day === day.label
            );

            return (
              <Flex
                key={i}
                align="center"
                gap="12px"
                py="16px"
                _first={{ pt: 0 }}
                borderBottom="1px solid #E2E5DC"
              >
                <Box opacity={0.6} w="8%">
                  <Text fontSize="13px" fontWeight={500}>
                    {day?.value}
                  </Text>
                  <Text fontSize="24px" fontWeight={500}>
                    {weekDate?.date}
                  </Text>
                </Box>

                <Box
                  h="64px"
                  w="2px"
                  bg={
                    getDaySchedule(day?.label?.toLowerCase()).length === 0
                      ? "#E2E5DC"
                      : "#086375"
                  }
                />

                {getDaySchedule(day?.label?.toLowerCase()).length > 0 ? (
                  getDaySchedule(day?.label?.toLowerCase())
                ) : (
                  <Flex mt="10px">
                    <Text mb="10px" color="#090C0280">
                      No Active Schedule
                    </Text>
                  </Flex>
                )}
              </Flex>
            );
          })
        )}
      </Box>

      <Box w={{ base: "100%", md: "40%" }}>
        <Skeleton isLoaded={!isLoading} borderRadius="16px">
          <Box
            border="1px solid #E2E5DC"
            borderRadius="16px"
            py="24px"
            px="28px"
          >
            <Box pb="10px" borderBottom="1px solid #E2E5DC">
              <Text fontSize="18px" fontWeight={500}>
                Summary
              </Text>
            </Box>

            <Box mt="32px">
              <Text fontSize="13px" fontWeight={700} opacity={0.6} mb="8px">
                LOCATION
              </Text>
              <Text fontSize="18px" fontWeight={500}>
                {currentSchedule?.location?.name || "N/A"}
              </Text>
            </Box>
          </Box>
        </Skeleton>
      </Box>
    </Flex>
  );
};

export default Schedule;

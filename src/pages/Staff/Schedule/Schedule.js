import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

const Schedule = () => {
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

        {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((item, i) => (
          <Flex
            key={i}
            align="center"
            gap="12px"
            py="16px"
            _first={{ pt: 0 }}
            borderBottom="1px solid #E2E5DC"
          >
            <Box opacity={0.6}>
              <Text fontSize="13px" fontWeight={500}>
                MON
              </Text>
              <Text fontSize="24px" fontWeight={500}>
                09
              </Text>
            </Box>

            <Box
              h="64px"
              w="2px"
              bg={i === 3 || i === 5 ? "#E2E5DC" : "#086375"}
            />

            <Box display={i === 3 || i === 5 ? "none" : "block"}>
              <Text mb="10px" fontSize="18px" fontWeight={500}>
                Ziya Delicacy Boutique
              </Text>
              <Text fontSize="13px" fontWeight={700} opacity={0.6}>
                9AM - 4PM
              </Text>
            </Box>

            <Flex mt="10px" display={i === 3 || i === 5 ? "block" : "none"}>
              <Text mb="10px" color="#090C0280">
                No Active Schedule
              </Text>
            </Flex>
          </Flex>
        ))}
      </Box>

      <Box w={{ base: "100%", md: "40%" }}>
        <Box border="1px solid #E2E5DC" borderRadius="16px" py="24px" px="28px">
          <Box pb="10px" borderBottom="1px solid #E2E5DC">
            <Text fontSize="18px" fontWeight={500}>
              Summary
            </Text>
          </Box>

          <Box mt="32px" pb="12px" borderBottom="1px solid #E2E5DC">
            <Text fontSize="13px" fontWeight={700} opacity={0.6} mb="8px">
              LOCATION
            </Text>
            <Text fontSize="18px" fontWeight={500}>
              Ziya Delicacy Boutique
            </Text>
          </Box>

          <Box mt="32px">
            <Text fontSize="13px" fontWeight={700} opacity={0.6} mb="8px">
              BUSINESS HOURS
            </Text>
            <Text fontSize="18px" fontWeight={500}>
              9 am - 4 pm
            </Text>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default Schedule;

import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

const StatCard = ({
  title,
  subTitle,
  value,
  inactive,
  active,
  inService,
  completed,
  large = false,
  reserved,
  expired,
  pending,
  upcoming,
  paid,
  past,
  bg,
  pastDue,
}) => {
  return (
    <Box
      minW="274px"
      borderRadius="lg"
      overflow="hidden"
      bg={bg ? bg : "#F4F6F8"}
      border={large ? "0.50px #E4E6E8 solid" : ""}
    >
      <Box p="4">
        <Flex mb="4">
          <Text fontSize="14px" color="#242628" fontWeight="600">
            {title}
          </Text>
        </Flex>

        <Flex
          flexDir={large ? "row" : "column"}
          justifyContent={"space-between"}
          alignItems={large ? "end" : ""}
        >
          <Box>
            <Text fontSize="12px" color="#242628" fontWeight="500">
              {subTitle}
            </Text>
            <Text fontSize="32px" color="#646668" fontWeight="500">
              {value?.toLocaleString()}
            </Text>
          </Box>

          <Flex justifyContent="space-between" gap="24px" alignItems="center">
            {!large && inactive != null && inactive != undefined ? (
              <Flex
                gap="7px"
                alignItems="center"
                fontSize="16px"
                fontWeight="500"
              >
                <Text color={"#EE383A"} fontSize="12px">
                  Inactive
                </Text>
                {inactive}
              </Flex>
            ) : (
              <Flex
                gap="7px"
                alignItems="center"
                fontSize="16px"
                fontWeight="500"
              >
                <Text color={"#0B841D"} fontSize="12px">
                  {reserved != null && reserved != undefined
                    ? "Reserved"
                    : pending != null && pending != undefined
                    ? "Pending"
                    : inService != null && inService != undefined
                    ? "In Service"
                    : large && active != null && active != undefined
                    ? "Active"
                    : upcoming != null && upcoming != undefined
                    ? "Upcoming"
                    : paid != null && paid != undefined
                    ? "Paid"
                    : null}
                </Text>
                {reserved != null || reserved != undefined
                  ? reserved
                  : pending != null && pending != undefined
                  ? pending
                  : inService != null && inService != undefined
                  ? inService
                  : large && active != null && active != undefined
                  ? active
                  : upcoming != null && upcoming != undefined
                  ? upcoming
                  : paid != null && paid != undefined
                  ? paid
                  : null}
              </Flex>
            )}

            {!large && active != null && active != undefined ? (
              <Flex
                gap="7px"
                alignItems="center"
                fontSize="16px"
                fontWeight="500"
              >
                <Text color={"#0B841D"} fontSize="12px">
                  Active
                </Text>
                {active}
              </Flex>
            ) : (
              <Flex
                gap="7px"
                alignItems="center"
                fontSize="16px"
                fontWeight="500"
              >
                <Text color={"#646668"} fontSize="12px">
                  {completed != null && completed != undefined
                    ? "Completed"
                    : expired != null && expired != undefined
                    ? "Expired"
                    : large && inactive != null && inactive != undefined
                    ? "Inactive"
                    : past != null && past != undefined
                    ? "Past"
                    : pastDue != null && pastDue != undefined
                    ? "Past Due"
                    : null}
                </Text>
                {completed != null && completed != undefined
                  ? completed
                  : expired != null && expired != undefined
                  ? expired
                  : large && inactive != null && inactive != undefined
                  ? inactive
                  : past != null && past != undefined
                  ? past
                  : pastDue != null && pastDue != undefined
                  ? pastDue
                  : null}
              </Flex>
            )}
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default StatCard;

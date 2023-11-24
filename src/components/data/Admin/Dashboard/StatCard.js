import React from "react";
import { Box, Flex, Text, useMediaQuery } from "@chakra-ui/react";

const StatCard = ({
  title,
  subTitle,
  value,
  inactive,
  active,
  inservice,
  completed,
  unpaid,
  large = false,
  reserved,
  expired,
  pending,
  upcoming,
  paid,
  bg,
}) => {
  const [isMobile] = useMediaQuery("(max-width: 1400px)");
  return (
    <Box
      w="100%"
      borderRadius="8px"
      bg={bg ? bg : "#F4F6F8"}
      border={large ? "0.50px #E4E6E8 solid" : ""}
    >
      <Box p={isMobile ? "15px" : "20px"}>
        <Text mb="16px" fontSize="14px" color="#242628" fontWeight={700}>
          {title}
        </Text>

        <Flex
          flexDir={large ? "row" : "column"}
          justifyContent={"space-between"}
          align={large ? "end" : ""}
        >
          <Box>
            <Text fontSize="12px" color="#242628" fontWeight="500">
              {subTitle}
            </Text>
            <Text
              fontSize={large && isMobile ? "20px" : "28px"}
              color="#646668"
              fontWeight="500"
            >
              {value?.toLocaleString()}
            </Text>
          </Box>

          <Flex justifyContent="space-between" gap="24px" align="center">
            {!large && inactive != null && inactive != undefined ? (
              <Flex gap="8px" align="center" fontSize="16px" fontWeight="500">
                <Text color={"#EE383A"} fontSize="12px">
                  Inactive
                </Text>
                <Text color="#242628">{inactive}</Text>
              </Flex>
            ) : (
              <Flex
                gap={large && isMobile ? "4px" : "7px"}
                align="center"
                fontSize="16px"
                fontWeight="500"
              >
                <Text
                  color={"#0B841D"}
                  fontSize={large && isMobile ? "10px" : "12px"}
                >
                  {title.includes("Valet Parking") ||
                  title.includes("Pay-To-Park")
                    ? "In Service"
                    : title.includes("Reserved") || title === "Event Parking"
                    ? "Reserved"
                    : title.includes("Events")
                    ? "Upcoming"
                    : title.includes("Invoices")
                    ? "Paid"
                    : title.includes("Car Services")
                    ? "Pending"
                    : reserved != null && reserved != undefined
                    ? "Reserved"
                    : large && active != null && active != undefined
                    ? "Active"
                    : null}
                </Text>
                <Text
                  color="#242628"
                  fontSize={large && isMobile ? "15px" : "16px"}
                >
                  {title.includes("Valet Parking") ||
                  title.includes("Pay-To-Park")
                    ? inservice?.toLocaleString()
                    : title.includes("Reserved")
                    ? pending?.toLocaleString()
                    : title === "Event Parking"
                    ? reserved?.toLocaleString()
                    : title.includes("Invoices")
                    ? paid?.toLocaleString()
                    : title.includes("Service")
                    ? pending?.toLocaleString()
                    : title.includes("Events")
                    ? upcoming
                    : title.includes("Car Services")
                    ? pending?.toLocaleString()
                    : reserved != null || reserved != undefined
                    ? reserved?.toLocaleString()
                    : large && active != null && active != undefined
                    ? active?.toLocaleString()
                    : null}
                </Text>
              </Flex>
            )}

            {!large && active != null && active != undefined ? (
              <Flex gap="8px" align="center" fontSize="16px" fontWeight="500">
                <Text color={"#0B841D"} fontSize="12px">
                  Active
                </Text>

                <Text color="#242628">{active}</Text>
              </Flex>
            ) : (
              <Flex
                gap={large && isMobile ? "4px" : "7px"}
                align="center"
                fontSize="16px"
                fontWeight="500"
              >
                <Text
                  color={"#444648"}
                  fontSize={large && isMobile ? "10px" : "12px"}
                >
                  {title.includes("Events")
                    ? "Expired"
                    : title.includes("Locations") || title.includes("Vehicles")
                    ? "Inactive"
                    : title.includes("Invoice")
                    ? "Unpaid"
                    : completed != null && completed != undefined
                    ? "Completed"
                    : expired != null && expired != undefined
                    ? "Expired"
                    : null}
                </Text>
                <Text
                  color="#242628"
                  fontSize={large && isMobile ? "15px" : "16px"}
                >
                  {title.includes("Events")
                    ? expired?.toLocaleString()
                    : title.includes("Locations") || title.includes("Vehicles")
                    ? inactive?.toLocaleString()
                    : title.includes("Invoice")
                    ? unpaid?.toLocaleString()
                    : completed != null && completed != undefined
                    ? completed?.toLocaleString()
                    : expired != null && expired != undefined
                    ? expired?.toLocaleString()
                    : null}
                </Text>
              </Flex>
            )}
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default StatCard;

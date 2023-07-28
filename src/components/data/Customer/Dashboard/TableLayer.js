import React from "react";
import { Box, Flex, Td, Text, Tr } from "@chakra-ui/react";
import TableFormat from "../../../common/TableFormat";
import { FiMoreVertical } from "react-icons/fi";
import { servicesHeader } from "../../../common/constants";
import { IoIosArrowDown } from "react-icons/io";

export const TableDetails = () => {
  return (
    <Tr color="#646668" fontWeight={500} fontSize="12px" lineHeight="100%">
      <Td textAlign="center">P2P09873</Td>
      <Td textAlign="center">LandMark Beach</Td>
      <Td textAlign="center">Jeep Cherokee</Td>
      <Td textAlign="center">Reserved Parking</Td>
      <Td>
        <Flex
          bg="#E5FFE5"
          py="5px"
          px="16px"
          color="#008000"
          justifyContent="center"
          borderRadius="4px"
          align="center"
        >
          In-Progress
        </Flex>
      </Td>
      <Td textAlign="center">24-06-2023 7:00am</Td>
      <Td>
        <Flex justifyContent="center" align="center">
          <FiMoreVertical />
        </Flex>
      </Td>
    </Tr>
  );
};

const TableLayer = () => {
  return (
    <Box mt="32px">
      <Text color="#242628" fontWeight={500} lineHeight="100%" mb="12px">
        Recent Activity
      </Text>
      <TableFormat
        maxH={"70vh"}
        minH="20vh"
        header={servicesHeader}
        title={
          <Flex>
            <Text fontSize="14px" lineHeight="100%" fontWeight={500}>
              Recent Activity
            </Text>
          </Flex>
        }
        filter={
          <Flex
            bg="#F4F6F8"
            cursor="pointer"
            color="#242628"
            borderRadius="8px"
            gap="12px"
            border="1px solid #E4E6E8"
            px="16px"
            py="5px"
          >
            <Text fontSize="12px" fontWeight={500} lineHeight="100%">
              All Services
            </Text>

            <IoIosArrowDown />
          </Flex>
        }
      >
        <TableDetails />
        <TableDetails />
      </TableFormat>
    </Box>
  );
};

export default TableLayer;

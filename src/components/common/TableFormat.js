import React from "react";
import { Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/table";
import TableLoader from "../loaders/TableLoader";
import { Box, Flex, Text } from "@chakra-ui/react";

const TableFormat = ({
  children,
  isLoading,
  paginate,
  header,
  act,
  title,
  filter,
  minH,
  maxH,
  opt,
}) => {
  return (
    <Box
      bg="#fff"
      borderRadius="8px"
      py={opt ? "" : "24px"}
      px={opt ? "" : "23px"}
    >
      <Flex
        mb={opt ? "" : "16px"}
        align="center"
        justifyContent="space-between"
        w="full"
      >
        <Text
          color="#242628"
          fontWeight={500}
          fontSize="14px"
          lineHeight="100%"
          mb="12px"
        >
          {title}
        </Text>

        <Box>{filter}</Box>
      </Flex>
      <TableContainer maxH={maxH} minH={minH} overflowY="scroll">
        {isLoading ? (
          <TableLoader />
        ) : (
          <Table>
            <Thead bg="#F4F6F8">
              <Tr>
                {header?.map((data, i) => (
                  <Th
                    textAlign={act ? "start" : "center"}
                    key={i}
                    pos="sticky"
                    top="0"
                    bg="#F4F6F8"
                    fontFamily="Sailec"
                    zIndex="2"
                    color="#949698"
                    lineHeight="100%"
                    fontWeight={500}
                  >
                    {data}
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>{children}</Tbody>
          </Table>
        )}
      </TableContainer>

      <Box mt="20px">{paginate}</Box>
    </Box>
  );
};

export default TableFormat;

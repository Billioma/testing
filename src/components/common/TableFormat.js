import React from "react";
import { Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/table";
import TableLoader from "../loaders/TableLoader";
import { Box, Flex, Text } from "@chakra-ui/react";

const TableFormat = ({
  children,
  isLoading,
  paginate,
  header,
  tab,
  act,
  title,
  filter,
  minH,
  maxH,
  opt,
  bg = "#F4F6F8",
  alignFirstHeader,
  alignSecondHeader,
  alignThirdHeader,
  alignForthHeader,
}) => {
  return (
    <Box
      bg="#fff"
      borderRadius="8px"
      py={opt ? "" : "24px"}
      px={opt ? "" : "23px"}
    >
      {!tab ? (
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
      ) : (
        <Flex
          justifyContent="center"
          mb="24px"
          align="center"
          w="full"
          flexDir="column"
        >
          {tab}
        </Flex>
      )}
      <TableContainer maxH={maxH} minH={minH} overflowY="scroll">
        {isLoading ? (
          <TableLoader />
        ) : (
          <Table>
            <Thead bg={bg}>
              <Tr>
                {header?.map((data, i) => (
                  <Th
                    textAlign={
                      data.toLowerCase() === "status" ||
                      data.toLowerCase() === "date" ||
                      data.toLowerCase() === "action"
                        ? "center"
                        : act ||
                          (alignFirstHeader && i === 0) ||
                          (alignSecondHeader && i === 1) ||
                          (alignThirdHeader && i === 2) ||
                          (alignForthHeader && i === 3)
                        ? "start"
                        : "center"
                    }
                    key={i}
                    pos="sticky"
                    top="0"
                    bg={bg}
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

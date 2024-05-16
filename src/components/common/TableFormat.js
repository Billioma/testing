import React from "react";
import { Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/table";
import TableLoader from "../loader/TableLoader";
import { Box, Flex, Text, Select } from "@chakra-ui/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const TableFormat = ({
  children,
  isLoading,
  paginate,
  useDefaultPagination = false,
  paginationValues,
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
  alignFifthHeader,
  alignSixthHeader,
  newOpt,
  alignSeventhHeader,
}) => {
  return (
    <Box
      bg="#fff"
      borderRadius="8px"
      py={opt ? "" : newOpt ? "10px" : "24px"}
      px={opt ? "" : newOpt ? "15px" : "23px"}
    >
      {!tab ? (
        <Flex
          mb={opt ? "" : "16px"}
          align="center"
          justifyContent="space-between"
          w="full"
        >
          <Text color="#242628" fontWeight={500} lineHeight="100%" mb="12px">
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
                            (alignForthHeader && i === 3) ||
                            (alignFifthHeader && i === 4) ||
                            (alignSixthHeader && i === 5) ||
                            (alignSeventhHeader && i === 6)
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

      <Box mt="20px">
        {useDefaultPagination ? (
          <DefaultPagination
            total={paginationValues.total}
            startRow={paginationValues.startRow}
            endRow={paginationValues.endRow}
            page={paginationValues.page}
            pageCount={paginationValues.pageCount}
            setLimit={paginationValues.setLimit}
            limit={paginationValues.limit}
            onNext={paginationValues.onNext}
            onPrevious={paginationValues.onPrevious}
          />
        ) : (
          paginate
        )}
      </Box>
    </Box>
  );
};

export default TableFormat;

const DefaultPagination = ({
  total,
  startRow,
  endRow,
  page,
  pageCount,
  limit,
  setLimit,
  onNext,
  onPrevious,
}) => {
  return (
    <Flex justifyContent="center" align="center" flexDir="column" w="full">
      <Flex
        justifyContent="center"
        flexDir={{ base: "column", md: "row" }}
        gap="32px"
        align="center"
        pb={5}
      >
        <Text fontSize="14px" color="#242628" lineHeight="100%">
          Showing rows {startRow} to {endRow} of {total}
        </Text>

        <Flex gap="16px" align="center">
          <Flex
            opacity={page === 1 ? 0.5 : 1}
            onClick={onPrevious}
            cursor={page === 1 ? "" : "pointer"}
            align="center"
            gap="2px"
            color="#A4A6A8"
            fontSize="14px"
          >
            <IoIosArrowBack />
            <Text lineHeight="100%">Previous</Text>
          </Flex>

          <Flex align="center" gap="5px" color="#A4A6A8" fontSize="14px">
            <Flex
              bg="transparent"
              py="6px"
              px="8px"
              color="#242628"
              fontSize="14px"
              lineHeight="100%"
            >
              <Text>{page}</Text>
            </Flex>
          </Flex>

          <Flex
            opacity={page === pageCount ? 0.5 : 1}
            onClick={onNext}
            cursor={page === pageCount ? "" : "pointer"}
            align="center"
            gap="2px"
            color="#A4A6A8"
            fontSize="14px"
          >
            <IoIosArrowForward />
            <Text lineHeight="100%">Next</Text>
          </Flex>
        </Flex>

        <Select
          defaultValue={limit}
          w="fit-content"
          size="sm"
          bg="transparent"
          fontSize="14px"
          borderRadius={8}
          borderWidth={1}
          onChange={(e) => setLimit(e.target.value)}
        >
          {["25", "50", "100", "200"].map((dat, i) => (
            <option key={i} value={dat}>
              {dat}
            </option>
          ))}
        </Select>
      </Flex>
    </Flex>
  );
};

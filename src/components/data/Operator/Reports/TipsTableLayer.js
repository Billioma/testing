import React from "react";
import {
  Box,
  Flex,
  Image,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import TableLoader from "../../../loaders/TableLoader";
import { adminTipsHeader } from "../../../common/constants";
import { formatDateTimes } from "../../../../utils/helpers";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import NoData from "../../../common/NoData";

const TipsTableLayer = ({
  data,
  isLoading,
  page,
  setPage,
  startRow,
  endRow,
  limit,
  setLimit,
}) => {
  return (
    <Box mt="16px">
      {isLoading ? (
        <TableLoader />
      ) : (
        <TableContainer maxH="60vh" minH="40vh" overflowY="scroll">
          <Table>
            <Thead bg="#F4F6F8">
              <Tr>
                {adminTipsHeader?.map((data, i) => (
                  <Th
                    textAlign={i === 0 ? "start" : "center"}
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
            <Tbody>
              {!data?.data?.length ? (
                <Tr>
                  <Td colSpan={7} rowSpan={2}>
                    <NoData
                      title="No Locations Report"
                      desc="No locations report available at the moment"
                    />
                  </Td>
                </Tr>
              ) : (
                data?.data?.map((item, i) => (
                  <Tr fontSize="12px" fontWeight={500} color="#646668" key={i}>
                    <Td>{item?.ticketNumber}</Td>
                    <Td textAlign="center">{item?.attendant}</Td>
                    <Td textAlign="center">
                      ₦{" "}
                      {item?.amount?.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      }) || "0.00"}
                    </Td>
                    <Td textAlign="center">{item?.location}</Td>
                    <Td textAlign="center">{item?.licensePlate}</Td>

                    <Td textAlign="center">
                      {formatDateTimes(item?.createdAt)}
                    </Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        </TableContainer>
      )}

      <Flex justifyContent="center" align="center" flexDir="column" w="full">
        <Flex justifyContent="center" gap="32px" align="center" pb={5}>
          <Text fontSize="12px" color="#242628" lineHeight="100%">
            Showing rows {startRow} to {endRow} of {data?.total}
          </Text>

          <Flex gap="16px" align="center">
            <Flex
              opacity={data?.page === 1 ? 0.5 : 1}
              onClick={() => (data?.page !== 1 ? setPage(page - 1) : null)}
              cursor={data?.page === 1 ? "" : "pointer"}
              align="center"
              gap="2px"
              color="#A4A6A8"
              fontSize="12px"
            >
              <IoIosArrowBack />
              <Text lineHeight="100%">Previous</Text>
            </Flex>

            <Flex align="center" gap="5px" color="#A4A6A8" fontSize="12px">
              <Flex
                bg="transparent"
                py="6px"
                px="8px"
                color="#242628"
                fontSize="12px"
                lineHeight="100%"
              >
                <Text>{data?.page}</Text>
              </Flex>
            </Flex>

            <Flex
              opacity={data?.page === data?.pageCount ? 0.5 : 1}
              onClick={() =>
                data?.page !== data?.pageCount ? setPage(page + 1) : null
              }
              cursor={data?.page === data?.pageCount ? "" : "pointer"}
              align="center"
              gap="2px"
              color="#A4A6A8"
              fontSize="12px"
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
            fontSize={12}
            borderRadius={8}
            borderWidth={1}
            onChange={(e) => setLimit(e.target.value)}
          >
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </Select>
        </Flex>
      </Flex>
    </Box>
  );
};

export default TipsTableLayer;

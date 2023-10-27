import React from "react";
import {
  Box,
  Flex,
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
import { adminRepSubHeader } from "../../../common/constants";
import NoData from "../../../common/NoData";
import { formatDateTimes } from "../../../../utils/helpers";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const SubTableLayer = ({
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
      <TableContainer maxH="60vh" minH="40vh" overflowY="scroll">
        {isLoading ? (
          <TableLoader />
        ) : (
          <Table>
            <Thead bg="#F4F6F8">
              <Tr>
                {adminRepSubHeader?.map((data, i) => (
                  <Th
                    textAlign={i === 0 || i === 1 ? "start" : "center"}
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
              {data?.data?.length ? (
                data?.data?.map((item, i) => (
                  <Tr fontSize="12px" fontWeight={500} color="#646668" key={i}>
                    <Td>{item?.customer || "N/A"}</Td>
                    <Td>{item?.membershipPlan || "N/A"}</Td>
                    <Td textAlign="center">
                      {formatDateTimes(item?.startDate) || "N/A"}
                    </Td>
                    <Td textAlign="center">
                      {formatDateTimes(item?.nextRenewal) || "N/A"}
                    </Td>
                    <Td textAlign="center">{item?.autoRenew || "N/A"}</Td>
                    <Td textAlign="center">{item?.isCancelled || "N/A"}</Td>
                    <Td textAlign="center">
                      {formatDateTimes(item?.createdAt) || "N/A"}
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={7} rowSpan={2}>
                    <NoData
                      title="No Subscription Report"
                      desc="No subscription report available at the moment"
                    />
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        )}
      </TableContainer>

      <Flex
        justifyContent="center"
        align="center"
        flexDir="column"
        w="full"
        pt={5}
      >
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

export default SubTableLayer;

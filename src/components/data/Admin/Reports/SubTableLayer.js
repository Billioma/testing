import React from "react";
import {
  Box,
  Flex,
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

const SubTableLayer = ({ isLoading, limit, data, setPage, page }) => {
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
                      title="No Event"
                      desc="No event has been added to your account"
                    />
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        )}
      </TableContainer>

      <Flex
        mt="20px"
        justifyContent="center"
        align="center"
        flexDir="column"
        w="full"
      >
        <Flex
          flexDir={{ base: "column", md: "row" }}
          justifyContent="center"
          gap={{ base: "10px", md: "32px" }}
          align="center"
        >
          <Text fontSize="12px" color="#242628" lineHeight="100%">
            Showing rows 1 to {limit} of {data?.total}
          </Text>

          <Flex gap="16px" align="center">
            <Flex
              opacity={data?.page === 1 ? 0.5 : 1}
              onClick={() => (data?.page === 1 ? "" : setPage(page - 1))}
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
              <Text fontWeight={500} fontSize="12px">
                -{" "}
              </Text>
              <Flex
                bg="#242628"
                py="6px"
                px="8px"
                color="#fff"
                fontSize="12px"
                lineHeight="100%"
              >
                <Text>{data?.pageCount}</Text>
              </Flex>
            </Flex>

            <Flex
              opacity={data?.page === data?.pageCount ? 0.5 : 1}
              onClick={() =>
                data?.page === data?.pageCount ? "" : setPage(page + 1)
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
        </Flex>
      </Flex>
    </Box>
  );
};

export default SubTableLayer;

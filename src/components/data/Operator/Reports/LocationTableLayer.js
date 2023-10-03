import React from "react";
import {
  Box,
  Flex,
  Image,
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
import { operatorRepLocationHeader } from "../../../common/constants";
import { formatDateTimes } from "../../../../utils/helpers";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const LocationTableLayer = ({ isLoading, limit, data, setPage, page }) => {
  return (
    <Box mt="16px">
      {isLoading ? (
        <TableLoader />
      ) : data?.data?.length ? (
        <>
          <TableContainer maxH="60vh" minH="40vh" overflowY="scroll">
            <Table>
              <Thead bg="#F4F6F8">
                <Tr>
                  {operatorRepLocationHeader?.map((data, i) => (
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
                {data?.data?.map((item, i) => (
                  <Tr fontSize="12px" fontWeight={500} color="#646668" key={i}>
                    <Td>{item?.name}</Td>
                    <Td textAlign="center">{item?.state}</Td>
                    <Td textAlign="center">{item?.zones}</Td>
                    <Td textAlign="center">
                      <Flex justifyContent="center" align="center" w="full">
                        <Flex
                          justifyContent="center"
                          align="center"
                          bg="#f4f6f8"
                          borderRadius="4px"
                          py="7px"
                          fontSize="10px"
                          w="fit-content"
                          px="16px"
                        >
                          {item?.locationType
                            ?.replace("_", " ")
                            ?.replace("_", " ")}
                        </Flex>
                      </Flex>
                    </Td>
                    <Td textAlign="center">
                      {formatDateTimes(item?.createdAt)}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
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
                {" "}
                Showing rows {page === 1 ? 1 : (page - 1) * limit + 1} to{" "}
                {data?.pageCount === page
                  ? page * limit > data?.total
                    ? data?.total
                    : page * limit
                  : page * limit}{" "}
                of {data?.total}
              </Text>

              <Flex gap="16px" align="center" fontSize="12px">
                <Flex
                  opacity={data?.page === 1 ? 0.5 : 1}
                  onClick={() => (data?.page === 1 ? "" : setPage(page - 1))}
                  cursor={data?.page === 1 ? "" : "pointer"}
                  align="center"
                  gap="2px"
                  color="#A4A6A8"
                >
                  <IoIosArrowBack />
                  <Text lineHeight="100%">Previous</Text>
                </Flex>

                <Flex color="#242628" lineHeight="100%">
                  <Text>{data?.page}</Text>
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
                >
                  <IoIosArrowForward />
                  <Text lineHeight="100%">Next</Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </>
      ) : (
        <Flex
          gap="16px"
          justifyContent="center"
          align="center"
          my="38px"
          flexDir="column"
        >
          <Image src="/assets/no-loc-rep.jpg" w="64px" h="64px" />
          <Text
            color="#848688"
            fontSize="12px"
            lineHeight="100%"
            fontWeight={500}
          >
            No Location Report yet
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default LocationTableLayer;

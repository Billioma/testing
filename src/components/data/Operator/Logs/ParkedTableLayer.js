import React from "react";
import {
  Box,
  Button,
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
import { operatorLogHeader } from "../../../common/constants";
import { formatDateTimes } from "../../../../utils/helpers";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";

const ParkedTableLayer = ({ isLoading, limit, data, setPage, page }) => {
  const navigate = useNavigate();

  return (
    <Box mt="16px">
      {data?.data?.length ? (
        <>
          <TableContainer maxH="60vh" minH="40vh" overflowY="scroll">
            {isLoading ? (
              <TableLoader />
            ) : (
              <Table>
                <Thead bg="#F4F6F8">
                  <Tr>
                    {operatorLogHeader?.map((data, i) => (
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
                    <Tr
                      fontSize="12px"
                      fontWeight={500}
                      color="#646668"
                      key={i}
                    >
                      <Td>{item?.ticketNumber}</Td>
                      <Td textAlign="center">{item?.location?.name}</Td>
                      <Td textAlign="center">{item?.zone?.name}</Td>
                      <Td textAlign="center">{item?.attendant?.name}</Td>
                      <Td textAlign="center">
                        {formatDateTimes(item?.createdAt)}
                      </Td>

                      <Td>
                        <Flex align="center" justifyContent="center">
                          <Button
                            bg="#A11212"
                            _hover={{ bg: "#A11212" }}
                            _active={{ bg: "#A11212" }}
                            _focus={{ bg: "#A11212" }}
                            color="#fff"
                            fontWeight={500}
                            onClick={() =>
                              navigate(
                                `/operator/logs/parked-vehicles/${item?.id}`
                              )
                            }
                            lineHeight="100%"
                            px="16px"
                            py="8px"
                            fontSize="12px"
                            display="flex"
                            align="center"
                            gap="8px"
                          >
                            <AiOutlineEye size="16px" color="#fff" />
                            View
                          </Button>
                        </Flex>
                      </Td>
                    </Tr>
                  ))}
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
                    bg="tranparent"
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
        </>
      ) : (
        <Flex
          gap="16px"
          justifyContent="center"
          align="center"
          my="38px"
          flexDir="column"
        >
          <Image src="/assets/no-log.jpg" w="64px" h="64px" />
          <Text
            color="#848688"
            fontSize="12px"
            lineHeight="100%"
            fontWeight={500}
          >
            No Parked Vehicles yet
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default ParkedTableLayer;

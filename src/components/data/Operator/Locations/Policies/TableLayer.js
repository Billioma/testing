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
import TableLoader from "../../../../loaders/TableLoader";
import {
  SecStatus,
  operatorPoliciesHeader,
} from "../../../../common/constants";
import { formatDateTimes } from "../../../../../utils/helpers";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { Add } from "../../../../common/images";
import { BsEye } from "react-icons/bs";

const TableLayer = ({ isLoading, limit, data, setPage, page }) => {
  const navigate = useNavigate();

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
                  {operatorPoliciesHeader?.map((data, i) => (
                    <Th
                      textAlign={i > 1 ? "center" : "start"}
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
                    <Td>{item?.title}</Td>
                    <Td>{item?.location?.name || "N/A"}</Td>
                    <Td>
                      <Flex align="center" w="full" justifyContent="center">
                        <Flex
                          color={Object?.values(SecStatus[item?.status])[0]}
                          bg={Object?.values(SecStatus[item?.status])[2]}
                          py="5px"
                          px="16px"
                          justifyContent="center"
                          borderRadius="4px"
                          align="center"
                        >
                          {Object?.values(SecStatus[item?.status])[1]}
                        </Flex>
                      </Flex>
                    </Td>
                    <Td textAlign="center">
                      {formatDateTimes(item?.createdAt)}
                    </Td>

                    <Td>
                      <Flex gap="20px" align="center" justifyContent="center">
                        <Button
                          bg="transparent"
                          border="1px solid #848688"
                          color="#848688"
                          fontWeight={500}
                          lineHeight="100%"
                          fontSize="12px"
                          _hover={{ bg: "transparent" }}
                          _active={{ bg: "transparent" }}
                          _focus={{ bg: "transparent" }}
                          display="flex"
                          onClick={() => (
                            navigate(
                              `/operator/locations/policies/${item?.id}`
                            ),
                            sessionStorage.setItem("edit", "edit")
                          )}
                          px="16px"
                          py="8px"
                          align="center"
                          gap="8px"
                        >
                          <AiOutlineEdit size="16px" color="#848688" />
                          Edit
                        </Button>
                        <Button
                          bg="#A11212"
                          _hover={{ bg: "#A11212" }}
                          _active={{ bg: "#A11212" }}
                          _focus={{ bg: "#A11212" }}
                          color="#fff"
                          fontWeight={500}
                          onClick={() =>
                            navigate(`/operator/locations/policies/${item?.id}`)
                          }
                          lineHeight="100%"
                          px="16px"
                          py="8px"
                          fontSize="12px"
                          display="flex"
                          align="center"
                          gap="8px"
                        >
                          <BsEye size="16px" color="#fff" />
                          View
                        </Button>
                      </Flex>
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

              <Flex gap="16px" align="center">
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
          <Image src="/assets/no-policy.jpg" w="64px" h="64px" />
          <Text
            color="#848688"
            fontSize="12px"
            lineHeight="100%"
            fontWeight={500}
          >
            No Policy Data
          </Text>

          <Button
            onClick={() => navigate("/operator/locations/policies/create")}
            display="flex"
            gap="8px"
            fontSize="12px"
          >
            <Text>Add a Policy</Text>
            <Add fill="#fff" />
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default TableLayer;

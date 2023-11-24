import React, { useEffect, useState } from "react";
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
import {
  IoIosArrowBack,
  IoIosArrowDown,
  IoIosArrowForward,
} from "react-icons/io";
import { TbListDetails } from "react-icons/tb";
import NoData from "../../../components/common/NoData";
import {
  SecStatus,
  clientTranBody,
  optTranHeader,
} from "../../../components/common/constants";
import { useNavigate } from "react-router-dom";

const Transactions = () => {
  const [show, setShow] = useState(false);
  const [currentUser, setCurrentUser] = useState("");

  const open = (item) => {
    setShow(true);
    setCurrentUser(item);
  };
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest(".box") === null) {
        setShow(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <Box borderRadius="8px" border="1px solid #d4d6d8" p="16px 23px 24px">
      <Box mt="16px">
        <TableContainer maxH="60vh" minH="40vh" overflowY="scroll">
          <Table>
            <Thead bg="#F4F6F8">
              <Tr>
                {optTranHeader?.map((data, i) => (
                  <Th
                    key={i}
                    pos="sticky"
                    top="0"
                    textAlign={i !== 0 ? "center" : "start"}
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
              {clientTranBody?.length ? (
                clientTranBody?.map((item, i) => (
                  <Tr fontSize="12px" fontWeight={500} color="#646668" key={i}>
                    <Td>{item?.ticket}</Td>
                    <Td textAlign="center">
                      ₦{" "}
                      {item?.amount?.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      }) || "0.00"}
                    </Td>
                    <Td textAlign="center">{item?.zone}</Td>
                    <Td textAlign="center">{item?.plate}</Td>
                    <Td textAlign="center">{item?.type}</Td>

                    <Td>
                      <Flex justifyContent="center" w="full" align="center">
                        <Flex
                          color={Object.values(SecStatus[item?.status])[0]}
                          bg={Object.values(SecStatus[item?.status])[2]}
                          py="5px"
                          px="16px"
                          justifyContent="center"
                          borderRadius="4px"
                          align="center"
                        >
                          {Object.values(SecStatus[item?.status])[1]}
                        </Flex>
                      </Flex>
                    </Td>
                    <Td textAlign="center">{item?.date}</Td>
                    <Td>
                      <Flex
                        onClick={() => open(item)}
                        justifyContent="center"
                        pos="relative"
                        cursor="pointer"
                        className="box"
                        align="center"
                      >
                        <IoIosArrowDown />
                        {show && currentUser === item && (
                          <Box
                            border="1px solid #F4F6F8"
                            px="4px"
                            py="8px"
                            bg="#fff"
                            borderRadius="4px"
                            pos="absolute"
                            top={i < 3 ? "20px" : "unset"}
                            bottom={i > 3 ? "0" : "unset"}
                            right="0"
                            zIndex={5555555}
                            boxShadow="0px 8px 16px 0px rgba(0, 0, 0, 0.08)"
                          >
                            <Flex
                              py="6px"
                              px="8px"
                              borderRadius="2px"
                              justifyContent="center"
                              align="center"
                              _hover={{ bg: "#F4F6F8" }}
                              onClick={() =>
                                navigate(
                                  "/operator/transactions/transaction-details"
                                )
                              }
                              cursor="pointer"
                              fontSize="10px"
                              w="full"
                              lineHeight="100%"
                              fontWeight={500}
                              gap="12px"
                            >
                              <TbListDetails size="15px" />
                              View Details
                            </Flex>
                          </Box>
                        )}
                      </Flex>
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan={7} rowSpan={2}>
                    <NoData title="No User" desc="No user has been added" />
                  </Td>
                </Tr>
              )}
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
              Showing rows 1 to 10 of 20
            </Text>

            <Flex gap="16px" align="center">
              <Flex
                // opacity={clientTranBody?.page === 1 ? 0.5 : 1}
                // onClick={() => (clientTranBody?.page === 1 ? "" : setPage(page - 1))}
                // cursor={clientTranBody?.page === 1 ? "" : "pointer"}
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
                  <Text>1</Text>
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
                  <Text>2</Text>
                </Flex>
              </Flex>

              <Flex
                // opacity={clientTranBody?.page === clientTranBody?.pageCount ? 0.5 : 1}
                // onClick={() =>
                //   clientTranBody?.page === clientTranBody?.pageCount ? "" : setPage(page + 1)
                // }
                // cursor={clientTranBody?.page === clientTranBody?.pageCount ? "" : "pointer"}
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
    </Box>
  );
};

export default Transactions;

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
  clientLogPayBody,
  clientLogPayHeader,
} from "../../../components/common/constants";
import { useNavigate } from "react-router-dom";

const Logs = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState("");

  const open = (item) => {
    setShow(true);
    setCurrentUser(item);
  };

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
                {clientLogPayHeader?.map((data, i) => (
                  <Th
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
              {clientLogPayBody?.length ? (
                clientLogPayBody?.map((item, i) => (
                  <Tr fontSize="12px" fontWeight={500} color="#646668" key={i}>
                    <Td>{item?.ticket}</Td>
                    <Td>{item?.plate}</Td>
                    <Td>{item?.customer}</Td>
                    <Td whiteSpace="pre-wrap">{item?.location}</Td>
                    <Td>{item?.zone}</Td>
                    <Td>{item?.attendant}</Td>
                    <Td>
                      ₦{" "}
                      {item?.amount?.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </Td>
                    <Td>
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
                    </Td>
                    <Td>{item?.date}</Td>
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
                              onClick={() =>
                                navigate("/client/logs/pay-to-park/details")
                              }
                              align="center"
                              _hover={{ bg: "#F4F6F8" }}
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
                // opacity={clientLogPayBody?.page === 1 ? 0.5 : 1}
                // onClick={() => (clientLogPayBody?.page === 1 ? "" : setPage(page - 1))}
                // cursor={clientLogPayBody?.page === 1 ? "" : "pointer"}
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
                // opacity={clientLogPayBody?.page === clientLogPayBody?.pageCount ? 0.5 : 1}
                // onClick={() =>
                //   clientLogPayBody?.page === clientLogPayBody?.pageCount ? "" : setPage(page + 1)
                // }
                // cursor={clientLogPayBody?.page === clientLogPayBody?.pageCount ? "" : "pointer"}
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

export default Logs;

import React, { useState } from "react";
import { Box, Flex, Icon, Image, Select, Td, Text, Tr } from "@chakra-ui/react";
import TableFormat from "../../../common/TableFormat";
import { FiMoreVertical } from "react-icons/fi";
import {
  Status,
  companyPayToParkHeader,
  usServiceTabs,
  companyCarHeader,
} from "../../../common/constants";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { formatDateNewTime } from "../../../../utils/helpers";
import { useEffect } from "react";
import { TbListDetails } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import {
  useGetCustomerServiceLog,
  useGetCustomerparkingLog,
} from "../../../../services/customer/query/logs";

const UsTableLayer = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [tab, setTab] = useState("Valet Parking");
  const [limit, setLimit] = useState(25);

  const { data: parkingLog, isLoading } = useGetCustomerparkingLog(
    {
      refetchOnWindowFocus: true,
    },
    "PARKING",
    page,
    limit
  );
  const { data: valetLog, isLoading: isValet } = useGetCustomerServiceLog(
    {
      refetchOnWindowFocus: true,
    },
    "VALET",
    page,
    limit
  );
  const { data: serviceLog, isLoading: isService } = useGetCustomerServiceLog(
    {
      refetchOnWindowFocus: true,
    },
    "SERVICE",
    page,
    limit
  );

  const tabMap =
    tab === "Pay-To-Park"
      ? parkingLog?.data?.filter((item) => item?.ticketNumber?.includes("PTP"))
      : tab === "Valet Parking"
      ? valetLog?.data
      : tab === "Car Services" && serviceLog?.data;
  const [show, setShow] = useState(false);
  const [currentItem, setCurrentItem] = useState("");

  const open = (dat) => {
    setShow(true);
    setCurrentItem(dat);
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
    <Box>
      <TableFormat
        tab={
          <Flex
            flexWrap="wrap"
            justifyContent={{ base: "center", md: "" }}
            rowGap={{ base: "20px", md: "unset" }}
          >
            {usServiceTabs.map((dat, i) => (
              <Text
                px={{ base: "0px", md: "30px" }}
                pb="13px"
                textAlign={{ base: "center", md: "" }}
                fontSize={{ base: "12px", md: "14px" }}
                cursor="pointer"
                onClick={() => {
                  setTab(dat);
                  setPage(1);
                  setLimit(25);
                }}
                w={{ base: "50%", md: "unset" }}
                fontWeight={tab === dat ? 500 : 400}
                color={tab === dat ? "red" : "#646668"}
                borderBottom={tab === dat ? "3px solid #EE383A" : ""}
                key={i}
              >
                {dat}
              </Text>
            ))}
          </Flex>
        }
        isLoading={
          tab === "Pay-To-Park"
            ? isLoading
            : tab === "Valet Parking"
            ? isValet
            : isService
        }
        header={
          tab === "Pay-To-Park" || tab === "Valet Parking"
            ? companyPayToParkHeader
            : companyCarHeader
        }
        paginate={
          <Flex
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
              <Text fontSize="14px" color="#242628" lineHeight="100%">
                Showing rows {page === 1 ? 1 : (page - 1) * limit + 1} to{" "}
                {tab === "Pay-To-Park"
                  ? parkingLog?.pageCount === page
                    ? page * limit > parkingLog?.total
                      ? parkingLog?.total
                      : page * limit
                    : page * limit
                  : tab === "Car Services"
                  ? serviceLog?.pageCount === page
                    ? page * limit > serviceLog?.total
                      ? serviceLog?.total
                      : page * limit
                    : page * limit
                  : tab === "Valet Parking" && valetLog?.pageCount === page
                  ? page * limit > valetLog?.total
                    ? valetLog?.total
                    : page * limit
                  : page * limit}{" "}
                of{" "}
                {tab === "Pay-To-Park"
                  ? parkingLog?.total
                  : tab === "Valet Parking"
                  ? valetLog?.total
                  : tab === "Car Services" && serviceLog?.total}
              </Text>

              <Flex gap="16px" align="center" fontSize="14px">
                <Flex
                  opacity={
                    tab === "Pay-To-Park"
                      ? parkingLog?.page === 1
                        ? 0.5
                        : 1
                      : tab === "Valet Parking"
                      ? valetLog?.page === 1
                        ? 0.5
                        : 1
                      : tab === "Car Services" && serviceLog?.page === 1
                      ? 0.5
                      : 1
                  }
                  onClick={() =>
                    tab === "Pay-To-Park"
                      ? parkingLog?.page !== 1
                        ? setPage(page - 1)
                        : ""
                      : tab === "Valet Parking"
                      ? valetLog?.page !== 1
                        ? setPage(page - 1)
                        : ""
                      : tab === "Car Services" && serviceLog?.page !== 1
                      ? setPage(page - 1)
                      : ""
                  }
                  cursor={
                    tab === "Pay-To-Park" ||
                    tab === "Valet Parking" ||
                    tab === "Event Parking"
                      ? parkingLog?.page === 1
                        ? ""
                        : "pointer"
                      : tab === "Valet Parking"
                      ? valetLog?.page === 1
                        ? ""
                        : "pointer"
                      : tab === "Car Services" && serviceLog?.page === 1
                      ? ""
                      : "pointer"
                  }
                  align="center"
                  gap="2px"
                  color="#A4A6A8"
                >
                  <IoIosArrowBack />
                  <Text lineHeight="100%">Previous</Text>
                </Flex>

                <Flex color="#242628" lineHeight="100%">
                  <Text>
                    {tab === "Pay-To-Park" ||
                    tab === "Reserve Parking" ||
                    tab === "Event Parking"
                      ? parkingLog?.page
                      : tab === "Valet Parking"
                      ? valetLog?.page
                      : tab === "Car Services" && serviceLog?.page}
                  </Text>
                </Flex>

                <Flex
                  opacity={
                    tab === "Pay-To-Park" ||
                    tab === "Reserve Parking" ||
                    tab === "Event Parking"
                      ? parkingLog?.page === parkingLog?.pageCount
                        ? 0.5
                        : 1
                      : tab === "Valet Parking"
                      ? valetLog?.page === valetLog?.pageCount
                        ? 0.5
                        : 1
                      : tab === "Car Services" &&
                        serviceLog?.page === serviceLog?.pageCount
                      ? 0.5
                      : 1
                  }
                  onClick={() =>
                    tab === "Pay-To-Park" ||
                    tab === "Reserve Parking" ||
                    tab === "Event Parking"
                      ? parkingLog?.page !== parkingLog?.pageCount
                        ? setPage(page + 1)
                        : ""
                      : tab === "Valet Parking"
                      ? valetLog?.page !== valetLog?.pageCount
                        ? setPage(page + 1)
                        : ""
                      : tab === "Car Services" &&
                        serviceLog?.page !== serviceLog?.pageCount
                      ? setPage(page + 1)
                      : ""
                  }
                  cursor={
                    tab === "Pay-To-Park" ||
                    tab === "Reserve Parking" ||
                    tab === "Event Parking"
                      ? parkingLog?.page === parkingLog?.pageCount
                        ? ""
                        : "pointer"
                      : tab === "Valet Parking"
                      ? valetLog?.page === valetLog?.pageCount
                        ? ""
                        : "pointer"
                      : tab === "Car Services" &&
                        serviceLog?.page === serviceLog?.pageCount
                      ? ""
                      : "pointer"
                  }
                  align="center"
                  gap="2px"
                  color="#A4A6A8"
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
                {["25", "50", "100"].map((dat, i) => (
                  <option key={i} value={dat}>
                    {dat}
                  </option>
                ))}
              </Select>
            </Flex>
          </Flex>
        }
      >
        {tab === "Valet Parking" ? (
          tabMap?.length ? (
            tabMap?.map((dat, i) => (
              <Tr
                key={i}
                color="#646668"
                fontWeight={500}
                fontSize="14px"
                lineHeight="100%"
              >
                <Td textAlign="center">{dat?.ticketNumber}</Td>
                <Td textAlign="center">{dat?.attendant?.name}</Td>
                <Td textAlign="center">{dat?.vehicle?.licensePlate}</Td>
                <Td textAlign="center">{dat?.service?.name}</Td>
                <Td>
                  <Flex justifyContent="center" align="center" w="full">
                    <Flex
                      color={Object.values(Status[dat?.status])[0]}
                      bg={Object.values(Status[dat?.status])[2]}
                      py="5px"
                      px="16px"
                      w="fit-content"
                      justifyContent="center"
                      borderRadius="4px"
                      align="center"
                    >
                      {Object.values(Status[dat?.status])[1]}
                    </Flex>
                  </Flex>
                </Td>
                <Td textAlign="center">{formatDateNewTime(dat?.createdAt)}</Td>
                <Td>
                  <Flex
                    pos="relative"
                    cursor="pointer"
                    onClick={() => open(dat)}
                    justifyContent="center"
                    className="box"
                    align="center"
                  >
                    <FiMoreVertical />

                    {show && currentItem === dat && (
                      <Box
                        border="1px solid #F4F6F8"
                        px="4px"
                        py="8px"
                        bg="#fff"
                        borderRadius="4px"
                        pos="absolute"
                        right="0"
                        zIndex={5555555}
                        top="20px"
                        boxShadow="0px 8px 16px 0px rgba(0, 0, 0, 0.08)"
                      >
                        <Flex
                          mb="8px"
                          py="6px"
                          px="8px"
                          borderRadius="2px"
                          justifyContent="center"
                          align="center"
                          _hover={{ bg: "#F4F6F8" }}
                          cursor="pointer"
                          fontSize="12px"
                          gap="12px"
                          w="full"
                          onClick={() =>
                            navigate(
                              `/customer/history/company/valet-parking/${dat?.id}`
                            )
                          }
                          color="#646668"
                          lineHeight="100%"
                          fontWeight={500}
                        >
                          <Icon as={TbListDetails} w="20px" h="20px" />
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
                <Flex
                  textAlign="center"
                  justifyContent="center"
                  mt="30px"
                  align="center"
                  w="full"
                >
                  <Flex
                    textAlign="center"
                    justifyContent="center"
                    align="center"
                    flexDir="column"
                    border="1px solid #e4e6e8"
                    borderRadius="8px"
                    py="16px"
                    px="24px"
                    w="fit-content"
                  >
                    <Image src="/assets/no-sub.jpg" w="48px" h="48px" />

                    <Text
                      my="16px"
                      color="#646668"
                      lineHeight="100%"
                      fontWeight={700}
                    >
                      No Recent Activity
                    </Text>
                    <Text
                      fontSize="13px"
                      color="#A4A6A8"
                      fontWeight={500}
                      lineHeight="100%"
                    >
                      Make use of any of our parking services
                    </Text>
                  </Flex>
                </Flex>
              </Td>
            </Tr>
          )
        ) : tab === "Pay-To-Park" ? (
          tabMap?.length ? (
            tabMap?.map((dat, i) => (
              <Tr
                key={i}
                color="#646668"
                fontWeight={500}
                fontSize="14px"
                lineHeight="100%"
              >
                <Td textAlign="center">{dat?.ticketNumber}</Td>
                <Td textAlign="center">{dat?.attendant?.name}</Td>
                <Td textAlign="center">{dat?.vehicle?.licensePlate}</Td>
                <Td textAlign="center">{dat?.service?.name}</Td>
                <Td>
                  <Flex justifyContent="center" align="center" w="full">
                    <Flex
                      color={Object.values(Status[dat?.status])[0]}
                      bg={Object.values(Status[dat?.status])[2]}
                      py="5px"
                      px="16px"
                      w="fit-content"
                      justifyContent="center"
                      borderRadius="4px"
                      align="center"
                    >
                      {Object.values(Status[dat?.status])[1]}
                    </Flex>
                  </Flex>
                </Td>
                <Td textAlign="center">{formatDateNewTime(dat?.createdAt)}</Td>
                <Td>
                  <Flex
                    pos="relative"
                    cursor="pointer"
                    onClick={() => open(dat)}
                    justifyContent="center"
                    className="box"
                    align="center"
                  >
                    <FiMoreVertical />

                    {show && currentItem === dat && (
                      <Box
                        border="1px solid #F4F6F8"
                        px="4px"
                        py="8px"
                        bg="#fff"
                        borderRadius="4px"
                        pos="absolute"
                        right="0"
                        zIndex={5555555}
                        top="20px"
                        boxShadow="0px 8px 16px 0px rgba(0, 0, 0, 0.08)"
                      >
                        <Flex
                          mb="8px"
                          py="6px"
                          px="8px"
                          borderRadius="2px"
                          justifyContent="center"
                          align="center"
                          _hover={{ bg: "#F4F6F8" }}
                          cursor="pointer"
                          fontSize="12px"
                          gap="12px"
                          w="full"
                          onClick={() =>
                            navigate(
                              `/customer/history/company/pay-to-park/${dat?.id}`
                            )
                          }
                          color="#646668"
                          lineHeight="100%"
                          fontWeight={500}
                        >
                          <Icon as={TbListDetails} w="20px" h="20px" />
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
                <Flex
                  textAlign="center"
                  justifyContent="center"
                  mt="30px"
                  align="center"
                  w="full"
                >
                  <Flex
                    textAlign="center"
                    justifyContent="center"
                    align="center"
                    flexDir="column"
                    border="1px solid #e4e6e8"
                    borderRadius="8px"
                    py="16px"
                    px="24px"
                    w="fit-content"
                  >
                    <Image src="/assets/no-sub.jpg" w="48px" h="48px" />

                    <Text
                      my="16px"
                      color="#646668"
                      lineHeight="100%"
                      fontWeight={700}
                    >
                      No Recent Activity
                    </Text>
                    <Text
                      fontSize="13px"
                      color="#A4A6A8"
                      fontWeight={500}
                      lineHeight="100%"
                    >
                      Make use of any of our parking services
                    </Text>
                  </Flex>
                </Flex>
              </Td>
            </Tr>
          )
        ) : (
          tab === "Car Services" &&
          (tabMap?.length ? (
            tabMap?.map((dat, i) => (
              <Tr
                key={i}
                color="#646668"
                fontWeight={500}
                fontSize="14px"
                lineHeight="100%"
              >
                <Td textAlign="center">{dat?.ticketNumber}</Td>
                <Td textAlign="center">
                  ₦{" "}
                  {dat?.amount?.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  }) || "0.00"}
                </Td>
                <Td textAlign="center">{dat?.attendant?.name}</Td>
                <Td textAlign="center">{dat?.vehicle?.licensePlate}</Td>
                <Td textAlign="center">
                  <Flex
                    flexDir="column"
                    bg="#F4F6F8"
                    borderRadius="4px"
                    px="16px"
                    py="8px"
                  >
                    {dat?.service?.serviceType}
                  </Flex>
                </Td>
                <Td>
                  <Flex justifyContent="center" align="center" w="full">
                    <Flex
                      color={Object.values(Status[dat?.status])[0]}
                      bg={Object.values(Status[dat?.status])[2]}
                      py="5px"
                      px="16px"
                      w="fit-content"
                      justifyContent="center"
                      borderRadius="4px"
                      align="center"
                    >
                      {Object.values(Status[dat?.status])[1]}
                    </Flex>
                  </Flex>
                </Td>
                <Td textAlign="center">{formatDateNewTime(dat?.createdAt)}</Td>
                <Td>
                  <Flex
                    pos="relative"
                    cursor="pointer"
                    onClick={() => open(dat)}
                    justifyContent="center"
                    className="box"
                    align="center"
                  >
                    <FiMoreVertical />

                    {show && currentItem === dat && (
                      <Box
                        border="1px solid #F4F6F8"
                        px="4px"
                        py="8px"
                        bg="#fff"
                        borderRadius="4px"
                        pos="absolute"
                        right="0"
                        zIndex={5555555}
                        top="20px"
                        boxShadow="0px 8px 16px 0px rgba(0, 0, 0, 0.08)"
                      >
                        <Flex
                          mb="8px"
                          py="6px"
                          px="8px"
                          borderRadius="2px"
                          justifyContent="center"
                          align="center"
                          _hover={{ bg: "#F4F6F8" }}
                          cursor="pointer"
                          fontSize="12px"
                          gap="12px"
                          w="full"
                          onClick={() =>
                            navigate(
                              `/customer/history/company/car-service/${dat?.id}`
                            )
                          }
                          color="#646668"
                          lineHeight="100%"
                          fontWeight={500}
                        >
                          <Icon as={TbListDetails} w="20px" h="20px" />
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
              <Td colSpan={8} rowSpan={2}>
                <Flex
                  textAlign="center"
                  justifyContent="center"
                  mt="30px"
                  align="center"
                  w="full"
                >
                  <Flex
                    textAlign="center"
                    justifyContent="center"
                    align="center"
                    flexDir="column"
                    border="1px solid #e4e6e8"
                    borderRadius="8px"
                    py="16px"
                    px="24px"
                    w="fit-content"
                  >
                    <Image src="/assets/no-sub.jpg" w="48px" h="48px" />

                    <Text
                      my="16px"
                      color="#646668"
                      lineHeight="100%"
                      fontWeight={700}
                    >
                      No Recent Activity
                    </Text>
                    <Text
                      fontSize="13px"
                      color="#A4A6A8"
                      fontWeight={500}
                      lineHeight="100%"
                    >
                      Make use of any of our parking services
                    </Text>
                  </Flex>
                </Flex>
              </Td>
            </Tr>
          ))
        )}
      </TableFormat>
    </Box>
  );
};

export default UsTableLayer;

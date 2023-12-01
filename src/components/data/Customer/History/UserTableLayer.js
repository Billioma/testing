import React, { useState } from "react";
import { Box, Flex, Icon, Image, Select, Td, Text, Tr } from "@chakra-ui/react";
import TableFormat from "../../../common/TableFormat";
import { FiMoreVertical } from "react-icons/fi";
import {
  Status,
  payToParkHeader,
  serviceTabs,
  reserveHeader,
  eventHeader,
  carHeader,
  BookingSlots,
} from "../../../common/constants";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {
  useCancelBooking,
  useCancelReserve,
  useGetCarService,
  useGetEventParking,
  useGetPayToPark,
  useGetReserveParking,
} from "../../../../services/customer/query/services";
import { formatDate, formatDateTime } from "../../../../utils/helpers";
import ConfirmDeleteModal from "../../../modals/ConfirmDeleteModal";
import useCustomToast from "../../../../utils/notifications";
import { useEffect } from "react";
import { FcCancel } from "react-icons/fc";
import { TbListDetails } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const UserTableLayer = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [tab, setTab] = useState("Pay-To-Park");
  const [limit, setLimit] = useState(25);
  const {
    isLoading,
    data: payToPark,
    refetch: refetchpark,
  } = useGetPayToPark(limit, page);

  const {
    isLoading: isReserving,
    data: reserveParking,
    refetch,
  } = useGetReserveParking(limit, page);
  const {
    isLoading: isCar,
    data: carService,
    refetch: refetchBook,
  } = useGetCarService(limit, page);
  const {
    isLoading: isEvent,
    data: eventParking,
    refetch: refetchEvent,
  } = useGetEventParking(limit, page);

  useEffect(() => {
    refetchpark();
    refetch();
    refetchBook();
    refetchEvent();
  }, []);

  const [show, setShow] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [currentItem, setCurrentItem] = useState("");

  useEffect(() => {
    if (showCancel) {
      setShow(false);
    }
  }, [showCancel]);

  const open = (dat) => {
    setShow(true);
    setCurrentItem(dat);
  };

  const { errorToast, successToast } = useCustomToast();

  const { mutate: bookCancel, isLoading: isCancelBook } = useCancelBooking({
    onSuccess: () => {
      setShowCancel(false);
      successToast("Reservation Cancelled");
      refetchBook();
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred"
      );
    },
  });
  const { mutate, isLoading: isCancel } = useCancelReserve({
    onSuccess: () => {
      setShowCancel(false);
      successToast("Reservation Cancelled");
      refetch();
    },
    onError: (err) => {
      errorToast(
        err?.response?.data?.message || err?.message || "An Error occurred"
      );
    },
  });

  const handleCancel = () => {
    bookCancel(currentItem?.id);
  };

  const handleSubmit = () => {
    mutate(currentItem?.id);
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
          <Flex flexWrap="wrap" rowGap={{ base: "20px", md: "unset" }}>
            {serviceTabs?.slice(1, 5)?.map((dat, i) => (
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
            : tab === "Reserve Parking"
            ? isReserving
            : tab === "Event Parking"
            ? isEvent
            : isCar
        }
        header={
          tab === "Pay-To-Park"
            ? payToParkHeader
            : tab === "Reserve Parking"
            ? reserveHeader
            : tab === "Event Parking"
            ? eventHeader
            : carHeader
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
              <Text fontSize="12px" color="#242628" lineHeight="100%">
                Showing rows {page === 1 ? 1 : (page - 1) * limit + 1} to{" "}
                {tab === "Pay-To-Park"
                  ? payToPark?.pageCount === page
                    ? page * limit > payToPark?.total
                      ? payToPark?.total
                      : page * limit
                    : page * limit
                  : tab === "Reserve Parking"
                  ? reserveParking?.pageCount === page
                    ? page * limit > reserveParking?.total
                      ? reserveParking?.total
                      : page * limit
                    : page * limit
                  : tab === "Event Parking"
                  ? eventParking?.pageCount === page
                    ? page * limit > eventParking?.total
                      ? eventParking?.total
                      : page * limit
                    : page * limit
                  : tab === "Car Services" && carService?.pageCount === page
                  ? page * limit > carService?.total
                    ? carService?.total
                    : page * limit
                  : page * limit}{" "}
                of{" "}
                {tab === "Pay-To-Park"
                  ? payToPark?.total
                  : tab === "Reserve Parking"
                  ? reserveParking?.total
                  : tab === "Event Parking"
                  ? eventParking?.total
                  : tab === "Car Services" && carService?.total}
              </Text>

              <Flex gap="16px" align="center" fontSize="12px">
                <Flex
                  opacity={
                    tab === "Pay-To-Park"
                      ? payToPark?.page === 1
                        ? 0.5
                        : 1
                      : tab === "Reserve Parking"
                      ? reserveParking?.page === 1
                        ? 0.5
                        : 1
                      : tab === "Event Parking"
                      ? eventParking?.page === 1
                        ? 0.5
                        : 1
                      : tab === "Car Services" && carService?.page === 1
                      ? 0.5
                      : 1
                  }
                  onClick={() =>
                    tab === "Pay-To-Park"
                      ? payToPark?.page !== 1
                        ? setPage(page - 1)
                        : ""
                      : tab === "Reserve Parking"
                      ? reserveParking?.page !== 1
                        ? setPage(page - 1)
                        : ""
                      : tab === "Event Parking"
                      ? eventParking?.page !== 1
                        ? setPage(page - 1)
                        : ""
                      : tab === "Car Services" && carService?.page !== 1
                      ? setPage(page - 1)
                      : ""
                  }
                  cursor={
                    tab === "Pay-To-Park"
                      ? payToPark?.page === 1
                        ? ""
                        : "pointer"
                      : tab === "Reserve Parking"
                      ? reserveParking?.page === 1
                        ? ""
                        : "pointer"
                      : tab === "Event Parking"
                      ? eventParking?.page === 1
                        ? ""
                        : "pointer"
                      : tab === "Car Services" && carService?.page === 1
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
                    {tab === "Pay-To-Park"
                      ? payToPark?.page
                      : tab === "Reserve Parking"
                      ? reserveParking?.page
                      : tab === "Event Parking"
                      ? eventParking?.page
                      : tab === "Car Services" && carService?.page}
                  </Text>
                </Flex>

                <Flex
                  opacity={
                    tab === "Pay-To-Park"
                      ? payToPark?.page === payToPark?.pageCount
                        ? 0.5
                        : 1
                      : tab === "Reserve Parking"
                      ? reserveParking?.page === reserveParking?.pageCount
                        ? 0.5
                        : 1
                      : tab === "Event Parking"
                      ? eventParking?.page === eventParking?.pageCount
                        ? 0.5
                        : 1
                      : tab === "Car Services" &&
                        carService?.page === carService?.pageCount
                      ? 0.5
                      : 1
                  }
                  onClick={() =>
                    tab === "Pay-To-Park"
                      ? payToPark?.page !== payToPark?.pageCount
                        ? setPage(page + 1)
                        : ""
                      : tab === "Reserve Parking"
                      ? reserveParking?.page !== reserveParking?.pageCount
                        ? setPage(page + 1)
                        : ""
                      : tab === "Event Parking"
                      ? eventParking?.page !== eventParking?.pageCount
                        ? setPage(page + 1)
                        : ""
                      : tab === "Car Services" &&
                        carService?.page !== carService?.pageCount
                      ? setPage(page + 1)
                      : ""
                  }
                  cursor={
                    tab === "Pay-To-Park"
                      ? payToPark?.page === payToPark?.pageCount
                        ? ""
                        : "pointer"
                      : tab === "Reserve Parking"
                      ? reserveParking?.page === reserveParking?.pageCount
                        ? ""
                        : "pointer"
                      : tab === "Event Parking"
                      ? eventParking?.page === eventParking?.pageCount
                        ? ""
                        : "pointer"
                      : tab === "Car Services" &&
                        carService?.page === carService?.pageCount
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
        {tab === "Pay-To-Park" ? (
          payToPark?.data?.length ? (
            payToPark?.data?.map((dat, i) => (
              <Tr
                key={i}
                color="#646668"
                fontWeight={500}
                fontSize="12px"
                lineHeight="100%"
              >
                <Td textAlign="center">{dat?.ticketNumber}</Td>
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
                <Td textAlign="center">{formatDate(dat?.createdAt)}</Td>
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
                        top={i === payToPark?.data?.length - 1 ? "" : "20px"}
                        bottom={i === payToPark?.data?.length - 1 ? "0" : ""}
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
                          fontSize="10px"
                          gap="12px"
                          w="full"
                          onClick={() =>
                            navigate(
                              `/customer/history/user/pay-to-park/${dat?.id}`
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
                      fontSize="11px"
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
        ) : tab === "Valet Parking" ? (
          payToPark?.data?.length ? (
            payToPark?.data?.map((dat, i) => (
              <Tr
                key={i}
                color="#646668"
                fontWeight={500}
                fontSize="12px"
                lineHeight="100%"
              >
                <Td textAlign="center">{dat?.ticketNumber}</Td>
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
                <Td textAlign="center">{formatDate(dat?.createdAt)}</Td>
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
                        top={i === payToPark?.data?.length - 1 ? "" : "20px"}
                        bottom={i === payToPark?.data?.length - 1 ? "0" : ""}
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
                          fontSize="10px"
                          gap="12px"
                          w="full"
                          onClick={() =>
                            navigate(
                              `/customer/history/user/pay-to-park/${dat?.id}`
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
                      fontSize="11px"
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
        ) : tab === "Reserve Parking" ? (
          reserveParking?.data?.length ? (
            reserveParking?.data?.map((dat, i) => (
              <Tr
                key={i}
                color="#646668"
                fontWeight={500}
                fontSize="12px"
                lineHeight="100%"
              >
                <Td textAlign="center">
                  ₦{" "}
                  {dat?.amount?.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  }) || "0.00"}
                </Td>
                <Td textAlign="center">{dat?.vehicle?.licensePlate}</Td>
                <Td textAlign="center">
                  {formatDateTime(dat?.arrival) || "N/A"}
                </Td>
                <Td textAlign="center">
                  {formatDateTime(dat?.departure) || "N/A"}
                </Td>
                <Td textAlign="center">{formatDate(dat?.createdAt)}</Td>

                <Td>
                  <Flex justifyContent="center" align="center" w="full">
                    <Flex
                      color={Object.values(Status[dat?.status])[0]}
                      bg={Object.values(Status[dat?.status])[2]}
                      py="5px"
                      px="16px"
                      justifyContent="center"
                      w="fit-content"
                      borderRadius="4px"
                      align="center"
                    >
                      {Object.values(Status[dat?.status])[1]}
                    </Flex>
                  </Flex>
                </Td>
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
                        top={
                          i === reserveParking?.data?.length - 1 ? "" : "20px"
                        }
                        bottom={
                          i === reserveParking?.data?.length - 1 ? "0" : ""
                        }
                        boxShadow="0px 8px 16px 0px rgba(0, 0, 0, 0.08)"
                      >
                        {["View Details", "Cancel Reservation"].map(
                          (item, i) => (
                            <Flex
                              key={i}
                              w="full"
                              px="8px"
                              borderRadius="2px"
                              mb="5px"
                              py="9px"
                              align="center"
                              onClick={() =>
                                i == 0
                                  ? navigate(
                                      `/customer/history/user/reserve-parking/${dat?.id}`
                                    )
                                  : setShowCancel(true)
                              }
                              _hover={{ bg: "#F4F6F8" }}
                              cursor="pointer"
                              fontSize="10px"
                              color={i === 0 ? "" : "red"}
                              lineHeight="100%"
                              gap="12px"
                              fontWeight={500}
                            >
                              <Box>
                                {i === 0 ? (
                                  <TbListDetails size="15px" />
                                ) : (
                                  <FcCancel size="15px" />
                                )}
                              </Box>
                              <Box>{item}</Box>
                            </Flex>
                          )
                        )}
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
                      fontSize="11px"
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
        ) : tab === "Event Parking" ? (
          eventParking?.data?.length ? (
            eventParking?.data?.map((dat, i) => (
              <Tr
                key={i}
                color="#646668"
                fontWeight={500}
                fontSize="12px"
                lineHeight="100%"
              >
                <Td textAlign="center">{dat?.ticketNumber}</Td>
                <Td textAlign="center">
                  ₦{" "}
                  {dat?.amount?.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  }) || "0.00"}
                </Td>
                <Td textAlign="center">{dat?.vehicle?.licensePlate}</Td>
                <Td textAlign="center">
                  <Flex justifyContent="center" align="center" w="full">
                    <Flex
                      flexDir="column"
                      bg="#F4F6F8"
                      borderRadius="4px"
                      px="16px"
                      py="8px"
                    >
                      {dat?.service?.serviceType}
                    </Flex>
                  </Flex>
                </Td>
                <Td textAlign="center">{dat?.event?.name}</Td>
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
                <Td textAlign="center">{formatDate(dat?.reservedDate)}</Td>
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
                        top={i === eventParking?.data?.length - 1 ? "" : "20px"}
                        bottom={i === eventParking?.data?.length - 1 ? "0" : ""}
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
                          fontSize="10px"
                          gap="12px"
                          w="full"
                          onClick={() =>
                            navigate(
                              `/customer/history/user/event-parking/${dat?.id}`
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
                      fontSize="11px"
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
        ) : carService?.data?.length ? (
          carService?.data?.map((dat, i) => (
            <Tr
              key={i}
              color="#646668"
              fontWeight={500}
              fontSize="12px"
              lineHeight="100%"
            >
              <Td textAlign="center">{dat?.serviceType}</Td>
              <Td textAlign="center">
                {" "}
                ₦{" "}
                {dat?.amount?.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                }) || "0.00"}
              </Td>
              <Td textAlign="center">
                <Flex
                  flexDir="column"
                  bg="#F4F6F8"
                  borderRadius="4px"
                  px="16px"
                  py="8px"
                >
                  {BookingSlots.find((time, i) => i === dat?.appointmentSlot)}
                </Flex>
              </Td>

              <Td textAlign="center">{dat?.appointmentDate}</Td>

              <Td textAlign="center">{formatDate(dat?.createdAt)}</Td>
              <Td>
                <Flex justifyContent="center" align="center" w="full">
                  <Flex
                    color={Object.values(Status[dat?.status])[0]}
                    bg={Object.values(Status[dat?.status])[2]}
                    py="5px"
                    w="fit-content"
                    px="16px"
                    justifyContent="center"
                    borderRadius="4px"
                    align="center"
                  >
                    {Object.values(Status[dat?.status])[1]}
                  </Flex>
                </Flex>
              </Td>
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
                      top={i === carService?.data?.length - 1 ? "" : "20px"}
                      bottom={i === carService?.data?.length - 1 ? "0" : ""}
                      boxShadow="0px 8px 16px 0px rgba(0, 0, 0, 0.08)"
                    >
                      <Flex
                        py="6px"
                        px="8px"
                        borderRadius="2px"
                        justifyContent="center"
                        align="center"
                        onClick={() => setShowCancel(true)}
                        _hover={{ bg: "#F4F6F8" }}
                        cursor="pointer"
                        fontSize="10px"
                        color="red"
                        gap="12px"
                        w="full"
                        lineHeight="100%"
                        fontWeight={500}
                      >
                        <FcCancel size="15px" />
                        Cancel Reservation
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
                    fontSize="11px"
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
        )}
      </TableFormat>

      <ConfirmDeleteModal
        title="Reservation"
        isOpen={showCancel}
        action={() =>
          tab === "Reserve Parking"
            ? handleSubmit()
            : tab === "Car Services" && handleCancel()
        }
        isLoading={
          tab === "Reserve Parking"
            ? isCancel
            : tab === "Car Services" && isCancelBook
        }
        cancel
        onClose={() => setShowCancel(false)}
      />
    </Box>
  );
};

export default UserTableLayer;

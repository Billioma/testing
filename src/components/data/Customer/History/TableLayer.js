import React, { useState } from "react";
import { Box, Flex, Image, Td, Text, Tr } from "@chakra-ui/react";
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

const TableLayer = () => {
  const [page, setPage] = useState(1);
  const [tab, setTab] = useState("Pay-To-Park");
  const limit = 10;
  const { isLoading, data: payToPark } = useGetPayToPark(limit, page);
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
  const { isLoading: isEvent, data: eventParking } = useGetEventParking(
    limit,
    page
  );

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
        maxH={"50vh"}
        tab={
          <Flex flexWrap="wrap" rowGap={{ base: "20px", md: "unset" }}>
            {serviceTabs.map((dat, i) => (
              <Text
                px={{ base: "30px", md: "50px" }}
                pb="16px"
                fontSize={{ base: "12px", md: "14px" }}
                cursor="pointer"
                onClick={() => {
                  setTab(dat);
                  setPage(1);
                }}
                _hover={{ color: "red" }}
                transition=".4s ease-in-out"
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
        minH="25vh"
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
                Showing rows 1 to {limit} of {payToPark?.total}
              </Text>

              <Flex gap="16px" align="center">
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
                    <Text>
                      {tab === "Pay-To-Park"
                        ? payToPark?.pageCount
                        : tab === "Reserve Parking"
                        ? reserveParking?.pageCount
                        : tab === "Event Parking"
                        ? eventParking?.pageCount
                        : tab === "Car Services" && carService?.pageCount}
                    </Text>
                  </Flex>
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
                  fontSize="12px"
                >
                  <IoIosArrowForward />
                  <Text lineHeight="100%">Next</Text>
                </Flex>
              </Flex>
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
                  })}
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
                  {" "}
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
                        top="20px"
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
                          lineHeight="100%"
                          gap="12px"
                          w="full"
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
                  })}
                </Td>
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
                <Td textAlign="center">{formatDate(dat?.createdAt)}</Td>
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
                })}
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
                      top="20px"
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

export default TableLayer;

import React, { useState } from "react";
import { Box, Flex, Td, Text, Tr } from "@chakra-ui/react";
import TableFormat from "../../common/TableFormat";
import { FiMoreVertical } from "react-icons/fi";
import {
  Status,
  payToParkHeader,
  serviceTabs,
  reserveHeader,
  eventHeader,
  carHeader,
  BookingSlots,
} from "../../common/constants";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {
  useGetCarService,
  useGetPayToPark,
  useGetEventParking,
  useGetReserveParking,
} from "../../../services/customer/query/services";
import NoData from "../../common/NoData";
import { formatDate, formatDateTime } from "../../../utils/helpers";

const TableLayer = () => {
  const [tab, setTab] = useState("Pay-To-Park");
  const { isLoading, data: payToPark } = useGetPayToPark();
  const { isLoading: isReserving, data: reserveParking } =
    useGetReserveParking();

  const { isLoading: isCar, data: carService } = useGetCarService();
  const { isLoading: isEvent, data: eventParking } = useGetEventParking();

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const totalItems =
    tab === "Pay-To-Park"
      ? payToPark?.data?.length
      : tab === "Reserve Parking"
      ? reserveParking?.data?.length
      : tab === "Event Parking"
      ? eventParking?.data?.length
      : tab === "Car Services" && carService?.data?.length;

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedData =
    tab === "Pay-To-Park"
      ? payToPark?.data
          ?.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt))
          ?.slice(startIndex, endIndex)
      : tab === "Reserve Parking"
      ? reserveParking?.data
          ?.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt))
          ?.slice(startIndex, endIndex)
      : tab === "Event Parking"
      ? eventParking?.data
          ?.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt))
          ?.slice(startIndex, endIndex)
      : tab === "Car Services" &&
        carService?.data
          ?.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt))
          ?.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Box>
      <TableFormat
        maxH={"55vh"}
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
                  setCurrentPage(1);
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
                Showing rows 1 to {itemsPerPage} of{" "}
                {tab === "Pay-To-Park"
                  ? payToPark?.data?.length
                  : tab === "Reserve Parking"
                  ? reserveParking?.data?.length
                  : tab === "Event Parking"
                  ? eventParking?.data?.length
                  : tab === "Car Services" && carService?.data?.length}
              </Text>

              <Flex gap="16px" align="center">
                <Flex
                  opacity={currentPage === 1 ? 0.5 : 1}
                  onClick={() =>
                    currentPage === 1 ? "" : handlePageChange(currentPage - 1)
                  }
                  cursor={currentPage === 1 ? "" : "pointer"}
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
                    <Text>{currentPage}</Text>
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
                    <Text>{totalPages}</Text>
                  </Flex>
                </Flex>

                <Flex
                  opacity={
                    tab === "Pay-To-Park"
                      ? endIndex >= payToPark?.data?.length
                        ? 0.5
                        : 1
                      : tab === "Reserve Parking"
                      ? endIndex >= reserveParking?.data?.length
                        ? 0.5
                        : 1
                      : tab === "Event Parking"
                      ? endIndex >= eventParking?.data?.length
                        ? 0.5
                        : 1
                      : tab === "Car Services" &&
                        endIndex >= carService?.data?.length
                      ? 0.5
                      : 1
                  }
                  onClick={() =>
                    tab === "Pay-To-Park"
                      ? endIndex >= payToPark?.data?.length
                        ? ""
                        : handlePageChange(currentPage + 1)
                      : tab === "Reserve Parking"
                      ? endIndex >= reserveParking?.data?.length
                        ? ""
                        : handlePageChange(currentPage + 1)
                      : tab === "Event Parking"
                      ? endIndex >= eventParking?.data?.length
                        ? ""
                        : handlePageChange(currentPage + 1)
                      : tab === "Car Services" &&
                        endIndex >= carService?.data?.length
                      ? ""
                      : handlePageChange(currentPage + 1)
                  }
                  cursor={
                    tab === "Pay-To-Park"
                      ? endIndex >= payToPark?.data?.length
                        ? ""
                        : "pointer"
                      : tab === "Reserve Parking"
                      ? endIndex >= reserveParking?.data?.length
                        ? ""
                        : "pointer"
                      : tab === "Event Parking"
                      ? endIndex >= eventParking?.data?.length
                        ? ""
                        : "pointer"
                      : tab === "Car Services" &&
                        endIndex >= carService?.data?.length
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
            paginatedData?.map((dat, i) => (
              <Tr
                key={i}
                color="#646668"
                fontWeight={500}
                fontSize="12px"
                lineHeight="100%"
              >
                <Td textAlign="center">{dat?.ticketNumber}</Td>
                <Td textAlign="center">{dat?.zone?.name}</Td>
                <Td textAlign="center">{dat?.vehicle?.licensePlate}</Td>
                <Td textAlign="center">{dat?.service?.name}</Td>
                <Td>
                  <Flex
                    color={Object.values(Status[dat?.status])[0]}
                    bg={Object.values(Status[dat?.status])[2]}
                    py="5px"
                    px="16px"
                    justifyContent="center"
                    borderRadius="4px"
                    align="center"
                  >
                    {Object.values(Status[dat?.status])[1]}
                  </Flex>
                </Td>
                <Td textAlign="center">{formatDate(dat?.createdAt)}</Td>
                <Td>
                  <Flex justifyContent="center" align="center">
                    <FiMoreVertical />
                  </Flex>
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={7} rowSpan={2}>
                <NoData
                  title="No Service"
                  desc="You have not initiated a service"
                />
              </Td>
            </Tr>
          )
        ) : tab === "Reserve Parking" ? (
          reserveParking?.data?.length ? (
            paginatedData?.map((dat, i) => (
              <Tr
                key={i}
                color="#646668"
                fontWeight={500}
                fontSize="12px"
                lineHeight="100%"
              >
                <Td textAlign="center">{dat?.zone?.name}</Td>
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
                  <Flex
                    color={Object.values(Status[dat?.status])[0]}
                    bg={Object.values(Status[dat?.status])[2]}
                    py="5px"
                    px="16px"
                    justifyContent="center"
                    borderRadius="4px"
                    align="center"
                  >
                    {Object.values(Status[dat?.status])[1]}
                  </Flex>
                </Td>
                <Td>
                  <Flex justifyContent="center" align="center">
                    <FiMoreVertical />
                  </Flex>
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={7} rowSpan={2}>
                <NoData
                  title="No Service"
                  desc="You have not initiated a service"
                />
              </Td>
            </Tr>
          )
        ) : tab === "Event Parking" ? (
          eventParking?.data?.length ? (
            paginatedData?.map((dat, i) => (
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
                <Td textAlign="center">{dat?.zone?.name}</Td>
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
                  <Flex
                    color={Object.values(Status[dat?.status])[0]}
                    bg={Object.values(Status[dat?.status])[2]}
                    py="5px"
                    px="16px"
                    justifyContent="center"
                    borderRadius="4px"
                    align="center"
                  >
                    {Object.values(Status[dat?.status])[1]}
                  </Flex>
                </Td>
                <Td textAlign="center">{formatDate(dat?.createdAt)}</Td>
                <Td>
                  <Flex justifyContent="center" align="center">
                    <FiMoreVertical />
                  </Flex>
                </Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={7} rowSpan={2}>
                <NoData
                  title="No Service"
                  desc="You have not initiated a service"
                />
              </Td>
            </Tr>
          )
        ) : carService?.data?.length ? (
          paginatedData?.map((dat, i) => (
            <Tr
              key={i}
              color="#646668"
              fontWeight={500}
              fontSize="12px"
              lineHeight="100%"
            >
              <Td textAlign="center">{dat?.bookingId}</Td>
              <Td textAlign="center">{dat?.bookingType}</Td>
              <Td textAlign="center">{dat?.serviceType}</Td>
              <Td textAlign="center">
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
                <Flex justifyContent="center" align="center">
                  <FiMoreVertical />
                </Flex>
              </Td>
            </Tr>
          ))
        ) : (
          <Tr>
            <Td colSpan={7} rowSpan={2}>
              <NoData
                title="No Service"
                desc="You have not initiated a service"
              />
            </Td>
          </Tr>
        )}
      </TableFormat>
    </Box>
  );
};

export default TableLayer;

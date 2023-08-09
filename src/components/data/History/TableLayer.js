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
  const [page, setPage] = useState(1);
  const [tab, setTab] = useState("Pay-To-Park");
  const limit = 10;
  const { isLoading, data: payToPark } = useGetPayToPark(limit, page);
  const { isLoading: isReserving, data: reserveParking } = useGetReserveParking(
    limit,
    page
  );
  const { isLoading: isCar, data: carService } = useGetCarService(limit, page);
  const { isLoading: isEvent, data: eventParking } = useGetEventParking(
    limit,
    page
  );

  const sortedPark = payToPark?.data?.sort(
    (a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)
  );
  const sortedReserve = reserveParking?.data?.sort(
    (a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)
  );
  const sortedEvent = eventParking?.data?.sort(
    (a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)
  );
  const sortedCar = carService?.data?.sort(
    (a, b) => new Date(b?.appointmentDate) - new Date(a?.appointmentDate)
  );

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
                  opacity={payToPark?.page === 1 ? 0.5 : 1}
                  onClick={() =>
                    payToPark?.page !== 1 ? setPage(page - 1) : ""
                  }
                  cursor={payToPark?.page === 1 ? "" : "pointer"}
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
                    <Text>{payToPark?.page}</Text>
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
                    <Text>{payToPark?.pageCount}</Text>
                  </Flex>
                </Flex>

                <Flex
                  opacity={payToPark?.page === payToPark?.pageCount ? 0.5 : 1}
                  onClick={() =>
                    payToPark?.page !== payToPark?.pageCount
                      ? setPage(page + 1)
                      : ""
                  }
                  cursor={
                    payToPark?.page === payToPark?.pageCount ? "" : "pointer"
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
            sortedPark?.map((dat, i) => (
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
            sortedReserve?.map((dat, i) => (
              <Tr
                key={i}
                color="#646668"
                fontWeight={500}
                fontSize="12px"
                lineHeight="100%"
              >
                <Td textAlign="center">{dat?.reservationId}</Td>
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
            sortedEvent?.map((dat, i) => (
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
          sortedCar?.map((dat, i) => (
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

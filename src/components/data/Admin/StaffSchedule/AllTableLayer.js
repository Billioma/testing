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
import TableLoader from "../../../loader/TableLoader";
import { DefaultPagination } from "../../../common/TableFormat";
import { useNavigate } from "react-router-dom";

const mergeSchedules = (schedule, offDaySchedule) => {
  const combinedSchedule = { ...schedule };

  Object.keys(offDaySchedule).forEach((day) => {
    if (!combinedSchedule[day]) {
      combinedSchedule[day] = [];
    }
    combinedSchedule[day] = [
      ...combinedSchedule[day],
      ...offDaySchedule[day].map((offDayItem) => ({
        ...offDayItem,
        isOffDay: true,
      })),
    ];
  });

  return combinedSchedule;
};

const AllTableLayer = ({
  data,
  day,
  week,
  isLoading,
  page,
  setPage,
  startRow,
  endRow,
  limit,
  setLimit,
}) => {
  const navigate = useNavigate();

  return (
    <Box mt="16px">
      {isLoading ? (
        <TableLoader />
      ) : !data?.locations?.length ? (
        ""
      ) : (
        <>
          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  {[
                    "Location",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ].map((item, i) => (
                    <Th
                      key={i}
                      fontFamily="Sailec"
                      _first={{ borderRight: "1px solid #949698" }}
                      bg="#F4F6F8"
                      textTransform="uppercase"
                      color="#949698"
                      fontSize="13px"
                      fontWeight={500}
                    >
                      {item}
                    </Th>
                  ))}
                </Tr>
              </Thead>
              <Tbody>
                {data?.locations?.map((item, i) => {
                  const combinedSchedule = mergeSchedules(
                    item.schedule,
                    item.offDaySchedule
                  );

                  return (
                    <Tr key={i} color="#646668" fontSize="13px">
                      <Td
                        cursor="pointer"
                        onClick={() => {
                          navigate(
                            `/admin/staff-schedule/location/${week}/${item?.id}`
                          );
                          sessionStorage.setItem("days", JSON.stringify(day));
                        }}
                        borderRight="1px solid #F4F6F8"
                        fontWeight={500}
                      >
                        {item?.name}
                      </Td>
                      {[
                        "monday",
                        "tuesday",
                        "wednesday",
                        "thursday",
                        "friday",
                        "saturday",
                        "sunday",
                      ].map((day, dayIndex) => (
                        <Td key={dayIndex}>
                          {combinedSchedule[day]?.length
                            ? combinedSchedule[day].map(
                                (schedItem, schedIndex) => (
                                  <Box key={schedIndex}>
                                    <Flex align="center" gap="4px">
                                      <Image
                                        display={
                                          schedItem.isOffDay ? "flex" : "none"
                                        }
                                        src="/assets/warnn.svg"
                                        w="18px"
                                        h="18px"
                                        objectFit="contain"
                                      />
                                      <Text>{schedItem?.fullName}</Text>
                                    </Flex>
                                  </Box>
                                )
                              )
                            : "N/A"}
                        </Td>
                      ))}
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>

          <Box mt="20px">
            <DefaultPagination
              startRow={startRow}
              endRow={endRow}
              total={data?.total}
              page={Number(data?.page)}
              pageCount={data?.pageCount}
              setLimit={setLimit}
              limit={limit}
              onNext={() =>
                Number(data?.page) !== data?.pageCount
                  ? setPage(page + 1)
                  : null
              }
              onPrevious={() =>
                Number(data?.page) !== 1 ? setPage(page - 1) : null
              }
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default AllTableLayer;

import React from "react";
import {
  Box,
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
                {data?.locations?.map((item, i) => (
                  <Tr key={i} color="#646668" fontSize="13px">
                    <Td
                      cursor="pointer"
                      onClick={() =>
                        console.log(
                          `/admin/staff-schedule/edit/location/${day}/${week}/${item?.id}`,
                        )
                      }
                      borderRight="1px solid #F4F6F8"
                      fontWeight={500}
                    >
                      {item?.name}
                    </Td>
                    <Td>
                      {item?.schedule?.monday?.length
                        ? item?.schedule?.monday?.map((item, i) => (
                            <Box key={i}>
                              <Text>{item?.fullName}</Text>
                            </Box>
                          ))
                        : "N/A"}
                    </Td>
                    <Td>
                      {item?.schedule?.tuesday?.length
                        ? item?.schedule?.tuesday?.map((item, i) => (
                            <Box key={i}>
                              <Text>{item?.fullName}</Text>
                            </Box>
                          ))
                        : "N/A"}
                    </Td>
                    <Td>
                      {item?.schedule?.wednesday?.length
                        ? item?.schedule?.wednesday?.map((item, i) => (
                            <Box key={i}>
                              <Text>{item?.fullName}</Text>
                            </Box>
                          ))
                        : "N/A"}
                    </Td>
                    <Td>
                      {item?.schedule?.thursday?.length
                        ? item?.schedule?.thursday?.map((item, i) => (
                            <Box key={i}>
                              <Text>{item?.fullName}</Text>
                            </Box>
                          ))
                        : "N/A"}
                    </Td>
                    <Td>
                      {item?.schedule?.friday?.length
                        ? item?.schedule?.friday?.map((item, i) => (
                            <Box key={i}>
                              <Text>{item?.fullName}</Text>
                            </Box>
                          ))
                        : "N/A"}
                    </Td>
                    <Td>
                      {item?.schedule?.saturday?.length
                        ? item?.schedule?.saturday?.map((item, i) => (
                            <Box key={i}>
                              <Text>{item?.fullName}</Text>
                            </Box>
                          ))
                        : "N/A"}
                    </Td>
                    <Td>
                      {item?.schedule?.sunday?.length
                        ? item?.schedule?.sunday?.map((item, i) => (
                            <Box key={i}>
                              <Text>{item?.fullName}</Text>
                            </Box>
                          ))
                        : "N/A"}
                    </Td>
                  </Tr>
                ))}
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

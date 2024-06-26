import React from "react";
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
import { AiOutlineEdit } from "react-icons/ai";
import { BsEye } from "react-icons/bs";
import TableLoader from "../../../loader/TableLoader";
import { DefaultPagination } from "../../../common/TableFormat";
import { useNavigate } from "react-router-dom";

const ScheduleStaffTableLayer = ({
  data,
  isLoading,
  week,
  page,
  setPage,
  day,
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
                  {["Location", "Staff", "Actions"].map((item, i) => (
                    <Th
                      key={i}
                      fontFamily="Sailec"
                      bg="#F4F6F8"
                      textTransform="uppercase"
                      color="#949698"
                      _last={{ textAlign: "end" }}
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
                    <Td fontWeight={500}>{item?.name}</Td>
                    <Td>
                      <Flex align="center" w="100%" flexWrap="wrap" gap="12px">
                        {item?.scheduledStaff?.length
                          ? item?.scheduledStaff?.map((item, i) => (
                              <Flex
                                border="1px solid #f4f6f8"
                                borderRadius="4px"
                                py="4px"
                                fontWeight={500}
                                color="#000"
                                px="8px"
                                justifyContent="center"
                                key={i}
                                align="center"
                                gap="10px"
                              >
                                {item?.fullName}

                                <Flex
                                  bg="#F4F6F8"
                                  borderRadius="2px"
                                  py="6px"
                                  px="8px"
                                  fontSize="12px"
                                >
                                  {item?.jobTitle?.name || "N/A"}
                                </Flex>
                              </Flex>
                            ))
                          : "N/A"}
                      </Flex>
                    </Td>
                    <Td>
                      <Flex gap="10px" align="center" justifyContent="flex-end">
                        <Flex
                          onClick={() =>
                            navigate(
                              `/admin/staff-schedule/location/${day}/${week}/${item?.id}`,
                            )
                          }
                          border="1px solid #999999"
                          borderRadius="8px"
                          w="32px"
                          justifyContent="center"
                          cursor="pointer"
                          h="32px"
                          fontSize="14px"
                          align="center"
                        >
                          <BsEye size="16px" color="#999999" />
                        </Flex>

                        <Flex
                          cursor="pointer"
                          onClick={() =>
                            navigate(
                              `/admin/staff-schedule/edit/location/${day}/${week}/${item?.id}`,
                            )
                          }
                          border="1px solid #999999"
                          borderRadius="8px"
                          w="32px"
                          justifyContent="center"
                          h="32px"
                          fontSize="14px"
                          align="center"
                        >
                          <AiOutlineEdit size="16px" color="#848688" />
                        </Flex>
                      </Flex>
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

export default ScheduleStaffTableLayer;

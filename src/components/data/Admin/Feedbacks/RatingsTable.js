import React from "react";
import { Box, Flex, Td, Text, Tr, Image } from "@chakra-ui/react";
import TableFormat from "../../../common/TableFormat";
import { formatDateNewTime } from "../../../../utils/helpers";
import TableLoader from "../../../loaders/TableLoader";
import { useNavigate } from "react-router-dom";

const RatingsTable = ({
  data,
  isLoading,
  page,
  setPage,
  startRow,
  endRow,
  limit,
  setLimit,
}) => {
  const headers = ["USER", "COMMENT", "STARS", "DATE CREATED"];

  const navigate = useNavigate();
  return (
    <Box>
      {isLoading ? (
        <TableLoader />
      ) : data?.data?.length ? (
        <>
          <TableFormat
            header={headers}
            opt
            alignFirstHeader
            // alignSecondHeader
            paginationValues={{
              startRow,
              endRow,
              total: data?.total,
              page: data?.page,
              pageCount: data?.pageCount,
              onNext: () =>
                data?.page !== data?.pageCount ? setPage(page + 1) : null,
              onPrevious: () => (data?.page !== 1 ? setPage(page - 1) : null),
              setLimit,
              limit,
            }}
            useDefaultPagination
          >
            {data?.data?.map((item, i) => (
              <Tr
                key={i}
                color="#646668"
                fontWeight={500}
                fontSize="14px"
                lineHeight="100%"
              >
                <Td>
                  {item?.customer?.profile?.firstName}{" "}
                  {item?.customer?.profile?.lastName}
                </Td>
                <Td textAlign="center">{item?.ratingReason || "N/A"}</Td>
                <Td>
                  <Flex align="center" gap="2px" justifyContent="center">
                    {Array(5)
                      .fill(null)
                      .map((_, index) => (
                        <Image
                          key={index}
                          objectFit="contain"
                          opacity={index < item?.rating ? 1 : 0.7}
                          src={
                            index < item?.rating
                              ? "/assets/filled.jpg"
                              : "/assets/non-filled.jpg"
                          }
                          w="18px"
                          index="18px"
                        />
                      ))}
                  </Flex>
                </Td>

                <Td textAlign="center">{formatDateNewTime(item?.createdAt)}</Td>
              </Tr>
            ))}
          </TableFormat>
        </>
      ) : (
        <Flex
          gap="16px"
          justifyContent="center"
          align="center"
          my="38px"
          flexDir="column"
        >
          <Image src="/assets/no-feedback.svg" w="64px" h="64px" />
          <Text
            color="#848688"
            fontSize="14px"
            lineHeight="100%"
            fontWeight={500}
          >
            No Ratings Data
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default RatingsTable;

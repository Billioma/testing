import React from "react";
import { Box, Flex, Image, Td, Text, Tr } from "@chakra-ui/react";
import TableLoader from "../../../loaders/TableLoader";
import { adminRepLocationHeader } from "../../../common/constants";

import TableFormat from "../../../common/TableFormat";
import { formatDateNewTime } from "../../../../utils/helpers";

const LocationTableLayer = ({
  data,
  isLoading,
  page,
  setPage,
  startRow,
  endRow,
  limit,
  setLimit,
}) => {
  return (
    <Box>
      {isLoading ? (
        <TableLoader />
      ) : data?.data?.length ? (
        <>
          <TableFormat
            header={adminRepLocationHeader}
            opt
            alignFirstHeader
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
              <Tr fontSize="14px" fontWeight={500} color="#646668" key={i}>
                <Td>{item?.name}</Td>
                <Td textAlign="center">{item?.state}</Td>
                <Td textAlign="center">{item?.zones}</Td>
                <Td textAlign="center">
                  <Flex justifyContent="center" align="center" w="full">
                    <Flex
                      justifyContent="center"
                      align="center"
                      bg="#f4f6f8"
                      borderRadius="4px"
                      py="7px"
                      fontSize="10px"
                      w="fit-content"
                      px="16px"
                    >
                      {item?.locationType?.replace("_", " ")?.replace("_", " ")}
                    </Flex>
                  </Flex>
                </Td>
                <Td textAlign="center">
                  <Flex align="center" w="full" justifyContent="center">
                    <Flex
                      color={item?.status === "Active" ? "#008000" : "#E81313"}
                      bg={item?.status === "Active" ? "#E5FFE5" : "#F9D0CD"}
                      justifyContent={"center"}
                      alignItems="center"
                      py="5px"
                      px="16px"
                      borderRadius="4px"
                    >
                      {item?.status}
                    </Flex>
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
          <Image src="/assets/no-loc.jpg" w="64px" h="64px" />
          <Text
            color="#848688"
            fontSize="14px"
            lineHeight="100%"
            fontWeight={500}
          >
            No Location Reports
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default LocationTableLayer;

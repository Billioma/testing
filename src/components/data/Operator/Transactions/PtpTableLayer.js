import React from "react";
import { Box, Button, Flex, Image, Td, Text, Tr } from "@chakra-ui/react";
import TableLoader from "../../../loaders/TableLoader";
import {
  PaymentMethods,
  Status,
  operatorPtpHeader,
} from "../../../common/constants";
import { formatDateNewTime } from "../../../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
import TableFormat from "../../../common/TableFormat";

const PtpTableLayer = ({
  data,
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
    <Box>
      {isLoading ? (
        <TableLoader />
      ) : data?.data?.length ? (
        <>
          <TableFormat
            header={operatorPtpHeader}
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
                <Td>{item?.ticketNumber}</Td>
                <Td textAlign="center">{item?.zone?.location?.name}</Td>
                <Td textAlign="center">{item?.zone?.name}</Td>
                <Td textAlign="center">
                  {" "}
                  <Flex align="center" w="full" justifyContent="center">
                    <Flex
                      bg="#F4F6F8"
                      w="fit-content"
                      align="center"
                      justifyContent="center"
                      py="7px"
                      px="15px"
                      borderRadius="4px"
                    >
                      {PaymentMethods?.find(
                        (dat, i) => i === item?.transaction?.paymentMethod
                      ) || "N/A"}
                    </Flex>
                  </Flex>
                </Td>
                <Td textAlign="center">{formatDateNewTime(item?.createdAt)}</Td>
                <Td>
                  <Flex align="center" w="full" justifyContent="center">
                    <Flex
                      color={Object?.values(Status[item?.status])[0]}
                      bg={Object?.values(Status[item?.status])[2]}
                      justifyContent="center"
                      align="center"
                      py="5px"
                      px="16px"
                      borderRadius="4px"
                    >
                      {Object?.values(Status[item?.status])[1]}
                    </Flex>
                  </Flex>
                </Td>

                <Td>
                  <Flex align="center" justifyContent="center">
                    <Button
                      bg="#A11212"
                      _hover={{ bg: "#A11212" }}
                      _active={{ bg: "#A11212" }}
                      _focus={{ bg: "#A11212" }}
                      color="#fff"
                      fontWeight={500}
                      onClick={() =>
                        navigate(
                          `/operator/transactions/pay-to-park/${item?.id}`
                        )
                      }
                      lineHeight="100%"
                      px="16px"
                      py="8px"
                      fontSize="14px"
                      display="flex"
                      align="center"
                      gap="8px"
                    >
                      <AiOutlineEye size="16px" color="#fff" />
                      View
                    </Button>
                  </Flex>
                </Td>
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
          <Image src="/assets/no-log.jpg" w="64px" h="64px" />
          <Text
            color="#848688"
            fontSize="14px"
            lineHeight="100%"
            fontWeight={500}
          >
            No Pay To Park Transactions
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default PtpTableLayer;

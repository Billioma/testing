import React from "react";
import {
  Box,
  Flex,
  Td,
  Text,
  Tr,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  Icon,
} from "@chakra-ui/react";
import TableFormat from "../../../common/TableFormat";
import { formatDateNewTime } from "../../../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { BsChevronDown } from "react-icons/bs";
import TableLoader from "../../../loaders/TableLoader";
import {
  PaymentMethods,
  Status,
  viewDeleteOption,
} from "../../../common/constants";

const TableLayer = ({
  data,
  isLoading,
  page,
  setPage,
  startRow,
  endRow,
  limit,
  setLimit,
}) => {
  const headers = [
    "TICKET ID",
    "AMOUNT",
    "CUSTOMER",
    "STATUS",
    "DATE",
    "ACTIONS",
  ];

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
            {data?.data?.map((transaction, i) => (
              <Tr
                key={i}
                color="#646668"
                fontWeight={500}
                fontSize="14px"
                lineHeight="100%"
              >
                <Td>{transaction?.id}</Td>
                <Td textAlign="center">
                  {transaction?.amount?.toLocaleString()}
                </Td>
                <Td textAlign="center">{transaction?.customer?.email}</Td>

                <Td textAlign="center" textTransform="uppercase">
                  <Flex align="center" w="full" justifyContent="center">
                    <Flex
                      color={
                        transaction?.cancelled === 1
                          ? "#E81313"
                          : Object?.values(Status[transaction?.status])[0]
                      }
                      bg={
                        transaction?.cancelled === 1
                          ? "#F9D0CD"
                          : Object?.values(Status[transaction?.status])[2]
                      }
                      justifyContent="center"
                      align="center"
                      py="5px"
                      textTransform="capitalize"
                      px="16px"
                      borderRadius="4px"
                    >
                      {Object?.values(Status[transaction?.status])[1]}
                    </Flex>
                  </Flex>
                </Td>

                <Td textAlign="center">
                  {formatDateNewTime(transaction?.createdAt)}
                </Td>
                <Td textAlign="center">
                  <Flex justifyContent="center" align="center">
                    <Menu>
                      <MenuButton as={Text} cursor="pointer">
                        <BsChevronDown />
                      </MenuButton>
                      <MenuList
                        borderRadius="4px"
                        p="10px"
                        border="1px solid #F4F6F8"
                        boxShadow="0px 8px 16px 0px rgba(0, 0, 0, 0.08)"
                      >
                        {viewDeleteOption?.slice(0, 1).map((dat, i) => (
                          <MenuItem
                            key={i}
                            gap="12px"
                            borderRadius="2px"
                            mb="8px"
                            py="6px"
                            px="8px"
                            _hover={{ bg: "#F4F6F8" }}
                            align="center"
                            fontWeight="500"
                            onClick={() =>
                              navigate(
                                `/admin/transactions/points/${transaction?.id}`
                              )
                            }
                          >
                            <Icon as={dat.icon} />
                            {dat?.name}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </Menu>
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
          <Image src="/assets/no-sub.jpg" w="64px" h="64px" />
          <Text
            color="#848688"
            fontSize="14px"
            lineHeight="100%"
            fontWeight={500}
          >
            No Tips Transactions
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default TableLayer;

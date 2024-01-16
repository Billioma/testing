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
} from "@chakra-ui/react";
import TableFormat from "../../../common/TableFormat";
import { formatDateNewTime } from "../../../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { BsChevronDown } from "react-icons/bs";

import TableLoader from "../../../loaders/TableLoader";
import { LogStatus, clientLogPayHeader } from "../../../common/constants";
import { TbListDetails } from "react-icons/tb";

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
  const navigate = useNavigate();

  return (
    <Box>
      {isLoading ? (
        <TableLoader />
      ) : data?.data?.length ? (
        <>
          <TableFormat
            header={clientLogPayHeader}
            opt
            alignFirstHeader
            alignSecondHeader
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
                <Td>{item?.ticketNumber}</Td>
                <Td textAlign="center">₦ {item?.amount?.toLocaleString()}</Td>
                <Td textAlign="center">{item?.location?.name || "N/A"}</Td>
                <Td textAlign="center">{item?.zone?.name}</Td>
                <Td textAlign="center">{item?.attendant?.name}</Td>
                <Td>
                  <Flex align="center" w="full" justifyContent="center">
                    <Flex
                      color={Object?.values(LogStatus[item?.status])[0]}
                      bg={Object?.values(LogStatus[item?.status])[2]}
                      justifyContent="center"
                      align="center"
                      py="5px"
                      px="16px"
                      borderRadius="4px"
                    >
                      {Object?.values(LogStatus[item?.status])[1]}
                    </Flex>
                  </Flex>
                </Td>

                <Td textAlign="center">{formatDateNewTime(item?.createdAt)}</Td>
                <Td>
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
                        <MenuItem
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
                              `/client/logs/valeted-vehicles/details/${item?.id}`
                            )
                          }
                        >
                          <TbListDetails size="15px" />
                          View Details
                        </MenuItem>
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
            No Valeted Vehicle Data
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default TableLayer;

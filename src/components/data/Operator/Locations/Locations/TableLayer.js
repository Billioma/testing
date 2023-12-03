import React from "react";
import { Box, Button, Flex, Image, Td, Text, Tr } from "@chakra-ui/react";
import TableLoader from "../../../../loaders/TableLoader";
import {
  SecStatus,
  operatorLocationsHeader,
} from "../../../../common/constants";
import { formatDate } from "../../../../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { Add } from "../../../../common/images";
import { BsEye } from "react-icons/bs";
import TableFormat from "../../../../common/TableFormat";

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
            header={operatorLocationsHeader}
            opt
            alignFirstHeader
            alignSecondHeader
            alignThirdHeader
            alignFifthHeader
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
              <Tr fontSize="12px" fontWeight={500} color="#646668" key={i}>
                <Td>{item?.name}</Td>
                <Td>{item?.operator?.name}</Td>
                <Td>{item?.state}</Td>
                <Td>
                  <Flex align="center" w="full" justifyContent="center">
                    <Flex
                      color={Object?.values(SecStatus[item?.status])[0]}
                      bg={Object?.values(SecStatus[item?.status])[2]}
                      py="5px"
                      px="16px"
                      justifyContent="center"
                      borderRadius="4px"
                      align="center"
                    >
                      {Object?.values(SecStatus[item?.status])[1]}
                    </Flex>
                  </Flex>
                </Td>
                <Td>{formatDate(item?.createdAt)}</Td>

                <Td>
                  <Flex gap="20px" align="center" justifyContent="center">
                    <Button
                      bg="transparent"
                      border="1px solid #848688"
                      color="#848688"
                      fontWeight={500}
                      lineHeight="100%"
                      fontSize="12px"
                      _hover={{ bg: "transparent" }}
                      _active={{ bg: "transparent" }}
                      _focus={{ bg: "transparent" }}
                      display="flex"
                      onClick={() => (
                        navigate(`/operator/locations/all/${item?.id}`),
                        sessionStorage.setItem("edit", "edit")
                      )}
                      px="16px"
                      py="8px"
                      align="center"
                      gap="8px"
                    >
                      <AiOutlineEdit size="16px" color="#848688" />
                      Edit
                    </Button>
                    <Button
                      bg="#A11212"
                      _hover={{ bg: "#A11212" }}
                      _active={{ bg: "#A11212" }}
                      _focus={{ bg: "#A11212" }}
                      color="#fff"
                      fontWeight={500}
                      onClick={() =>
                        navigate(`/operator/locations/all/${item?.id}`)
                      }
                      lineHeight="100%"
                      px="16px"
                      py="8px"
                      fontSize="12px"
                      display="flex"
                      align="center"
                      gap="8px"
                    >
                      <BsEye size="16px" color="#fff" />
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
          <Image src="/assets/no-loc.jpg" w="64px" h="64px" />
          <Text
            color="#848688"
            fontSize="12px"
            lineHeight="100%"
            fontWeight={500}
          >
            No Location Data
          </Text>

          <Button
            onClick={() => navigate("/operator/locations/all/create")}
            display="flex"
            gap="8px"
            fontSize="12px"
          >
            <Text>Add a Location</Text>
            <Add fill="#fff" />
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default TableLayer;

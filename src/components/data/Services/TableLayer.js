import React, { useState } from "react";
import { Box, Flex, Td, Text, Tr } from "@chakra-ui/react";
import TableFormat from "../../common/TableFormat";
import { FiMoreVertical } from "react-icons/fi";
import { Status, servicesHeader } from "../../common/constants";
import {
  IoIosArrowBack,
  IoIosArrowDown,
  IoIosArrowForward,
} from "react-icons/io";
import { useGetPayToPark } from "../../../services/customer/query/services";
import NoData from "../../common/NoData";
import { formatDate } from "../../../utils/helpers";

const TableLayer = () => {
  const [page, setPage] = useState(1);
  const limit = 25;
  const { isLoading, data: payToPark } = useGetPayToPark(limit, page);

  return (
    <Box mt="24px">
      <Text color="#242628" fontWeight={500} lineHeight="100%" mb="12px">
        Recent Activity
      </Text>
      <TableFormat
        maxH={"50vh"}
        isLoading={isLoading}
        minH="25vh"
        header={servicesHeader}
        filter={
          <Flex
            bg="#F4F6F8"
            color="#242628"
            cursor="pointer"
            borderRadius="8px"
            gap="12px"
            border="1px solid #E4E6E8"
            px="16px"
            py="5px"
          >
            <Text fontSize="12px" fontWeight={500} lineHeight="100%">
              All Services
            </Text>

            <IoIosArrowDown />
          </Flex>
        }
        paginate={
          <Flex
            justifyContent="center"
            align="center"
            flexDir="column"
            w="full"
          >
            <Flex justifyContent="center" gap="32px" align="center">
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
        {payToPark?.data?.length ? (
          payToPark?.data?.map((dat, i) => (
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
        )}
      </TableFormat>
    </Box>
  );
};

export default TableLayer;

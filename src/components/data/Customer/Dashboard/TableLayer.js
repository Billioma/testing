import React from "react";
import { Box, Flex, Td, Text, Tr } from "@chakra-ui/react";
import TableFormat from "../../../common/TableFormat";
import { FiMoreVertical } from "react-icons/fi";
import { Status, servicesHeader } from "../../../common/constants";
import { useGetPayToPark } from "../../../../services/customer/query/services";
import NoData from "../../../common/NoData";
import { formatDate } from "../../../../utils/helpers";

const TableLayer = () => {
  const page = 1;
  const limit = 25;
  const { isLoading, data: payToPark } = useGetPayToPark(limit, page);

  return (
    <Box mt="32px">
      <Text color="#242628" fontWeight={500} lineHeight="100%" mb="12px">
        Recent Activity
      </Text>
      <TableFormat
        maxH={"70vh"}
        isLoading={isLoading}
        minH="20vh"
        header={servicesHeader}
        title={
          <Flex>
            <Text
              color="#242628"
              fontSize="14px"
              lineHeight="100%"
              fontWeight={500}
            >
              Recent Activity
            </Text>
          </Flex>
        }
      >
        {payToPark?.data?.length ? (
          payToPark?.data?.slice(0, 2)?.map((dat, i) => (
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

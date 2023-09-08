import React from "react";
import { Box, Flex, Image, Td, Text, Tr } from "@chakra-ui/react";
import TableFormat from "../../../common/TableFormat";
import { Status, servicesHeader } from "../../../common/constants";
import { useGetPayToPark } from "../../../../services/customer/query/services";
import { formatDate } from "../../../../utils/helpers";

const TableLayer = () => {
  const page = 1;
  const limit = 10;
  const { isLoading, data: payToPark } = useGetPayToPark(limit, page);

  return (
    <Box mt="32px">
      <Text color="#242628" fontWeight={700} lineHeight="100%" mb="12px">
        Active Sessions
      </Text>
      <TableFormat
        maxH={"70vh"}
        isLoading={isLoading}
        minH="20vh"
        header={servicesHeader}
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
            </Tr>
          ))
        ) : (
          <Tr>
            <Td colSpan={7} rowSpan={2}>
              <Flex
                textAlign="center"
                justifyContent="center"
                mt="30px"
                align="center"
                w="full"
              >
                <Flex
                  textAlign="center"
                  justifyContent="center"
                  align="center"
                  flexDir="column"
                  border="1px solid #e4e6e8"
                  borderRadius="8px"
                  py="16px"
                  px="24px"
                  w="fit-content"
                >
                  <Image src="/assets/no-sub.jpg" w="48px" h="48px" />

                  <Text
                    my="16px"
                    color="#646668"
                    lineHeight="100%"
                    fontWeight={700}
                  >
                    No Recent Activity
                  </Text>
                  <Text
                    fontSize="11px"
                    color="#A4A6A8"
                    fontWeight={500}
                    lineHeight="100%"
                  >
                    Make use of any of our parking services
                  </Text>
                </Flex>
              </Flex>
            </Td>
          </Tr>
        )}
      </TableFormat>
    </Box>
  );
};

export default TableLayer;

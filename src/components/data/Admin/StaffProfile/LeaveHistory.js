import React from "react";
import { Box, Flex, Td, Text, Tr } from "@chakra-ui/react";
import TableFormat from "../../../common/TableFormat";

import { LeaveStatus } from "../../../common/constants";
import { formatNewDate } from "../../../../utils/helpers";
import { useNavigate } from "react-router-dom";

const LeaveHistory = ({ data }) => {
  const headers = ["START DATE", "END DATE", "TYPE", "STATUS", "ACTIONS"];
  const dataa = data?.leaveRequests;

  const navigate = useNavigate();

  return (
    <Box mt="24px">
      <TableFormat header={headers} opt alignFirstHeader alignSecondHeader>
        {dataa?.map((item, i) => (
          <Tr
            key={i}
            color="#646668"
            fontWeight={500}
            fontSize="14px"
            lineHeight="100%"
          >
            <Td>{formatNewDate(item?.startDate)}</Td>
            <Td>{formatNewDate(item?.endDate)}</Td>
            <Td textAlign="center">{item?.isPaid ? "PAID" : "UNPAID"}</Td>
            <Td>
              <Flex align="center" w="full" justifyContent="center">
                <Flex
                  color={
                    LeaveStatus.find(
                      (dat) =>
                        dat.name?.toLowerCase() === item?.status?.toLowerCase()
                    )?.color || ""
                  }
                  bg={
                    LeaveStatus.find(
                      (dat) =>
                        dat.name?.toLowerCase() === item?.status?.toLowerCase()
                    )?.bg || ""
                  }
                  justifyContent="center"
                  alignItems="center"
                  textTransform="capitalize"
                  py="5px"
                  px="16px"
                  borderRadius="4px"
                >
                  {item?.status === "REJECTED"
                    ? "Declined"
                    : item?.status === "WITHDRAWN"
                      ? "Cancelled"
                      : item?.status?.toLowerCase()}
                </Flex>
              </Flex>
            </Td>
            <Td textAlign="center">
              <Flex justifyContent="center" align="center">
                <Text
                  onClick={() => navigate(`/admin/leave-mgt/${item?.id}`)}
                  textDecor="underline"
                  cursor="pointer"
                >
                  View
                </Text>
              </Flex>
            </Td>
          </Tr>
        ))}
      </TableFormat>
    </Box>
  );
};

export default LeaveHistory;

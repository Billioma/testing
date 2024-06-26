import React from "react";
import { Box, Flex, Td, Text, Tr } from "@chakra-ui/react";
import TableFormat from "../../../common/TableFormat";
import { formatDat } from "../../../../utils/helpers";

const Schedule = ({ data }) => {
  const headers = ["LOCATION", "SCHEDULED DATE", "ACTION"];

  const schedulesArray = [];

  for (const day in data?.schedule) {
    schedulesArray.push(...data?.schedule[day]);
  }

  return (
    <Box mt="24px">
      <TableFormat header={headers} opt act>
        {schedulesArray?.map((item, i) => (
          <Tr
            key={i}
            color="#646668"
            fontWeight={500}
            fontSize="14px"
            lineHeight="100%"
          >
            <Td> {item?.location?.name}</Td>

            <Td>{formatDat(item?.createdAt)}</Td>

            <Td>
              <Flex
                justifyContent="center"
                // onClick={() =>
                //   navigate(`/admin/staff-schedule/location/monday/4/65`)
                // }
              >
                <Text textDecor="underline" cursor="pointer">
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

export default Schedule;

import React, { useState } from "react";
import { Box, Button, Flex, Image, Td, Text, Tr } from "@chakra-ui/react";
import TableFormat from "../../../common/TableFormat";
import { formatDat } from "../../../../utils/helpers";
import { useNavigate } from "react-router-dom";
import AddScheduleStaff from "../../../../pages/Admin/StaffSchedule/AddScheduleStaff";

const Schedule = ({ data, staff }) => {
  const headers = ["LOCATION", "SCHEDULED DATE", "ACTION"];
  const [show, setShow] = useState(true);
  const [showSchedule, setShowSchedule] = useState(false);
  const navigate = useNavigate();
  const schedulesArray = [];

  for (const day in data?.schedule) {
    schedulesArray.push(...data?.schedule[day]);
  }
  const allNotOffDays = schedulesArray.every((schedule) => !schedule.isOffDay);

  return (
    <Box>
      <Box
        mt="24px"
        border="1px solid #E2E5DC"
        py="25px"
        px="20px"
        borderRadius="8px"
        display={showSchedule ? "none" : "block"}
      >
        <Flex
          py="10px"
          px="16px"
          borderRadius="8px"
          display={allNotOffDays && show ? "flex" : "none"}
          border="1px solid #E2E5DC"
          bg="#E2E5DC3D"
          justifyContent="space-between"
          align="center"
        >
          <Flex align="center" gap="12px">
            <Image
              src="/assets/warn.svg"
              w="18px"
              h="18px"
              objectFit="contain"
            />
            <Text color="#242628" fontSize="14px" fontWeight={500}>
              This staff does not have any off days scheduled
            </Text>
          </Flex>

          <Flex align="center">
            <Button
              variant="adminPrimary"
              onClick={() => setShowSchedule(true)}
              h="28px"
              w="74px"
              fontSize="12px"
              fontWeight={500}
            >
              Resolve
            </Button>
            <Button
              fontSize="12px"
              fontWeight={500}
              color="#000"
              bg="transparent"
              onClick={() => setShow(false)}
              textDecor="underline"
              _hover={{ bg: "transparent" }}
              _active={{ bg: "transparent" }}
              _focus={{ bg: "transparent" }}
              h="28px"
              w="74px"
            >
              Dismiss
            </Button>
          </Flex>
        </Flex>
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
                  onClick={() => {
                    navigate(
                      `/admin/staff-schedule/location/${item?.week?.id}/${item?.location?.id}`
                    );
                    sessionStorage.setItem(
                      "days",
                      JSON.stringify(item?.dayOfWeek)
                    );
                  }}
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

      <Box display={showSchedule ? "block" : "none"}>
        <AddScheduleStaff none staff={staff} />
      </Box>
    </Box>
  );
};

export default Schedule;

import React from "react";
import { Box, Button, Flex, Td, Text, Tr } from "@chakra-ui/react";
import TableFormat from "../../../common/TableFormat";

import { LoanStatus } from "../../../common/constants";
import { useNavigate } from "react-router-dom";
import { formatDat } from "../../../../utils/helpers";
import { MdAdd } from "react-icons/md";

const MedAssist = ({ data }) => {
  const headers = ["AMOUNT", "REQUEST DATE", "STATUS", "ACTIONS"];

  const navigate = useNavigate();
  return (
    <Box mt="24px">
      <TableFormat
        header={headers}
        opt
        alignFirstHeader
        alignSecondHeader
        alignThirdHeader
      >
        {data?.medicalAssistance?.map((item, i) => (
          <Tr
            key={i}
            color="#646668"
            fontWeight={500}
            fontSize="14px"
            lineHeight="100%"
          >
            <Td>₦ {item?.amountRequested?.toLocaleString()}</Td>

            <Td>{formatDat(item?.createdAt)}</Td>
            <Td>
              <Flex align="center" w="full" justifyContent="center">
                <Flex
                  textTransform="capitalize"
                  color={
                    LoanStatus.find(
                      (dat) =>
                        dat.name?.toLowerCase() === item?.status?.toLowerCase(),
                    )?.color || ""
                  }
                  bg={
                    LoanStatus.find(
                      (dat) =>
                        dat.name?.toLowerCase() === item?.status?.toLowerCase(),
                    )?.bg || ""
                  }
                  justifyContent={"center"}
                  alignItems="center"
                  py="5px"
                  px="16px"
                  borderRadius="4px"
                >
                  {item?.status === "REJECTED"
                    ? "Declined"
                    : item?.status?.toLowerCase()}
                </Flex>
              </Flex>
            </Td>
            <Td textAlign="center">
              <Flex
                onClick={() =>
                  navigate(`/admin/medical-assistance/${item?.id}`)
                }
                justifyContent="center"
                align="center"
              >
                <Text textDecor="underline" cursor="pointer">
                  View
                </Text>
              </Flex>
            </Td>
          </Tr>
        ))}
      </TableFormat>

      <Flex justifyContent="flex-end">
        <Button
          display="flex"
          bg="#000"
          gap="8px"
          onClick={() => navigate("/admin/medical-assistance/create")}
        >
          <Text fontSize="14px">Add Medical Assistance</Text>
          <MdAdd size="20px" />
        </Button>
      </Flex>
    </Box>
  );
};

export default MedAssist;

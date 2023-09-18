import React from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { CSVLink } from "react-csv";
import { PiExportLight } from "react-icons/pi";

const SubExport = ({ data }) => {
  const columns = [
    { name: "Customer", selector: "customer" },
    { name: "Plan", selector: "membershipPlan" },
    { name: "Start Date", selector: "startDate" },
    { name: "Next Renewal", selector: "nextRenewal" },
    { name: "AutoRenew", selector: "autoRenew" },
    { name: "Cancelled", selector: "isCancelled" },
    { name: "Date Created", selector: "createdAt" },
  ];

  return (
    <Box w="fit-content">
      {data?.length && (
        <CSVLink
          data={data}
          headers={columns.map((column) => ({
            label: column.name,
            key: column.selector,
          }))}
          filename={"Subscriptions Report.csv"}
        >
          <Button
            display="flex"
            bg="#000"
            _hover={{ bg: "#000" }}
            borderRadius="8px"
            _active={{ bg: "#000" }}
            _focus={{ bg: "#000" }}
            gap="8px"
          >
            <Text>Export Data</Text>
            <PiExportLight size="20px" />
          </Button>
        </CSVLink>
      )}
    </Box>
  );
};

export default SubExport;

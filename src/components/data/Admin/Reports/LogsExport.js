import React from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { CSVLink } from "react-csv";
import { PiExportLight } from "react-icons/pi";

const LogExport = ({ data }) => {
  const columns = [
    { name: "Location", selector: "location" },
    { name: "Customer", selector: "customer" },
    { name: "Service Type", selector: "serviceType" },
    { name: "Vehicle", selector: "vehicle" },
    { name: "Ticket Number", selector: "ticketNumber" },
    { name: "Billing Type", selector: "billingType" },
    { name: "Amount", selector: "amount" },
    { name: "Amount Paid", selector: "amountPaid" },
    { name: "Status", selector: "status" },
    { name: "Date Created", selector: "createdAt" },
  ];

  return (
    <Box w="fit-content">
      {data?.length ? (
        <CSVLink
          data={data}
          headers={columns.map((column) => ({
            label: column.name,
            key: column.selector,
          }))}
          filename={"Logs Report.csv"}
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
            <PiExportLight size="20px" />
            <Text>Export Data</Text>
          </Button>
        </CSVLink>
      ) : null}
    </Box>
  );
};

export default LogExport;

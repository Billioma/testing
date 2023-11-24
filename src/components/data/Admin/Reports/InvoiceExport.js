import React from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { CSVLink } from "react-csv";
import { PiExportLight } from "react-icons/pi";

const InvoiceExport = ({ data }) => {
  const columns = [
    { name: "Client", selector: "client" },
    { name: "Created By", selector: "createdBy" },
    { name: "Confirmed By", selector: "paymentConfirmedBy" },
    { name: "Tax", selector: "tax" },
    { name: "Amount Payable", selector: "amountPayable" },
    { name: "Amount Paid", selector: "amountPaid" },
    { name: "Date Paid", selector: "datePaid" },
    { name: "Status", selector: "paymentStatus" },
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
          filename={"Invoice Report.csv"}
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

export default InvoiceExport;

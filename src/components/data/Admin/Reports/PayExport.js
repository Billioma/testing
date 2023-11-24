import React from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { CSVLink } from "react-csv";
import { PiExportLight } from "react-icons/pi";

const PayExport = ({ data }) => {
  const columns = [
    { name: "ID", selector: "id" },
    { name: "Location", selector: "location" },
    { name: "Zone", selector: "zone" },
    { name: "Attendant", selector: "attendant" },
    { name: "Customer", selector: "customer" },
    { name: "Service Type", selector: "serviceType" },
    { name: "Payment Method", selector: "paymentMethod" },
    { name: "Amount", selector: "amount" },
    { name: "Amount Paid", selector: "amountPaid" },
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
          filename={"Payments Report.csv"}
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

export default PayExport;

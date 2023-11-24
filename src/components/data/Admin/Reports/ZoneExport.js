import React from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { CSVLink } from "react-csv";
import { PiExportLight } from "react-icons/pi";

const ZoneExport = ({ data }) => {
  const columns = [
    { name: "ID", selector: "id" },
    { name: "Location", selector: "location" },
    { name: "Zone Code ", selector: "zoneCode" },
    { name: "Zone", selector: "name" },
    { name: "Description", selector: "description" },
    { name: "Capacity", selector: "capacity" },
    { name: "Reservable", selector: "reservable" },
    { name: "Reservable Space", selector: "reservableSpace" },
    { name: "Geolocation", selector: "geoLocation" },
    { name: "Minimum Duration", selector: "minimumDuration" },
    { name: "Service", selector: "service" },
    { name: "Amenities", selector: "amenities" },
    { name: "Status", selector: "status" },
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
          filename={"Zones Report.csv"}
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
      )}
    </Box>
  );
};

export default ZoneExport;

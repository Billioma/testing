import React from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { CSVLink } from "react-csv";
import { PiExportLight } from "react-icons/pi";

const LocationExport = ({ data }) => {
  const columns = [
    { name: "ID", selector: "id" },
    { name: "Name", selector: "name" },
    { name: "Description", selector: "description" },
    { name: "State", selector: "state" },
    { name: "GeoLocation", selector: "geoLocation" },
    { name: "Location Type", selector: "locationType" },
    { name: "Zones", selector: "zones" },
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
          filename={"Locations Report.csv"}
        >
          <Button
            display="flex"
            bg="#000"
            _hover={{ bg: "#000" }}
            isDisabled={!data?.length}
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

export default LocationExport;

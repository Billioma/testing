import React, { useEffect, useState } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { PiExportLight } from "react-icons/pi";

const VehicleExport = ({ data, action, isExporting, limit }) => {
  const [exportable, setExportable] = useState(false);

  useEffect(() => {
    if (data && exportable) {
      const a = document.createElement("a"),
        fileName = "Vehicles Report.csv";
      document.body.appendChild(a);
      a.style = "display: none";

      const blob = new Blob([data], { type: "octet/stream" }),
        url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
      setExportable(false);
    }
  }, [data, exportable]);

  return (
    <Box w="fit-content">
      <Button
        display="flex"
        bg="#000"
        _hover={{ bg: "#000" }}
        onClick={() => {
          action();
          setExportable(true);
        }}
        borderRadius="8px"
        isDisabled={limit > 50000}
        isLoading={isExporting}
        _active={{ bg: "#000" }}
        _focus={{ bg: "#000" }}
        gap="8px"
      >
        <Text>Export Data</Text>
        <PiExportLight size="20px" />
      </Button>
    </Box>
  );
};

export default VehicleExport;

import React from "react";
import { Box, Flex, Heading, useMediaQuery } from "@chakra-ui/react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

const ScanPark = () => {
  const [data, setData] = React.useState("Not Found");

  const [isMobile] = useMediaQuery("(max-width: 820px)");

  return (
    <Box>
      {isMobile ? (
        <>
          <BarcodeScannerComponent
        width={500}
        height={500}
            onUpdate={(err, result) => {
              if (result) setData(result.text);
              else setData("Not Found");
            }}
          />
          {data ? <p>{data}</p> : ""}
        </>
      ) : (
        <Flex justifyContent="center" align="center" h="75vh">
          <Heading>Please Open this URL on your mobile device</Heading>
        </Flex>
      )}
    </Box>
  );
};

export default ScanPark;

import React from "react";
import { Box, Flex, Heading, useMediaQuery } from "@chakra-ui/react";
import { QrReader } from "react-qr-reader";

const ScanPark = () => {
  const [data, setData] = React.useState("Not Found");

  const [isMobile] = useMediaQuery("(max-width: 820px)");

  return (
    <Box>
      {isMobile ? (
        <>
          <QrReader
            // width="100vw"
            // height="100vh"
            onResult={(result, error) => {
              if (result) {
                setData(result.text);
              } else setData("Not Found");
            }}
            style={{ width: "100%" }}
          />

          <p>{data}</p>
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

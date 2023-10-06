import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Button, Switch } from "@chakra-ui/react";
import CustomInput from "../../../components/common/CustomInput";
import { QRCodeCanvas } from "qrcode.react";

export default function QrCode() {
  const [state, setState] = useState({
    ticketNumber: "",
  });

  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showQr, setShowQr] = useState(false);

  const downloadQRCode = () => {
    const canvas = document.getElementById("qrcode");
    const dataUrl = canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");

    downloadLink.href = dataUrl;
    downloadLink.download = `${state.ticketNumber}-qrcode.png`;

    downloadLink.click();
  };

  const isFormValid = () => {
    return !state.ticketNumber;
  };

  useEffect(() => {
    setIsDisabled(isFormValid);
  }, [state]);

  const handleSubmit = () => {
    setIsLoading(true);
    setTimeout(() => {
      setShowQr(true);
      setIsLoading(false);
    }, [1000]);
  };

  return (
    <Box minH="75vh">
      <Flex justifyContent="center" align="center" w="full" flexDir="column">
        <Flex
          bg="#fff"
          borderRadius="16px"
          py="24px"
          px="28px"
          justifyContent="center"
          w="30rem"
          flexDir="column"
          border="1px solid #E4E6E8"
        >
          <Box w="full" mb={4}>
            <Text mb="8px" fontSize="10px" fontWeight={500} color="#444648">
              Ticket Number
            </Text>
            <CustomInput
              auth
              value={state.ticketNumber}
              mb
              holder="Enter ticket number"
              onChange={(e) =>
                setState({ ...state, ticketNumber: e.target.value })
              }
            />
          </Box>

          <Flex
            align="center"
            justifyContent={"space-between"}
            gap="15px"
            mb="16px"
            mt={2}
          >
            <Text fontSize="12px" fontWeight={500} color="#444648">
              Claim Tickets
            </Text>
            <Switch
              onChange={() =>
                setState({
                  ...state,
                  claim: state.claim === 1 ? 0 : 1,
                })
              }
              size="sm"
              variant="adminPrimary"
            />
          </Flex>

          <Flex gap={4} mt={4}>
            <Button
              variant="adminPrimary"
              w="full"
              isDisabled={isDisabled}
              isLoading={isLoading}
              onClick={handleSubmit}
            >
              Create
            </Button>
          </Flex>

          {showQr ? (
            <Flex
              mt={6}
              gap={4}
              alignItems={"center"}
              justify={"center"}
              flexDir={"column"}
            >
              <QRCodeCanvas
                size={256}
                value={state.ticketNumber}
                viewBox={`0 0 256 256`}
                renderAs="canvas"
                id="qrcode"
              />

              <button onClick={downloadQRCode}>Download QR Code</button>
            </Flex>
          ) : null}
        </Flex>
      </Flex>
    </Box>
  );
}

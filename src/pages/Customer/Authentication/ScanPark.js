import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Image,
  Spinner,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { useGetZone } from "../../../services/customer/query/locations";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useCustomToast from "../../../utils/notifications";

const ScanPark = () => {
  const [zone, setZone] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState("");
  const { errorToast } = useCustomToast();
  const { mutate, isLoading } = useGetZone({
    onSuccess: (res) => {
      sessionStorage.setItem("zone", JSON.stringify(res));
      navigate("/customer/pay-to-park");
    },
    onError: (err) => {
      if (err?.response?.data?.message) {
        setError(true);
      } else {
        errorToast(
          err?.response?.data?.message || err?.message || "An Error occurred"
        );
      }
    },
  });

  useEffect(() => {
    if (success && zone !== "") {
      mutate(zone);
    }
  }, [success, zone]);

  const [isMobile] = useMediaQuery("(max-width: 820px)");

  return (
    <Box w="full">
      <Image my="24px" src="/assets/park-logo.jpg" w="134px" h="28px" />
      {isMobile ? (
        <>
          <BarcodeScannerComponent
            width={500}
            height={500}
            onUpdate={(err, result) => {
              if (result) {
                setZone(result?.text);
                setSuccess(true);
              } else {
                setZone("");
              }
            }}
          />

          {isLoading ? (
            <Flex mt="25px" justifyContent="center" align="center">
              <Spinner />
            </Flex>
          ) : (
            ""
          )}
          {error ? (
            <Text
              color="red"
              fontSize="13px"
              mt="25px"
              textAlign="center"
              fontWeight={500}
            >
              Zone was not found! Try searching another zone.{error}
            </Text>
          ) : (
            ""
          )}
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

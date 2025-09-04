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
import { useGetTicket } from "../../../services/customer/query/locations";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useCustomToast from "../../../utils/notifications";

const RetrieveVehicle = () => {
  const [id, setId] = useState("271387");
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState("");
  const { errorToast } = useCustomToast();
  const { mutate, isLoading } = useGetTicket({
    onSuccess: () => {
      navigate(`/customer/retrieve-vehicle/${id}`);
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

//   useEffect(() => {
//     if (id !== "") {
//       mutate(id);
//     }
//   }, [id]);

    useEffect(() => {
      if (success && id !== "") {
        mutate(id);
      }
    }, [success, id]);

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
                setId(result?.text);
                setSuccess(true);
              } else {
                setId("");
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
              Zone was not found! Try searching another id.{error}
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

export default RetrieveVehicle;

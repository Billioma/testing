import React from "react";
import { Box, Button, Flex, Image, Spinner, Text } from "@chakra-ui/react";
import ModalLayout from "./ModalLayout";
import { useNavigate } from "react-router-dom";

const RetrieveSuccess = ({ isOpen, onClose, isRetrieve }) => {
  const navigate = useNavigate();
  return (
    <ModalLayout isOpen={isOpen} onClose={onClose}>
      <Box>
        <Flex justifyContent="center" align="center">
          {isRetrieve ? (
            <Spinner thickness="4px" size="md" speed="1s" />
          ) : (
            <Image src="/assets/success.svg" />
          )}
        </Flex>

        <Text
          fontFamily="Cooper"
          color="#444648"
          fontWeight={900}
          lineHeight="120%"
          textAlign="center"
          fontSize="24px"
          mt="24px"
        >
          {isRetrieve ? "Verifying Payment" : "Payment Successful"}
        </Text>

        <Flex mt="32px" w="full" display={isRetrieve ? "none" : "flex"}>
          <Button
            w="full"
            onClick={() => navigate("/customer/auth/login")}
            fontSize="13px"
            borderRadius="4px"
            py="17px"
          >
            Go Home
          </Button>
        </Flex>
      </Box>
    </ModalLayout>
  );
};

export default RetrieveSuccess;

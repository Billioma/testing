import React from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const NewUser = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Text
        fontSize={{ base: "40px", md: "100px" }}
        w={{ base: "100%", md: "33rem" }}
        color="#090c02"
        fontWeight={700}
      >
        Welcome to Managr!
      </Text>

      <Text mt="14px" color="#090c02" fontWeight={500}>
        For your security, we recommend changing your temporary password. Please
        set a new password now.
      </Text>

      <Button
        mt="50px"
        h="60px"
        w="211px"
        onClick={() => navigate("/staff/auth/reset-password")}
      >
        Change Password
      </Button>
    </Box>
  );
};

export default NewUser;

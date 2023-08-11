import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";

const BackButtonBox = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <Box
      w="full"
      py={2}
      mb={3}
      display="flex"
      alignItems="center"
      justifyContent="flex-start"
    >
      <Text
        fontSize="14px"
        fontWeight="500"
        cursor="pointer"
        gap={3}
        onClick={goBack}
        display="flex"
        alignItems="center"
      >
        <HiOutlineArrowNarrowLeft size={20} />
        Back
      </Text>
    </Box>
  );
};

export default BackButtonBox;

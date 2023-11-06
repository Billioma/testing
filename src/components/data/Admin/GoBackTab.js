import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";

const BackButtonBox = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
    sessionStorage.removeItem("edit");
  };

  return (
    <Box
      w="fit-content"
      py={2}
      mb={3}
      color="#242628"
      display="flex"
      alignItems="center"
      justifyContent="flex-start"
    >
      <Flex
        align="center"
        fontSize="14px"
        fontWeight="500"
        lineHeight="100%"
        cursor="pointer"
        gap="8px"
        onClick={goBack}
      >
        <HiOutlineArrowNarrowLeft size={20} />
        Back
      </Flex>
    </Box>
  );
};

export default BackButtonBox;

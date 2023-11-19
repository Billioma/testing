import { Box, Flex, Image, Text, useMediaQuery } from "@chakra-ui/react";
import React from "react";

const Footer = () => {
  const [isMobile] = useMediaQuery("(max-width: 991px)");
  return (
    <Box
      pos="fixed"
      pt="24px"
      bottom="0"
      w={isMobile ? "calc(100% - 2.4rem)" : "calc(100% - 342px)"}
      mr="20px"
      bg="#fff"
    >
      <Flex
        borderTop="1px solid #E4E6E8"
        align="center"
        justifyContent="space-between"
        py="24px"
      >
        <Flex align="center" gap="4px">
          <Text color="#000" fontSize="12px" lineHeight="100%">
            Powered by
          </Text>
          <Image h="20px" w="80px" src="/assets/ezlogo.jpg" />
        </Flex>

        <Box>
          <Text fontSize="12px" color="#000" lineHeight="100%">
            © 2023 EZPark Limited
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Footer;

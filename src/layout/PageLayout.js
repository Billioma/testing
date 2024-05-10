import React from "react";
import { Box, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import SideBarr from "./NonAuthLayout/SideBarr";
import Header from "./AuthLayout/Header";
import SideBar from "./AuthLayout/SideBar";

export const AuthLayout = ({ children }) => {
  const [isMobile] = useMediaQuery("(max-width: 1226px)");

  return (
    <Box
      color="#000"
      fontFamily="Sailec"
      bg="#fff"
      h="100vh"
      px={isMobile ? "20px" : "37px"}
      py={isMobile ? "0" : "40px"}
    >
      <Box overflowX="hidden" h="full" className="no_scroller">
        <Box
          mx={isMobile ? "-40px" : "unset"}
          px={!isMobile ? "310px" : "20px"}
        >
          <Header />
        </Box>
        {!isMobile && <SideBar />}

        <Box
          w="100%"
          pt={isMobile ? "100px" : "95px"}
          color="#090c02"
          pl={!isMobile ? "310px" : "0px"}
          pr={!isMobile ? "" : "0"}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export const NonAuthLayout = ({ children }) => {
  const [isMobile] = useMediaQuery("(max-width: 1226px)");

  return (
    <Flex
      flexDir="column"
      color="#000"
      fontFamily="Satoshi"
      bg="#fff"
      position="relative"
    >
      <Flex minH="100vh">
        <Flex
          pb="30px"
          pos="relative"
          zIndex={2}
          flexDir="column"
          w={!isMobile ? "50%" : "100%"}
        >
          <Flex
            flexDir="column"
            pos="relative"
            px={!isMobile ? "80px" : 5}
            minH="90vh"
            pt="50px"
            justifyContent="center"
            w="full"
          >
            {children}

            <Flex
              w="full"
              flexDir="column"
              justifyContent="center"
              align="center"
              mt="100px"
            >
              <Flex
                flexDir="column"
                pos="absolute"
                bottom="0"
                justifyContent="center"
                align="center"
              >
                <Text fontSize="14px" fontWeight={500} color="#090c02">
                  Copyright @EZPARK 2024 | Privacy Policy
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        {!isMobile && <SideBarr />}
      </Flex>
    </Flex>
  );
};

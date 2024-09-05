import React, { useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image, useMediaQuery } from "@chakra-ui/react";
import Header from "./Header";
import SideBar from "./SideBar";
import Footer from "./Footer";

export const AuthLayout = ({ children }) => {
  const [isMobile] = useMediaQuery("(max-width: 991px)");
  const [show, setShow] = useState(true);

  return (
    <Box color="#000" fontFamily="Sailec" h="100vh">
      <Box overflowX="hidden">
        {!isMobile && <SideBar show={show} setShow={setShow} />}
        <Box h="2.3rem" w="full" bg="#fff" zIndex={55} pos="fixed" top="0">
          <Box pt="32px" px={!isMobile ? (show ? "310px" : "88px") : "20px"}>
            <Header showSidebar={show} />
          </Box>
        </Box>
        <Box overflow="auto" className="no_scroller">
          <Box
            w="100%"
            pt={isMobile ? "150px" : "125px"}
            color="#828282"
            maxHeight="92vh"
            pl={!isMobile ? (show ? "310px" : "88px") : "20px"}
            pr={!isMobile ? "32px" : "20px"}
            pb={10}
          >
            {children}
          </Box>
        </Box>
        <Box h="10vh" w="full"></Box>
        <Box mt="20px" px={!isMobile ? (show ? "310px" : "88px") : "20px"}>
          <Footer showSidebar={show} />
        </Box>
      </Box>
    </Box>
  );
};

export const NonAuthLayout = ({ children }) => {
  return (
    // <Box p="24px">
    //   <Flex>
    //     <Box w="40%">
    //       <Flex
    //         flexDir="column"
    //         justifyContent="center"
    //         align="center"
    //         // minH="85vh"
    //         w={{ base: "full", lg: "1295px" }}
    //         px="20px"
    //       >
    //         {children}
    //       </Flex>
    //       <Flex
    //         mt="auto"
    //         flexDir="column"
    //         justifyContent="center"
    //         align="center"
    //       >
    //         <Text fontSize="14px" lineHeight="100%" mb="8px">
    //           Powered by
    //         </Text>
    //         <Image src="/assets/ezlogo.png" />
    //       </Flex>
    //     </Box>
    //     <Box bg="#EE383A" w="60%">
    //       d
    //     </Box>
    //   </Flex>
    // </Box>

    <Box color="#000" fontFamily="Poppins" bg="#fff">
      <Flex minH="100vh">
        <Box w="50%" p="28px" pr="0">
          <Flex flexDir="column" w="100%">
            <Text
              fontSize="28px"
              lineHeight="120%"
              fontWeight={900}
              fontFamily="Cooper"
            >
              <span style={{ color: "red" }}>Parkin</span>
              Space
            </Text>
            <Text fontSize="15px" color="#444648">
              Analytics
            </Text>
            {children}
          </Flex>
        </Box>

        <Box w="50%">
          <Flex w="100%" flexDirection="column">
            <Flex flexDir="column" align="flex-end" minH="100vh">
              <Flex
                flexDir="column"
                pos="fixed"
                right="24px"
                align="center"
                justifyContent="center"
                minH="100%"
                w="50%"
                borderRadius="16px"
              >
                <Box
                  bg="#EE383A"
                  overflow="hidden"
                  w="full"
                  h="full"
                  minH="95vh"
                  pos="relative"
                >
                  <Image
                    src="/assets/boxes.svg"
                    pos="absolute"
                    top="0"
                    right="0"
                    h="100%"
                    w="full"
                  />
                  <Image
                    src="/assets/lappy.svg"
                    pos="absolute"
                    bottom="0"
                    right="0"
                    zIndex={2}
                    h="70%"
                    w="full"
                  />
                </Box>
              </Flex>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

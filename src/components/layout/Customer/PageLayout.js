import React, { useEffect, useState } from "react";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "@chakra-ui/react";
import Header from "./AuthLayout/Header";
import SideBar from "./AuthLayout/SideBar";
import { useGetUser } from "../../../services/customer/query/user";

export const AuthLayout = ({ children }) => {
  const [isMobile] = useMediaQuery("(max-width: 991px)");
  const [show, setShow] = useState(true);

  const { data: userData } = useGetUser();
  window?.fcWidget?.setExternalId(userData?.profile?.id);

  window?.fcWidget?.user?.setFirstName(userData?.profile?.firstName);
  window?.fcWidget?.user?.setLastName(userData?.profile?.lastName);

  window?.fcWidget?.user?.setEmail(userData?.email);

  useEffect(() => {
    sessionStorage.removeItem("redirect");
  }, []);
   
  return (
    <Box
      color="#000"
      fontFamily="Sailec"
      bg="#fff"
      h="100vh"
      p="15px"
      py="24px"
    >
      <Box
        pt="24px"
        px={isMobile ? "5px" : "24px"}
        bg="#F4F6F8"
        overflowX="hidden"
        h="full"
        borderRadius="40px"
      >
        <Box px={!isMobile ? (show ? "310px" : "88px") : "20px"}>
        <Header showSidebar={show} />
        </Box> {!isMobile && <SideBar show={show} setShow={setShow} />}
      
        <Box overflow="auto" className="no_scroller">
          <Box
            w="100%"
            pt={isMobile ? "150px" : "95px"}
            color="#828282"
            maxHeight="87vh"
            pl={!isMobile ? (show ? "310px" : "88px") : "20px"}
            pr={!isMobile ? "" : "20px"}
            pb={10}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export const NonAuthLayout = ({ children }) => {
  const location = useLocation();
  const [isMobile] = useMediaQuery("(max-width: 991px)");
  return (
    <Flex
      flexDir="column"
      justifyContent={
        location.pathname === "/customer/scan-qr" ? "flex-start" : "center"
      }
      align={
        location.pathname === "/customer/scan-qr" ? "flex-start" : "center"
      }
      pos="relative"
      minH={
        location.pathname === "/customer/scan-qr" ||
        location.pathname !== "/pay-to-park"
          ? "75vh"
          : "100vh"
      }
    >
      {(location.pathname !== "/pay-to-park" ||
        location.pathname !== "/scan-qr") && (
        <>
          <Image
            display={{ base: "none", md: "unset" }}
            pos="fixed"
            bottom="0"
            right="0"
            src="/assets/park-right.png"
          />
          <Image
            display={{ base: "none", md: "unset" }}
            w={{ base: "144px", md: "unset" }}
            pos="fixed"
            bottom="0"
            left="0"
            src="/assets/park-left.png"
          />
        </>
      )}
      <Flex
        flexDir="column"
        justifyContent={
          location.pathname === "/customer/scan-qr" ? "flex-start" : "center"
        }
        align={
          location.pathname === "/customer/scan-qr" ? "flex-start" : "center"
        }
        minH={
          location.pathname === "/customer/pay-to-park"
            ? "unset"
            : location.pathname === "/customer/scan-qr"
            ? "75vh"
            : "90vh"
        }
        pt={
          !isMobile && location.pathname === "/customer/auth/signup"
            ? "30px"
            : "0"
        }
        w={{ base: "full", lg: "1295px" }}
        px="20px"
        pb="10px"
      >
        {children}
      </Flex>
      <Flex w="full" flexDir="column" justifyContent="center" align="center">
        <Flex
          mt="auto"
          mb="20px"
          flexDir="column"
          justifyContent="center"
          align="center"
        >
          <Text fontSize="12px" lineHeight="100%" mb="8px">
            Powered by
          </Text>
          <Image src="/assets/ezlogo.png" />
        </Flex>
      </Flex>
    </Flex>
  );
};

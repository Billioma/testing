import React from "react";
import { Flex, Image } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

const SideBarr = () => {
  const { pathname } = useLocation();
  return (
    <Flex
      minH={"100vh"}
      pos="fixed"
      right="0"
      align="center"
      justifyContent="center"
      w="50%"
      bg="#fff"
      flexDirection="column"
    >
      <Flex
        flexDir="column"
        ml={
          pathname === "/staff/auth/new-login" ||
          pathname === "/staff/auth/new-user"
            ? "-255px"
            : "unset"
        }
        align="center"
        justifyContent="center"
        flex="1"
      >
        <Image
          src={
            pathname === "/staff/auth/new-login" ||
            pathname === "/staff/auth/new-user"
              ? "/assets/new-login.jpg"
              : pathname === "/staff/auth/code-verification"
                ? "/assets/verify.jpg"
                : "/assets/people.jpg"
          }
          w={
            pathname === "/staff/auth/new-login" ||
            pathname === "/staff/auth/new-user"
              ? "752px"
              : pathname === "/staff/auth/code-verification"
                ? "540px"
                : "607px"
          }
          h={
            pathname === "/staff/auth/new-login" ||
            pathname === "/staff/auth/new-user"
              ? "651px"
              : pathname === "/staff/auth/code-verification"
                ? "540px"
                : "608px"
          }
          objectFit="contain"
        />
      </Flex>
    </Flex>
  );
};

export default SideBarr;

import React from "react";
import { Image } from "@chakra-ui/image";
import { Flex, Text } from "@chakra-ui/layout";
import { useNavigate } from "react-router";

const ChangeSuccess = () => {
  const navigate = useNavigate();

  return (
    <Flex
      justifyContent="center"
      w="full"
      align="center"
      h={{ base: "90vh", md: "100vh" }}
      flexDir="column"
    >
      <Flex
        justifyContent="center"
        w={{ base: "full", md: "50%", lg: "35%" }}
        flexDir="column"
      >
        <Flex justifyContent="center" align="center" flexDir="column">
          <Image src="/assets/logo.svg" w="364px" h="56px" />
        </Flex>

        <Flex justifyContent="center" align="center" flexDir="column">
          <Text textAlign="center" fontSize="24px" mt="56px" fontWeight={700}>
            Password Changed
          </Text>
        </Flex>

        <Flex
          flexDirection="column"
          justifyContent="center"
          align="center"
          mt="32px"
        >
          <Text
            fontSize="14px"
            cursor="pointer"
            color="3646668"
            onClick={() => navigate("/customer/auth/login")}
          >
            Back to <span style={{ color: "red" }}>Login</span>
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ChangeSuccess;

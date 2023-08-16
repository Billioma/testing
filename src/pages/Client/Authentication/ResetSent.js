import React from "react";
import { Image } from "@chakra-ui/image";
import { Flex, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { useNavigate } from "react-router";

const ResetSent = () => {
  const navigate = useNavigate();

  return (
    <Flex justifyContent="center" w="full" align="center" flexDir="column">
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
            Reset link sent
          </Text>
          <Text
            fontSize="14px"
            w="80%"
            textAlign="center"
            mt="16px"
            color="#646668"
            lineHeight="150%"
          >
            Pease check the email you provided and follow the prompt
          </Text>
        </Flex>

        <Flex
          flexDirection="column"
          justifyContent="center"
          align="center"
          mt="32px"
        >
          <Button
            bg="black"
            w="80%"
            onClick={() => navigate("/client/auth/login")}
          >
            Back to Login
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ResetSent;

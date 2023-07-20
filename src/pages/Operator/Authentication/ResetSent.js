import React from "react";
import { Image } from "@chakra-ui/image";
import { Flex, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { useNavigate } from "react-router";

const ResetSent = () => {
  const navigate = useNavigate();

  return (
    <Flex
      justifyContent="center"
      w="full"
      align="center"
      h={{ base: "90vh", md: "90vh" }}
      flexDir="column"
    >
      <Flex
        justifyContent="center"
        w={{ base: "full", md: "50%", lg: "35%" }}
        flexDir="column"
      >
        <Flex justifyContent="center" align="center" flexDir="column">
          <Image src="/assets/logo.svg" w="312px" h="48px" />
        </Flex>

        <Flex justifyContent="center" align="center" flexDir="column">
          <Text textAlign="center" fontSize="24px" mt="56px" fontWeight={700}>
            Operator Reset link sent
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
          <Button onClick={() => navigate("/operator/auth/login")}>
            Back to Login
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ResetSent;

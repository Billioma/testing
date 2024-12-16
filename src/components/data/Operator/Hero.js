import { Box, Button, Flex, Image, Input, Text } from "@chakra-ui/react";
import React from "react";

const Hero = () => {
  return (
    <Box pos="relative" h="100vh" className="full_width">
      <Image
        pos="absolute"
        zIndex={1}
        h="100vh"
        objectFit="cover"
        w="full"
        src="/assets/heroo.png"
      />

      <Flex
        flexDir="column"
        justifyContent="center"
        align="center"
        pos="relative"
        h={{ base: "80vh", md: "100vh" }}
        zIndex={100}
      >
        <Flex justifyContent="center" align="center" w="full">
          <Text
            color="#fff"
            textAlign="center"
            fontSize={{ base: "32px", md: "64px" }}
            fontWeight={900}
            lineHeight="128%"
            w={{ base: "", md: "70%" }}
            fontFamily="Cooper"
          >
            ParkinSpace operator provides solutions for parking providers
          </Text>
        </Flex>
        <Flex
          justifyContent="center"
          align="center"
          mt="24px"
          fontSize="18px"
          fontFamily="Satoshi"
          textAlign="center"
          w={{ base: "", md: "50%" }}
          lineHeight="150%"
          color="#fff"
        >
          ParkinSpace Operator our easy-to-use, web-based technology solution
          for parking providers that fosters simplifies the management of
          dailyparking operations
        </Flex>

        <Flex mt="40px" align="center" gap="12px">
          <Input
            bg="transparent"
            border="1px solid white"
            fontSize="12px"
            _placeholder={{ color: "#fff" }}
            color="#fff"
            px="16px"
            fontWeight={500}
            w={{ base: "100%", md: "230px", lg: "280px" }}
            py={{ base: "12px", md: "150x" }}
            placeholder="enter your email address"
          />

          <Button
            bg="#fff"
            border="1px solid #fff"
            fontSize="12px"
            color="#000"
            px="16px"
            fontWeight={500}
            borderRadius="4px"
            w={{ base: "100%", md: "50%" }}
            py={{ base: "12px", md: "15px" }}
          >
            Get download link
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Hero;

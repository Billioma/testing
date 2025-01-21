import React from "react";
import { Box, Button, Flex, Image, Input } from "@chakra-ui/react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <Box pos="relative" minH="80vh" mb={{ base: "0", md: "50px" }}>
      <Image
        pos="absolute"
        zIndex={1}
        h={{ base: "70vh", md: "80vh" }}
        objectFit="cover"
        w="full"
        borderRadius="24px"
        src="/assets/red.png"
      />

      <Flex
        flexDir="column"
        justifyContent="center"
        align="center"
        pos="relative"
        px="20px"
        h={{ base: "70vh", md: "80vh" }}
        zIndex={5}
      >
        <Flex justifyContent="center" align="center" w="full">
          <Box
            color="#fff"
            textAlign="center"
            fontSize={{ base: "24px", md: "70px" }}
            fontWeight={900}
            lineHeight={{ base: "30px", md: "128%" }}
            textTransform="capitalize"
            w={{ base: "", md: "80%" }}
            fontFamily="Recoleta"
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ x: [-50, 0], opacity: 1 }}
              transition={{ duration: 1 }}
            >
              ParkinSpace operator provides solutions for parking providers
            </motion.div>
          </Box>
        </Flex>
        <Flex
          justifyContent="center"
          align="center"
          mt={{ base: "8px", md: "24px" }}
          fontSize={{ base: "14px", md: "18px" }}
          fontFamily="Satoshi"
          textAlign="center"
          w={{ base: "", md: "45%" }}
          lineHeight={{ base: "21px", md: "150%" }}
          color="#fff"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ x: [50, 0], opacity: 1 }}
            transition={{ duration: 1 }}
          >
            ParkinSpace Operator is our easy-to-use, web-based technology
            solution for parking providers that fosters simplifies the
            management of daily parking operations
          </motion.div>
        </Flex>

        <Flex mt="40px" justifyContent="center" w="full">
          <Flex
            align="center"
            flexDir={{ base: "column", md: "row" }}
            w={{ base: "100%", md: "45%" }}
            gap="24px"
          >
            <Box w={{ base: "100%", md: "70%" }}>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ x: [-50, 0], opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <Input
                  bg="#FFA3A34D"
                  border="1px solid white"
                  fontSize="16px"
                  _placeholder={{ color: "#fff" }}
                  color="#fff"
                  h="60px"
                  px="16px"
                  borderRadius="12px"
                  fontWeight={500}
                  w="full"
                  placeholder="Enter your email address"
                />
              </motion.div>
            </Box>

            <Flex
              justifyContent={{ base: "center", md: "flex-start" }}
              w={{ base: "100%", md: "30%" }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ x: [50, 0], opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <Button
                  bg="#fff"
                  border="1px solid #fff"
                  color="#000"
                  h="60px"
                  px="16px"
                  fontSize="16px"
                  fontWeight={500}
                  borderRadius="12px"
                >
                  Get download link
                </Button>
              </motion.div>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Hero;

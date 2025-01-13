import React from "react";
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { IoMdArrowDropdown } from "react-icons/io";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <Flex
      justifyContent="center"
      bg="red"
      px="20px"
      color="#fff"
      borderBottomRadius="24px"
      className="full_width"
      pos="relative"
      minH={{ base: "unset", lg: "100vh" }}
    >
      <Image
        pos="absolute"
        top="0"
        left="0"
        opacity={0.1}
        w="100%"
        h="full"
        src="/assets/grid.png"
      />
      <Flex
        flexDir="column"
        align="center"
        pt={{ base: "50px", lg: "130px" }}
        w={{ base: "100%", lg: "1350px" }}
      >
        <Box
          w={{ base: "100%", lg: "60%" }}
          textAlign="center"
          fontSize={{ base: "28px", lg: "48px" }}
          textTransform="capitalize"
          lineHeight={{ base: "40px", lg: "68px" }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ x: [-50, 0], opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Find, Reserve and Pay for parking services across Nigeria
          </motion.div>
        </Box>

        <Box
          w={{ base: "100%", lg: "52%" }}
          mt="8px"
          textAlign="center"
          fontFamily="Satoshi"
          fontSize={{ base: "15px", lg: "18px" }}
          lineHeight={{ base: "23px", lg: "34px" }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ x: [50, 0], opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Seamlessly discover available parking spots, make reservations, and
            pay securely—all in one place. Simplifying parking across Nigeria,
            one spot at a time.
          </motion.div>
        </Box>

        <Flex
          fontFamily="Satoshi"
          flexDir={{ base: "column", lg: "row" }}
          fontSize={{ base: "14px", lg: "18px" }}
          align="center"
          mt="44px"
          w={{ base: "100%", lg: "42rem" }}
          mb="40px"
          gap="24px"
          lineHeight={{ base: "19px", lg: "25px" }}
        >
          <Box w={{ base: "100%", lg: "80%" }}>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ x: [-50, 0], opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <Flex
                border="1px solid #fff"
                bg="#FFA3A34D"
                justifyContent="space-between"
                borderRadius="12px"
                align="center"
                p={{ base: "13px 20px", lg: "16px 20px" }}
              >
                <Text>Find a parking spot in</Text>
                <Text>|</Text>

                <Flex align="center" gap="10px">
                  <Image
                    src="/assets/mappin.svg"
                    w={{ base: "15px", lg: "20px" }}
                    h={{ base: "15px", lg: "20px" }}
                  />
                  <Text>Lagos, Nigeria</Text>
                  <IoMdArrowDropdown />
                </Flex>
              </Flex>
            </motion.div>
          </Box>

          <Box w={{ base: "35%", lg: "20%" }}>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ x: [50, 0], opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <Button
                bg="#fff"
                h={{ base: "40px", lg: "50px" }}
                color="#000"
                w="100%"
                fontWeight={400}
                fontSize={{ base: "15px", lg: "18px" }}
                borderRadius="10px"
                lineHeight={{ base: "19px", lg: "25px" }}
              >
                Search Now
              </Button>
            </motion.div>
          </Box>
        </Flex>

        <Box mt="auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ x: [-50, 0], opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Image src="/assets/hero.png" w={{ base: "100%", lg: "90%" }} />
          </motion.div>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Hero;

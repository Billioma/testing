import React from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { RiArrowRightUpFill } from "react-icons/ri";
import { motion } from "framer-motion";

const About = () => {
  return (
    <Flex
      className="full_width"
      color="#090c02"
      id="about"
      justifyContent="center"
      bg="#F4F6F8"
      px="20px"
      mt="-20px"
    >
      <Flex
        py={{ base: "70px", xl: "100px" }}
        flexDir={{ base: "column", xl: "row" }}
        gap={{ base: "20px", xl: "unset" }}
        w={{ base: "100%", lg: "1350px" }}
        align="center"
      >
        <Box w={{ base: "100%", xl: "70%" }}>
          <Box
            mb={{ base: "38px", xl: "48px" }}
            fontSize={{ base: "28px", xl: "36px" }}
            lineHeight={{ base: "26px", xl: "36px" }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ x: [-50, 0], opacity: 1 }}
              transition={{ duration: 1 }}
            >
              About ParkinSpace
            </motion.div>
          </Box>

          <Box
            fontFamily="Satoshi"
            fontSize={{ base: "16px", xl: "20px" }}
            lineHeight={{ base: "23px", xl: "30px" }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ x: [50, 0], opacity: 1 }}
              transition={{ duration: 1 }}
            >
              ParkinSpace is powered by EZPark, a premier parking management
              company.
              <br />
              <br />
              Our technology is the easy, fast and stress-free way to find,
              reserve and pay for parking services.
              <br />
              <br />
              Download and immediately access valet and self parking services
              on-demand or in advance.
            </motion.div>
          </Box>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ x: [-50, 0], opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Flex
              color="red"
              mt={{ base: "38px", xl: "48px" }}
              align="center"
              gap="6px"
            >
              <a
                href="https://app.parkinspace.ng/customer/auth/login"
                rel="noreferrer"
                target="_blank"
              >
                <Text
                  fontFamily="Satoshi"
                  fontSize={{ base: "16px", xl: "20px" }}
                  lineHeight={{ base: "23px", xl: "30px" }}
                  textDecor="underline"
                >
                  Get Started
                </Text>
              </a>
              <RiArrowRightUpFill size="13px" />
            </Flex>
          </motion.div>
        </Box>

        <Box w="100%">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ x: [50, 0], opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Image
              src="/assets/phones.png"
              w={{ base: "", xl: "750px" }}
              h={{ base: "", xl: "450px" }}
            />
          </motion.div>
        </Box>
      </Flex>
    </Flex>
  );
};

export default About;

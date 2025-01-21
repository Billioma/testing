import React from "react";
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const MobileApp = ({ dash }) => {
  return (
    <Flex
      className="full_width"
      color="#fff"
      justifyContent="center"
      bg="red"
      px="20px"
      mt="-20px"
      borderBottomRadius={dash ? "24px" : "0"}
    >
      <Flex
        w={{ base: "100%", lg: "1350px" }}
        flexDir={{ base: "column", xl: "row" }}
        justifyContent="space-between"
        align={{ base: "center", xl: "flex-end" }}
      >
        <Box w={{ base: "100%", xl: "40%" }} py={{ base: "70px", xl: "120px" }}>
          <Box
            fontSize={{ base: "25px", xl: "38px" }}
            lineHeight={{ base: "32px", xl: "50px" }}
            textTransform="capitalize"
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ x: [-50, 0], opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Download the parkinSpace mobile app now.
            </motion.div>
          </Box>
          <Box
            mt="8px"
            fontSize={{ base: "16px", xl: "20px" }}
            lineHeight={{ base: "24px", xl: "30px" }}
            fontFamily="Satoshi"
            textTransform="capitalize"
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ x: [50, 0], opacity: 1 }}
              transition={{ duration: 1 }}
            >
              all your parking service needs, at your fingertips.
            </motion.div>
          </Box>

          <Flex
            align="center"
            my="28px"
            fontSize={{ base: "16px", xl: "20px" }}
            lineHeight={{ base: "24px", xl: "30px" }}
            gap="50px"
            fontFamily="Satoshi"
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ x: [-50, 0], opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <Flex align="center" gap="8px">
                <FaStar />
                <Text>4.9</Text>
              </Flex>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ x: [50, 0], opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <Flex align="center" gap="8px">
                <Image src="/assets/circles.png" w="70px" h="25px" />
                <Text>
                  300K<sub>+</sub> Active Users
                </Text>
              </Flex>
            </motion.div>{" "}
          </Flex>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ x: [-50, 0], opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <a
              href="https://app.parkinspace.ng/customer/auth/login"
              rel="noreferrer"
              target="_blank"
            >
              <Button
                bg="#000"
                fontWeight={400}
                h={{ base: "55px", xl: "70px" }}
                w={{ base: "130px", xl: "173px" }}
                fontSize={{ base: "16px", xl: "20px" }}
                lineHeight={{ base: "23px", xl: "30px" }}
              >
                Get Started
              </Button>
            </a>
          </motion.div>
        </Box>

        <Box pos="relative" w={{ base: "100%", xl: "45%" }}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ x: [50, 0], opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Image src="/assets/app.png" />
          </motion.div>
        </Box>
      </Flex>
    </Flex>
  );
};

export default MobileApp;

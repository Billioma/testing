import React from "react";
import { Box, Button, Flex, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";

const Analytics = () => {
  return (
    <Box
      mt={{ base: "50px", md: "100px" }}
      bg="#090C02"
      borderRadius="24px"
      p={{ base: "24px", md: "50px" }}
      color="#fff"
    >
      <Flex
        align="center"
        flexDir={{ base: "column", md: "row" }}
        gap={{ base: "32px", md: "" }}
      >
        <Flex
          flexDir="column"
          align={{ base: "center", md: "flex-start" }}
          w={{ base: "", md: "60%" }}
        >
          <Box
            fontSize={{ base: "24px", md: "48px" }}
            lineHeight={{ base: "33px", md: "58px" }}
            fontFamily="Recoleta"
            textTransform="capitalize"
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ x: [-50, 0], opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Tailored Solutions for{" "}
              <span style={{ color: "#EE383A" }}>Every Parking</span> Operation
            </motion.div>
          </Box>

          <Box
            mt={{ base: "8px", md: "28px" }}
            fontFamily="Satoshi"
            w={{ base: "", md: "90%" }}
            fontSize={{ base: "14px", md: "20px" }}
            lineHeight={{ base: "21px", md: "30px" }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ x: [50, 0], opacity: 1 }}
              transition={{ duration: 1 }}
            >
              The set up is easy and flexible to suit your parking operations.
              We cater to Municipalities, Transit & Airports, Private Operators,
              Event Venues & Organizers, Malls & Shopping Centers, Hospitality
              Venues and more.
            </motion.div>
          </Box>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ x: [-50, 0], opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Button
              bg="#fff"
              mt={{ base: "24px", md: "40px" }}
              fontSize="16px"
              fontWeight={400}
              color="#000"
              h={{ base: "44px", md: "60px" }}
              borderRadius={{ base: "4px", md: "12px" }}
              w={{ base: "154px", md: "245px" }}
            >
              Request a Demo
            </Button>
          </motion.div>
        </Flex>
        <Flex
          flexDir="column"
          w={{ base: "", md: "40%" }}
          align={{ base: "center", md: "flex-start" }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ x: [50, 0], opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Image
              src="/assets/demo.png"
              borderRadius="12px"
              h={{ base: "192px", md: "384px" }}
              w={{ base: "248px", md: "494px" }}
            />
          </motion.div>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Analytics;

import React from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";

const Download = () => {
  return (
    <Box my="100px" display={{ base: "none", md: "block" }}>
      <Flex flexDir="column" align="center" w="100%">
        <Box
          color="#090c02"
          textAlign="center"
          w={{ base: "", md: "90%" }}
          fontSize={{ base: "20px", md: "28px" }}
          lineHeight={{ base: "", md: "40px" }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ x: [-50, 0], opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Stay informed on your business with the different tools and
            functionalities including Analytics, Reporting, Rates & Policy
            Management, Payments and Administration.
          </motion.div>
        </Box>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ x: [50, 0], opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Button
            mt="32px"
            w="262px"
            h="60px"
            bg="#f4f6f8"
            color="#000"
            fontSize="16px"
          >
            Get download link
          </Button>
        </motion.div>
      </Flex>
    </Box>
  );
};

export default Download;

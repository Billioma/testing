import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { terms } from "../../common/constants";
import { motion } from "framer-motion";

const Content = () => {
  return (
    <Box my="80px" fontFamily="Satoshi">
      <Flex flexDir="column" gap={{ base: "40px", md: "80px" }}>
        {terms.map((item, i) => (
          <Flex
            align="flex-start"
            key={i}
            flexDir={{ base: "column", md: "row" }}
          >
            <Box
              w={{ base: "", md: "30%" }}
              color="#090C02"
              fontWeight={500}
              lineHeight={{ base: "25px", md: "32px" }}
              fontSize={{ base: "16px", md: "22px" }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ x: [-50, 0], opacity: 1 }}
                transition={{ duration: 1 }}
              >
                {item?.title}
              </motion.div>
            </Box>
            <Box
              w={{ base: "", md: "70%" }}
              color="#3D3D3D"
              fontSize={{ base: "14px", md: "16px" }}
              lineHeight={{ base: "22px", md: "28px" }}
              mt={{ base: "10px", md: "0" }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ x: [50, 0], opacity: 1 }}
                transition={{ duration: 1 }}
              >
                {item?.body}
              </motion.div>
            </Box>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};

export default Content;

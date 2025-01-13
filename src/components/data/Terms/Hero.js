import React from "react";
import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <Box color="#fff" bg="#EE383A" borderRadius="24px" p="60px 30px">
      <Box
        fontSize={{ base: "28px", xl: "43px" }}
        lineHeight={{ base: "35px", xl: "52px" }}
        fontWeight={500}
        fontFamily="Recoleta"
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ x: [-50, 0], opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Terms & Conditions
        </motion.div>
      </Box>
      <Box
        mt="24px"
        fontSize={{ base: "16px", xl: "20px" }}
        lineHeight={{ base: "25px", xl: "32px" }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ x: [50, 0], opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Please read through our terms and conditions carefully. By using our
          services, you agree to abide by these terms to ensure a seamless
          parking experience for all users.
        </motion.div>
      </Box>
    </Box>
  );
};

export default Hero;

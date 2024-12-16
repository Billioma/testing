import React from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { reviews } from "../../common/constants";
import { FaRegStar, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const Testimonials = () => {
  return (
    <Box
      py={{ base: "40px", md: "60px" }}
      pos="relative"
      borderBottomRadius="24px"
    >
      <Box
        color="#101410"
        fontSize={{ base: "23px", md: "38px" }}
        lineHeight={{ base: "32px", md: "50px" }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ x: [-50, 0], opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Testimonials
        </motion.div>
      </Box>

      <Flex
        mt="42px"
        overflowX="scroll"
        scrollBehavior="smooth"
        transition="0.5s ease-in-out"
      >
        {reviews.map((item, i) => (
          <Box
            key={i}
            minW={{ base: "80%", md: "450px" }}
            h={{ base: "", md: "450px" }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ x: [50, 0], opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <Box
                key={i}
                p={{ base: "", md: "30px" }}
                minW={{ base: "80%", md: "450px" }}
                h={{ base: "", md: "450px" }}
                mr={{ base: "50px", md: "60px" }}
              >
                <Image
                  src="/assets/quote.png"
                  w={{ base: "20px", md: "40px" }}
                  h={{ base: "15px", md: "30px" }}
                />
                <Text
                  my={{ base: "20px", md: "40px" }}
                  fontSize={{ base: "15px", md: "18px" }}
                  lineHeight={{ base: "23px", md: "28px" }}
                  fontFamily="Satoshi"
                  color="#707880"
                >
                  {item?.body}
                </Text>
                <Flex align="center" gap="2px" color="red">
                  {[...Array(5)].map((_, i) =>
                    i === 4 ? (
                      <FaRegStar size="20px" key={i} />
                    ) : (
                      <FaStar size="20px" key={i} />
                    )
                  )}
                </Flex>
                <Text
                  mt={{ base: "20px", md: "40px" }}
                  color="#000"
                  fontFamily="Satoshi"
                  fontSize={{ base: "15px", md: "18px" }}
                  lineHeight={{ base: "23px", md: "28px" }}
                >
                  - {item?.name}
                </Text>
              </Box>
            </motion.div>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default Testimonials;

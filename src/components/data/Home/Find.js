import React from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { services } from "../../common/constants";
import { motion } from "framer-motion";

const Find = () => {
  return (
    <Box id="services" py={{ base: "100px", md: "60px 20px 100px" }}>
      <Box
        fontSize={{ base: "20px", md: "38px" }}
        textTransform="capitalize"
        lineHeight={{ base: "30px", md: "50px" }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ x: [-50, 0], opacity: 1 }}
          transition={{ duration: 1 }}
        >
          we've made finding parking & car Services easier
        </motion.div>
      </Box>

      <Flex
        overflowX="scroll"
        mt={{ base: "45px", md: "65px" }}
        scrollBehavior="smooth"
        transition="0.5s ease-in-out"
      >
        {services.map((item, i) => (
          <Box
            key={i}
            minW={{ base: "80%", md: "450px" }}
            h={{ base: "380px", md: "450px" }}
            mr={{ base: "20px", md: "60px" }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ x: [50, 0], opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <Flex
                flexDir={i % 2 === 0 ? "" : "column-reverse"}
                pos="relative"
                pt={{ base: "30px", md: "35px" }}
                pb={{ base: "30px", md: "55px" }}
                key={i}
                borderRadius="18px"
                bg={i === 0 ? "#131618" : "#F4F6F8"}
                color={i === 0 ? "#fff" : "#090C02"}
                minW={{ base: "80%", md: "450px" }}
                h={{ base: "380px", md: "450px" }}
                mr={{ base: "20px", md: "60px" }}
              >
                <Flex
                  flexDir="column"
                  align="center"
                  px={{ base: "20px", md: "unset" }}
                >
                  <Text
                    fontSize={{ base: "16px", md: "23px" }}
                    lineHeight={{ base: "20px", md: "23px" }}
                  >
                    {item?.title}
                  </Text>
                  <Text
                    mt={{ base: "13px", md: "16px" }}
                    w={{ base: "100%", md: "70%" }}
                    fontFamily="Satoshi"
                    fontSize={{ base: "14px", md: "16px" }}
                    textAlign="center"
                    lineHeight={{ base: "22px", md: "24px" }}
                  >
                    {item?.desc}
                  </Text>
                </Flex>

                <Flex
                  justifyContent="center"
                  bottom={i % 2 === 0 ? "0" : "unset"}
                  top={i % 2 === 0 ? "unset" : "0"}
                  pos="absolute"
                >
                  <Image src={item?.pic} w={{ base: "80%", md: "70%" }} />
                </Flex>
              </Flex>
            </motion.div>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default Find;

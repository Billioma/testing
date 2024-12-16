import React from "react";
import { Box, Flex, Grid, Image, Text } from "@chakra-ui/react";
import { getStarted } from "../../common/constants";
import { motion } from "framer-motion";

const GettingStarted = () => {
  return (
    <Flex
      className="full_width"
      color="#fff"
      justifyContent="center"
      bg="#131618"
      px="20px"
      id="start"
      pos="relative"
      mt="-20px"
      borderBottomRadius="24px"
    >
      <Flex
        flexDir={{ base: "column", xl: "row" }}
        gap={{ base: "20px", xl: "unset" }}
        w={{ base: "100%", lg: "1350px" }}
        align={{ base: "center", xl: "flex-end" }}
      >
        <Box w={{ base: "100%", xl: "60%" }} py={{ base: "70px", xl: "100px" }}>
          <Box
            fontSize={{ base: "23px", xl: "38px" }}
            lineHeight={{ base: "32px", xl: "50px" }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ x: [-50, 0], opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Get started with ParkinSpace
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

          <Grid
            mt={{ base: "60px", xl: "100px" }}
            templateColumns={{ base: "repeat(2, 1fr)", xl: "repeat(2, 1fr)" }}
            alignContent="center"
            rowGap={{ base: "15px", xl: "55px" }}
            columnGap={{ base: "15px", xl: "unset" }}
          >
            {getStarted.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{
                  x: i % 2 === 0 ? [-50, 0] : [50, 0],
                  opacity: 1,
                }}
                transition={{ duration: 1 }}
              >
                <Box
                  key={i}
                  bg="#fff"
                  w={{ base: "", xl: "310px" }}
                  h={{ base: "122px", xl: "192px" }}
                  borderRadius="12px"
                  color="#090C02"
                  p={{ base: "16px", xl: "20px" }}
                >
                  <Text
                    fontSize={{ base: "16px", xl: "28px" }}
                    lineHeight={{ base: "28px", xl: "45px" }}
                  >
                    0{i + 1}
                  </Text>
                  <Text
                    mt="10px"
                    fontSize={{ base: "15px", xl: "20px" }}
                    lineHeight={{ base: "22px", xl: "30px" }}
                  >
                    {item}
                  </Text>
                </Box>
              </motion.div>
            ))}
          </Grid>
        </Box>
        <Box pos="relative" w={{ base: "100%", xl: "45%" }}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ x: [50, 0], opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Image
              src="/assets/blur.png"
              pos="absolute"
              bottom="0"
              w="full"
              right="0"
            />
            <Image src="/assets/get.png" />
          </motion.div>
        </Box>
      </Flex>
    </Flex>
  );
};

export default GettingStarted;

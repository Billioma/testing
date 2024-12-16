import React from "react";
import { Box, Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import { phones } from "../../common/constants";
import { motion } from "framer-motion";

const Download = () => {
  return (
    <Flex
      className="full_width"
      color="#fff"
      justifyContent="center"
      bg="#131618"
      px="20px"
      mt="-20px"
      borderBottomRadius="24px"
    >
      <Box
        py={{ base: "100px", xl: "180px" }}
        w={{ base: "100%", lg: "1350px" }}
      >
        <Grid
          gap={{ base: "30px", xl: "unset" }}
          templateColumns={{ base: "repeat(1, 1fr)", xl: "repeat(4, 1fr)" }}
        >
          <GridItem colSpan={{ base: 1, xl: 2 }}>
            <Box w={{ base: "", xl: "70%" }}>
              <Box
                fontSize={{ base: "20px", xl: "38px" }}
                lineHeight={{ base: "30px", xl: "50px" }}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ x: [-50, 0], opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  Download The ParkinSpace Mobile App Now.
                </motion.div>
              </Box>
              <Box
                my="8px"
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
                pt="20px"
                align="center"
                gap={{ base: "unset", xl: "50px" }}
                justifyContent={{ base: "space-between", xl: "unset" }}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ x: [-50, 0], opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  <Box>
                    <Text
                      fontSize={{ base: "18px", xl: "23px" }}
                      lineHeight={{ base: "25px", xl: "34px" }}
                    >
                      300K<sub>+</sub>
                    </Text>
                    <Text
                      mt="4px"
                      fontFamily="Satoshi"
                      fontSize={{ base: "15px", xl: "18px" }}
                      lineHeight={{ base: "20px", xl: "28px" }}
                    >
                      Active users
                    </Text>
                  </Box>
                </motion.div>

                <Box bg="#646668" w="1px" h="64px" />

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ x: [50, 0], opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  <Box>
                    <Text
                      fontSize={{ base: "18px", xl: "23px" }}
                      lineHeight={{ base: "25px", xl: "34px" }}
                    >
                      1M<sub>+</sub>
                    </Text>
                    <Text
                      mt="4px"
                      fontFamily="Satoshi"
                      fontSize={{ base: "15px", xl: "18px" }}
                      lineHeight={{ base: "20px", xl: "28px" }}
                    >
                      Downloads
                    </Text>
                  </Box>
                </motion.div>
              </Flex>
            </Box>
          </GridItem>

          {phones.map((item, i) => (
            <GridItem key={i}>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ x: [50, 0], opacity: 1 }}
                transition={{ duration: 1, delay: i * 0.3 }}
              >
                <Flex
                  flexDir="column"
                  justifyContent="center"
                  bg="#FFFFFF33"
                  p="30px"
                  color="#fff"
                  pos="relative"
                  borderRadius="8px"
                  h={{ base: "120px", xl: "120px" }}
                  w={{ base: "full", xl: "280px" }}
                >
                  <Text
                    fontSize={{ base: "16px", xl: "20px" }}
                    lineHeight={{ base: "16px", xl: "20px" }}
                    fontWeight={700}
                    fontFamily="Satoshi"
                  >
                    For {item?.title}
                  </Text>
                  <Text
                    mt="10px"
                    fontSize={{ base: "12px", xl: "14px" }}
                    lineHeight={{ base: "12px", xl: "14px" }}
                    fontFamily="Satoshi"
                  >
                    {item?.title} {item?.version}
                  </Text>

                  <Image
                    pos="absolute"
                    bottom="-20px"
                    right="0"
                    src={item?.icon}
                    w="40px"
                    h="40px"
                  />
                </Flex>
                <Box mt={{ base: "20px", xl: "25px" }} pl="30px">
                  <Image src={item?.img} h="36px" w="128px" />
                </Box>
              </motion.div>
            </GridItem>
          ))}
        </Grid>
      </Box>
    </Flex>
  );
};

export default Download;

import React from "react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { plus } from "../../common/constants";
import { GiCheckMark } from "react-icons/gi";
import { MdAdd } from "react-icons/md";
import { motion } from "framer-motion";

const Plus = () => {
  return (
    <Flex
      className="full_width"
      color="#090c02"
      justifyContent="center"
      bg="#F4F6F8"
      id="plus"
      px="20px"
      pos="relative"
      borderBottomRadius="24px"
    >
      <Box
        py={{ base: "70px", xl: "100px" }}
        w={{ base: "100%", lg: "1350px" }}
      >
        <Flex flexDir="column" align="center">
          <Box
            mb="12px"
            textAlign="center"
            fontWeight={900}
            fontSize={{ base: "30px", xl: "55px" }}
            lineHeight={{ base: "40px", xl: "55px" }}
            fontFamily="Cooper"
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ x: [-50, 0], opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <span style={{ color: "red" }}>Parki</span>nSpace Plus
            </motion.div>
          </Box>
          <Box
            textAlign="center"
            fontSize={{ base: "15px", xl: "20px" }}
            fontFamily="Satoshi"
            w={{ base: "", xl: "50%" }}
            lineHeight={{ base: "23px", xl: "30px" }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ x: [50, 0], opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Enjoy an upgraded experience with great benefits when you
              subscribe to a monthly plan for a fee
            </motion.div>
          </Box>
        </Flex>

        <Flex
          mt={{ base: "40px", xl: "60px" }}
          flexDir={{ base: "column", xl: "row" }}
          align="center"
          gap={{ base: "30px", xl: "50px" }}
        >
          {plus.map((item, i) => (
            <motion.div
              key={i}
              style={{ width: "100%" }}
              initial={{ opacity: 0 }}
              whileInView={{ x: i === 1 ? [50, 0] : [-50, 0], opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <Box
                fontFamily="Satoshi"
                w="full"
                key={i}
                bg={i === 0 ? "#fff" : "#131618"}
                color={i === 0 ? "#090c02" : "#fff"}
                borderRadius="18px"
                p={{ base: "30px", xl: "30px" }}
                h={{ base: "", xl: "500px" }}
              >
                <Text
                  fontSize={{ base: "14px", xl: "16px" }}
                  lineHeight={{ base: "14px", xl: "36px" }}
                >
                  {item?.title}
                </Text>
                <Text
                  my={{ base: "16px", xl: "20px" }}
                  fontSize={{ base: "17px", xl: "26px" }}
                  lineHeight={{ base: "17px", xl: "25px" }}
                  fontFamily="Recoleta"
                >
                  {item?.title}
                </Text>

                <Flex flexDir="column" gap={{ base: "18px", xl: "25px" }}>
                  {item?.subs?.map((dat, index) => (
                    <Flex align="center" key={index} gap="8px">
                      <GiCheckMark
                        size="15px"
                        color={i === 1 ? "#BBFFC6" : "#96CC9E"}
                      />
                      <Text
                        color={i === 1 ? "#F4F6F8" : "#707880"}
                        fontSize={{ base: "14px", xl: "18px" }}
                        lineHeight={{ base: "19px", xl: "28px" }}
                      >
                        {dat}
                      </Text>
                    </Flex>
                  ))}

                  <Flex
                    align="center"
                    display={i === 1 ? "flex" : "none"}
                    gap="8px"
                  >
                    <GiCheckMark color="#131618" />
                    <Flex align="center" gap="8px">
                      <MdAdd />
                      <Text
                        color="#F4F6F8"
                        fontSize={{ base: "15px", xl: "18px" }}
                        lineHeight={{ base: "20px", xl: "28px" }}
                      >
                        Standard
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Box>
            </motion.div>
          ))}
        </Flex>

        <Flex justifyContent="center" mt={{ base: "40px", xl: "80px" }}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ x: [-50, 0], opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Button
              bg="red"
              fontWeight={400}
              h={{ base: "40px", xl: "70px" }}
              w={{ base: "140px", xl: "163px" }}
              fontSize={{ base: "16px", xl: "20px" }}
              lineHeight={{ base: "23px", xl: "30px" }}
            >
              Join Plus
            </Button>
          </motion.div>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Plus;

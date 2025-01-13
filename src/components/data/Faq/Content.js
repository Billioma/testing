import React from "react";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
} from "@chakra-ui/react";
import { BsGraphUp } from "react-icons/bs";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { motion } from "framer-motion";

const Content = () => {
  return (
    <Accordion allowToggle my="80px">
      {[...Array(5)].map((_, index) => (
        <Box key={index} mb="80px" whiteSpace="pre-line">
          <AccordionItem border="0">
            {({ isExpanded }) => (
              <Box>
                <h2>
                  <AccordionButton
                    display="flex"
                    justifyContent="space-between"
                    _hover={{ bg: "transparent" }}
                    alignContent="flex-start"
                  >
                    <Flex align="flex-start" gap="15px">
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ x: [-50, 0], opacity: 1 }}
                        transition={{ duration: 1 }}
                      >
                        <Flex
                          border="1px solid #E4E6E8"
                          align="center"
                          justifyContent="center"
                          w="40px"
                          h="40px"
                          borderRadius="12px"
                        >
                          <BsGraphUp size="16px" />
                        </Flex>
                      </motion.div>
                      <Box
                        color="#090C02"
                        fontWeight={500}
                        lineHeight={{ base: "25px", md: "32px" }}
                        fontSize={{ base: "16px", md: "22px" }}
                      >
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileInView={{ x: [50, 0], opacity: 1 }}
                          transition={{ duration: 1 }}
                        >
                          How do you get started on parking?
                        </motion.div>
                      </Box>
                    </Flex>

                    {isExpanded ? (
                      <IoIosArrowUp size="20px" />
                    ) : (
                      <IoIosArrowDown size="20px" />
                    )}
                  </AccordionButton>
                </h2>
                <AccordionPanel>
                  <Box
                    //   mt="12px"
                    pl="60px"
                    color="#3D3D3D"
                    fontSize={{ base: "14px", md: "16px" }}
                    lineHeight={{ base: "22px", md: "28px" }}
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ x: [50, 0], opacity: 1 }}
                      transition={{ duration: 1 }}
                    >
                      By utilizing the parking and valet management services
                      provided by EZPark, you agree to be bound by these terms
                      and conditions. Please read them carefully before using
                      our services.
                    </motion.div>
                  </Box>
                </AccordionPanel>
              </Box>
            )}
          </AccordionItem>
        </Box>
      ))}
    </Accordion>
  );
};

export default Content;

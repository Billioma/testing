import React from "react";
import { Box, Flex, Grid, GridItem, Icon, Image, Text } from "@chakra-ui/react";
import {
  companies,
  information,
  locations,
  socials,
} from "../common/constants";
import { scroller } from "react-scroll";
import { Link as RouteLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  const navigate = useNavigate();
  const today = new Date();

  const scrollToSection = (sectionId, retryCount = 5) => {
    const element = document.getElementById(sectionId);

    if (element) {
      scroller.scrollTo(sectionId, {
        duration: 800,
        delay: 0,
        smooth: "easeInOutQuart",
        offset: -100,
      });
    } else if (retryCount > 0) {
      setTimeout(() => scrollToSection(sectionId, retryCount - 1), 500);
    } else {
      console.warn(`Element with ID ${sectionId} not found.`);
    }
  };

  const handleNavigation = (targetPath) => {
    if (window.location.pathname !== "/") {
      navigate("/", { state: { section: targetPath } });
    } else {
      scrollToSection(targetPath);
    }
  };

  return (
    <Box fontFamily="Satoshi" py="70px">
      <Grid
        templateColumns={{ base: "repeat(2, 1fr)", lg: "repeat(6, 1fr)" }}
        rowGap={{ base: "50px", lg: "unset" }}
        columnGap={{ base: "30px", lg: "unset" }}
      >
        <GridItem colSpan={{ base: 2, lg: 3 }}>
          <Box>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ x: [-50, 0], opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <Image h="40px" src="/assets/logo.png" />
            </motion.div>{" "}
            <Box
              my="12px"
              fontSize={{ base: "14px", lg: "16px" }}
              textTransform="capitalize"
              lineHeight={{ base: "14px", lg: "16px" }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ x: [-50, 0], opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                Parking solutions, everywhere, for everyone.
              </motion.div>
            </Box>
            <Flex mt="20px" align="center" gap="24px">
              {socials.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ x: [-50, 0], opacity: 1 }}
                  transition={{ duration: 1, delay: i * 0.3 }}
                >
                  <Icon key={i} as={item} w="18px" h="18px" color="red" />
                </motion.div>
              ))}
            </Flex>
          </Box>
        </GridItem>

        <GridItem>
          <Box
            fontSize={{ base: "14px", lg: "16px" }}
            lineHeight={{ base: "14px", lg: "16px" }}
            fontWeight={700}
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ x: [-50, 0], opacity: 1 }}
              transition={{ duration: 1 }}
            >
              COMPANY
            </motion.div>
          </Box>

          <Flex flexDir="column" mt="24px" gap="21px">
            {companies.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ x: [50, 0], opacity: 1 }}
                transition={{ duration: 1, delay: i * 0.3 }}
              >
                <Text
                  key={i}
                  cursor="pointer"
                  onClick={() => handleNavigation(item?.id)}
                  fontSize={{ base: "14px", lg: "16px" }}
                  lineHeight={{ base: "14px", lg: "16px" }}
                >
                  {item?.name}
                </Text>
              </motion.div>
            ))}
          </Flex>
        </GridItem>

        <GridItem>
          <Box
            fontSize={{ base: "14px", lg: "16px" }}
            lineHeight={{ base: "14px", lg: "16px" }}
            fontWeight={700}
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ x: [-50, 0], opacity: 1 }}
              transition={{ duration: 1 }}
            >
              INFORMATION
            </motion.div>
          </Box>

          <Flex flexDir="column" mt="24px" gap="21px">
            {information.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ x: [50, 0], opacity: 1 }}
                transition={{ duration: 1, delay: i * 0.3 }}
              >
                <RouteLink key={i} to={item?.link}>
                  <Text
                    fontSize={{ base: "14px", lg: "16px" }}
                    lineHeight={{ base: "14px", lg: "16px" }}
                  >
                    {item?.name}
                  </Text>
                </RouteLink>
              </motion.div>
            ))}
          </Flex>
        </GridItem>

        <GridItem colSpan={{ base: 2, lg: 1 }}>
          <Flex flexDir="column" align="center">
            <Box
              fontSize={{ base: "14px", lg: "16px" }}
              lineHeight={{ base: "14px", lg: "16px" }}
              fontWeight={700}
            >
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ x: [-50, 0], opacity: 1 }}
                transition={{ duration: 1 }}
              >
                LOCATIONS
              </motion.div>
            </Box>

            <Flex flexDir="column" mt="24px" gap="21px">
              {locations.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ x: [50, 0], opacity: 1 }}
                  transition={{ duration: 1, delay: i * 0.3 }}
                >
                  <Text
                    key={i}
                    fontSize={{ base: "14px", lg: "16px" }}
                    lineHeight={{ base: "14px", lg: "16px" }}
                  >
                    {item}
                  </Text>
                </motion.div>
              ))}
            </Flex>
          </Flex>
        </GridItem>
      </Grid>

      <Flex flexDir="column" align="center" w="full">
        <Box my="40px" bg="#545658" h="1px" w={{ base: "80%", lg: "50%" }} />
        <Box fontSize="14px" lineHeight="14px" coolor="#131618">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ x: [-50, 0], opacity: 1 }}
            transition={{ duration: 1 }}
          >
            ©{today.getFullYear()} EZPark Limited. All rights reserved
          </motion.div>
        </Box>
      </Flex>
    </Box>
  );
};

export default Footer;

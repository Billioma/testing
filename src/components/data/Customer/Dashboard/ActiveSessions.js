import React from "react";
import { Box, Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import { dashServices } from "../../../common/constants";
import { IoIosArrowForward } from "react-icons/io";

const ActiveSessions = () => {
  return (
    <Box mt="24px">
      <Text mb="12px" color="#242628" fontWeight={500} lineHeight="100%">
        Active Sessions
      </Text>

      <Grid
        gap="20px"
        templateColumns={[
          "repeat(1,1fr)",
          "repeat(1,1fr)",
          "repeat(2,1fr)",
          "repeat(3,1fr)",
        ]}
      >
        {dashServices?.slice(0, 3)?.map((dat, i) => (
          <GridItem key={i}>
            <Box bg="#FDFCE8" borderRadius="8px" py="12px" px="16px">
              <Flex align="center" justifyContent="space-between" w="full">
                <Text
                  color="black"
                  fontSize="12px"
                  lineHeight="100%"
                  fontWeight={500}
                >
                  ID: 857334
                </Text>

                <Flex
                  bg="#FBD0D0"
                  rounded="full"
                  py="6px"
                  px="12px"
                  color="red"
                  fontSize="12px"
                  lineHeight="100%"
                >
                  Valet
                </Flex>
              </Flex>

              <Flex
                align="center"
                justifyContent="space-between"
                mt="17px"
                w="full"
              >
                <Flex align="center" gap="4px">
                  <Image w="12px" h="12px" src="/assets/location.svg" />

                  <Text fontSize="14px" color="#242628" lineHeight="100%">
                    Landmark Village
                  </Text>
                </Flex>

                <Flex align="center" gap="4px">
                  <Image w="12px" h="12px" src="/assets/car-icon.svg" />

                  <Text fontSize="14px" color="#242628" lineHeight="100%">
                    Toyota Corrola
                  </Text>
                </Flex>

                <Flex align="center" gap="4px">
                  <Image w="12px" h="12px" src="/assets/clock-icon.svg" />

                  <Text fontSize="14px" color="#242628" lineHeight="100%">
                    12:00pm
                  </Text>
                </Flex>
              </Flex>

              <Flex
                cursor="pointer"
                mt="20px"
                justifyContent="flex-end"
                align="center"
                gap="4px"
              >
                <Text fontSize="14px" color="#242628" lineHeight="100%">
                  View Details
                </Text>
                <IoIosArrowForward size="15px" />
              </Flex>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default ActiveSessions;

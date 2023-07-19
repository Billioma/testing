import React from "react";
import { Box, Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import { dashServices } from "../../common/constants";

const Services = () => {
  return (
    <Box mt="24px">
      <Text mb="12px" color="#242628" fontWeight={500} lineHeight="100%">
        Services
      </Text>

      <Grid
        gap="20px"
        templateColumns={[
          "repeat(1,1fr)",
          "repeat(2,1fr)",
          "repeat(2,1fr)",
          "repeat(4,1fr)",
        ]}
      >
        {dashServices?.map((dat, i) => (
          <GridItem key={i}>
            <Box
              bg="#fff"
              borderRadius="8px"
              border="1px solid #E4E6E8"
              py="16px"
              px="24px"
            >
              <Flex align="center" gap="16px">
                <Image src={dat?.img} h="48px" w="48px" />
                <Text
                  color="#444648"
                  fontWeight={500}
                  fontSize="14px"
                  lineHeight="100%"
                >
                  {dat?.title}
                </Text>
              </Flex>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default Services;

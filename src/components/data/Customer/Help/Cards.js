import React from "react";
import { Box, Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import { customerHelp } from "../../../common/constants";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Cards = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Grid
        gap="24px"
        templateColumns={[
          "repeat(1,1fr)",
          "repeat(1,1fr)",
          "repeat(2,1fr)",
          "repeat(3,1fr)",
        ]}
      >
        {customerHelp.map((item, i) => (
          <GridItem key={i}>
            <Box
              cursor="pointer"
              py="16px"
              bg="#fff"
              onClick={() => navigate(item.link)}
              px="20px"
              borderRadius="8px"
            >
              <Image src={item.img} w="48px" h="48px" />

              <Flex
                color="#646668"
                w="full"
                mt="24px"
                justifyContent="space-between"
                align="center"
              >
                <Text fontSize="14px" lineHeight="100%">
                  {item.title}
                </Text>
                <IoIosArrowForward size="20px" />
              </Flex>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default Cards;

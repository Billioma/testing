import React from "react";
import { benefits } from "../../common/constants";
import { Box, Flex, Grid, Image, Text } from "@chakra-ui/react";

const Solution = () => {
  return (
    <Box className="full_width">
      <Flex
        w="full"
        flexDir="colmn"
        bg="#E4E6E8"
        align="center"
        justifyContent="center"
        px={{ base: "20px", md: "120px" }}
        py={{ base: "56px", md: "120px" }}
        className="flex w-full bg-[#E4E6E8] flex-col items-center justify-center px-[20px] lg:px-[120px] py-[56px] lg:py-[120px]"
      >
        <Flex
          flexDir={{ base: "column", md: "row" }}
          w={{ base: "full", md: "1350px" }}
          justifyContent="space-between"
          align="center"
        >
          <Box w="full">
            <Image src="/assets/soln.png" />
          </Box>
          <Box w="full">
            <Text
              color="#242424"
              fontSize={{ base: "32px", md: "64px" }}
              fontWeight={900}
              fontFamily="Cooper"
            >
              Our solution offers these benefits
            </Text>

            <Grid
              rowGap="24px"
              templateColumns={{
                base: "repeat(1, 1fr)",
                md: "repeat(2,  1fr)",
              }}
              mt="36px"
            >
              {benefits.map((dat, i) => (
                <Flex gap="8px" align="center" key={i}>
                  <Image src={dat.img} />
                  <Text
                    fontSize={{ base: "16px", lg: "20px" }}
                  >
                    {dat.name}
                  </Text>
                </Flex>
              ))}
            </Grid>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Solution;

import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

const Schedule = () => {
  return (
    <Box>
      <Flex
        bg="#fff"
        borderRadius="8px"
        py="30px"
        px={{ base: "15px", md: "34px" }}
        mt="24px"
        justifyContent="center"
        w="full"
        flexDir="column"
        border="1px solid #D9DBF1"
      >
        <Flex
          fontSize="18px"
          color="#090c02"
          justifyContent="space-between"
          w="full"
          borderBottom="1px solid #D9DBF1"
          pb="12px"
        >
          <Text fontWeight={700}>Schedule</Text>

          <Flex align="center" gap="8px" cursor="pointer">
            <Image src="/assets/edit.jpg" w="24px" h="24px" />
            <Text fontWeight={500}>Edit</Text>
          </Flex>
        </Flex>

        <Box py="12px" px="10px" borderBottom="1px solid #e2e5dc" my="20px">
          <Text color="#090c02" opacity={0.6} fontWeight={700} fontSize="12px">
            LOCATION
          </Text>
          <Text mt="8px" color="#000" fontWeight={500}>
            Ziya Delicacy Boutique
          </Text>
        </Box>

        <Box pt="12px" px="10px" my="20px">
          <Text color="#090c02" opacity={0.6} fontWeight={700} fontSize="12px">
            DAY(S)
          </Text>
          <Text mt="8px" color="#000" fontWeight={500}>
            Monday, April 8, 2024
          </Text>
          <Text mt="8px" color="#000" fontWeight={500}>
            Wednesday, April 10, 2024
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Schedule;
